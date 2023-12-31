// находим элементы на странице
const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const taskList = document.querySelector('#taskList');
const emptyList = document.querySelector('#emptyList');

let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
}

tasks.forEach(function (task) {

    renderTask(task);

checkEmptyList();
})

// добавление задачи
form.addEventListener('submit', addTask );

// удаление задачи
tasksList.addEventListener('click', deleteTask)

// отмечаем задачу завершенной
tasksList.addEventListener('click', doneTask)

// функции
function addTask(event) {
    // отменяем отправку формы
    event.preventDefault();

    // достаем текст задачи из поля ввода
    const taskText = taskInput.value;

    // описываем задачу в виде объекта
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    // добавляем задачу в массив с задачами
    tasks.push(newTask)

    // сохраняем список задач в хранилище браузера LocalStorage
    saveToLocalStorage();

    renderTask(newTask);

    // очищаем поле ввода и возвращаем на него фокус
    taskInput.value = ""
    taskInput.focus()

    checkEmptyList();
}

function deleteTask () {
    console.log(event.target);

    // проверяем что клик был по кнопке 'удалить задачу'
    if (event.target.dataset.action == 'delete') {
        const parenNode = event.target.closest('.list-group-item')
        
        // определяем ID задачи
        const id = Number(parenNode.id);

        // находим индекс задачи в массиве
        const index = tasks.findIndex((task) => task.id === id)

        // удаляем задачу из массива с задачами
        tasks.splice(index,1)

        // сохраняем список задач в хранилище браузера LocalStorage
        saveToLocalStorage();


        // удаляем задачу из разметки
        parenNode.remove();
    }

    checkEmptyList();
}

function doneTask(event) {
    // проверяем что клик был по кнопке "задача выполнена"
    if (event.target.dataset.action === "done") {
        const parentNode = event.target.closest('.list-group-item');

        // определяем ID задачи
        const id = Number(parentNode.id);

        const task = tasks.find((task) => task.id === id)

        task.done = !task.done

        // сохраняем список задач в хранилище браузера LocalStorage
        saveToLocalStorage();


        const taskTitle = parentNode.querySelector('.task-title');
        taskTitle.classList.toggle('task-title--done')
    }
}

function checkEmptyList() {
    if (tasks.length ===0) {
        const emptyListHTML = `<li id="emptyList" class="list-group-item empty-list">
            <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
            <div class="empty-list__title">список дел пуст</div>
        </li>`;
        tasksList.insertAdjacentHTML('afterbegin', emptyListHTML);
    }
 
    if (tasks.length > 0) {
        const emptyListEl = document.querySelector('#emptyList');
        emptyListEl ? emptyListEl.remove() : null;
        
    }

}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function saveToLocalStorage() {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function renderTask(task) {
    // формируем CSS класс
    const cssClass = task.done ? 'task-title task-title--done' : 'task-title';

    // формируем разметку для новой задачи  
    const taskHTML = `
                <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">

                    <span class="${cssClass}">${task.text}</span>

                    <div class="task-item__buttons">

                        <button type="button" data-action="done" class="btn-action">

                            <img src="./img/tick.svg" alt="Done" width="18" height="18">

                        </button>

                        <button type="button" data-action="delete" class="btn-action">

                            <img src="./img/cross.svg" alt="Done" width="18" height="18">

                        </button>

                    </div>;

                </li>`;

    // добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);
}