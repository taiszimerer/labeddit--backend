-- Active: 1673874119312@@127.0.0.1@3306
 CREATE TABLE 
users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL, 
    role TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO users (id, name, email, password, role)
VALUES
	("nick01","tais01", "tais@email.com", "tais123", "role"),
	("nick02","labaluno13", "joao@email.com", "joao123", "role"),
	("nick03","labaluno55", "lucas@email.com", "lucas123","role");

DROP TABLE users;

CREATE TABLE 
posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL REFERENCES users (id),
    content TEXT NOT NULL,
    likes INTEGER NOT NULL, 
    dislikes INTEGER NOT NULL, 
    comments INTEGER NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

INSERT INTO posts (id, creator_id, content, likes, dislikes, comments)
VALUES
	("p001", "nick01", "Se voce pudesse ter apenas um animal no mundo, qual seria?", 0, 1),
	("p002", "nick02", "Porque algumas empresas não dão oportunidades para os juninhos?", 1, 1),
	("p003", "nick02", "Porque algumas pessoas preferem celulares sansung do que Apple?", 0, 0);

DROP TABLE posts;

CREATE TABLE 
posts_likes_dislikes (
    post_id TEXT NOT NULL REFERENCES posts (id),
    user_id TEXT NOT NULL REFERENCES users (id),
    likes INTEGER NOT NULL REFERENCES posts (likes), 
    dislikes INTEGER NOT NULL REFERENCES posts (dislikes)
);

DROP TABLE posts_likes_dislikes;

CREATE TABLE
comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    post_id TEXT NOT NULL REFERENCES posts (id),
    creator_id TEXT NOT NULL REFERENCES users (id),
    content TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

SELECT * FROM comments;

DROP TABLE comments;
SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM posts_likes_dislikes;