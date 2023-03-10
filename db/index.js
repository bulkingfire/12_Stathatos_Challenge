const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    return this.connection.promise().query(`
        SELECT e.id, e.first_name, e.last_name, r.title, d.tr_name AS department, r.salary, CONCAT(m.first_name, ' ' , m.last_name) AS manager 
        FROM employee e 
        LEFT JOIN role r ON r.id = e.role_id 
        LEFT JOIN department d ON r.department_id = d.id 
        LEFT JOIN employee m ON m.id = e.manager_id;`);
  }

  findAllDepartments() {
    return this.connection.promise().query(`
        SELECT d.id, d.tr_name AS department
        FROM department d;
        `);
  }

  findAllRoles() {
    return this.connection.promise().query(`
        SELECT r.title, r.id, d.tr_name AS department, r.salary
        FROM role r
        LEFT JOIN department d ON r.department_id = d.id;
        `);
  }

  createDepartment(department) {
    return this.connection.promise().query(
      `
        INSERT INTO department (tr_name) VALUES (?); 
        `,
      department
    );
  }

  createRole(role) {
    return this.connection.promise().query(
      `
        INSERT INTO role SET ?;
        `,
      role
    );
  }

  createEmployee(firstName, lastName, roleId, managerId) {
    let role_id = roleId;

    let manager_id = managerId;
    const parameter = [firstName, lastName, role_id, manager_id];
    const sql = `
        INSERT INTO employee 
        (first_name, last_name, role_id, manager_id)
        VALUES (?,?,?,?);
        `;
    return this.connection.promise().query(sql, parameter);
  }

  updateEmployee(role) {
    return this.connection.promise().query(
      `
            INSERT INTO role SET ?;
         `,
      role
    );
  }
}

module.exports = new DB(connection);
