CREATE TABLE tbl_fruits (
    id int,
    name varchar(50),
    createdBy varchar(50)
);

SELECT * FROM tbl_fruits

INSERT
	INTO
	tbl_fruits 
	(
	id,
	name,
	createdBy
	)
VALUES 
(1, "banana", "Admin"),
(2, "apple", "Admin"),
(3, "mango", "Admin");


ALTER TABLE tbl_fruits ADD PRIMARY KEY (id);

ALTER TABLE node_db.tbl_fruits MODIFY COLUMN id int auto_increment NULL;




-- Users - Post (assignment)

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);