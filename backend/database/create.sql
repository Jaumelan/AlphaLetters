IF NOT EXISTS CREATE SCHEMA alphazendinha;

IF NOT EXISTS CREATE TABLE alphazendinha.users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v1(),
    name VARCHAR(20),
    avatar_id VARCHAR(25)
    create_date TIMESTAMP DEFAULT NOW()
)


IF NOT EXISTS CREATE TABLE alphazendinha.scores(
    score INTEGER NOT NULL,
    player_id UUID,
    game_date CURRENT_DATE,
    FOREIGN KEY (player_id) REFERENCES alphazendinha.users(id),
    create_date TIMESTAMP DEFAULT NOW()
)