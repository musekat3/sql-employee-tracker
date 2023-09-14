   CREATE DATABASE employee_tracker;

   USE employee_tracker;

   CREATE TABLE departments (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(36) NOT NULL
   );

   CREATE TABLE roles (
     id INT AUTO_INCREMENT PRIMARY KEY,
     title VARCHAR(36) NOT NULL,
     salary DECIMAL(10, 2) NOT NULL,
     department_id INT,
     FOREIGN KEY (department_id) REFERENCES departments(id)
   );

   CREATE TABLE employees (
     id INT AUTO_INCREMENT PRIMARY KEY,
     first_name VARCHAR(36) NOT NULL,
     last_name VARCHAR(36) NOT NULL,
     role_id INT,
     manager_id INT,
     FOREIGN KEY (role_id) REFERENCES roles(id),
     FOREIGN KEY (manager_id) REFERENCES employees(id)
   );