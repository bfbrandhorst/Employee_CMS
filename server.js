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
            'view all employees',
            'Add role',
            'Add department',
            'Add employee',
        ],
    },
]).then((userAnswers) => {
    let choiceList = userAnswers.action
    switch (choiceList) {
        case 'view all roles':
            viewAllRoles()
            break
        case 'view all departments':
            viewAllDepartments()
            break
        case 'veiw all employees':
            viewAllEmployees()
            break

    }
});


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