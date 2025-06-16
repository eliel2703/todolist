document.getElementById('todo-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const input = document.getElementById('todo-input');
    const taskText = input.value.trim();
    
    if (taskText) {
        addTask(taskText);
        input.value = '';
    }
});

function addTask(text) {
    const list = document.getElementById('todo-list');
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Remover</button>
    `;
    
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
    });
    
    list.appendChild(li);
}