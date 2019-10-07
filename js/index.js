const dateElement = document.getElementById('date');
const listDisplay = document.getElementById('display_list');
const itemInput = document.getElementById('item_input');
const addItem = document.getElementById('add_item');

const checked = './img/icons/checked.svg'
const unchecked = './img/icons/unchecked.svg'

const dateOptions = {weekday: 'long', month:'short', day:'numeric'};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', dateOptions);


function addToDo(todo) {
    let item = `<li class="item">
                 <img src=${unchecked} job="complete">
                 <p class="text">${todo}</p>
                 <img id="trash" src="./img/icons/trash.svg" job="delete">
                 </li>`
    let position = 'beforeend';

    listDisplay.insertAdjacentHTML(position, item);
};  

document.addEventListener('keyup', function(event) {
    if (event.keyCode == 13) {
        let todo = itemInput.value;

        if (todo) {
            addToDo(todo);
            itemInput.value = '';
        }  
    }
});


//jquery

let biglist = [];

$(".listbox").sortable({
    stop: function(event, ui) {executecode();}
 });

function saveitem(event) {
    switch(event.which) {
        case 13:
            addItem();
            break;
        default:
        }
};

function buttonClicked() {
    addItem();
};

function addItem() {
    let input = $('#input').val();

    let tempobj = {};
    tempobj.listname = input;
    tempobj.liscol = [];
    biglist.push(tempobj);
    $('input').val('');
    printmypage();

    // $('.listbox').append(`<div class="list"><i class="fas fa-trash" onclick="trashClicked(this)"></i>${input}</div>`);
    // $('input').val('');


    console.log(input);
};

function printmypage() {
    $('.listbox').html('');
    for(var i = 0; i < biglist.length; i ++) {
        $('.listbox').append(`<div class="list"><i class="fas fa-trash" onclick="trashClicked(this)"></i>${biglist[i].listname}</div>`);
    };
};

function trashClicked(el) {
    $(el).parent().remove();
};

function executecode() {
    let listarray = $(".listbox").children();
    $(listarray[0]).addClass("activeitem");
};

