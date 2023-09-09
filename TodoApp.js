let gorevListesi = [
  { gorevAdi: "Görev 1", id: "1" },
  { gorevAdi: "Görev 2", id: "2" },
  { gorevAdi: "Görev 3", id: "3" },
  { gorevAdi: "Görev 4", id: "4" },
];

let IseditTask = false;

displayFunc();
function displayFunc() {
  let ul = document.getElementById("taskUl");
  ul.innerHTML = "";

  if (gorevListesi == "") {
    ul.innerHTML = `<p class="m-1 p-2">Görev Listeniz Boş.</p>`;
  }
  for (let gorev of gorevListesi) {
    li = `
                <li class="list-group-item d-flex justify-content-between">
                    <div>
                        <input type="checkbox"  name="" onchange='degistir(${gorev.id}, "${gorev.gorevAdi}",this)' class="form-check-input" id="${gorev.id}">
                        <label id="label" for="${gorev.id}">${gorev.gorevAdi}</></label>
                    </div>
                    <div class="dropdown">
                        <a class="" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                <i class="fa-solid fa-ellipsis"></i>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="triggerId">
                            <a class="dropdown-item" onclick="deleteTask(${gorev.id})"href="#"><i class="fa-solid fa-trash"></i> Sil</a>
                            <a class="dropdown-item" onclick='editTask(${gorev.id}, "${gorev.gorevAdi}")' href="#"><i class="fa-solid fa-pencil"></i> Düzenle</a>
                        </div>
                    </div>
                </li>
            `;
    ul.insertAdjacentHTML("beforeend", li);
  }
}
document.getElementById("Btntask").addEventListener("click", addTask);
function addTask(event) {
  let task = document.getElementById("taskİnput").value;
  if (task == "") {
    alert("Lütfen Bir Değer Giriniz");
  } else {
    gorevListesi.push({ gorevAdi: task, id: gorevListesi.length + 1 });
    displayFunc();
  }
  event.preventDefault();
}

function deleteTask(id) {
  for (let index in gorevListesi) {
    if (gorevListesi[index].id == id) {
      gorevListesi.splice(index, 1);
      displayFunc();
    }
  }
}
let editId;
function editTask(taskId, taskName) {
  editId = taskId;
  let taskİnput = document.getElementById("taskİnput");
  taskİnput.value = taskName;
  taskİnput.focus();
  taskİnput.classList.add("active");

  document.getElementById("Btnupdate").addEventListener("click", updateTask);

  function updateTask() {
    let newValue = taskİnput.value;
    if (newValue == "") {
    } else {
      for (let gorev of gorevListesi) {
        if (gorev.id == editId) {
          gorev.gorevAdi = newValue;
          break;
        }
      }
    }
    displayFunc();
    taskİnput.classList.remove("active");
    taskİnput.value = "";
    editId = null;
  }
}

document.querySelector("#clear").addEventListener("click", clearAll);
function clearAll() {
  gorevListesi.splice(0, gorevListesi.length);
  displayFunc();
}

function degistir(id, name, value) {
  let checkbox = value;
  let eleman = value.nextElementSibling;
  if (checkbox.checked) {
    for (let i of gorevListesi) {
      if (i.id == id) {
        eleman.innerHTML = `<del>${name}</del>`;
      }
    }
  } else {
    eleman.innerText = `${name}`;
  }
}
