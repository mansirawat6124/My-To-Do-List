let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function addTask() {
  const taskInput = document.getElementById("taskInput").value.trim();
  const taskDateTime = document.getElementById("taskDateTime").value;

  if (!taskInput) {
    alert("Please enter a task.");
    return;
  }

  const task = {
    id: Date.now(),
    text: taskInput,
    dateTime: taskDateTime,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  // Clear inputs
  document.getElementById("taskInput").value = "";
  document.getElementById("taskDateTime").value = "";
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = task.completed ? "done" : "";

    li.innerHTML = `
      ${task.text}<br>
      ${task.dateTime ? "⏰ " + new Date(task.dateTime).toLocaleString() : ""}
      <button onclick="toggleTask(${task.id})">✔</button>
      <button onclick="deleteTask(${task.id})" style="right: 40px;">🗑️</button>
    `;

    list.appendChild(li);
  });
}

function toggleTask(id) {
  tasks = tasks.map(task =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
  renderTasks();
}

document.getElementById("toggleMode").addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Reminder checker
setInterval(() => {
  const now = new Date().toISOString().slice(0, 16);
  tasks.forEach(task => {
    if (!task.completed && task.dateTime === now) {
      alert("🔔 Reminder: " + task.text);
    }
  });
}, 60000); // Check every minute

// Initial display
renderTasks(); 