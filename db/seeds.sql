INSERT INTO departments
(name)
VALUES
('Custodial');


INSERT INTO roles
(title, salary, department)
VALUES
('janitor', 30000.00, 1);


INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Bud', 'Smith', 1, NULL);