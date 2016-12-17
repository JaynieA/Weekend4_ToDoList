--Database Name: Weekend4_toDoList
--Table Names: task, people, people_task

CREATE TABLE task (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL,
	completed BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE people (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50)
);

CREATE TABLE people_task (
	task_id INT REFERENCES task(id) ON DELETE CASCADE,
	people_id INT REFERENCES people(id) ON DELETE CASCADE
);

--create some data
INSERT INTO people (first_name, last_name) VALUES ('Jaynie', 'Anderson');
INSERT INTO people (first_name, last_name) VALUES ('Brent', 'Anderson');

INSERT INTO task (name, completed) VALUES ('stir soup', FALSE);

INSERT INTO people_task (task_id, people_id) VALUES (1,1);
INSERT INTO people_task (task_id, people_id) VALUES (1,2);

-- many to many join
SELECT people.first_name, people.last_name, task.name AS task_name, task.completed FROM people
JOIN people_task
ON people.id = people_task.people_id
JOIN task
ON people_task.task_id = task.id;
