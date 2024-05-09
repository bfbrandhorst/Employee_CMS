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
            'Add employee',
            'Update employee role',
        ],
    },
]).then((userAnswers) => {
    let choiceList = userAnswers.action
    switch (choiceList) {
        case 'View all roles':
            viewAllRoles()
            break
        case 'View all departments':
            viewAllDepartments()
            break
        case 'Veiw all employees':
            viewAllEmployees()
            break

    }
});

inquirer.prompt([
    {
        type: 'list',
        message: 'What is the name of the department?',
        name: 'action',
        choices: ['Custodial',
            'Customer Service',
            'Kennel Staff',
            'Specialty V. Technician',
            'GP V. Technician',
            'Specialty Veterinarian',
            'General Practice Veterinarian',
            'Hospital Management',
        ],
    },
    {
        type: 'list',
        message: 'What is the name of the role?',
        name: 'action',
        choices: ['Janitor',
            'Receptionist',
            'Patient Care Coordinator',
            'Kennel Assistant',
            'IM Technician',
            'Onco Technician',
            'Surgery Technician',
            'GP Technician',
            'IM Veterinarian',
            'Onco Veterinarian',
            'Surgery Veterinarian',
            'General Practice Veterinarian',
            'Hospital Manager',
        ],
    },
    {
        type: 'input',
        name: 'Salary',
        message: 'What is the salary of the role?',
    },

    {
        type: 'list',
        message: 'Which department does the role belong to?',
        name: 'action',
        choices: ['Custodial',
            'Customer Service',
            'Kennel Staff',
            'Specialty V. Technician',
            'GP V. Technician',
            'Specialty Veterinarian',
            'General Practice Veterinarian',
            'Hospital Management',
        ],
    },
    {
        type: 'input',
        name: 'Name',
        message: 'What is the first name of the employee?',
    },
    {
        type: 'input',
        name: 'Name',
        message: 'What is the last name of the employee?',
    },
])

function viewAllRoles() {
    pool.query('SELECT r.id AS role_id, r.title AS job_title, r.salary, d.name AS name FROM roles r JOIN departments d ON r.department = d.id;', (err, res) => {
        if (err) {
            console.error(err)

        } else {
            console.table(res.rows)
        }
    })
}

pool.connect();

app.listen(PORT, () => {
    console.log('Hey you did it!');
});