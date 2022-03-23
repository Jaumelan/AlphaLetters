CREATE SCHEMA IF NOT EXISTS game;

CREATE TABLE IF NOT EXISTS game.players(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
    name VARCHAR(20),
    avatar_id VARCHAR(25),
    game_date DATE DEFAULT CURRENT_DATE,
    score INTEGER NOT NULL
);