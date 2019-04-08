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
        
       <div class="to-do">

        
            <div class="row task-head task-row">
                 <div class="to-do__header col-xsm task-head-icon">
                        <button class="btn btn-calendar">
                        <i class="far fa-calendar-alt"></i></button>
                        <input class="date-range" type="text" name="daterange" data-date="${counter}" value="01/01/2019 - 01/15/2019" />
                 </div>
                     
                  <div class="col task-head-text text-white form-inline">
                        <p class="task-head-written m-0" >TODO LIST #${counter+1}</p>
                  </div>
                      
                  <div class="col-xsm task-head-edit form-inline">
                        <div class="col-xsm edit-trash form-inline">
                            
                            <button class="btn btn-pencil btn-sm"">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            
                                <span>|</span>
                            
                            <button class="btn fas fa-trash-alt trash btn-sm">
                            </button>
                        </div>
                  </div>
        </div>



        <div class="row button_add">       
            
            <div class="col-xsm form-inline pl-0 pr-0">
                 <button class="btn button-plus-task">
                 <i class="fas fa-plus fa-lg"></i></button>
            </div>   
            
            <div class="col input-group m-1 p-1">       
                 
                 <div class="input-group">
               
                   
                     <input type="text" name="" data-input="${counter}" class="todo__list_input form-control input-task to-do__action-input"  aria-describedby="button-addon2" placeholder="Start typing here to create the task...">
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

                     <div class="input-group-append">
                        <button class="btn btn-outline-secondary text-white add-task btn-add" onclick="addTodoTask()" id="button-addon2" type="button" style="background-color: green;"> Add Task</button>
                    </div>
                 </div>
             </div>     
        </div>

        </div>
        
        
        <div class="todo__dynamic" id="todo-dynamic" data-output="${counter}">
        </div> 
        </div>
    </div>
    `
    counter++;
    todo_model.push(objTodo);
    document.getElementById('app').innerHTML+=todo;

    addListenerToDeleteTaskHead();
    addListenerTimeRange();
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
    addListenerToDeleteTask();
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
            <div class="row to-do__item item-lists todo__item" data-todo-item>
                <div class="col-xsm form-inline form-check d-flex align-items-center p-3">
                    <input type="checkbox" class="form-check-input" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
               </div>

               <div class="col ">
                    <div class="row form-inline">
                <div class="col todo__action"><p class="m-0">${tasks[i].text}</p></div>

                <div class="col-xsm todo__priority pr-0">${tasks[i].priority}</div>
                <div class="col-xsm todo__status pl-0">${tasks[i].status}</div>
                    </div>
               </div>


                <div class="col-xsm sort-edit-trash form-inline">
                    

                    <button class="btn btn-pencil btn-sm">
                    <i class="fas fa-pencil-alt"></i></button>
                    
                     <span>|</span>
                     
                    <button class="btn fas fa-trash-alt btn-trash btn-sm">
                     </button>
                </div>
              

            </div>
`
    }
    addListenerToEditTask();
    $(output).html(template);
}



addListenerTimeRange();
  function addListenerTimeRange() {
 $('input[name="daterange"]').daterangepicker({
 opens: 'left'
  }, function(start, end, label) {
 console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
    };

  addListenerToDeleteTask();
function addListenerToDeleteTask(){
    $(".btn-trash").click(function(){
        $(this).parents(".item-lists").remove();
    });
}

addListenerToDeleteTaskHead();
function addListenerToDeleteTaskHead(){
    $(".trash").click(function(){
        $(this).parents(".app").remove();
    });
}


addListenerToEditTask();
function addListenerToEditTask(){
    $(".btn-pencil").click(function(){
        var valueEditTask = $(this).parents('.to-do__item').find("p");
        $('#myModal').modal('show');
        var inputForEdit = $(".item-lists");
        inputForEdit.val(valueEditTask.text());
        $(".save-changes").unbind("click");
        $(".save-changes").click(function(){
            if(!inputForEdit.val().trim()){
                alert("Please, enter your text!")
                return false
            }
            valueEditTask.text(inputForEdit.val());
        });
    });
}
 