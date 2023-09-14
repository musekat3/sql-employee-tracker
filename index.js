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

          case 'View all titles':
                viewAllTitles();
            break; 

          case 'View all employees':
                viewAllEmployees();
            break;
    
          case 'Add a department':
              addDepartment();
              break;

           case 'Add a title':
              addTitle();
              break;

           case 'Add an employee':
              addEmployee();
              break;

           case 'Update an employee title':
              updateEmployeeRole();
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

  function addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "Enter the employee's first name:"
        },
        {
          type: 'input',
          name: 'lastName',
          message: "Enter the employee's last name:"
        },
      ])
      .then((answers) => {
        connection.query(
          'INSERT INTO employees (first_name, last_name) VALUES (?, ?)',
          [answers.firstName, answers.lastName],
          (err, res) => {
            if (err) throw err;
            console.log('Employee added successfully!');
            mainMenu();
          }
        );
      });
  }

  function addTitle() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the role title:'
        },
      ])
      .then((answers) => {
        connection.query(
          'INSERT INTO roles (title) VALUES (?)',
          [answers.title],
          (err, res) => {
            if (err) throw err;
            console.log('Role added successfully!');
            mainMenu();
          }
        );
      });
  }

  function addDepartment() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Enter the department name:'
        }
      ])
      .then((answers) => {
        connection.query(
          'INSERT INTO departments (name) VALUES (?)',
          [answers.name],
          (err, res) => {
            if (err) throw err;
            console.log('Department added successfully!');
            mainMenu();
          }
        );
      });
  }
