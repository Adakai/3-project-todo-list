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
}    

document.addEventListener('keyup', function(event) {
    if (event.keyCode == 13) {
        let todo = itemInput.value;

        if (todo) {
            addToDo(todo);
        }
        itemInput.value = '';
    }
})
