import inquirer from "inquirer";
import con from "../config/connection.js";
import ctable from "console.table";

function masterPrompt()
{
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?',
                choices: ['View All Departments','View All Roles','View All Employees', 'Add a Role', 'Add an Employee', 'Update Employee Role', 'Exit']
            }
        ])
        .then(answers => {
            if(answers.action == 'View All Departments'){;
                let sql = "SELECT * FROM department";
                con.query(sql, function (err, result) {
                        console.table(result)
                        masterPrompt()
                  });
            }else if(answers.action == 'View All Roles'){
                let sql = "SELECT * FROM roles";
                con.query(sql, function (err, result) {
                        console.table(result)
                        masterPrompt()
                  });
            }else if(answers.action == 'View All Employees'){
                let sql = "SELECT * FROM employee";
                con.query(sql, function (err, result) {
                        console.table(result)
                        masterPrompt()
                  });
            }else if(answers.action == 'Add a Role'){
                let roleQuery = 'SELECT COUNT(*) as idCount FROM roles;'
                let roleCount
                con.query(roleQuery, function (err,result) {
                    roleCount = result[0].idCount;
                    roleCount++
                    console.log("New ID is"+roleCount)
                })
                inquirer.prompt([
                    {
                        type:'input',
                        name:'role',
                        message:'What role would you like to add?',
                    },
                    {
                        type:'input',
                        name:'salary',
                        message:'What is the salary of this role?',
                    },
                    {
                        type:'input',
                        name:'departmentId',
                        message: 'What is the department ID?',
                    }

                ])
                .then(answer => {
                    let sql = `INSERT INTO roles (id, title, salary, department_id) VALUES (${roleCount},${answer.role},${answer.salary},${answer.departmentId})`;
                    con.query(sql, function (err, result) {
                            masterPrompt()
                      });
                })
            }else if(answers.action == 'Add an Employee'){
                let empQuery = 'SELECT COUNT(*) as idCount FROM roles;'
                let empCount
                con.query(roleQuery, function (err,result) {
                    empCount = result[0].idCount;
                    empCount++
                    console.log("New ID is"+empCount)
                })
                inquirer.prompt([
                    {
                        type:'input',
                        name:'fName',
                        message:'Employee first name:',
                    },
                    {
                        type:'input',
                        name:'lName',
                        message:'Employee last name:',
                    },
                    {
                        type:'input',
                        name:'roleID',
                        message: 'Employee role ID:',
                    },
                    {
                        type:'input',
                        name:'managerID',
                        message: 'Employee manager ID:',
                    }

                ])
                .then(answer => {
                    let sql = `INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES (${empCount},${answer.fName},${answer.lName},${answer.roleID},${answer.managerID})`;
                    con.query(sql, function (err, result) {
                            masterPrompt()
                      });
                })
                //add employee here
            }else if(answers.action == 'Update Employee Role'){
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'empID',
                        message: 'Enter Employee ID: ',
                    },
                    {
                        type: 'input',
                        name: 'newRole',
                        message: 'Please enter new role: ',
                    }
                ])
                .then(answer => {
                    if(isNaN(answer.empID))
                    {
                        console.log("Invalid ID input, try again.")
                        masterPrompt();
                    }else{
                        let sql = `UPDATE employee SET role = "${answer.newRole}" WHERE id = ${answer.empID}`
                        con.query()
                        masterPrompt()
                    }

                })
            }else{
                process.exit(0);
            }


        })
    }

masterPrompt()
