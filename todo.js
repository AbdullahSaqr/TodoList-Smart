const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const todoLane = document.getElementById("todo-lane");
const progressLane = document.getElementById("progress-lane");
const doneLane = document.getElementById("done-lane");
const resetButton = document.getElementById("reset-button");





// Load tasks from Local Storage when the page loads
document.addEventListener("DOMContentLoaded", () => {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((taskText) => {
    // Check if the task with the same text already exists before adding it
    if (!taskExists(taskText)) {
      createTaskElement(taskText);
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  createTaskElement(value);

  input.value = "";

  // Save tasks to Local Storage after adding
  saveTasksToLocalStorage();
});

resetButton.addEventListener("click", () => {
  // Clear form inputs
  input.value = "";

  // Clear existing tasks' text and containers, but keep the section headers
  clearTasks(todoLane);
  clearTasks(progressLane);
  clearTasks(doneLane);

  // Reset the background color of swim lanes
  resetLaneBackground(todoLane);
  resetLaneBackground(progressLane);
  resetLaneBackground(doneLane);

  // Clear tasks from Local Storage
  localStorage.removeItem("tasks");
});

// Function to clear tasks' text and containers inside a lane, but keep the header
const clearTasks = (lane) => {
  const tasks = lane.querySelectorAll(".task");
  tasks.forEach((task) => {
    task.remove();
  });
};

// Function to reset the background color of a swim lane
const resetLaneBackground = (lane) => {
  lane.style.backgroundColor = "#a5d6a7";
};

// Function to check if a task with the same text already exists
const taskExists = (text) => {
  const existingTasks = Array.from(document.querySelectorAll(".task")).map((task) => task.innerText);
  return existingTasks.includes(text);
};

// Function to create a new task element
const createTaskElement = (text) => {
  const newTask = document.createElement("p");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  newTask.innerText = text;

  if (!newTask.querySelector(".remove-button")) {
    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';


    removeButton.addEventListener("click", () => {
      newTask.remove();
      saveTasksToLocalStorage(); 
    });

    newTask.appendChild(removeButton);
  }

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
  });

  todoLane.appendChild(newTask);

  // Save tasks to Local Storage after adding
  saveTasksToLocalStorage();
};
// Function to save tasks to Local Storage
const saveTasksToLocalStorage = () => {
  const tasks = Array.from(document.querySelectorAll(".task")).map((task) => task.innerText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Created By Dev Abdullah Mohammed Saqr


