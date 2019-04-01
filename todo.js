let counter=0;
let todo_model=[];
$(document).ready(function () {
    initTodo();
});
function initTodo() {
    let objTodo={}
    objTodo.id=counter;
    objTodo.tasks = [];
    let todo=`
       <div class="todo" data-todo-list="${counter}">
        <div class="todo__header">TODO LIST #${counter+1}</div>
        
        <div class="todo__body">
            <input type="text" name="" data-input="${counter}" class="todo__list_input">
            <select class="todo__list_priority" data-priority="${counter}">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
            <select  class="todo__list_status" data-status="${counter}">
                <option>Выполняется</option>
                <option>В процессе</option>
                <option>На проверке</option>
                <option>Сделано</option>
            </select>
            <button class="todo__add-task" onclick="addTodoTask()">Добавить задание</button>
        </div>
        
        <div class="todo__dynamic" id="todo-dynamic" data-output="${counter}">
        </div>
    
    </div>
    `
    counter++;
    todo_model.push(objTodo);
    document.getElementById('app').innerHTML+=todo;
}


function addTodoTask(){
    let task={};
    let text= $(event.target).closest("[data-todo-list]").find("[data-input]").val();
    let priority=$(event.target).closest("[data-todo-list]").find('[data-priority]').val();
    let status=$(event.target).closest("[data-todo-list]").find('[data-status]').val();
    let todo_list = $(event.target).closest("[data-todo-list]").attr("data-todo-list");
    task.text=text;
    task.priority=priority;
    task.status=status;
    todo_model[todo_list].tasks.push(task);
    updateTodoList(todo_list)
}



function updateTodoList(todo_list){
    let tasks = todo_model[todo_list].tasks;
    todo_model[todo_list].tasks.sort(function (a,b) {
        return a.priority - b.priority
    })



    let output = $(event.target).closest('[data-todo-list]').find('[data-output]');
    let template = '';
    for (let i=0;i<tasks.length;i++){
        template+=`
            <div class="todo__item" data-todo-item>
                <div class="todo__action">${tasks[i].text}</div>
                <div class="todo__priority">${tasks[i].priority}</div>
                <div class="todo__status">${tasks[i].status}</div>
            </div>
`
    }
    $(output).html(template);
}