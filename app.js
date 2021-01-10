const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
//const writeFileAsync = util.promisify(fs.writeFile)


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


const team = [];

//generates new managers
const createManager = () => {
    inquirer.prompt([
        {
            name: 'name',
            message: 'What is the name of this employee?',
            type:'input',
        },
        {
            name: 'id',
            message: 'What is the ID of this employee?',
            type:'input',

        },  
        {
            name: 'email',
            message: 'What is the Email of this employee?',
            type:'input',

        },  
        {
            name: 'office',
            message: 'What is the office number of this employee?',
            type:'input',

        },
    ]).then(answers => {
        const newManager = new Manager(answers.name, answers.id, answers.email, answers.office)
        team.push(newManager)
        //console.log(newManager)

        addEmployee();
    })
}


//Generates new engineers
const createEngineer =() => {
    inquirer.prompt([
        {
            name: 'name',
            message: 'What is the name of this employee?',
            type:'input',
        },
        {
            name: 'id',
            message: 'What is the ID of this employee?',
            type:'input'
        },  
        {
            name: 'email',
            message: 'What is the Email of this employee?',
            type:'input'
        }, 
        {
            name: 'github',
            message: 'What is the GitHub username of this employee?',
            type:'input',
        }
    ]).then((answers)=> {
        const newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
        team.push(newEngineer)
        //console.log(newEngineer)

        addEmployee();
    })
}

const createIntern = () => {
    inquirer.prompt([
        {
            name: 'name',
            message: 'What is the name of this employee?',
            type:'input',
        },
        {
            name: 'id',
            message: 'What is the ID of this employee?',
            type:'input',

        },  
        {
            name: 'email',
            message: 'What is the Email of this employee?',
            type:'input',

        },  
        {
            name: 'school',
            message: 'What school did this intern graduate from?',
            type:'input',

        },
    ]).then(answers => {
        const newIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
        team.push(newIntern)
        //console.log(newIntern)

        addEmployee()
        
    })
    
}


//starts program by prompting user to select type of employee
const typeOfEmployee = () => {
    inquirer.prompt([
        {
            name: 'employee',
            message: 'What type of employee would you like to add?',
            type:'list',
            choices: [
                {name:'Manager', value: 0},
                {name: 'Software Engineer', value: 1},
                {name:'Intern', value: 2},
            ]
        },
    ]).then((answers) => {
            if (answers.employee === 0) {
                createManager();
            }
            else if (answers.employee === 1) {
                createEngineer();
            }
            else if (answers.employee === 2) {
                createIntern();
            }
        }   
    ).catch((err) => console.error(err));
}

typeOfEmployee();
    

function addEmployee() {
    inquirer.prompt([
        {
            name: 'NewMember',
            message: 'Would you like to add another teammate?',
            type: 'confirm',
        }
    ]).then((answers)=> {
        if (answers.NewMember) {
            typeOfEmployee();
        } else {
            //console.log(team)

            const renderTeam = render(team) 
            fs.writeFileSync(outputPath, renderTeam)

            console.log('A file containing your roster has been generated!');
        }
    }).catch((err) => console.error(err));

}








// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
