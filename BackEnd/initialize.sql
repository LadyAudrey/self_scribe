-- TODO: add a "user" column to all tables

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
completed BOOLEAN DEFAULT FALSE,
repeats BOOLEAN DEFAULT FALSE
);

-- _________ refactored to here

CREATE TABLE tracking (
id SERIAL PRIMARY KEY,
CONSTRAINT task_id
FOREIGN KEY(id)
REFERENCES tasks(id),
reported_on TIMESTAMP NOT NULL,
history VARCHAR [] NOT NULL
);



CREATE TABLE symptoms (
id SERIAL PRIMARY KEY,
sympt_name VARCHAR ( 20 ) UNIQUE NOT NULL,
created_on TIMESTAMP NOT NULL,
description VARCHAR ( 200 ) NOT NULL
);


CREATE TABLE occurances (
id SERIAL PRIMARY KEY,
CONSTRAINT symptom_id
FOREIGN KEY(id)
REFERENCES symptoms(id),
reported_on TIMESTAMP NOT NULL,
report_end TIMESTAMP,
severity INT NOT NULL
);

--  to access postgres terminal "sudo -u evergreen  psql -d self_scribe"