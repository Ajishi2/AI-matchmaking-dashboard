
INSERT INTO participants (name, email, status, match_score) VALUES
  ('Yeon He Eun', 'yeon.he.eun@example.com', 'identified', 95),
  ('Yoon Ji Soo', 'yoon.ji.soo@example.com', 'identified', 92),
  ('Kang Seo Youn', 'kang.seo.youn@example.com', 'active', 88),
  ('Cho Do Yeon', 'cho.do.yeon@example.com', 'active', 85),
  ('Jo Seo Yeon', 'jo.seo.yeon@example.com', 'identified', 82),
  ('Choi Seo Youn', 'choi.seo.youn@example.com', 'active', 79),
  ('Kang Min Jeon', 'kang.min.jeon@example.com', 'active', 76),
  ('Lim Seo Youn', 'lim.seo.youn@example.com', 'identified', 73),
  ('Jeong Do Youn', 'jeong.do.youn@example.com', 'active', 70),
  ('Lim Si Woo', 'lim.si.woo@example.com', 'active', 67),
  ('Park Min Seo', 'park.min.seo@example.com', 'identified', 64),
  ('Kim Hye Jin', 'kim.hye.jin@example.com', 'active', 61),
  ('Lee Sang Woo', 'lee.sang.woo@example.com', 'identified', 58),
  ('Jung Eun Hye', 'jung.eun.hye@example.com', 'active', 55),
  ('Han Min Jae', 'han.min.jae@example.com', 'active', 52);

-- Insert additional participants to reach 150 total
DO $$
DECLARE
  i INTEGER;
  participant_names TEXT[] := ARRAY[
    'Kim Soo Min', 'Lee Hae Won', 'Park Jae Sung', 'Choi Min Ho', 'Jung Ye Jin',
    'Kang Hye Rin', 'Yoon Dong Hyun', 'Lim Seo Joon', 'Han Ye Seul', 'Jang Min Woo',
    'Oh Soo Jin', 'Shin Jae Hyun', 'Moon Hye Young', 'Kwon Min Sik', 'Bae Soo Yeon',
    'Seo Min Jun', 'Na Hye Won', 'Go Jae Min', 'Ahn Soo Bin', 'Noh Min Kyung'
  ];
BEGIN
  FOR i IN 16..150 LOOP
    INSERT INTO participants (name, email, status, match_score) VALUES
    (
      participant_names[((i - 16) % 20) + 1] || ' ' || i::text,
      'participant' || i::text || '@example.com',
      CASE 
        WHEN i % 3 = 0 THEN 'identified'
        WHEN i % 5 = 0 THEN 'inactive'
        ELSE 'active'
      END,
      (RANDOM() * 100)::integer
    );
  END LOOP;
END $$;

-- Insert sample meetings
INSERT INTO meetings (participant_ids, participant_name, status, scheduled_at, duration_minutes) VALUES
  ('{"11111111-1111-1111-1111-111111111111"}', 'Choi Seo Youn', 'scheduled', now() + interval '1 hour', 30),
  ('{"22222222-2222-2222-2222-222222222222"}', 'Kang Min Jeon', 'scheduled', now() + interval '2 hours', 45),
  ('{"33333333-3333-3333-3333-333333333333"}', 'Lim Seo Youn', 'scheduled', now() + interval '3 hours', 30),
  ('{"44444444-4444-4444-4444-444444444444"}', 'Jeong Do Youn', 'scheduled', now() + interval '4 hours', 60),
  ('{"55555555-5555-5555-5555-555555555555"}', 'Lim Si Woo', 'scheduled', now() + interval '5 hours', 30),
  ('{"66666666-6666-6666-6666-666666666666"}', 'Park Min Seo', 'completed', now() - interval '1 hour', 45),
  ('{"77777777-7777-7777-7777-777777777777"}', 'Kim Hye Jin', 'completed', now() - interval '2 hours', 30),
  ('{"88888888-8888-8888-8888-888888888888"}', 'Lee Sang Woo', 'completed', now() - interval '3 hours', 60),
  ('{"99999999-9999-9999-9999-999999999999"}', 'Jung Eun Hye', 'completed', now() - interval '4 hours', 30),
  ('{"aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa"}', 'Han Min Jae', 'completed', now() - interval '5 hours', 45),
  ('{"bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb"}', 'Yeon He Eun', 'completed', now() - interval '1 day', 30),
  ('{"cccccccc-cccc-cccc-cccc-cccccccccccc"}', 'Yoon Ji Soo', 'completed', now() - interval '1 day', 45),
  ('{"dddddddd-dddd-dddd-dddd-dddddddddddd"}', 'Kang Seo Youn', 'completed', now() - interval '1 day', 30),
  ('{"eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee"}', 'Cho Do Yeon', 'completed', now() - interval '1 day', 60),
  ('{"ffffffff-ffff-ffff-ffff-ffffffffffff"}', 'Jo Seo Yeon', 'completed', now() - interval '1 day', 30),
  ('{"12121212-1212-1212-1212-121212121212"}', 'Choi Seo Youn', 'completed', now() - interval '2 days', 45),
  ('{"23232323-2323-2323-2323-232323232323"}', 'Kang Min Jeon', 'completed', now() - interval '2 days', 30),
  ('{"34343434-3434-3434-3434-343434343434"}', 'Lim Seo Youn', 'completed', now() - interval '2 days', 60);

-- Insert sample matches
DO $$
DECLARE
  participant_ids uuid[];
  i INTEGER;
  j INTEGER;
BEGIN
  -- Get all participant IDs
  SELECT ARRAY(SELECT id FROM participants ORDER BY id) INTO participant_ids;
  
  -- Create 160 matches
  FOR i IN 1..160 LOOP
    INSERT INTO matches (participant1_id, participant2_id, satisfaction_score, status) VALUES
    (
      participant_ids[((i - 1) % array_length(participant_ids, 1)) + 1],
      participant_ids[(i % array_length(participant_ids, 1)) + 1],
      (RANDOM() * 40 + 60)::integer, -- Satisfaction between 60-100
      CASE 
        WHEN i % 4 = 0 THEN 'pending'
        WHEN i % 7 = 0 THEN 'rejected'
        ELSE 'accepted'
      END
    );
  END LOOP;
END $$;

-- Insert sample activity logs
DO $$
DECLARE
  participant_ids uuid[];
  i INTEGER;
  log_time TIMESTAMPTZ;
  action_types TEXT[] := ARRAY['login', 'logout', 'meeting', 'match'];
BEGIN
  SELECT ARRAY(SELECT id FROM participants ORDER BY id) INTO participant_ids;
  
  -- Generate activity logs for the past 24 hours
  FOR i IN 1..500 LOOP
    log_time := now() - interval '24 hours' + (interval '24 hours' * RANDOM());
    
    INSERT INTO activity_logs (participant_id, action_type, timestamp, metadata) VALUES
    (
      participant_ids[(RANDOM() * array_length(participant_ids, 1))::integer + 1],
      action_types[CEIL(RANDOM() * array_length(action_types, 1))],
      log_time,
      jsonb_build_object('ip_address', '192.168.1.' || (RANDOM() * 255)::integer)
    );
  END LOOP;
END $$;

-- Insert sample insights
INSERT INTO insights (type, title, description, action_text, icon_color, is_active) VALUES
  (
    'surge',
    'Surge Industry-identified',
    'Match-success-rate between 4 snaps/Refresh-quality',
    'View detailed report →',
    'yellow',
    true
  ),
  (
    'warning',
    'Numerous Uncompleted Profiles',
    '24 participants completing profiles, potentially low quality',
    'Send notification →',
    'yellow',
    true
  ),
  (
    'info',
    'Peak Activity Hours Detected',
    'Highest participant engagement between 13:00-15:00 today',
    'Optimize scheduling →',
    'blue',
    true
  ),
  (
    'success',
    'High Satisfaction Rate',
    'Average match satisfaction increased to 78% this week',
    'View trends →',
    'green',
    true
  );