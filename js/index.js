// const listDisplay = document.getElementById('display_list');
// const itemInput = document.getElementById('item_input');
// const addItem = document.getElementById('add_item');

const checked = '<i class="fas fa-check-circle"></i>';
const unchecked = '<i class="far fa-circle"></i>';

const dateElement = document.getElementById("date");

const dateOptions = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US", dateOptions);

//jquery

let listItems = [];

$("#list_name").sortable({
    stop: function(event, ui) {
        executecode();
    }
});

function saveitem(event) {
    switch (event.which) {
        case 13:
            addItem();
            break;
        default:
    }
}

function buttonClicked() {
    addItem();
}

function addItem() {
    let input = $("#item_input").val();

    let tempobj = {};
    tempobj.listname = input;
    tempobj.liscol = [];
    listItems.push(tempobj);
    $("#item_input").val("");
    printmypage();
    console.log(listItems);
}

function printmypage() {
    $("#list_name").html("");
    for (var i = 0; i < listItems.length; i++) {
        $("#list_name").append(`
        
        <li class="item">
            <div id="edit_item" class="text" onclick="editItem()">
                <h2>${listItems[i].listname}<h2>
            </div>
            <div class="item-btns">
                <button type="button" class="btn btn-secondary" onclick="addTask()">Task<i class="fas fa-plus-circle"></i></button>
                <button type="button" class="btn btn-secondary" onclick="trashClicked(this)">Delete<i class="fas fa-trash"></i></button>
            </div>
        </li>    
        `);
    }
}

function trashClicked(el) {
    listItems.splice($(el).parent().parent().index(), 1);
    $(el).parent().parent().remove();

    printmypage();
}

function addTask() {
    $("#edit_item").append(`
        <input id="task_input" type="text" class="form-control" placeholder="CREATE A LIST" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onkeyup="saveitem(event)">
    `);
}

function editItem() {
    $("#list_name").append(`
        <input id="task_input" type="text" class="form-control" placeholder="CREATE A LIST" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-lg" onkeyup="saveitem(event)">
    `);
}

function executecode() {
    let listarray = $("#list_name").children();
    $(listarray[0]).addClass("activeitem");
}
