const urgentTasks = document.querySelector(".div5 .div5-list")

var retrievedTasks = localStorage.getItem('tasks');
var tasks2 = JSON.parse(retrievedTasks);

console.log(tasks2[0].taskDescription);

function insertTasks() {
    for (let i = 0; i < tasks2.length; i++) {
        let task = `<li>${tasks2[i].taskDescription}</li>`;
        urgentTasks.insertAdjacentHTML("beforeend", task);
    } 
}

insertTasks();