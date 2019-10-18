const STORAGE_KEY = '1320984712389745';

const stringToObj = str => JSON.parse(str) || [];
const objToString = obj => JSON.stringify(obj) || '';

let bigListArray = [];
let bigTaskArray = [];

(function getDate() {
    const dateElement = document.getElementById('date');

    const dateOptions = {weekday: 'long', month: 'long', day: 'numeric'};
    const today = new Date();

    dateElement.innerHTML = today.toLocaleDateString('en-US', dateOptions);
})();

class Lists {
    constructor(item) {
        this.item = item;
    };
};

class Tasks {
    constructor(task) {
        this.task = task;
    };
};

function addList(event) {
    switch (event.which) {
        case 13:
            getList();
            break;
        default:
    };
};

function getList() {
    
    let itemInput = document.getElementById('list_input');

    if (itemInput.value == '' || itemInput.value == null) {

    } else {
        let newList = new Lists(itemInput.value);
        bigListArray = [];
        bigListArray.push(newList);

        printList();
        itemInput.value = "";
    };
 };

function printList() {

    let ranId = Math.floor(Math.random() * 1000);
   
    let listContent = document.getElementById('list_content');

    bigListArray.forEach(list => {
      listContent.insertAdjacentHTML('afterbegin',
        `
        <div class="list-collapse">${list.item}</div>
            <ul id="list_name">
                <li id="item${ranId}" class="item">
                    <div class="list-items">
                        <div class="list-name">
                            <h2>${list.item}<h2>
                        </div>
                        <div class="item-btns">
                            <button type="button" class="btn btn-secondary" onclick="addTaskInput(this)">Task<i class="fas fa-plus-circle"></i></button>
                            <button type="button" class="btn btn-secondary" onclick="trashClicked(this)">Delete<i class="fas fa-trash"></i></button>
                        </div>  
                    </div>
                </li>
            </ul>
        `);
    });
    
    $( "#list_content" ).accordion( "refresh" );
};

function addTaskInput(id) {
    let inputShow;

    let ranId = Math.floor(Math.random() * 1000);

    let curId = $(id).closest('li').attr('id');    
    
    if (document.body.contains(document.getElementById('task_input'))) {

        let taskRemove = document.getElementById('task_input');
        taskRemove.parentNode.removeChild(taskRemove);

        inputShow = document.getElementById(`${curId}`);
        
        inputShow.insertAdjacentHTML(
            'beforeend',
            `
                <div class="task-input" id="task${ranId}">
                    <div id="task_input">
                        <label>Task: </label>
                        <input id="task_item" type="text" onkeyup="addTask(event, this)">
                        <i class="fas fa-plus-circle" onclick="addTask({which: 13}, this)"></i>
                    </div>
                </div>
        `
        );
        $( "#list_content" ).accordion( "refresh" );

    } else {
        inputShow = document.getElementById(`${curId}`);

        inputShow.insertAdjacentHTML(
            'beforeend',
            `
                <div class="task-input" id="task${ranId}">
                    <div id="task_input">
                        <label>Task: </label>
                        <input id="task_item" type="text" onkeyup="addTask(event, this)">
                        <i class="fas fa-plus-circle" onclick="addTask({which: 13}, this)"></i>
                    </div>
                </div>
            `
        );

        $( "#list_content" ).accordion( "refresh" );
    };
};

function addTask(event, id) {
    switch (event.which) {
        case 13:
            addItem(id);
            break;
        default:
    };

    function addItem(id) {

        bigTaskArray = [];

        let task = document.getElementById('task_item');

        if (task.value == '' || task.value == null) {

        } else {
            let newTask = new Tasks(task.value);
    
            bigTaskArray.push(newTask);
    
            printTask(id);
            task.value = "";
        };
    };
};

function printTask(id) {

    let curId = $(id).parents("div").eq(1).attr('id');

    console.log(curId);
    
    let inputTask = document.getElementById(curId);

    bigTaskArray.forEach(list => {

        inputTask.insertAdjacentHTML(
            'afterbegin',
            `
                        <div class="task">
                            <h2 data-editable>${list.task}</h2>
                            <i class="far fa-circle"></i>
                        </div>
                `
        );
    });

    $( "#list_content" ).accordion( "refresh" );
};

function trashClicked(el) {

    bigListArray.splice(
        $(el)
            .parent()
            .parent()
            .parent()
            .parent()
            .index(),
        1
    );

    $(el)
        .parent()
        .parent()
        .parent()
        .parent()
        .prev()
        .remove();

    $(el)
        .parent()
        .parent()
        .parent()
        .parent()
        .remove();  

    $( "#list_content" ).accordion( "refresh" );

    // bigListArray.splice(el, 1);
    // el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
};


$('body').on('click', '[data-editable]', function(){
  
    let $el = $(this);
                
    let $input = $('<input/>').val( $el.text() );
    $el.replaceWith( $input );
    
    let save = function(){
      let $h2 = $('<h2 data-editable />').text( $input.val() );
      $input.replaceWith( $h2 );
    };

    $input.one('blur', save).focus();
    
});

// $('html').on('click', 'onkeyup', function () {
//     $( "#list_content" ).accordion( "refresh" );
// });

$( function() {
    $( "#list_content" ).accordion();
});