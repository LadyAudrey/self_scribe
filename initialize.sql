CREATE TABLE IF NOT EXISTS users(
    id SERIAL PRIMARY KEY,
    email VARCHAR (256) NOT NULL,
    name VARCHAR (256),
);

CREATE UNIQUE INDEX IF NOT EXISTS "email_unique_index" ON "users" USING btree (lower("email"));

-- add an active/ on hold status
CREATE TABLE lists (
id SERIAL PRIMARY KEY,
name VARCHAR ( 50 ) NOT NULL,
user_name VARCHAR ( 20 ) NOT NULL,
description TEXT,
created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
completed BOOLEAN DEFAULT FALSE,
repeats BOOLEAN DEFAULT FALSE
);

CREATE TABLE tasks (
id SERIAL PRIMARY KEY,
list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE,
name VARCHAR ( 50 ) NOT NULL,
created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
description TEXT,
category VARCHAR (50),
-- TODO delete
completed BOOLEAN DEFAULT FALSE,
repeats BOOLEAN DEFAULT FALSE,
frequency VARCHAR (25),
last_occurrence TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE task_history (
id SERIAL PRIMARY KEY,
task_id INTEGER REFERENCES tasks(id) ON DELETE CASCADE,
created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
completed BOOLEAN DEFAULT FALSE,
notes TEXT
);



CREATE TABLE symptoms (
id SERIAL PRIMARY KEY,
user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
name VARCHAR ( 200 ) UNIQUE NOT NULL,
created_on TIMESTAMP NOT NULL DEFAULT NOW(),
description TEXT,
category VARCHAR ( 200 )
);

-- _________ refactored to here

CREATE TABLE symptoms_history (
id SERIAL PRIMARY KEY,
symptom_id INTEGER NOT NULL REFERENCES symptoms(id) ON DELETE CASCADE,
created_on TIMESTAMP NOT NULL DEFAULT NOW(),
intensity INT NOT NULL,
description TEXT
);

--  to access postgres terminal "sudo -u evergreen psql -d self_scribe"