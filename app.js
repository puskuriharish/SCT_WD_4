const taskInput = document.getElementById('taskInput');
const dateInput = document.getElementById('dateInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const editModal = document.getElementById('editModal');
const closeModal = document.querySelector('.close');
const editTaskInput = document.getElementById('editTaskInput');
const editDateInput = document.getElementById('editDateInput');
const saveTaskBtn = document.getElementById('saveTaskBtn');

let tasks = [];
let currentEditIndex = null;

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value;
    const taskDate = dateInput.value;

    if (taskText && taskDate) {
        tasks.push({ text: taskText, date: taskDate, completed: false });
        renderTasks();
        taskInput.value = '';
        dateInput.value = '';
    }
});

function renderTasks() {
    taskList.innerHTML = tasks.map((task, index) => `
        <li class="${task.completed ? 'completed' : ''}">
            <span>${task.text} (Due: ${task.date})</span>
            <div class="actions">
                <button class="complete">${task.completed ? 'Undo' : 'Complete'}</button>
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            </div>
        </li>
    `).join('');

    tasks.forEach((task, index) => {
        const li = taskList.children[index];
        li.querySelector('.complete').addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks();
        });
        li.querySelector('.delete').addEventListener('click', () => {
            tasks.splice(index, 1);
            renderTasks();
        });
        li.querySelector('.edit').addEventListener('click', () => {
            currentEditIndex = index;
            editTaskInput.value = task.text;
            editDateInput.value = task.date;
            editModal.style.display = 'flex';
        });
    });
}

saveTaskBtn.addEventListener('click', () => {
    if (currentEditIndex !== null) {
        tasks[currentEditIndex].text = editTaskInput.value;
        tasks[currentEditIndex].date = editDateInput.value;
        renderTasks();
        editModal.style.display = 'none';
    }
});

closeModal.addEventListener('click', () => {
    editModal.style.display = 'none';
});

renderTasks();
