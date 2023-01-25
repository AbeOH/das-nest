DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS rest_codes;
DROP TABLE IF EXISTS friendships;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS users_groups;
DROP TABLE IF EXISTS posts;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  imageurl VARCHAR(255),
  bio VARCHAR(255),
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rest_codes (
  id SERIAL PRIMARY KEY, 
  email VARCHAR(255) NOT NULL,
  code VARCHAR(255) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE friendships (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES users(id),
  receiver_id INTEGER NOT NULL REFERENCES users(id),
  accepted BOOLEAN DEFAULT FALSE,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL REFERENCES users(id),
  message TEXT NOT NULL CHECK (message <> ''),
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  group_name VARCHAR(255) NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users_groups (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  group_id INTEGER NOT NULL REFERENCES groups(id),
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id),
  -- group_id INTEGER NOT NULL REFERENCES groups(id), 
  content TEXT NOT NULL CHECK (content <> ''),
  post_date DATE NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


