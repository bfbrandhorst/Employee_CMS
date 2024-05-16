const express = require('express');
const inquirer = require('inquirer');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3001;

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'luvcrews3', // ! Change this to your own password
    database: 'employees_db',
});

function start() {

    inquirer.prompt([
        {
            type: 'list',
            message: 'What would you like to do?',
            name: 'action',
            choices: ['View all roles',
                'View all departments',
                'View all employees',
                'Add role',
                'Add department',
                'Add an employee',
                'Update employee role',
                'Quit',
            ],
        },
    ]).then((userAnswers) => {
        console.log(userAnswers.action)
        let choiceList = userAnswers.action
        switch (choiceList) {
            case 'View all roles':
                viewAllRoles()
                break
            case 'View all departments':
                viewAllDepartments()
                break
            case 'View all employees':
                viewAllEmployees()
                break
            case 'Add role':
                addRole()
                break
            case 'Add department':
                addDepartment()
                break
            case 'Add an employee':
                addEmployee()
                break
            case 'Update employee role':
                updateEmployee()
                break
            case 'Quit':
                quit()
                break
        }
    });
}

function viewAllRoles() {
    pool.query('SELECT r.id AS role_id, r.title AS job_title, r.salary, d.name AS name FROM roles r JOIN departments d ON r.department = d.id;', (err, res) => {
        if (err) {
            console.error(err)

        } else {
            console.table(res.rows), start()
        }
    })
}

function viewAllDepartments() {
    pool.query('SELECT id AS department, name AS department_name FROM departments', function (err, res) {
        if (err) {
            console.error(err)

        } else {
            console.table(res.rows), start()
        }
    })
}

function viewAllEmployees() {

    pool.query('SELECT e.id AS employee_id, e.first_name, e.last_name, r.title AS job_title, d.name AS department, r.salary, (m.first_name || \' \' || m.last_name) AS manager_name FROM employee e JOIN roles r ON e.role_id = r.id JOIN departments d ON r.department = d.id LEFT JOIN employee m ON e.manager_id = m.id;', function (err, res) {
        if (err) {
            console.error(err)

        } else {
            console.table(res.rows), start()
        }// Your callback function here
    });
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What department would you like to add?'
        }
    ]).then((response) => {
        let departmentName = response.addDepartment
        pool.query('INSERT INTO departments (name) VALUES (?)', [departmentName], function (err, res) {
            console.log('where')
            if (err) {
                console.error(err)

            } else {
                viewAllDepartments(), start()
            }
        })
    })
}

function addRole() {
    pool.query('SELECT * FROM departments', function (err, result) {
        if (err) {
            console.error(err)
        }
        const departmentList = result.rows.map((dept) => ({
            value: dept.id,
            name: dept.name,
        }))
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'How much are they making?',
            },
            {
                type: 'list',
                message: 'Which department does this role belong in?',
                name: 'departmentName',
                choices: departmentList

            },

        ]).then((response) => {
            let roleTitle = response.title
            let roleSalary = response.salary
            let department = response.departmentName
            pool.query('INSERT INTO roles (title, salary, department) VALUES ($1,$2,$3) ', [roleTitle, roleSalary, department], function (err, res) {
                if (err) {
                    console.error(err)

                } else {
                    viewAllRoles(); start()
                }
            })
        })
    })
}

function addEmployee() {
    pool.query('SELECT * FROM roles', function (err, result) {
        if (err) {
            console.error(err)
        }
        const rolesList = result.rows.map((roles) => ({
            value: roles.id,
            name: roles.title,
        }))
        inquirer.prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'What is the first name of the new employee?'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'What is the last name of the new employee?'
            },
            {
                type: 'list',
                name: 'role_id',
                message: 'What is the role for this employee?',
                choices: rolesList
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'If  a manager, enter ID:',
            },

        ]).then((response) => {
            let firstName = response.first_name
            let lastName = response.last_name
            let roleID = response.role_id
            let managerID = response.manager_id
            pool.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1,$2,$3,$4)', [firstName, lastName, roleID, managerID], function (err, res) {
                if (err) {
                    console.error(err)

                } else {
                    viewAllEmployees(); start()
                }
            })
        })
    })
}

function updateEmployee() {
    pool.query('SELECT * FROM employee', function (err, result) {
        if (err) {
            console.error(err)
        }
        const employeeList = result.rows.map((employee) => ({
            value: employee.id,
            name: `${employee.first_name} ${employee.last_name}`,
        }))

        pool.query('SELECT * FROM roles', function (err, result) {
            if (err) {
                console.error(err)
            }
            const roleList = result.rows.map((role) => ({
                value: role.id,
                name: role.title

            }))

            inquirer.prompt([
                {
                    type: 'list',
                    name: 'employee',
                    message: 'Which employee would you like to update?',
                    choices: employeeList
                },
                {
                    type: 'list',
                    name: 'role',
                    message: 'What role are they moving into?',
                    choices: roleList
                },
            ]).then((response) => {
                let { employee, role } = response

                pool.query('UPDATE employee SET role_id = $1 WHERE id = $2', [role, employee], function (err, result) {
                    if (err) {
                        console.error(err)
                    } else {
                        viewAllEmployees(); start()

                    }
                })
            })
        })
    })
}

function quit() {
    console.log('Bye')
    process.exit()
}
pool.connect();
start()
app.listen(PORT, () => {
    console.log('Hey, you did it!');
});