window.onload = function () {

    createTodoList(1);
};
function addToDO() {
    let current = $(event.target).closest('[data-todo]').attr('data-todo');
    let currentTodo = $(event.target).closest('[data-todo]').find("#to_do_items_" + current);
    let todo = `
            <div class="row to-do__item">
               <div class="col-1">
                   <input type="checkbox" name="" >
               </div>
               <div class="col-7">
                    <p>${$("#to_do_text_" + current).val()} </p>
               </div>
               <div class="col-4">
                 <img src="" alt="" data-sort="${current}"} onclick="editItem()">
                 <img src="" alt="">
                 <img src="" alt="">
               </div>
            </div>`
    currentTodo[0].innerHTML += todo;
}

function createTodoList() {
    let counter = $('[data-list]').attr('data-list')
    counter = Number(counter)
    let list = `<div class="app" data-todo="${counter}">
    <div class="to-do">
    <div class="row">
    <div class="col-12">
    <div class="to-do__header">
    something
    </div>
    </div>
    </div>
    <div class="row">
    <div class="col-6">
    <input type="text" name="" id="to_do_text_${counter}"   class="to-do__action-input w-100">
    </div>
    <div class="col-6">
    <button class="w-100" onclick="addToDO()">Add button</button>
</div>
</div>
</div>
<div class="row">
    <div class="col-12">
    <div class="to-do__content-items" id="to_do_items_${counter}" >
    </div>
    </div>
    </div>
    </div>
`
    $('[data-list]').attr('data-list', counter + 1)
    document.getElementById("root").innerHTML += list;

}

