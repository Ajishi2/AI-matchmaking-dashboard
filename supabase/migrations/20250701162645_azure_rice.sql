
CREATE TABLE IF NOT EXISTS participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  avatar_url text,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'identified')),
  match_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create meetings table
CREATE TABLE IF NOT EXISTS meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_ids text[] NOT NULL,
  participant_name text,
  status text NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  scheduled_at timestamptz NOT NULL,
  duration_minutes integer DEFAULT 30,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create matches table
CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant1_id uuid REFERENCES participants(id) ON DELETE CASCADE,
  participant2_id uuid REFERENCES participants(id) ON DELETE CASCADE,
  satisfaction_score integer NOT NULL DEFAULT 50 CHECK (satisfaction_score >= 0 AND satisfaction_score <= 100),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create activity_logs table
CREATE TABLE IF NOT EXISTS activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_id uuid REFERENCES participants(id) ON DELETE CASCADE,
  action_type text NOT NULL CHECK (action_type IN ('login', 'logout', 'meeting', 'match')),
  timestamp timestamptz DEFAULT now(),
  metadata jsonb DEFAULT '{}'::jsonb
);

-- Create insights table
CREATE TABLE IF NOT EXISTS insights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('surge', 'warning', 'info', 'success')),
  title text NOT NULL,
  description text NOT NULL,
  action_text text NOT NULL,
  icon_color text DEFAULT 'blue',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

-- Create policies for participants
CREATE POLICY "Anyone can read participants"
  ON participants
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert participants"
  ON participants
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update participants"
  ON participants
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for meetings
CREATE POLICY "Anyone can read meetings"
  ON meetings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert meetings"
  ON meetings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update meetings"
  ON meetings
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for matches
CREATE POLICY "Anyone can read matches"
  ON matches
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert matches"
  ON matches
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update matches"
  ON matches
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for activity_logs
CREATE POLICY "Anyone can read activity_logs"
  ON activity_logs
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can insert activity_logs"
  ON activity_logs
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create policies for insights
CREATE POLICY "Anyone can read insights"
  ON insights
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can manage insights"
  ON insights
  FOR ALL
  TO authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_participants_status ON participants(status);
CREATE INDEX IF NOT EXISTS idx_participants_match_score ON participants(match_score DESC);
CREATE INDEX IF NOT EXISTS idx_meetings_status ON meetings(status);
CREATE INDEX IF NOT EXISTS idx_meetings_scheduled_at ON meetings(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_matches_satisfaction_score ON matches(satisfaction_score DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_timestamp ON activity_logs(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_activity_logs_participant_id ON activity_logs(participant_id);
CREATE INDEX IF NOT EXISTS idx_insights_is_active ON insights(is_active);