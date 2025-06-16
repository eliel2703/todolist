        // Carrega as tarefas salvas quando a página é aberta
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
            
            // Remove mensagem de lista vazia se existir
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
            
            // Adiciona evento para marcar/desmarcar tarefa
            li.querySelector('.todo-checkbox').addEventListener('change', function() {
                li.classList.toggle('completed');
                saveTasks();
            });
            
            // Adiciona evento para remover tarefa
            li.querySelector('.delete-btn').addEventListener('click', function() {
                li.remove();
                saveTasks();
                updateEmptyState();
            });
            
            list.appendChild(li);
        }

        // Atualiza o estado vazio (mostra mensagem quando não há tarefas)
        function updateEmptyState() {
            const list = document.getElementById('todo-list');
            if (list.children.length === 0) {
                const emptyDiv = document.createElement('div');
                emptyDiv.className = 'empty-state';
                emptyDiv.textContent = 'Nenhuma tarefa adicionada ainda.';
                list.appendChild(emptyDiv);
            }
        }

        // Salva as tarefas no LocalStorage
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

        // Carrega as tarefas do LocalStorage
        function loadTasks() {
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                JSON.parse(savedTasks).forEach(task => {
                    addTask(task.text, task.completed);
                });
            }
        }