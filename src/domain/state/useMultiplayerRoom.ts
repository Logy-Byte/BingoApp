/**
 * React Hook: useMultiplayerRoom
 * Connects React UI components to the AuthoritativeRoomServer and RoomTransport.
 * Provides synchronized room state, player list, drawn numbers, board interactions,
 * win claims, and rematch flows with zero conflicting states.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { PublicRoom, Player, Board5x5, GridCell5x5, RoomPrivacy } from '../types';
import { RoomTransport, TransportMessage } from '../multiplayer/transport';
import { AuthoritativeRoomServer, AuthoritativeRoomSnapshot } from '../multiplayer/authoritativeRoomServer';
import { generateRoomId, hashPassword, sanitizeRoomCode, getHumanErrorMessage } from '../multiplayer/roomManager';
import { AntiCheatValidator } from '../multiplayer/antiCheatValidator';
import { evaluate5x5Wins, generate5x5Board } from '../engine/gridGameEngine';
import { SoundEngine } from '../../audio/soundEngine';
import { GameStateMachine, GameState } from './gameStateMachine';

export interface UseMultiplayerRoomProps {
  player: Player;
  onNavigateToScreen: (screen: 'LOBBY' | 'GAMEPLAY' | 'RESULTS' | 'TAB_NAV') => void;
}

export function useMultiplayerRoom({ player, onNavigateToScreen }: UseMultiplayerRoomProps) {
  const [room, setRoom] = useState<PublicRoom | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [board, setBoard] = useState<Board5x5 | null>(null);
  const [drawnNumbers, setDrawnNumbers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [linesCompletedCount, setLinesCompletedCount] = useState(0);
  const [completedPatternIds, setCompletedPatternIds] = useState<string[]>([]);
  const [lastCompletedPatternName, setLastCompletedPatternName] = useState<string | undefined>();
  const [isGameActive, setIsGameActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState<number | null>(null);
  const [winner, setWinner] = useState<{ id: string; name: string } | null>(null);
  const [claimFeedback, setClaimFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const [joinError, setJoinError] = useState<string | undefined>();
  const [matchDuration, setMatchDuration] = useState(0);
  const [opponentLines, setOpponentLines] = useState<number>(0);
  const [opponentName, setOpponentName] = useState<string>('Opponent');

  const transportRef = useRef<RoomTransport | null>(null);
  const serverRef = useRef<AuthoritativeRoomServer | null>(null);
  const stateMachineRef = useRef<GameStateMachine>(new GameStateMachine('IDLE'));
  const matchStartTimeRef = useRef<number>(0);

  const isHost = room?.hostId === player.id;
  const canStart = Boolean(
    isHost &&
    room &&
    players.length >= 2 &&
    players.every((p) => p.isHost || p.isReady) &&
    room.status === 'WAITING'
  );

  // Clean up transport and server on unmount
  useEffect(() => {
    return () => {
      if (serverRef.current) {
        serverRef.current.destroy();
        serverRef.current = null;
      }
      if (transportRef.current) {
        transportRef.current.close();
        transportRef.current = null;
      }
    };
  }, []);

  // Handle incoming transport messages
  const handleTransportMessage = useCallback(
    (msg: TransportMessage) => {
      switch (msg.type) {
        case 'ROOM_ANNOUNCE': {
          const snapshot: AuthoritativeRoomSnapshot = msg.payload;
          setRoom(snapshot.room);
          setPlayers(snapshot.players);

          // Find opponent info
          const opp = snapshot.players.find((p) => p.id !== player.id);
          if (opp) {
            setOpponentName(opp.name);
            setOpponentLines(opp.linesCompleted || 0);
          }
          break;
        }

        case 'JOIN_RESPONSE': {
          const { success, targetPlayerId, snapshot, board: serverBoard, error } = msg.payload;
          if (targetPlayerId === player.id) {
            if (success && snapshot) {
              setRoom(snapshot.room);
              setPlayers(snapshot.players);
              if (serverBoard) {
                setBoard(serverBoard);
              }
              setJoinError(undefined);
              stateMachineRef.current.transition({ type: 'JOIN_SUCCESS', roomId: snapshot.room.id });
              onNavigateToScreen('LOBBY');
            } else {
              setJoinError(error || 'Failed to join room.');
              SoundEngine.playError();
            }
          }
          break;
        }

        case 'START_COUNTDOWN': {
          const { seconds, snapshot } = msg.payload;
          setCountdownSeconds(seconds);
          if (snapshot) {
            setRoom(snapshot.room);
          }
          stateMachineRef.current.transition({ type: 'START_COUNTDOWN', seconds });

          // Local countdown ticker
          let remaining = seconds;
          const timer = setInterval(() => {
            remaining -= 1;
            if (remaining <= 0) {
              clearInterval(timer);
              setCountdownSeconds(null);
            } else {
              setCountdownSeconds(remaining);
            }
          }, 1000);
          break;
        }

        case 'MATCH_STARTED': {
          setIsGameActive(true);
          setDrawnNumbers([]);
          setScore(0);
          setLinesCompletedCount(0);
          setCompletedPatternIds([]);
          setWinner(null);
          matchStartTimeRef.current = Date.now();
          stateMachineRef.current.transition({ type: 'MATCH_STARTED' });
          onNavigateToScreen('GAMEPLAY');
          break;
        }

        case 'NUMBER_DRAWN': {
          const { number, drawnNumbers: calls } = msg.payload;
          setDrawnNumbers(calls);
          SoundEngine.playBallDrawn();
          SoundEngine.speakNumber(number);
          break;
        }

        case 'OPPONENT_PROGRESS': {
          if (msg.senderId !== player.id) {
            setOpponentLines(msg.payload.linesCompleted || 0);
          }
          break;
        }

        case 'CLAIM_VERIFICATION_RESULT': {
          if (msg.payload.targetPlayerId === player.id) {
            SoundEngine.playError();
            setClaimFeedback({
              success: false,
              message: msg.payload.reason || 'Claim could not be verified.',
            });
            setTimeout(() => setClaimFeedback(null), 3000);
          }
          break;
        }

        case 'WINNER_DECLARED': {
          const { winnerId, winnerName, matchDurationSec, snapshot } = msg.payload;
          setIsGameActive(false);
          setWinner({ id: winnerId, name: winnerName });
          setMatchDuration(matchDurationSec || Math.floor((Date.now() - matchStartTimeRef.current) / 1000));
          if (snapshot) setRoom(snapshot.room);

          if (winnerId === player.id) {
            SoundEngine.playWinFanfare();
          } else {
            SoundEngine.playError();
          }

          stateMachineRef.current.transition({ type: 'CLAIM_VERIFIED', winnerId, winnerName });
          onNavigateToScreen('RESULTS');
          break;
        }

        case 'REMATCH_CONFIRMED': {
          const snapshot: AuthoritativeRoomSnapshot = msg.payload;
          setRoom(snapshot.room);
          setPlayers(snapshot.players);
          setIsGameActive(false);
          setWinner(null);
          setDrawnNumbers([]);
          setLinesCompletedCount(0);
          setScore(0);
          setCompletedPatternIds([]);

          // Generate fresh board for rematch
          const newBoard = generate5x5Board(`b-${player.id}`, `${snapshot.seed}-${player.id}`, false);
          setBoard(newBoard);

          stateMachineRef.current.transition({ type: 'REMATCH_CONFIRMED' });
          onNavigateToScreen('LOBBY');
          break;
        }
      }
    },
    [player.id, onNavigateToScreen]
  );

  // Setup transport for a room
  const setupTransport = useCallback(
    (roomId: string) => {
      if (transportRef.current) {
        transportRef.current.close();
      }
      const transport = new RoomTransport(roomId);
      transport.subscribe(handleTransportMessage);
      transportRef.current = transport;
      return transport;
    },
    [handleTransportMessage]
  );

  // 1. Create Room
  const createRoom = useCallback(
    (name: string, privacy: RoomPrivacy = 'open', password?: string) => {
      const roomId = generateRoomId();
      const newRoom: PublicRoom = {
        id: roomId,
        name: name.trim() || 'Custom Arena',
        privacy,
        passwordHash: password && password.trim().length > 0 ? hashPassword(password.trim()) : undefined,
        hostId: player.id,
        hostName: player.name,
        playerCount: 1,
        maxPlayers: 2,
        status: 'WAITING',
        createdAt: Date.now(),
        ticketPrice: 2.0,
        jackpotAmount: 50000,
        recommendedTickets: [1, 2, 4, 8],
      };

      const transport = setupTransport(roomId);

      // Create Authoritative Room Server on Host
      if (serverRef.current) serverRef.current.destroy();
      const server = new AuthoritativeRoomServer(newRoom, player, transport);
      serverRef.current = server;

      // Assign host board
      const hostBoard = server.getPlayerBoard(player.id);
      setBoard(hostBoard);
      setRoom(newRoom);
      setPlayers([player]);

      stateMachineRef.current.transition({ type: 'ROOM_CREATED', roomId });
      onNavigateToScreen('LOBBY');
    },
    [player, setupTransport, onNavigateToScreen]
  );

  // 2. Join Room
  const joinRoom = useCallback(
    (rawRoomId: string, password?: string) => {
      const cleanId = sanitizeRoomCode(rawRoomId);
      if (!cleanId || cleanId.length < 6) {
        setJoinError(getHumanErrorMessage('INVALID_ROOM_CODE'));
        SoundEngine.playError();
        return;
      }

      setJoinError(undefined);
      const transport = setupTransport(cleanId);

      // Send Join Request to room host
      transport.send('JOIN_REQUEST', cleanId, player.id, {
        player,
        password,
      });

      // Generate speculative board while waiting for server response
      const speculativeBoard = generate5x5Board(`b-${player.id}`, `join-${cleanId}-${Date.now()}`, false);
      setBoard(speculativeBoard);
    },
    [player, setupTransport]
  );

  // 3. Toggle Ready
  const toggleReady = useCallback(
    (isReady: boolean) => {
      if (!room || !transportRef.current) return;
      transportRef.current.send('PLAYER_READY_TOGGLE', room.id, player.id, {
        playerId: player.id,
        isReady,
      });
      // Optimistic update
      setPlayers((prev) =>
        prev.map((p) => (p.id === player.id ? { ...p, isReady } : p))
      );
    },
    [room, player.id]
  );

  // 4. Start Match (Host only)
  const startMatch = useCallback(() => {
    if (!room || !isHost || !transportRef.current) return;
    transportRef.current.send('START_COUNTDOWN', room.id, player.id, {
      seconds: 3,
    });
  }, [room, isHost, player.id]);

  // 5. Daub Cell
  const daubCell = useCallback(
    (cell: GridCell5x5) => {
      if (!board || !isGameActive) return;
      if (cell.state === 'MARKED' || cell.state === 'COMPLETED') return;

      // Authoritative anti-cheat validation
      const isLegitCalled = AntiCheatValidator.validateDaub(cell.value, drawnNumbers);
      if (!isLegitCalled) {
        SoundEngine.playError();
        setClaimFeedback({
          success: false,
          message: `Number ${cell.value} has not been called yet!`,
        });
        setTimeout(() => setClaimFeedback(null), 1400);
        return;
      }

      // Mark cell
      const newMatrix = board.matrix.map((row) =>
        row.map((c) => {
          if (c.id === cell.id) {
            return {
              ...c,
              state: 'MARKED' as const,
              daubTimestamp: Date.now(),
            };
          }
          return c;
        })
      );

      const updatedBoard: Board5x5 = {
        ...board,
        matrix: newMatrix,
      };

      SoundEngine.playDaub();

      // Check winning lines
      const winResult = evaluate5x5Wins(updatedBoard, completedPatternIds);
      if (winResult.newlyCompletedPatterns.length > 0) {
        SoundEngine.playLineCompleted();
        const newPatternIds = winResult.newlyCompletedPatterns.map((p) => p.id);
        const lastPattern = winResult.newlyCompletedPatterns[winResult.newlyCompletedPatterns.length - 1];

        const updatedLineCount = linesCompletedCount + winResult.newlyCompletedPatterns.length;
        const updatedScore = score + winResult.newlyCompletedPatterns.length * 500;

        setCompletedPatternIds((prev) => [...prev, ...newPatternIds]);
        setLinesCompletedCount(updatedLineCount);
        setLastCompletedPatternName(lastPattern.name);
        setScore(updatedScore);

        // Highlight winning cells
        winResult.winningCoords.forEach(({ row, col }) => {
          updatedBoard.matrix[row][col].isWinningCell = true;
          updatedBoard.matrix[row][col].state = 'COMPLETED';
        });

        // Broadcast progress to opponent
        if (room && transportRef.current) {
          transportRef.current.send('OPPONENT_PROGRESS', room.id, player.id, {
            linesCompleted: updatedLineCount,
            score: updatedScore,
          });
        }

        setTimeout(() => setLastCompletedPatternName(undefined), 2500);
      }

      setBoard(updatedBoard);
    },
    [board, isGameActive, drawnNumbers, completedPatternIds, linesCompletedCount, score, room, player.id]
  );

  // 6. Claim Bingo
  const claimBingo = useCallback(() => {
    if (!board || !isGameActive || !room || !transportRef.current) return;

    if (linesCompletedCount === 0) {
      SoundEngine.playError();
      setClaimFeedback({
        success: false,
        message: 'No completed lines to claim yet!',
      });
      setTimeout(() => setClaimFeedback(null), 2000);
      return;
    }

    // Send claim request to authoritative server
    transportRef.current.send('CLAIM_BINGO_REQUEST', room.id, player.id, {
      playerId: player.id,
      boardId: board.id,
      patternId: completedPatternIds[0],
      claimTimestamp: Date.now(),
    });
  }, [board, isGameActive, room, player.id, linesCompletedCount, completedPatternIds]);

  // 7. Request Rematch
  const requestRematch = useCallback(() => {
    if (!room || !transportRef.current) return;
    transportRef.current.send('REMATCH_REQUEST', room.id, player.id, {});
  }, [room, player.id]);

  // 8. Leave Room
  const leaveRoom = useCallback(() => {
    if (serverRef.current) {
      serverRef.current.destroy();
      serverRef.current = null;
    }
    if (transportRef.current) {
      transportRef.current.close();
      transportRef.current = null;
    }
    setRoom(null);
    setPlayers([]);
    setBoard(null);
    setIsGameActive(false);
    stateMachineRef.current.reset('IDLE');
    onNavigateToScreen('TAB_NAV');
  }, [onNavigateToScreen]);

  return {
    room,
    players,
    board,
    drawnNumbers,
    score,
    linesCompletedCount,
    lastCompletedPatternName,
    isGameActive,
    isPaused,
    countdownSeconds,
    winner,
    claimFeedback,
    joinError,
    matchDuration,
    opponentLines,
    opponentName,
    isHost,
    canStart,
    createRoom,
    joinRoom,
    toggleReady,
    startMatch,
    daubCell,
    claimBingo,
    requestRematch,
    leaveRoom,
    togglePause: () => setIsPaused((prev) => !prev),
  };
}
