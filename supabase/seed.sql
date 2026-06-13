-- Research Lab Website - Database Schema
-- Run this in Supabase SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles (syncs with auth.users)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL DEFAULT '',
  role TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', ''), COALESCE(NEW.raw_user_meta_data->>'role', 'editor'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Research (no category)
CREATE TABLE research (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  image_width INTEGER,
  image_height INTEGER,
  image_position TEXT DEFAULT 'center' CHECK (image_position IN ('left', 'center', 'right')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Publications
CREATE TABLE publications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  authors TEXT NOT NULL DEFAULT '',
  journal TEXT,
  year INTEGER NOT NULL DEFAULT EXTRACT(YEAR FROM NOW()),
  doi TEXT,
  abstract TEXT NOT NULL DEFAULT '',
  pdf_url TEXT,
  image_url TEXT,
  image_width INTEGER,
  image_height INTEGER,
  image_position TEXT DEFAULT 'center' CHECK (image_position IN ('left', 'center', 'right')),
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  image_width INTEGER,
  image_height INTEGER,
  image_position TEXT DEFAULT 'center' CHECK (image_position IN ('left', 'center', 'right')),
  author_name TEXT NOT NULL DEFAULT 'Admin',
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team Members
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL DEFAULT '',
  image_url TEXT,
  image_width INTEGER,
  image_height INTEGER,
  image_position TEXT DEFAULT 'center' CHECK (image_position IN ('left', 'center', 'right')),
  email TEXT,
  website TEXT,
  twitter TEXT,
  linkedin TEXT,
  github TEXT,
  scholar TEXT,
  order_index INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'alumni')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Certificates
CREATE TABLE certificates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE NOT NULL,
  expiry_date DATE,
  description TEXT,
  file_url TEXT,
  image_url TEXT,
  image_width INTEGER,
  image_height INTEGER,
  image_position TEXT DEFAULT 'center' CHECK (image_position IN ('left', 'center', 'right')),
  credential_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Media Files
CREATE TABLE media_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'image' CHECK (type IN ('image', 'pdf', 'other')),
  size INTEGER DEFAULT 0,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Homepage Content
CREATE TABLE homepage_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  hero_title TEXT NOT NULL DEFAULT 'Advancing the Frontiers of Intelligence',
  hero_description TEXT NOT NULL DEFAULT 'A multidisciplinary research lab exploring AI, Machine Learning, and beyond.',
  hero_image_url TEXT,
  sections JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_research_status ON research(status);
CREATE INDEX idx_research_featured ON research(featured) WHERE featured = TRUE;
CREATE INDEX idx_publications_status ON publications(status);
CREATE INDEX idx_publications_year ON publications(year DESC);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_team_members_order ON team_members(order_index);
CREATE INDEX idx_team_members_status ON team_members(status);
CREATE INDEX idx_certificates_issue_date ON certificates(issue_date DESC);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE research ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read research" ON research FOR SELECT USING (status = 'published');
CREATE POLICY "Public read publications" ON publications FOR SELECT USING (status = 'published');
CREATE POLICY "Public read blog" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Public read team" ON team_members FOR SELECT USING (TRUE);
CREATE POLICY "Public read certificates" ON certificates FOR SELECT USING (TRUE);
CREATE POLICY "Public read media" ON media_files FOR SELECT USING (TRUE);
CREATE POLICY "Public read homepage" ON homepage_content FOR SELECT USING (TRUE);

-- Admin full access
CREATE POLICY "Admin all research" ON research FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);
CREATE POLICY "Admin all publications" ON publications FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);
CREATE POLICY "Admin all blog" ON blog_posts FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);
CREATE POLICY "Admin all team" ON team_members FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);
CREATE POLICY "Admin all certificates" ON certificates FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);
CREATE POLICY "Admin all media" ON media_files FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);
CREATE POLICY "Admin all homepage" ON homepage_content FOR ALL USING (
  auth.uid() IN (SELECT id FROM profiles WHERE role = 'admin')
);

-- Seed Data
INSERT INTO research (title, slug, summary, content, status, featured) VALUES
('Deep Reinforcement Learning for Autonomous Navigation', 'drl-autonomous-navigation', 'A novel approach to autonomous navigation using deep reinforcement learning in complex environments.', '<p>This research explores how deep reinforcement learning can be applied to autonomous navigation in complex, dynamic environments. We propose a new architecture that combines convolutional neural networks with policy gradient methods to enable real-time decision making.</p><p>Our approach achieves state-of-the-art results in simulated environments and shows promising transfer learning capabilities to real-world scenarios.</p>', 'published', TRUE),
('Advances in Natural Language Understanding', 'advances-nlu', 'Breaking new ground in natural language understanding with transformer-based architectures.', '<p>We present significant advances in natural language understanding using novel transformer-based architectures. Our model achieves human-level performance on several benchmark tasks.</p>', 'published', TRUE),
('Soft Robotics for Medical Applications', 'soft-robotics-medical', 'Developing soft robotic systems for minimally invasive surgical procedures.', '<p>This project focuses on the design and control of soft robotic manipulators for use in minimally invasive surgery. The soft nature of these robots allows for safer interaction with human tissue.</p>', 'published', FALSE);

INSERT INTO publications (title, slug, authors, journal, year, abstract, status, featured) VALUES
('Deep Q-Learning in Dynamic Environments', 'deep-q-learning-dynamic', 'John Smith, Sarah Johnson, Michael Chen', 'Nature Machine Intelligence', 2025, 'We present a novel deep Q-learning framework that adapts to dynamic environments through continuous policy refinement. Our method outperforms existing approaches by 23% on standard benchmarks.', 'published', TRUE),
('Transformer-Based Protein Structure Prediction', 'transformer-protein-structure', 'Emily Zhang, David Park', 'Science', 2024, 'A transformer-based architecture for predicting protein structures from amino acid sequences, achieving accuracy comparable to experimental methods.', 'published', TRUE),
('Edge Computing for Real-Time ML Inference', 'edge-computing-ml', 'Alex Kumar, Lisa Wang', 'IEEE TPAMI', 2024, 'Optimizing machine learning inference for edge devices through model compression and hardware-aware architecture design.', 'published', FALSE),
('Human-Robot Collaboration in Manufacturing', 'human-robot-manufacturing', 'Carlos Rodriguez, Anna Schmidt', 'Robotics and Automation Letters', 2025, 'A framework for safe and efficient human-robot collaboration in manufacturing environments using real-time motion planning.', 'published', FALSE);

INSERT INTO blog_posts (title, slug, excerpt, content, author_name, status, featured) VALUES
('Lab Receives $5M Grant for AI Research', 'lab-receives-grant', 'We are excited to announce a $5 million grant from the National Science Foundation to advance AI research.', '<p>We are thrilled to share that our lab has been awarded a $5 million grant from the National Science Foundation (NSF) to support our ongoing research in artificial intelligence and machine learning.</p>', 'Admin', 'published', TRUE),
('New Paper Accepted at NeurIPS 2026', 'neurips-2026-accepted', 'Our latest work on attention mechanisms has been accepted at NeurIPS 2026.', '<p>We are pleased to announce that our paper "Efficient Attention Mechanisms for Long Sequence Modeling" has been accepted at NeurIPS 2026, one of the premier conferences in machine learning.</p>', 'Admin', 'published', FALSE),
('Welcome to Our New Lab Members', 'welcome-new-members', 'Introducing the newest members of our research team.', '<p>We are delighted to welcome three new members to our lab this semester. Their diverse expertise in robotics, computer vision, and natural language processing will greatly enrich our research capabilities.</p>', 'Admin', 'published', FALSE);

INSERT INTO team_members (name, slug, role, bio, email, order_index, status) VALUES
('Dr. John Smith', 'john-smith', 'Principal Investigator', 'Dr. Smith is the director of the lab and a professor of Computer Science. His research focuses on reinforcement learning and autonomous systems.', 'john.smith@university.edu', 0, 'active'),
('Dr. Sarah Johnson', 'sarah-johnson', 'Senior Research Scientist', 'Dr. Johnson specializes in natural language processing and multimodal learning. She leads the NLP research group.', 'sarah.johnson@university.edu', 1, 'active'),
('Michael Chen', 'michael-chen', 'PhD Candidate', 'Michael is a PhD candidate working on deep reinforcement learning for robotics applications.', 'michael.chen@university.edu', 2, 'active'),
('Emily Zhang', 'emily-zhang', 'Postdoctoral Fellow', 'Emily works at the intersection of machine learning and computational biology.', 'emily.zhang@university.edu', 3, 'active'),
('Dr. David Park', 'david-park', 'Research Associate', 'Dr. Park develops novel algorithms for computer vision and medical image analysis.', 'david.park@university.edu', 4, 'active'),
('Alex Kumar', 'alex-kumar', 'Visiting Scholar', 'Alex is a visiting scholar from MIT, working on efficient deep learning systems.', 'alex.kumar@mit.edu', 5, 'alumni');

INSERT INTO certificates (title, issuer, issue_date, description) VALUES
('AWS Certified Machine Learning Specialty', 'Amazon Web Services', '2025-03-15', 'Professional certification validating expertise in ML engineering on AWS.'),
('Google Cloud Professional Data Engineer', 'Google Cloud', '2025-01-20', 'Certification for designing and building data processing systems on GCP.'),
('Deep Learning Specialization', 'deeplearning.ai / Coursera', '2024-11-10', 'Comprehensive specialization covering neural networks, CNNs, RNNs, and transformers.');

INSERT INTO homepage_content (hero_title, hero_description) VALUES
('Advancing the Frontiers of Intelligence', 'A multidisciplinary research lab exploring Artificial Intelligence, Machine Learning, and beyond. Our mission is to push the boundaries of what technology can achieve.');
