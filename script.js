document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
  
    // Load tasks from local storage
    loadTasks();
  
    // Add new task
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTask();
    });
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText === '') return;
  
      const task = {
        id: Date.now(),
        text: taskText,
        completed: false
      };
  
      // Add to DOM
      renderTask(task);
  
      // Save to local storage
      saveTask(task);
  
      // Clear input
      taskInput.value = '';
    }
  
    function renderTask(task) {
      const taskItem = document.createElement('li');
      taskItem.className = 'task-item';
      taskItem.dataset.id = task.id;
  
      if (task.completed) {
        taskItem.classList.add('completed');
      }
  
      taskItem.innerHTML = `
        <input type="checkbox" ${task.completed ? 'checked' : ''}>
        <span class="task-text">${task.text}</span>
        <button class="delete-btn">Delete</button>
      `;
  
      // Toggle completion
      const checkbox = taskItem.querySelector('input');
      checkbox.addEventListener('change', () => {
        taskItem.classList.toggle('completed');
        updateTaskStatus(task.id, checkbox.checked);
      });
  
      // Delete task
      const deleteBtn = taskItem.querySelector('.delete-btn');
      deleteBtn.addEventListener('click', () => {
        taskItem.remove();
        deleteTask(task.id);
      });
  
      taskList.appendChild(taskItem);
    }
  
    // Local Storage Functions
    function saveTask(task) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function loadTasks() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      tasks.forEach(task => renderTask(task));
    }
  
    function updateTaskStatus(id, completed) {
      const tasks = JSON.parse(localStorage.getItem('tasks'));
      const task = tasks.find(task => task.id === id);
      if (task) task.completed = completed;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function deleteTask(id) {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks = tasks.filter(task => task.id !== id);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  });