const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        alert("Please write down a task");
        return;
    }

    // Create a new li element
    const li = document.createElement("li");

    li.innerHTML = `
      <label>
        <input type="checkbox">
        <span>${task}</span>
      </label>
      <span class="edit-btn">Edit</span>
      <span class="delete-btn">Delete</span>
    `;

    // Append the new task to the list container
    listContainer.appendChild(li);
    inputBox.value = ""; // Clear the input field

    // Get references to the elements inside the new task
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    // Checkbox event to mark task as completed or uncompleted
    checkbox.addEventListener("click", function() {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    // Edit button event to edit the task
    editBtn.addEventListener("click", function() {
        const update = prompt("Edit task:", taskSpan.textContent);
        if (update !== null && update.trim() !== "") {
            taskSpan.textContent = update.trim();
            li.classList.remove("completed");
            checkbox.checked = false;
            updateCounters();
        }
    });

    // Delete button event to delete the task
    deleteBtn.addEventListener("click", function() {
        if (confirm("Are you sure you want to delete this task?")) {
            li.remove();
            updateCounters();
        }
    });

    // Update counters after adding a new task
    updateCounters();
}

// Function to update the task counters
function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}