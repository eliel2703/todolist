     document.addEventListener('DOMContentLoaded', function() {
            loadTasks();
            updateEmptyState();
        });

        document.getElementById('todo-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const input = document.getElementById('todo-input');
            const taskText = input.value.trim();
            
            if (taskText) {
                addTask(taskText);
                saveTasks();
                input.value = '';
                updateEmptyState();
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
                <button class="delete-btn">Remover</button>
            `;
            
            li.querySelector('.todo-checkbox').addEventListener('change', function() {
                li.classList.toggle('completed');
                saveTasks();
            });
            
            li.querySelector('.delete-btn').addEventListener('click', function() {
                li.remove();
                saveTasks();
                updateEmptyState();
            });
            
            list.appendChild(li);
        }

        function updateEmptyState() {
            const list = document.getElementById('todo-list');
            if (list.children.length === 0) {
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'empty-state';
                emptyDiv.textContent = 'Nenhuma tarefa adicionada ainda.';
                list.appendChild(emptyDiv);
            }
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
            }
        }