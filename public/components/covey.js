// returning quadrants HTML elements

// top left quadrant (urgent and important)
const ImpTasks = document.querySelector(".div5 .div5-list")

// top right quadrant (urgent and important)
const NotImpTasks = document.querySelector(".div6 .div6-list")

// bottom left quadrant (not urgent and not important)
const notUrgTasks = document.querySelector(".div7 .div7-list")

// bottom right quadrant (not urgent and not important)
const UrgTasks = document.querySelector(".div8 .div8-list")

// get tasks from local storage and return into a string
let retrievedTasks = localStorage.getItem('tasks');
let tasks = JSON.parse(retrievedTasks);

// getting today's date and formatting it to match that of the input. Referenced from https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;


// Creating a function to filter the tasks into their according quadrant.
// The premise of the covey quadrants is if the task's due date is equal to the current date, it will appear in the urgent quadrant. If it isn't due on today's date it will go in the not urgent quadrant.
// If the task's priority has been inputted as 'high' the task will be placed in the important quadrant. If the priority is either 'low' or 'medium', the task will be placed into the non-important quadrant.

function insertTasks() {
    
    for (let i = 0; i < tasks.length; i++) {
        let task = `<li>${tasks[i].taskName}</li>`

        if (tasks[i].dueDate === today && tasks[i].priorityRating === 'High') {
            ImpTasks.insertAdjacentHTML("beforeend", task);
        } else {
        }

        if (tasks[i].dueDate != today && tasks[i].priorityRating === 'High') {
            NotImpTasks.insertAdjacentHTML("beforeend", task);
        } else {
        }

        if (tasks[i].dueDate === today && tasks[i].priorityRating != 'High') {
            notUrgTasks.insertAdjacentHTML("beforeend", task);
        } else {
        }

        if (tasks[i].dueDate != today && tasks[i].priorityRating != 'High') {
            UrgTasks.insertAdjacentHTML("beforeend", task);
        } else {
        }
    }
}

insertTasks();