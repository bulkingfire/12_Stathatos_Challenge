const inquirer_1 = require("inquirer");
const { findAllDepartments } = require("./db");
const db = require("./db");
require("console.table");

function Menu() {
  inquirer_1
    .prompt([
      {
        type: "list",
        message: "Make a Selection.",
        name: "selection",
        choices: [
          "View All Employees",
          "Add Employee",
          "Update Employee",
          "View Departments",
          "Add Department",
          "Find all Roles",
          "Add Role",
          "Quit application",
        ],
      },
    ])


    .then(({ selection }) => {
      switch (selection) {
        case "View All Employees":
          Employ();
          break;

        case "Add Employee":
          addNewEmployee();
          break;

        case "Update Employee":
          updateEmployee();
          break;

        case "View Departments":
          depart();
          break;

        case "Add Department":
          adddepart();
          break;

        case "Find all Roles":
          roles();
          
          break;

        case "Add Role":
          addRole();
          break;

        case "Quit application":
          quit();
          break;
      }
    });
}

function Employ() {
  db.findAllEmployees().then(([rows]) => {
    let employees = rows;
    console.table(employees);
    Menu();
  });
}

function roles() {
  db.findAllRoles().then(([rows]) => {
    let roles = rows;
    console.table(roles);
    Menu();
  });
}

function depart() {
  db.findAllDepartments().then(([rows]) => {
    let department = rows;
    console.table(department);
    Menu();
  });
}

function adddepart() {
  inquirer_1
    .prompt([
      {
        type: "input",
        name: "tr_name",
        message: "Which departament would you like to choose?",
      },
    ])
    .then((res) => {
      let name = res;
      db.createDepartment(name)
        .then(() => console.log(`Added ${name.tr_name} to the database`))
        .then(() => Menu());
    });
}

function addRole() {
  
  db.findAllDepartments().then(([rows]) => {
    
    let departments = rows;
    
    var departmentsArr = departments.map(({ id, department }) => ({
      name: department,
      value: id,
    }));

    inquirer_1
      .prompt([
        {
          type: "input",
          name: "title",
          message: "Which role  would you like?",
        },
        {
          type: "input",
          name: "salary",
          message: "What is the role's salary",
        },
        {
          type: "list",
          name: "department_id",
          message: "What department the role belongs to",
          choices: departmentsArr,
        },
      ])
      .then((res) => {
        let role = res;
        db.createRole(role)
          .then(() => console.log(`Added ${role.title} to the database`))
          .then(() => Menu());
      });
  });
}

async function addNewEmployee() {
  

  const res = await inquirer_1.prompt([
    {
      type: "input",
      name: "first_name",
      message: "Whats is the employess's first name?",
    },
    {
      type: "input",
      name: "last_name",
      message: "Whats is the employess's last name?",
    },
  ]);
  let firstName = res.first_name;
  let lastName = res.last_name;
  const [rows] = await db.findAllRoles();
  let roles = rows;
  var rolesArr = roles.map(({ id, title }) => ({
    name: title,
    value: id,
  }));

  const { roleId } = await inquirer_1.prompt([
    {
      type: "list",
      name: "roleId",
      message: "what is the employee's role",
      choices: rolesArr,
    },
  ]);
  console.log(roleId);
  const manager_id = 2; 
  const success = await db.createEmployee(
    firstName,
    lastName,
    roleId,
    manager_id
  );
  Menu();
}

async function updateEmployee() {
  db.findAllEmployees().then((employee) => {
    var employeeList = employee[0].map((employee) => {
      console.log(employee);
      return `${employee.first_name} ${employee.last_name}`;
    });

    console.log(employeeList);

    inquirer_1
      .prompt([
        {
          type: "list",
          name: "employee",
          message: "which employee would you like to update",
          choices: employeeList,
        },
      ])

      .then((res) => {
        chosenEmployee = res;

        db.findAllRoles().then(([rows]) => {
          let roles = rows;
          console.table(roles);

          inquirer_1
            .prompt({
              type: "list",
              name: "employee",
              message: "which employee's role do you wanna update",
              choices: roles.map((role) => {
                return `${role.title}`;
              }),
            })
            .then((res) => {
              console.log(chosenEmployee, res);
              db.updateEmployee(chosenEmployee, res);
            });
        });
      });
  });
}

function initApp() {
  Menu();
}

initApp();

function quit() {
  console.log("\nGoodbye!!!");
  process.exit(0);
}
