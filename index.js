const addTxt = document.querySelector("#addTxt");
const addBtn = document.querySelector("#addBtn");
const todoList = document.querySelector("#todoList");

let todos = [];

window.onload = ()=>{
    todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos[0]) {return;}
    console.log(todos);
    todos.map(t=>{
        todoList.innerHTML += `
            <li class="border rounded p-2 mb-1 d-flex justify-content-between align-items-center">
                <p>${t.title}</p>
                <div>
                    <button class="btn btn-sm btn-danger" onclick="deleteTodo(${(t.id)})">Sil</button>
                    <button class="btn btn-sm btn-success" onclick="editTodo(${(t.id)})">Düzenle</button>
                </div>
            </li>
        `;
    });
};

addBtn.addEventListener("click", (e)=>{
    e.preventDefault();
    if (addTxt.value == "") {return alert("Lütfen Alanı Doldurunuz");}

    todos.push({id: todos.length + 1, title: addTxt.value});
    todoList.innerHTML += `
        <li class="border rounded p-2 mb-1 d-flex justify-content-between align-items-center">
            <p>${addTxt.value}</p>
            <div>
                <button class="btn btn-sm btn-danger" onclick="deleteTodo(${(todos.length)})">Sil</button>
                <button class="btn btn-sm btn-success" onclick="editTodo(${(todos.length)})">Düzenle</button>
            </div>
        </li>
    `;
    localStorage.setItem("todos", JSON.stringify(todos));

    console.log(todos);
    addTxt.value = "";
});

const deleteTodo = (id) =>{
    if (confirm("Silmek İstediğinizden Emin misiniz?")) {
        const index = todos.findIndex(t=>t.id == id);
        todos.splice(index, 1);
        todoList.innerHTML="";
        todos.map(t=>{
            todoList.innerHTML += `
                <li class="border rounded p-2 mb-1 d-flex justify-content-between align-items-center">
                    <p>${t.title}</p>
                    <div>
                        <button class="btn btn-sm btn-danger" onclick="deleteTodo(${(t.id)})">Sil</button>
                        <button class="btn btn-sm btn-success" onclick="editTodo(${(t.id)})">Düzenle</button>
                    </div>
                </li>
            `;
        });
        localStorage.setItem("todos", JSON.stringify(todos));
    } 
};

const editTodo = (id)=>{
    const index = todos.findIndex(t=>t.id == id);

    todos.splice(index, 1, {id: todos.length + 1, title: addTxt.value});
    todoList.innerHTML="";
    todos.map(t=>{
        todoList.innerHTML += `
            <li class="border rounded p-2 mb-1 d-flex justify-content-between align-items-center">
                <p>${t.title}</p>
                <div>
                    <button class="btn btn-sm btn-danger" onclick="deleteTodo(${(t.id)})">Sil</button>
                    <button class="btn btn-sm btn-success" onclick="editTodo(${(t.id)})">Düzenle</button>
                </div>
            </li>
        `;
    });

    addTxt.value = "";
    localStorage.setItem("todos", JSON.stringify(todos));
}





