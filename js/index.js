const STORAGE_KEY = "1320984712389745";

const stringToObj = str => JSON.parse(str) || [];
const objToString = obj => JSON.stringify(obj) || "";

const listContent = document.getElementById("list_content");

let itemInput = document.getElementById("list_input");

let bigListArray = [];

(function getDate() {
    const dateElement = document.getElementById("date");

    const dateOptions = { weekday: "long", month: "short", day: "numeric" };
    const today = new Date();

    dateElement.innerHTML = today.toLocaleDateString("en-US", dateOptions);
})();

class Lists {
    constructor(item) {
        this.item = item;
        // this.task = task;
    }
};

function enterClicked(event) {

    switch (event.which) {
        case 13:
            getList();
            break;
        default:
    };
    
};

function buttonClicked() {
    getList();
};

function getList() {

    let newList = new Lists(itemInput.value);

    bigListArray.push(newList);

    printList(newList);
    itemInput.value = "";
};

function printList() {

    let html = "<ul id=list_name>";

    bigListArray.forEach(list => {
        
        html += `
                <li class="item">
                    <div class="text">
                        <h2>${list.item}<h2>
                    </div>
                    <div class="item-btns">
                        <button type="button" class="btn btn-secondary" onclick="addTaskInput()">Task<i class="fas fa-plus-circle"></i></button>
                        <button type="button" class="btn btn-secondary" onclick="trashClicked(this)">Delete<i class="fas fa-trash"></i></button>
                    </div>  
                </li>
                `;
    });

    html += "</ul>";

    listContent.innerHTML = html;
};

function addTaskInput() {

    if (document.body.contains(document.getElementById('task'))) {
        
    } else {

        let inputShow = document.getElementById('list_name');

        inputShow.insertAdjacentHTML('beforeend', `
                <li id="task">
                    <div id="task_input">
                        <label>Task: </label>
                        <input id="task_item" type="text" onkeyup="addTask(event)">
                        <i class="fas fa-plus-circle" onclick="buttonClicked()"></i>
                    </div>
                </li>
        `);
    };    
};

function addTask(event) {
    
    switch (event.which) {
        case 13:
            addItem();
            break;
        default:
    };

    function addItem() {

        let inputTask = document.getElementById('task');
        let task = document.getElementById('task_item');

        inputTask.insertAdjacentHTML('afterbegin', `
                    <div class="task">
                        <h2>${task.value}</h2>
                        <i class="far fa-circle"></i>
                    </div>
        `);

        task.value = '';
    }

};

function trashClicked(el) {

    bigListArray.splice($(el).parent().parent().index(), 1);
    $(el).parent().parent().remove();
   
    // bigListArray.splice(el, 1);
    // el.parentNode.parentNode.parentNode.removeChild(el.parentNode.parentNode);
};





