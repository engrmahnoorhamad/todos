console.log("JS is live");
let counter = 0;

// Element Selectors
const todoInputElement = document.getElementById("todo");
const editTodoIdElement = document.getElementById("edit-todo-id");
const addTodoBtn = document.getElementById("form-submission-btn");
const updateTodoBtn = document.getElementById("update-todo-btn");
const todoItemsContainer = document.getElementById("todos");

// Class Names
const todoItemClassName = "todoItem";
const deleteBtnClassName = "todoDeleteBtn";
const todoDivElementClassName = "todoElement";
const editBtnClassName = "todoEditBtn";
const buttonsContainerClassName = "btnContainer";
const hideElementClassName = "hide-element";

// CREATE: Add a new Todo
function addTodo() {
    const todoText = todoInputElement.value.trim();

    if (!todoText) {
        return alert("There must be a value inside the input field");
    }

    counter += 1;
    const formattedTodoId = "item-" + counter;

    // Create todo text container
    const divElement = document.createElement("div"); 
    divElement.innerText = todoText; 
    divElement.className = todoDivElementClassName; 

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = deleteBtnClassName; 
    deleteBtn.innerText = "Delete"; 

    // Create edit button
    const editBtn = document.createElement("button");
    editBtn.className = editBtnClassName; 
    editBtn.innerText = "Edit"; 

    // Create main wrapper item
    const todoItemDivElement = document.createElement("div"); 
    todoItemDivElement.id = formattedTodoId; 
    todoItemDivElement.className = todoItemClassName; 
    todoItemDivElement.append(divElement);

    // Create actions container
    const buttonsContainer = document.createElement("div"); 
    buttonsContainer.className = buttonsContainerClassName; 
    buttonsContainer.append(deleteBtn);
    buttonsContainer.append(editBtn);

    todoItemDivElement.append(buttonsContainer);
    todoItemsContainer.append(todoItemDivElement);

    // Dynamic Click Event Handlers
    deleteBtn.onclick = () => {
        // If the item being deleted is currently being edited, reset the form view
        if (editTodoIdElement.value === formattedTodoId) {
            resetFormState();
        }
        todoItemDivElement.remove();
    };

    editBtn.onclick = () => {
        // 1. Populate input box with current text
        todoInputElement.value = divElement.innerText;
        // 2. Remember which ID we are editing
        editTodoIdElement.value = formattedTodoId;
        // 3. Toggle buttons visibility
        addTodoBtn.classList.add(hideElementClassName);
        updateTodoBtn.classList.remove(hideElementClassName);
        todoInputElement.focus();
    };

    // Reset input text element
    todoInputElement.value = ""; 
}

// UPDATE: Modify an existing Todo
function updateTodo() {
    const updatedTodoText = todoInputElement.value.trim();
    const targetId = editTodoIdElement.value;

    if (!updatedTodoText) {
        return alert("There must be a value inside the input field");
    }

    // Find the target element container
    const targetTodoItem = document.getElementById(targetId);
    
    if (targetTodoItem) {
        // Find the inner text node (.todoElement) and change it
        const textElement = targetTodoItem.querySelector("." + todoDivElementClassName);
        textElement.innerText = updatedTodoText;
    }

    // Reset layout view back to default
    resetFormState();
}

// Helper utility to switch form UI back to "Add Mode"
function resetFormState() {
    todoInputElement.value = "";
    editTodoIdElement.value = "";
    addTodoBtn.classList.remove(hideElementClassName);
    updateTodoBtn.classList.add(hideElementClassName);
}