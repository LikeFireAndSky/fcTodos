const list = document.getElementById("todo-wrapper")
const createBtn = document.getElementById("add-todo-button")

let todos = [];

createBtn.addEventListener("click", createNewTodo);

function createNewTodo() {
  // 새로운 아이템 객체 생성 
  const item = {
    // 객체에 인덱스 넘버 형성
    id : new Date().getTime(),
    text : "",
    complete : false
  }

  // 배열에 아이템 추가
  todos.unshift(item);

  //요소 생성하기
  const {itemEl, inputEl } = createTodoEl(item);

  // 리스트에 요소 추가하기
  list.prepend(itemEl);

  saveToLocalStorage();
}



function createTodoEl(item) {
  const itemEl = document.createElement("li");
  itemEl.classList.add("item");

  const checkboxEl = document.createElement("input");
  checkboxEl.setAttribute("type", "checkbox");
  checkboxEl.checked = item.complete;

  const inputEl = document.createElement("input");
  inputEl.setAttribute("type", "text");
  inputEl.setAttribute("placeholder", "할 일을 입력해주세요.");
  inputEl.value = item.text;
  inputEl.setAttribute("disabled", "");

  const actionEl = document.createElement("div");
  actionEl.classList.add("action");

  const editBtn = document.createElement("button");
  editBtn.classList.add("material-icons");
  editBtn.innerText = "edit";

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("material-icons","remove-btn");
  deleteBtn.innerText = "remove_circle";

  // Event'
  checkboxEl.addEventListener("change", () => {
    item.complete = checkboxEl.checked;

    if(item.complete) {
      itemEl.classList.add("complete");
    } else {
      itemEl.classList.remove("complete");
    }
    saveToLocalStorage();
  });

  inputEl.addEventListener("input", () => {
    item.text = inputEl.value;
    saveToLocalStorage();
  })

  editBtn.addEventListener("click", () => {
    inputEl.removeAttribute("disabled");
    inputEl.focus();
  })

  inputEl.addEventListener("blur", () => {
    inputEl.setAttribute("disabled", "");
    saveToLocalStorage();
  }
  )

  deleteBtn.addEventListener("click", () => {
    todos = todos.filter(t => {
      t.id !== item.id;
    })
    list.removeChild(itemEl);
    saveToLocalStorage();
  })

  actionEl.appendChild(editBtn);
  actionEl.appendChild(deleteBtn);

  itemEl.appendChild(checkboxEl);
  itemEl.appendChild(inputEl);
  itemEl.appendChild(actionEl);

  return {itemEl, inputEl, editBtn, deleteBtn};
}

function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const data = JSON.parse(localStorage.getItem("todos"));
    if(data) {
      todos = data;
  }
}

function displayTodos() {
  loadFromLocalStorage();
  for(let i = 0; i < todos.length; i++) {

    const item = todos[i];
    const { itemEl } = createTodoEl(item);

    list.append(itemEl);
  }
}

displayTodos();