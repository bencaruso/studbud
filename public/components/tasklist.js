// Code used and referenced from Rob Dongas' task list code walkthrough and Drew Cosgrove's item list code walkthrough
let subButton = document.getElementById('tasksubmit');

// rendering tasks to table
renderTasks();

// collecting input values
subButton.addEventListener('click', function() {

    let taskName = document.getElementById('taskInput').value;
    let dueDate = document.getElementById('dueDateInput').value;
    let completionTime = document.getElementById('completionTimeInput').value;
    let estimatedTime = document.getElementById('estimatedTimeInput').value;
    let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;

    if(taskName == "") { document.getElementById("taskInput").classList.add("error");
    return;
    }

    // creating task object
    let taskObj = {
        'taskName': taskName,
        'dueDate': dueDate,
        'completionTime': completionTime,
        'estimatedTime': estimatedTime,
        'priorityRating': priorityRating
    };
    
    
    let existingTasks = getTasks();

    // Add the new item onto the end of the list.
    existingTasks.push(taskObj);

    // turning input into string for local storage
    existingTasks = JSON.stringify(existingTasks);

    // setting tasks to local storage
    localStorage.setItem('tasks', existingTasks);

    renderTasks();

});

// get items from local storage
function getTasks() {
    let tasks = localStorage.getItem('tasks');

    if (tasks == null) {

// if there are no items in the local storage, return an empty array
        return [];
    }

    // convert tasks back into an array
    tasks = JSON.parse(tasks);

    return tasks;
}

// render task function to display tasks
function renderTasks() {

    emptyList();
    
    let tasks = getTasks();

    // loading tasks into the table
    let taskUl = document.querySelector('#tasklist .task-information')

    tasks.forEach(function(task) {


        let taskLi = document.createElement('tr');

        let taskName = document.createElement('td');
        taskName.setAttribute('class', 'taskName');
        taskName.innerText = task.taskName;

        let dueDate = document.createElement('td');
        dueDate.setAttribute('class', 'dueDate');
        dueDate.innerText = task.dueDate;

        let completionTime = document.createElement('td');
        completionTime.setAttribute('class', 'completionTime');
        completionTime.innerText = task.completionTime;

        let priorityRating = document.createElement('td');
        priorityRating.setAttribute('class', 'priorityRating');
        priorityRating.innerText = task.priorityRating;

        let horizontalLine = document.createElement('hr');
        horizontalLine.setAttribute('class', 'horizontalLine');

        let taskRemove = document.createElement('button');
        taskRemove.setAttribute('class', 'remove');

        taskRemove.addEventListener('click', function() {
            taskLi.remove();

            removeTask(task.taskName);
        });


        taskUl.appendChild(taskLi);

        taskLi.appendChild(taskName);
        taskLi.appendChild(dueDate);
        taskLi.appendChild(completionTime);
        taskLi.appendChild(priorityRating);
        taskLi.appendChild(taskRemove);

    });
};

// function to remove/complete a task
function removeTask(taskName) {
    let tasks = getTasks();

    let taskIndex = tasks.findIndex(function(task) {
        return task.taskName == taskName;
    });

    tasks.splice(taskIndex, 1);

    tasks = JSON.stringify(tasks);
    localStorage.setItem('tasks', tasks);
    emptyList();
}

// check if the list is empty. If it is, display appropriate text.
function emptyList() {
    let tasks = getTasks();
    if (tasks.length > 0) {
        document.getElementById('emptyList').style.display = 'none';
    } else {
        document.getElementById('emptyList').style.display = 'block';
    }
}