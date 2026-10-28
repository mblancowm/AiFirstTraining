CREATE TABLE IF NOT EXISTS learning_groups (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  project_key TEXT,
  created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS group_members (
  id TEXT PRIMARY KEY NOT NULL,
  group_id TEXT NOT NULL REFERENCES learning_groups(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS group_members_group_idx ON group_members(group_id);
CREATE UNIQUE INDEX IF NOT EXISTS group_members_email_per_group_idx ON group_members(group_id, email);
