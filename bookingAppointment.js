const userNameInput = document.getElementById('userName');
const userEmailInput = document.getElementById('email');
const phoneInput = document.getElementById('phNumber');

//backend server URL
const serverURL = "https://crudcrud.com/api/12ea28e0f91f45009622aec214efcdc5/bookingAppointment";

//event handling when clicked on submit button
const submitBtn = document.getElementById('btn');
submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const userDetails = {
        userName: userNameInput.value,
        email: userEmailInput.value,
        phone: phoneInput.value
    };

    axios.post(serverURL, userDetails)
        .then((result) => {
            console.log(result);
            displayDetailsOnDashboard(userDetails);
        }).catch((err) => {
            console.log(err);
        });

    //clearing the input fields
    userNameInput.value = "";
    userEmailInput.value = "";
    phoneInput.value = "";
});

//function to display details on dashboard on page reload
window.addEventListener("DOMContentLoaded", () => {
    axios.get(serverURL)
        .then((result) => {
            console.log(result);
            for (let i = 0; i < result.data.length; i++) {
                displayDetailsOnDashboard(result.data[i]);
            }
        }).catch((err) => {
            console.log(err);
        });
})

//function to display details on Dashboard
function displayDetailsOnDashboard(userDetails) {

    const li = document.createElement("li");
    li.appendChild(
        document.createTextNode(
            `${userDetails.userName} - ${userDetails.email} - ${userDetails.phone}    `
        )
    );

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    li.appendChild(deleteBtn);
    deleteBtn.className = "btn btn-outline-danger btn-sm rounded dynamic-button";  //used bootstrap for design

    li.appendChild(document.createTextNode(`  `));

    const editBtn = document.createElement("button");
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);
    editBtn.className = "btn btn-outline-warning btn-sm rounded dynamic-button";  //used bootstrap for design

    const ul = document.getElementById("list");
    ul.appendChild(li);

    //delete button functionality
    deleteBtn.addEventListener("click", (event) => {
        axios.delete(`${serverURL}/${userDetails._id}`)
            .then((result) => {
                ul.removeChild(event.target.parentElement);
            }).catch((err) => {
                console.error(err);
            });
    })

    //edit button functionality
    editBtn.addEventListener("click", (event) => {
        ul.removeChild(event.target.parentElement);
        userNameInput.value = userDetails.userName;
        userEmailInput.value = userDetails.email;
        phoneInput.value = userDetails.phone;
        axios.delete(`${serverURL}/${userDetails._id}`)
            .then((result) => {
                console.log(result);
            }).catch((err) => {
                console.error(err);
            });
    })
}