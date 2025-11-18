const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const darkModeToggle = document.getElementById("darkModeToggle");

darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
}

function showToast(message) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function addTask() {
    if (inputBox.value === '') {
        showToast("Please write something!");
    } else {
        let li = document.createElement("li")
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span")
        span.innerHTML = "\u00d7";
        li.appendChild(span);
        li.style.opacity = 1;
        li.classList.add("fade-in");

        inputBox.value = '';
        saveData();
        showToast("Task added successfully!");
    }
}

listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();

        showToast("Task completed!");
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();

        showToast("Task deleted!");
    }
}, false);

let dragged;

// listContainer.addEventListener("dragstart", function (event) {
//     dragged = event.target;
//     event.dataTransfer.setData("text/plain", null);
// });

// listContainer.addEventListener("dragover", function (event) {
//     event.preventDefault();
// });

// listContainer.addEventListener("drop", function (event) {
//     event.preventDefault();
//     if (event.target.tagName === "LI") {
//         event.target.parentNode.insertBefore(dragged, event.target);
//     } else if (event.target.tagName === "UL") {
//         event.target.appendChild(dragged);
//     }
//     saveData();
// });

const listItems = document.querySelectorAll("#list-container li");

listItems.forEach(item => {
    item.draggable = true;

    item.addEventListener("dragstart", function (e) {
        e.dataTransfer.setData("text/plain", null);
        dragged = this;
        this.style.opacity = '0.5';
    });

    item.addEventListener("dragend", function () {
        this.style.opacity = '1';
        saveData();
    });
});

listContainer.addEventListener("dragover", function (e) {
    e.preventDefault();
});

listContainer.addEventListener("drop", function (e) {
    e.preventDefault();
    if (e.target.tagName === "LI") {
        this.insertBefore(dragged, e.target);
    } else if (e.target.tagName === "UL") {
        this.appendChild(dragged);
    }
});


function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();



