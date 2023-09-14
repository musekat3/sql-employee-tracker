const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'employee_tracker'
  });

  function viewAllDepartments() {
    connection.query('SELECT * FROM departments', (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  function viewAllTitles() {
    connection.query('SELECT * FROM titles', (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  function viewAllEmployees() {
    connection.query('SELECT * FROM employees', (err, res) => {
      if (err) throw err;
      console.table(res);
    });
  }

  function mainMenu() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all titles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee title',
            'Quit'
          ]
        }
      ])
      .then((answers) => {
        switch (answers.action) {
          case 'View all departments':
            viewAllDepartments();
            break;
          default:
            connection.end();
        }
      });
  }

  connection.connect((err) => {
    if (err) throw err;
    mainMenu();
  });