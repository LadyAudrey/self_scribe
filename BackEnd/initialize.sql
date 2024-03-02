-- add an active/ on hold status
CREATE TABLE lists (
id serial PRIMARY KEY,
name VARCHAR ( 20 ) UNIQUE NOT NULL,
user_name VARCHAR ( 20 ) UNIQUE NOT NULL,
created_on TIMESTAMP NOT NULL,
last_updated VARCHAR ( 200 ) NOT NULL
);

CREATE TABLE tasks (
id serial PRIMARY KEY,
name VARCHAR ( 20 ) UNIQUE NOT NULL,
CONSTRAINT tasks_id
FOREIGN KEY(id)
REFERENCES lists(id),
created_on TIMESTAMP NOT NULL,
description VARCHAR ( 300 ) NOT NULL,
category VARCHAR (300) NOT NULL
);

CREATE TABLE tracking (
id serial PRIMARY KEY,
CONSTRAINT task_id
FOREIGN KEY(id)
REFERENCES tasks(id),
reported_on TIMESTAMP NOT NULL,
history VARCHAR [] NOT NULL
);



CREATE TABLE symptoms (
id serial PRIMARY KEY,
sympt_name VARCHAR ( 20 ) UNIQUE NOT NULL,
created_on TIMESTAMP NOT NULL,
description VARCHAR ( 200 ) NOT NULL
);


CREATE TABLE occurances (
id serial PRIMARY KEY,
CONSTRAINT symptom_id
FOREIGN KEY(id)
REFERENCES symptoms(id),
reported_on TIMESTAMP NOT NULL,
report_end TIMESTAMP,
severity INT NOT NULL
);

--  to access postgres terminal "sudo -u evergreen  psql -d self_scribe"