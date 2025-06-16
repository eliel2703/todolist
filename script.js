document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
    updateStats();
});

document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const taskText = input.value.trim();
    
    if (taskText) {
        addTask(taskText);
        saveTasks();
        input.value = '';
        updateStats();
    }
});

function addTask(text, isCompleted = false) {
    const list = document.getElementById('todo-list');

    const emptyState = document.querySelector('.empty-state');
    if (emptyState) emptyState.remove();
    
    const li = document.createElement('li');
    li.className = 'todo-item';
    if (isCompleted) li.classList.add('completed');
    
    li.innerHTML = `
        <input type="checkbox" class="todo-checkbox" ${isCompleted ? 'checked' : ''}>
        <span class="todo-text">${text}</span>
        <button class="delete-btn">×</button>
    `;
    
    li.querySelector('.todo-checkbox').addEventListener('change', function() {
        li.classList.toggle('completed');
        saveTasks();
        updateStats();
    });
    
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
        saveTasks();
        updateEmptyState();
        updateStats();
    });
    
    list.appendChild(li);
}

function updateStats() {
    const total = document.querySelectorAll('#todo-list li').length;
    const completed = document.querySelectorAll('#todo-list li.completed').length;
    
    document.getElementById('total-tasks').textContent = `${total} ${total === 1 ? 'tarefa' : 'tarefas'}`;
    document.getElementById('completed-tasks').textContent = `${completed} concluída${completed !== 1 ? 's' : ''}`;
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#todo-list li').forEach(item => {
        tasks.push({
            text: item.querySelector('.todo-text').textContent,
            completed: item.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        JSON.parse(savedTasks).forEach(task => {
            addTask(task.text, task.completed);
        });
    } else {
        updateEmptyState();
    }
}