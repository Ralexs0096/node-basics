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
