const todo_control = document.getElementsByClassName('todo-control');
const header_input = document.querySelector('.header-input');
const todo_list = document.getElementById('todo');
const todo_completed = document.getElementById('completed');
const header_button = document.getElementById('add');

let todo_data;

if (localStorage.getItem('todo_saved')) {
    todo_data = JSON.parse(localStorage.getItem('todo_saved'));
} else {
    todo_data = [];
}

function toDoList() {
    todo_list.innerHTML = '';
    todo_completed.innerHTML = '';

    todo_data.forEach(function(item, i) {
        let li = document.createElement("li");
        li.classList.add("todo-item");
        li.innerHTML = `<span class="text-todo">${item.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;

        const btn_todo_complete = li.querySelector('.todo-complete');
        btn_todo_complete.addEventListener('click', function() {
            item.completed = !item.completed;
            localStorage.setItem('todo_saved', JSON.stringify(todo_data));
            toDoList();
        });

        const btn_todo_remove = li.querySelector('.todo-remove');
        btn_todo_remove.addEventListener('click', function() {
            todo_data.splice(i, 1);
            localStorage.setItem('todo_saved', JSON.stringify(todo_data));
            toDoList();
        });

        if (item.completed) {
            todo_completed.append(li);
        } else {
            todo_list.append(li);
        }
    });
    console.log(todo_data);
}

function add() {
    if (header_input.value.trim() !== "") {
        let new_todo = {
            value: header_input.value.trim(),
            completed: false
        };
        todo_data.push(new_todo);
        header_input.value = "";
        localStorage.setItem('todo_saved', JSON.stringify(todo_data));
        toDoList();
    }
}

header_button.addEventListener('click', add);
header_input.addEventListener('keyup', function(event) {
    const key = event.key;
    if (key === 'Enter') {add()};
});

function deleteAll() {
    todo_data = [];
    localStorage.setItem('todo_saved', JSON.stringify(todo_data));
    toDoList();
}

function completeAll() {
    for(i = 0; i < todo_data.length; i++) {
        let complete_todo = todo_data[i];
        if (complete_todo.completed === false) {
            complete_todo.completed = true;
        };
        todo_data[i] = complete_todo;
        localStorage.setItem('todo_saved', JSON.stringify(todo_data));
        toDoList();
    }
}

toDoList();