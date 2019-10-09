// const listDisplay = document.getElementById('display_list');
// const itemInput = document.getElementById('item_input');
// const addItem = document.getElementById('add_item');
const checked = './img/icons/checked.svg'
const unchecked = './img/icons/unchecked.svg'

const dateElement = document.getElementById('date');

const dateOptions = {weekday: 'long', month:'short', day:'numeric'};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString('en-US', dateOptions);

//jquery

let listItems = [];

$("#display_list").sortable({
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
    let input = $('#item_input').val();

    let tempobj = {};
    tempobj.listname = input;
    tempobj.liscol = [];
    listItems.push(tempobj);
    $('#item_input').val('');
    printmypage();
    console.log(listItems);
};

function printmypage() {
    $('#display_list').html('');
    for(var i = 0; i < listItems.length; i ++) {
        $('#display_list').append(`<li class="item">
                                        <img src=${unchecked}>
                                        <div class="text">${listItems[i].listname}</div>
                                        <div>
                                            <img id="trash" src="./img/icons/trash.svg" onclick="trashClicked(this)">
                                        </div>
                                    </li>`);
    };
};

function trashClicked(el) {
    
    listItems.splice($(el).parent().parent().index(), 1);
    $(el).parent().parent().remove();
    
    printmypage();
        
    
};

function executecode() {
    let listarray = $("#display_list").children();
    $(listarray[0]).addClass("activeitem");
};

