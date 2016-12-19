--Database Name: Weekend4_toDoList
--Table Names: task, people, people_task

CREATE TABLE task (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
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
