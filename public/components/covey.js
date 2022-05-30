const ImpTasks = document.querySelector(".div5 .div5-list")
const NotImpTasks = document.querySelector(".div6 .div6-list")
const notUrgTasks = document.querySelector(".div7 .div7-list")
const UrgTasks = document.querySelector(".div8 .div8-list")

let retrievedTasks = localStorage.getItem('tasks');
let tasks = JSON.parse(retrievedTasks);

// https://stackoverflow.com/questions/57071609/how-to-write-conditional-statement-for-date-input-value

// var inputDate = new Date(tasks[3].dueDate);


// getting today's date and formatting it to match that of the input. Referenced from https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

today = yyyy + '-' + mm + '-' + dd;

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