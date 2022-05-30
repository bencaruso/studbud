let subButton = document.getElementById('tasksubmit');

renderTasks();

subButton.addEventListener('click', function() {

    let taskName = document.getElementById('taskInput').value;
    let dueDate = document.getElementById('dueDateInput').value;
    let completionTime = document.getElementById('completionTimeInput').value;
    let estimatedTime = document.getElementById('estimatedTimeInput').value;
    let priorityRating = priorityInput.options[priorityInput.selectedIndex].value;

    if(taskName == "") { document.getElementById("taskInput").classList.add("error");
    return;
    }

    let taskObj = {
        'taskName': taskName,
        'dueDate': dueDate,
        'completionTime': completionTime,
        'estimatedTime': estimatedTime,
        'priorityRating': priorityRating
    };
    
    let existingTasks = getTasks();

    existingTasks.push(taskObj);

    existingTasks = JSON.stringify(existingTasks);

    localStorage.setItem('tasks', existingTasks);

    renderTasks();

});

function getTasks() {
    let tasks = localStorage.getItem('tasks');

    if (tasks == null) {

        return [];
    }

    tasks = JSON.parse(tasks);

    return tasks;
}

function renderTasks() {

    emptyList();
    
    let tasks = getTasks();

    let taskUl = document.querySelector('#tasklist ul')

    taskUl.innerHTML = "";
    
    tasks.forEach(function(task) {
        let taskLi = document.createElement('li');

        let taskName = document.createElement('span');
        taskName.setAttribute('class', 'taskName');
        taskName.innerText = task.taskName;

        let horizontalLine = document.createElement('hr');
        horizontalLine.setAttribute('class', 'horizontalLine');

        let taskRemove = document.createElement('button');
        taskRemove.setAttribute('class', 'remove');
        // taskRemove.innerText = 'x';

        taskRemove.addEventListener('click', function() {
            taskLi.remove();

            removeTask(task.taskName);
        });

        taskLi.appendChild(taskName);
        taskLi.appendChild(taskRemove);
        taskLi.appendChild(horizontalLine);

        taskUl.appendChild(taskLi);

    });
};

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


function emptyList() {
    let tasks = getTasks();
    if (tasks.length > 0) {
        document.getElementById('emptyList').style.display = 'none';
    } else {
        document.getElementById('emptyList').style.display = 'block';
    }
}