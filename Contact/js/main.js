const table = document.querySelector(".tbody")
const name = document.querySelector(".name")
const email = document.querySelector(".email")
const company = document.querySelector(".companyInput")
const role = document.querySelector(".role")
const forecast = document.querySelector(".forecast")
const activity = document.querySelector(".activity")
const form = document.querySelector(".contact__form")
let  editUserId = null
console.log("test")
window.addEventListener("load", () => {
    getUser()
})

function getUser() {
    fetch("https://67b9b13d51192bd378de25e6.mockapi.io/contcats", {
        method: "GET"
    })
        .then(element => element.json())
        .then(data => {
            innerTable(data)
        })
        .catch(erroe => console.log(erroe))
}


function innerTable(data) {
    table.innerHTML = ""
    if (data.length == 0) {
        table.innerHTML += `  <tr ><td colspan="8">
         <h2 class="table__empty">No data</h2>
        </td></tr>`
        return
    }
    data.forEach(element => {
        table.innerHTML += `
            <tr>
                <td>
                    <input class="checkbox" type="checkbox">
                </td>
                <td class="name">
                    <span class="span-img">${element?.name[0]}</span>
                    <p>${element.name}</p>
                </td>
                <td>${element.email}</td>
                <td>${element.company}</td>
                <td>${element.role}</td>
                <td>${element.forecast}</td>
                <td>${element.active}</td>
                <td class="btn-wrapped">
                    <button class="edit btn" onclick="editUser(${element.id})">Edit</button>
                    <button class="delete btn"  onclick="deleteUser(${element.id})">Delete</button>
                </td>
            </tr>
        `
    });
}

function deleteUser(id) {
    fetch(`https://67b9b13d51192bd378de25e6.mockapi.io/contcats/${id}`, {
        method: "DELETE"
    })
        .then(() => {
            getUser()
        })
        .catch(error => console.log(error))
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let newUser = {
        name: name.value,
        email: email.value,
        company: company.value,
        role: role.value,
        forecast: forecast.value,
        active: activity.value
    }

    if (newUser.name && newUser.email && newUser.company && newUser.role) {

        if (!editUserId) {
            fetch(`https://67b9b13d51192bd378de25e6.mockapi.io/contcats`, {
                method: "POST",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(() => {
                    getUser();
                    closeModal()
                    event.target.reset()
                })
                .catch(error => console.log(error))
        }
        else {
            fetch(`https://67b9b13d51192bd378de25e6.mockapi.io/contcats/${editUserId}`, {
                method: "PUT",
                body: JSON.stringify(newUser),
                headers: {
                    "Content-type": "application/json"
                }
            })
                .then(() => {
                    getUser();
                    closeModal()
                    event.target.reset();
                    editUserId = null;
                })
                .catch(error => console.log(error))
        }
    }
    else {
        alert("Forani toldiring")
    }


})


function editUser(id) {
    fetch(`https://67b9b13d51192bd378de25e6.mockapi.io/contcats/${id}`, {
        method: "GET"
    })
        .then(res => res.json())
        .then(data => {
            openModal();
            name.value = data.name;
            email.value = data.email;
            company.value = data.company;
            role.value = data.role;
            activity.value = data.active;
            forecast.value = data.forecast;
            editUserId = data.id
        })
        .catch(error => console.log(error))
}