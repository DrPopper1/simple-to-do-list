const todo_control = document.getElementsByClassName('todo-control');
const header_input = document.querySelector('.header-input');
const todo_list = document.getElementById('todo');
const todo_completed = document.getElementById('completed');
const header_button = document.getElementById('add');
const list_buttons = document.querySelector('.list-buttons');

let current_list;
let all_list;

if (localStorage.getItem('all_list')) {
    all_list = JSON.parse(localStorage.getItem('all_list'));
    current_list = Object.entries(all_list)[0];
} else {
    all_list = {
        'list1' : []
    };
    current_list = Object.entries(all_list)[0];
}

function buttons_list() {
    list_buttons.innerHTML = '<div class="plus" onclick="createNewList()">+</div>';

    for(let i = 0; i < Object.keys(all_list).length; i++) {
        const list_button = document.createElement("div");
        list_button.classList.add("todo-text");
        list_button.classList.add("hed");
        list_button.innerHTML = Object.keys(all_list)[i];
        list_button.addEventListener('click', function() {
            current_list = Object.entries(all_list)[i];
            buttons_list();
            toDoList();
        })
        if (list_button.innerHTML == current_list[0]) {
            list_button.style.color = '#265926'
        }
        list_buttons.append(list_button);
    }
}

function toDoList() {

    todo_list.innerHTML = '';
    todo_completed.innerHTML = '';

    if (current_list != undefined) {
        current_list[1].forEach(function(item, i) {
            let li = document.createElement("li");
            li.classList.add("todo-item");
            li.innerHTML = `<span class="text-todo">${item.value}</span>
            <div class="todo-buttons">
                <div class="plus">+</div>
                <div class="todo-remove"></div>
                <div class="todo-complete"></div>
            </div>
            <div class="desc">${item.description}</div>`
    
            const todo_text = li.querySelector('.plus');
            todo_text.addEventListener('click', function() {
                const desc = prompt('Напишите описание');
                if (desc != null & desc.replaceAll(' ', '') != "") {
                    const descr = li.querySelector('.desc');
                    descr.innerHTML = desc;
                    item.description = desc;
                    all_list[current_list[0]] = current_list[1]
                    localStorage.setItem('all_list', JSON.stringify(all_list));
                    toDoList();
                }
            });
    
            const btn_todo_complete = li.querySelector('.todo-complete');
            btn_todo_complete.addEventListener('click', function() {
                item.completed = !item.completed;
                all_list[current_list[0]] = current_list[1]
                localStorage.setItem('all_list', JSON.stringify(all_list));
                toDoList();
            });
    
            const btn_todo_remove = li.querySelector('.todo-remove');
            btn_todo_remove.addEventListener('click', function() {
                current_list[1].splice(i, 1);
                all_list[current_list[0]] = current_list[1]
                localStorage.setItem('all_list', JSON.stringify(all_list));
                toDoList();
            });

            if (item.completed) {
                todo_completed.append(li);
            } else {
                todo_list.append(li);
            }
        });
    }
    console.log(current_list);
    console.log(all_list);
}

function add() {
    if (header_input.value.trim() !== "") {
        if (current_list === undefined) {
            alert("Создайте список");
        } else {
            let new_todo = {
                value: header_input.value.trim(),
                completed: false,
                description: ""
            };
            current_list[1].push(new_todo);
            header_input.value = "";
            all_list[current_list[0]] = current_list[1]
            localStorage.setItem('all_list', JSON.stringify(all_list));
            toDoList();
        }
    }
}

header_button.addEventListener('click', add);
header_input.addEventListener('keyup', function(event) {
    const key = event.key;
    if (key === 'Enter') {add()};
});

function deleteAll() {
    all_list[current_list[0]] = [];
    current_list[1] = [];
    localStorage.setItem('all_list', JSON.stringify(all_list));
    toDoList();
}

function completeAll() {
    for(i = 0; i < current_list[1].length; i++) {
        let complete_todo = current_list[1];
        if (complete_todo[i].completed === false) {
            complete_todo[i].completed = true;
        };
        current_list[1[i]] = complete_todo;
        all_list[current_list[0]] = current_list[1]
        localStorage.setItem('all_list', JSON.stringify(all_list));
        toDoList();
    }
}

function createNewList() {
    const name = prompt('Напишите название нового списка');
    if (name != null & name.replaceAll(' ', '') != "") {
        const new_list = [name, []];
        all_list[new_list[0]] = new_list[1];
        current_list = new_list;
        localStorage.setItem('all_list', JSON.stringify(all_list));
        buttons_list();
        toDoList();
    }
}

function deleteList() {
    delete all_list[current_list[0]]
    current_list = Object.entries(all_list)[0];
    localStorage.setItem('all_list', JSON.stringify(all_list));
    toDoList();
    buttons_list();
}

dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function() {
    const dropdown_content = document.querySelector('.dropdown-content');
    if (dropdown_content.style.display == 'block') {
        dropdown_content.style.display = 'none'
    } else {
        dropdown_content.style.display = 'block';
    }
});

buttons_list();
toDoList();