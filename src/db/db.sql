CREATE TABLE IF NOT EXISTS forms(
    name VARCHAR(100) PRIMARY KEY,
    google_sheet_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT NOW(),
    description TEXT
);

CREATE TABLE IF NOT EXISTS form_inputs(
    id SERIAL PRIMARY KEY,
    form_name VARCHAR(100) REFERENCES forms(name),
    type VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS form_input_options(
    form_input_id INT REFERENCES form_inputs(id),
    option VARCHAR(100),
    PRIMARY KEY(form_input_id, option)
);