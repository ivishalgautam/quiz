CREATE DATABASE IF NOT EXISTS quiz;

CREATE
OR REPLACE FUNCTION update_updated_at() RETURNS TRIGGER AS $ $ BEGIN NEW.updated_at = NOW();

RETURN NEW;

END;

$ $ LANGUAGE plpgsql;

CREATE TYPE test_type AS ENUM ('practice', 'competitive');

CREATE TABLE levels(
    id INT PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tests(
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    level INT REFERENCES levels(id) ON DELETE CASCADE NOT NULL,
    test_type test_type DEFAULT 'practice',
    is_disabled BOOLEAN DEFAULT true,
    start_time TIMESTAMP NOT NULL,
    duration TIME NOT NULL,
    instructions TEXT [] NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create a trigger to call the function before update
CREATE TRIGGER trigger_update_updated_at BEFORE
UPDATE
    ON tests FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE questions(
    id SERIAL PRIMARY KEY,
    question INT [] DEFAULT '{}',
    answer INT NOT NULL,
    test_id INT REFERENCES tests(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE students(
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    father_name VARCHAR(100),
    mother_name VARCHAR(100),
    dob DATE NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    address TEXT NOT NULL,
    created_by VARCHAR(20) NOT NULL,
    is_subscribed BOOLEAN DEFAULT false,
    level_id INT REFERENCES levels(id) ON DELETE CASCADE NOT NULL,
    is_disabled BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trigger_update_updated_at BEFORE
UPDATE
    ON students FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE student_credentials(
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    student_id INT REFERENCES students(id) ON DELETE CASCADE NOT NULL,
    is_disabled BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)