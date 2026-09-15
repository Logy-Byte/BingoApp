-- Execute this SQL in your Supabase SQL Editor

-- 1. Create the Profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  name TEXT NOT NULL,
  avatar TEXT,
  rating INTEGER DEFAULT 1450,
  tier TEXT DEFAULT 'Bronze',
  coins INTEGER DEFAULT 50000,
  gems INTEGER DEFAULT 1000,
  score INTEGER DEFAULT 0,
  lines_completed INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. Turn on Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS Policies
-- Users can view any profile (for multiplayer display)
CREATE POLICY "Public profiles are viewable by everyone."
  ON profiles FOR SELECT
  USING ( true );

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile."
  ON profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

-- Users can update their own profile
CREATE POLICY "Users can update own profile."
  ON profiles FOR UPDATE
  USING ( auth.uid() = id );

-- 4. Create an Auth Trigger to automatically create a profile when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1), 'Guest Player'),
    'G'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 5. Create the Rooms table for multiplayer matchmaking
CREATE TABLE IF NOT EXISTS rooms (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  privacy TEXT NOT NULL DEFAULT 'open',
  password_hash TEXT,
  host_id TEXT NOT NULL,
  host_name TEXT NOT NULL,
  player_count INTEGER DEFAULT 1,
  max_players INTEGER DEFAULT 2,
  status TEXT DEFAULT 'WAITING',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  ticket_price NUMERIC DEFAULT 2.0,
  jackpot_amount NUMERIC DEFAULT 50000
);

-- 6. Turn on RLS for Rooms
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- 7. Create RLS Policies for Rooms
-- Anyone can view rooms (for lobby listing)
CREATE POLICY "Public rooms are viewable by everyone."
  ON rooms FOR SELECT
  USING ( true );

-- Anyone can insert rooms (allowing local mock users)
CREATE POLICY "Users can create rooms."
  ON rooms FOR INSERT
  WITH CHECK ( true );

-- Hosts can update their own rooms
CREATE POLICY "Hosts can update their own rooms."
  ON rooms FOR UPDATE
  USING ( true );

-- Anyone can update a room's status or player count (when joining)
CREATE POLICY "Users can update room player count."
  ON rooms FOR UPDATE
  USING ( true );

-- Hosts can delete their rooms
CREATE POLICY "Hosts can delete their rooms."
  ON rooms FOR DELETE
  USING ( true );
