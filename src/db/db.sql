-- Matches the live Neon schema (public schema).
-- events.id is GENERATED ALWAYS AS IDENTITY — never supply it on INSERT.

CREATE TABLE IF NOT EXISTS events(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT,
    event_date DATE NOT NULL,
    description TEXT,
    form_link TEXT
);

CREATE TABLE IF NOT EXISTS forms(
    name VARCHAR PRIMARY KEY,
    google_sheet_id TEXT,
    created_at DATE DEFAULT NOW(),
    description TEXT,
    status TEXT DEFAULT 'OPEN' CHECK (status IN ('OPEN', 'CLOSED')),
    -- optional link: at most one form per event; managed from the admin Events page
    event_id INT REFERENCES events(id)
);

CREATE TABLE IF NOT EXISTS form_inputs(
    id SERIAL PRIMARY KEY,
    form_name VARCHAR(100) REFERENCES forms(name),
    type VARCHAR(100),
    question TEXT
);

CREATE TABLE IF NOT EXISTS form_input_options(
    form_input_id INT REFERENCES form_inputs(id),
    option VARCHAR(100),
    PRIMARY KEY(form_input_id, option)
);

CREATE TABLE IF NOT EXISTS members(
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100) NOT NULL,
    division VARCHAR(50) NOT NULL,
    PRIMARY KEY (name, role)
);
