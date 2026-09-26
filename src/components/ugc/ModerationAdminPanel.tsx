import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../../design/tokens';
import { useTheme } from '../../design/theme';
import { UgcReport } from '../../domain/types';
import { globalModerationService } from '../../domain/services/moderationService';
import { WarningIcon, CheckIcon, CloseIcon } from '../icons/CustomIcons';

interface ModerationAdminPanelProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * ModerationAdminPanel
 * 24-Hour Moderation SLA & Queue Auditor.
 * Allows app reviewers and moderators to audit active reports,
 * view countdown timers, enforce content removals, and suspend/ban offending accounts.
 */
export const ModerationAdminPanel: React.FC<ModerationAdminPanelProps> = ({
  visible,
  onClose,
}) => {
  const { theme } = useTheme();
  const [reports, setReports] = useState<UgcReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [actingReportId, setActingReportId] = useState<string | null>(null);

  const loadQueue = async () => {
    setLoading(true);
    try {
      const queue = await globalModerationService.getModerationQueue();
      setReports(queue);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible) {
      loadQueue();
    }
  }, [visible]);

  if (!visible) return null;

  const formatSlaRemaining = (deadline: number) => {
    const diff = deadline - Date.now();
    if (diff <= 0) {
      return { text: 'OVERDUE (24h SLA Breached)', isOverdue: true };
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { text: `${hours}h ${mins}m remaining`, isOverdue: false };
  };

  const handleAction = async (
    reportId: string,
    action: 'REMOVE_CONTENT' | 'SUSPEND_USER' | 'EJECT_USER' | 'DISMISS'
  ) => {
    setActingReportId(reportId);
    try {
      await globalModerationService.resolveReport(reportId, 'admin-mod-1', action);
      await loadQueue();
    } finally {
      setActingReportId(null);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.panelCard,
                {
                  backgroundColor: theme.bgCard,
                  borderColor: theme.borderSubtle,
                },
              ]}
            >
              {/* Top Header */}
              <View style={styles.headerRow}>
                <View
                  style={[
                    styles.iconBox,
                    { backgroundColor: 'rgba(255, 122, 0, 0.15)' },
                  ]}
                >
                  <WarningIcon size={20} color={COLORS.primaryOrange} />
                </View>
                <View style={styles.headerMeta}>
                  <Text style={[styles.panelTitle, { color: theme.textPrimary }]}>
                    Moderation Queue & 24h SLA Inspector
                  </Text>
                  <Text style={[styles.panelSub, { color: theme.textSecondary }]}>
                    Active Reports: {reports.length}
                  </Text>
                </View>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <CloseIcon size={18} color={theme.textPrimary} />
                </TouchableOpacity>
              </View>

              {/* Reports List */}
              {loading ? (
                <View style={styles.loadingBox}>
                  <ActivityIndicator size="large" color={COLORS.primaryOrange} />
                  <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
                    Loading report queue...
                  </Text>
                </View>
              ) : reports.length === 0 ? (
                <View style={styles.emptyBox}>
                  <CheckIcon size={32} color={COLORS.gentleOlive} />
                  <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
                    Moderation Queue Clean
                  </Text>
                  <Text style={[styles.emptySub, { color: theme.textSecondary }]}>
                    All reported content has been processed within the 24-hour SLA.
                  </Text>
                </View>
              ) : (
                <ScrollView style={styles.reportList} showsVerticalScrollIndicator>
                  {reports.map((report) => {
                    const sla = formatSlaRemaining(report.slaDeadline);
                    const isBusy = actingReportId === report.id;
                    const isResolved = report.status === 'RESOLVED' || report.status === 'DISMISSED';

                    return (
                      <View
                        key={report.id}
                        style={[
                          styles.reportCard,
                          {
                            backgroundColor: theme.bgRecessed,
                            borderColor: sla.isOverdue ? COLORS.dangerRed : theme.borderSubtle,
                          },
                        ]}
                      >
                        {/* SLA Banner */}
                        <View
                          style={[
                            styles.slaPill,
                            {
                              backgroundColor: isResolved
                                ? 'rgba(184, 198, 101, 0.2)'
                                : sla.isOverdue
                                ? 'rgba(239, 68, 68, 0.2)'
                                : 'rgba(255, 122, 0, 0.15)',
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.slaPillText,
                              {
                                color: isResolved
                                  ? COLORS.lunarShadow
                                  : sla.isOverdue
                                  ? COLORS.dangerRed
                                  : COLORS.primaryOrange,
                              },
                            ]}
                          >
                            {isResolved ? `STATUS: ${report.status}` : `SLA: ${sla.text}`}
                          </Text>
                        </View>

                        {/* Report Details */}
                        <Text style={[styles.reportMeta, { color: theme.textMuted }]}>
                          Report ID: {report.id} • Category: {report.category}
                        </Text>

                        {report.contentSnapshot && (
                          <View style={[styles.snapshotBox, { borderColor: theme.borderSubtle }]}>
                            <Text style={[styles.snapshotLabel, { color: theme.textMuted }]}>
                              FLAGGED CONTENT:
                            </Text>
                            <Text style={[styles.snapshotText, { color: theme.textPrimary }]}>
                              "{report.contentSnapshot}"
                            </Text>
                          </View>
                        )}

                        <Text style={[styles.userText, { color: theme.textSecondary }]}>
                          Offending Author ID: {report.reportedUserId}
                        </Text>

                        {/* Actions */}
                        {!isResolved && (
                          <View style={styles.actionGrid}>
                            {isBusy ? (
                              <ActivityIndicator size="small" color={COLORS.primaryOrange} />
                            ) : (
                              <>
                                <TouchableOpacity
                                  style={[styles.actionBtn, { backgroundColor: COLORS.dangerRed }]}
                                  onPress={() => handleAction(report.id, 'REMOVE_CONTENT')}
                                >
                                  <Text style={styles.actionBtnText}>Remove Content</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={[styles.actionBtn, { backgroundColor: '#D97706' }]}
                                  onPress={() => handleAction(report.id, 'SUSPEND_USER')}
                                >
                                  <Text style={styles.actionBtnText}>Suspend (24h)</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={[styles.actionBtn, { backgroundColor: '#7C2D12' }]}
                                  onPress={() => handleAction(report.id, 'EJECT_USER')}
                                >
                                  <Text style={styles.actionBtnText}>Eject/Ban</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={[styles.actionBtn, { backgroundColor: theme.bgCard, borderWidth: 1, borderColor: theme.borderSubtle }]}
                                  onPress={() => handleAction(report.id, 'DISMISS')}
                                >
                                  <Text style={[styles.actionBtnText, { color: theme.textPrimary }]}>Dismiss</Text>
                                </TouchableOpacity>
                              </>
                            )}
                          </View>
                        )}
                      </View>
                    );
                  })}
                </ScrollView>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.md,
  },
  panelCard: {
    width: '100%',
    maxWidth: 480,
    maxHeight: '88%',
    borderRadius: RADIUS.surface,
    borderWidth: 1.5,
    padding: SPACING.lg,
    elevation: 12,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
    marginBottom: SPACING.md,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerMeta: {
    flex: 1,
  },
  panelTitle: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  panelSub: {
    fontSize: 12,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  closeBtn: {
    padding: 6,
  },
  loadingBox: {
    padding: SPACING.xl,
    alignItems: 'center',
    gap: 12,
  },
  loadingText: {
    fontSize: 13,
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  emptyBox: {
    padding: SPACING.xl,
    alignItems: 'center',
    gap: 8,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  emptySub: {
    fontSize: 12,
    textAlign: 'center',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  reportList: {
    maxHeight: 400,
  },
  reportCard: {
    borderRadius: RADIUS.card,
    borderWidth: 1,
    padding: SPACING.md,
    marginBottom: SPACING.md,
  },
  slaPill: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: RADIUS.pill,
    marginBottom: 6,
  },
  slaPillText: {
    fontSize: 11,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.monoFamily,
  },
  reportMeta: {
    fontSize: 11,
    fontWeight: '700',
    fontFamily: TYPOGRAPHY.monoFamily,
    marginBottom: 6,
  },
  snapshotBox: {
    borderLeftWidth: 3,
    paddingLeft: 8,
    marginVertical: 6,
  },
  snapshotLabel: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  snapshotText: {
    fontSize: 13,
    fontStyle: 'italic',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
  userText: {
    fontSize: 11,
    fontFamily: TYPOGRAPHY.monoFamily,
    marginBottom: SPACING.sm,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  actionBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: RADIUS.control,
  },
  actionBtnText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: TYPOGRAPHY.fontFamily,
  },
});
