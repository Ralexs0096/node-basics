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
