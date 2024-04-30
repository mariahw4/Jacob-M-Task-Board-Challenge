// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskIdCreator = generateTaskId();
    let taskCard = `
        <div id="${taskIdCreator}">
            <div class="card-title">
                <h4>${task.title}</h4>
            </div>
            <div class="form-control hasDatePicker">

            </div>
            <div class="card-body">
                <p>${task.description}</p>
            </div>
        </div>
    `;
    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    if(!taskList) {
        taskList = []
    }
    for(let i=0; i < taskList.length; i++) {
        const task = taskList[i];
        let laneId;

        switch (task.status) {
            case "todo":
                laneId = "#todo-cards";
                break;
            case "in-progress":
                laneId = "#in-progress-cards";
                break;
            case "done":
                laneId = "#done";
                break;
            default:
                laneId = "#todo-cards";
                break;
        }

        const taskCard = createTaskCard(task);
        $(laneId).append(taskCard);
    }


    $(".lane .task-card").draggable({
        containment: ".lane",
        snap: ".lane",
        snapMode: "inner"
    });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    let taskTitle = $("#taskTitleInput").val();
    let taskDate = $("#taskDateInput").val();
    let taskDescription = $("#taskDescriptionInput").val();

    if(taskTitle && taskDate && taskDescription) {
        let taskData = {
            id: generateTaskId(),
            taskTitle: taskTitle,
            taskDate: taskDate,
            taskDescription: taskDescription,
            status: "todo"
        };

        taskList.push(taskData);
        localStorage.setItem("tasks", JSON.stringify(taskList));
        renderTaskList();
        $("#formModal").modal("hide");
    }    
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    $deleteButton.on("click", function() {
        $(this).parent().remove();
    })
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
    $("#addTaskButton").click(handleAddTask);
});
