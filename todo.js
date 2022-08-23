// Deklerasyon 
let veri = document.querySelector("#veri"), ekle = document.querySelector("#ekle"), list = document.querySelector("#list"), temizle = document.querySelector("#temizle");

//let veriler = JSON.parse(localStorage.getItem("todo"))
let veriler = JSON.parse(localStorage.getItem("todo"))
console.log(localStorage.getItem("todo"))


// Yeni Todo Ekle
let addToLocalStorage = () => {

    // Herhangi bir kayıt yoksa listeyi temizle
    if (list.firstChild && list.firstChild.innerText == "Herhangi bir kayıt yok!") {
        list.innerHTML = ""
    }

    let todoTemplate = {
        "id": (new Date().getTime().toString()),
        "description": veri.value,
        "status": false
    };

    if (veriler == null) veriler = [];
    veriler.push(todoTemplate)
    localStorage.setItem("todo", JSON.stringify(veriler));

    getDataFromLocalStorage()

    veri.value = ""
}

// Tüm Todoları Silme
let clearAllLocalStorage = () => {
    localStorage.clear()
    list.innerHTML = ""
    veriler = []
}

// Tüm Todoları Listele
let getDataFromLocalStorage = () => {

    list.innerHTML = ""

    if (veriler != null) {

        for (let i = 0; i < veriler.length; i++) {
            let status = (veriler[i].status) ? "done" : "";
            let li = document.createElement("li")
            li.id = veriler[i].id
            li.innerHTML = `<span class="${status}" onclick="changeTodoStatus(this, this.classList, ${i})">${veriler[i].description}</span>`
            li.innerHTML += `<div><button onclick="editCurrentTodo(this.parentElement.parentElement, ${i})">Düzenle</button> <button onclick="deleteTodo(${i})">Sil</button></div>`
            list.appendChild(li)
        }


    } else {
        let li = document.createElement("li")
        li.innerText = "Herhangi bir kayıt yok!"
        list.appendChild(li)
    }

}

// Todo Düzenleme
let editCurrentTodo = (todo, i) => {
    console.log(todo)
    let span = todo.querySelector('span')
    span.setAttribute("contenteditable", "true")
    span.focus()
    span.addEventListener('input', () => {
        veriler[i].description = span.innerText
        localStorage.setItem("todo", JSON.stringify(veriler))
    })
}

// Todo Yapıldı İşaretlemesi
let changeTodoStatus = (span, status, i) => {

    if (status[0] == "done") {
        span.classList.toggle("done")
        veriler[i].status = false
        localStorage.setItem("todo", JSON.stringify(veriler))

    } else {
        span.classList.toggle("done")
        veriler[i].status = true
        localStorage.setItem("todo", JSON.stringify(veriler))
    }

}

// Todo Silme İşlemi
let deleteTodo = (i) => {
    veriler.splice(i, 1)
    localStorage.setItem("todo", JSON.stringify(veriler))
    getDataFromLocalStorage()
}

// Events
ekle.addEventListener('click', addToLocalStorage)
temizle.addEventListener('click', clearAllLocalStorage)

getDataFromLocalStorage()