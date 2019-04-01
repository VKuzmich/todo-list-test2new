window.onload = function () {

    createTodoList(1);
};
function addToDO() {
    let current = $(event.target).closest('[data-todo]').attr('data-todo');
    let currentTodo = $(event.target).closest('[data-todo]').find("#to_do_items_" + current);
    let todo = `
            <div class="row to-do__item item-lists">
               <div class="col-xsm form-inline form-check d-flex align-items-center p-3">
                    <input type="checkbox" class="form-check-input" value="" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
               </div>
               <div class="col form-inline todo-list-text ml-1">
                    <p class="mb-0">${$("#to_do_text_" + current).val()} </p>
               </div>
               <div class="col-xsm sort-edit-trash form-inline">
                
                    
                    <select class="custom-select custom-select-sm">
                                    <option selected></option>
                                    <option value="1">High</option>
                                    <option value="2">Middle</option>
                                    <option value="3">Low</option>
                    </select>
                    
                    <span>|</span> 

                    <button class="btn btn-pencil btn-sm">
                    <i class="fas fa-pencil-alt"></i></button>
                    
                     <span>|</span>
                     
                    <button class="btn fas fa-trash-alt btn-trash btn-sm">
                     </button>
                 
               </div>
            </div>`

    currentTodo[0].innerHTML += todo;

    addListenerToEditTask();
    addListenerToDeleteTask();
}




function createTodoList() {
    let counter = $('[data-list]').attr('data-list')
    counter = Number(counter)
    let list = `
<div class="app" data-todo="${counter}">
    <div class="to-do col-md-8 offset-md-2 task-todo-table">
    

        <div class="row task-head task-row">
             <div class="to-do__header col-xsm task-head-icon">
                    <button class="btn btn-calendar">
                    <i class="far fa-calendar-alt"></i></button>
                    <input class="date-range" type="text" name="daterange" value="01/01/2019 - 01/15/2019" />
             </div>
                     
              <div class="col task-head-text text-white form-inline">
                    <p class="task-head-written m-0">Complete the test task</p>
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
               
                    <input type="text" class="form-control input-task to-do__action-input" id="to_do_text_${counter}"  aria-describedby="button-addon2" placeholder="Start typing here to create the task...">
                     <div class="input-group-append">
                        <button class="btn btn-outline-secondary text-white add-task btn-add" onclick="addToDO()" id="button-addon2" type="button" style="background-color: green;"> Add Task</button>
                    </div>
                 </div>
             </div>     
        </div>
        
    
        <div class="row" >
            <div class="col-12">
                <div class="to-do__content-items" id="to_do_items_${counter}" >
                 </div>
            </div>
        </div>

    </div>

</div>

`
    $('[data-list]').attr('data-list', counter + 1)
    document.getElementById("root").innerHTML += list;

    addListenerToDeleteTaskHead();
    addListenerToDeleteTask();
    addListenerToEditTask();



}



addListenerToEditTask();
function addListenerToEditTask(){
    $(".btn-pencil").click(function(){
        var valueEditTask = $(this).parents('.task-row').find("p");
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

$(function() {
    $('input[name="daterange"]').daterangepicker({
        opens: 'left'
    }, function(start, end, label) {
        console.log("A new date selection was made: " + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
    });
});