INSERT INTO departments (name)
VALUES ('Custodial'),
       ('Customer Service'),
       ('Kennel Staff'),
       ('Specialty V. Technician'),
       ('GP V. Technician'),
       ('Specialty Veterinarian'),
       ('General Practice Veterinarian'),
       ('Hospital Manager');



INSERT INTO roles (title, salary, department)
VALUES ('Janitor', 30000.00, 1),
       ('Receptionist', 35000.00, 2),
       ('Patient Care Coordinator', 38000.00, 2),
       ('Kennel Assistant', 30000.00, 3),
       ('IM Technician', 55000.00, 4),
       ('Onco Technician', 55000.00, 4),
       ('Surgery Tecnician', 55000.00, 4),
       ('GP Technician', 50000.00, 5),
       ('IM Veterinarian', 225000.00, 6),
       ('Onco Veterinarian', 225000.00, 6),
       ('Surgery Veterinarian', 300000.00, 6),
       ('General Practice Veterinarian', 185000.00, 7),
       ('Hospital Manager', 180000.00, 8);



INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bud', 'Smith', 1, NULL),
       ('Jack', 'Levy', 1, NULL),
       ('Kara', 'Johnson', 2, NULL),
       ('Ashley', 'Green', 2, NULL),
       ('Patrick', 'Martinez', 2, NULL),
       ('Kelsey', 'Jacobson', 3, NULL),
       ('Laura', 'Black', 3, NULL),
       ('Terrance', 'Hoff', 4, NULL),
       ('Brittany', 'Brown', 4, NULL),
       ('Shawna', 'Richardson', 4, NULL),
       ('Amy', 'Short', 4, NULL),
       ('Lance', 'Peters', 4, NULL),
       ('Sean', 'Lott', 5, NULL),
       ('Mariah', 'Conley', 5, NULL),
       ('Dean', 'Woodard', 5, NULL),
       ('Diane', 'Bluff', 6, NULL),
       ('Krista', 'Right', 6, NULL),
       ('Phil', 'Wolf', 6, NULL),
       ('Shirley', 'Rust', 7, NULL),
       ('David', 'Schoon', 7, NULL),
       ('Elizabeth', 'Ross', 8, 100),
       ('Tina', 'Ghost', 8, 200);
