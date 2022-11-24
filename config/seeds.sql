INSERT INTO department (id, name)
VALUES (1, "testDept");

INSERT INTO roles (id, salary, title, department_id)
VALUES (2, 50000, "testRole", 5);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "steve", "buscemi", 6, 9);