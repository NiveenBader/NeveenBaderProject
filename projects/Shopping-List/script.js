const tasks = document.querySelector(".tasks");

function addNewItem() {
    const newItem = document.getElementById('new-item').value;
    const category = document.getElementById('category-select').value;
    newTask(newItem, category);
    document.getElementById('new-item').value = '';
}

function newTask(value = '', category = 'Groceries') {
    const li = document.createElement('li');
    const itemName = document.createElement('div');
    const itemCategory = document.createElement('div');

    itemName.contentEditable = true;
    itemName.innerHTML = value;
    itemName.className = 'item-name';
    li.appendChild(itemName);

    itemCategory.textContent = category;
    itemCategory.className = 'item-category';
    li.appendChild(itemCategory);

    const btn = document.createElement('button');
    btn.innerHTML = 'x';
    btn.addEventListener('click', function () {
        const isAllowed = confirm(`Are you sure you want to delete ${itemName.innerHTML}?`);
        if (isAllowed) {
            li.remove();
            saveTasks();
        }
    });
    li.appendChild(btn);

    itemName.addEventListener('input', saveTasks);
    tasks.appendChild(li);
}

function saveTasks() {
    const list = document.querySelectorAll('.tasks li');
    const arr = [];

    for (const li of list) {
        const name = li.querySelector('.item-name').innerText.trim();
        const category = li.querySelector('.item-category').textContent;
        if (name) {
            arr.push({ name, category });
        }
    }

    localStorage.setItem('tasks', JSON.stringify(arr));
}

function initialData() {
    if (localStorage.tasks) {
        const tasks = JSON.parse(localStorage.tasks);

        for (const task of tasks) {
            newTask(task.name, task.category);
        }
    }
}
