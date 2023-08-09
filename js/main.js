let signup = document.querySelector("#signup");
let signin = document.querySelector("#signin");
let name = document.querySelector("#name");
let Loginbtn = document.querySelector("#Loginbtn");
let Signupbtn = document.querySelector("#Signupbtn");
let LightBoxContainer = document.querySelector("#LightBoxContainer");
let alertinputs = document.querySelector("#alertinputs")
const userWelcomeEle = document.getElementById("user-welcome");
let Succesinputs=document.querySelector("#Succesinputs");
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let username = document.querySelector("#username");
let SignOutbtn=document.querySelector("#SignOut");
let InformationsList = [];




const savedInformations = localStorage.getItem("informationsList");
if (savedInformations) {
    InformationsList = JSON.parse(savedInformations);
}



Signupbtn.addEventListener("click", function () {



    if (email.value.trim() === "" || password.value.trim() === "") { // Handle the case where either email or password input is empty

        emptyinputs.classList.replace("d-none", "d-block");
        return;
    } else {
        Succesinputs.classList.replace("d-none", "d-block");

    
    
    let Informations = {
        username: username.value,
        email: email.value,
        password: password.value


    }

    InformationsList.push(Informations);

    clear();

    localStorage.setItem("informationsList", JSON.stringify(InformationsList));
}
})

Loginbtn.addEventListener("click", function () {

    if (email.value.trim() === "" || password.value.trim() === "") { // Handle the case where either email or password input is empty

        emptyinputs.classList.replace("d-none", "d-block");
        return;
    }
   
    for (let i = 0; i < InformationsList.length; i++) {


        if (email.value == InformationsList[i].email && password.value == InformationsList[i].password) {

            LightBoxContainer.classList.replace("d-none", "d-block");
            userWelcomeEle.innerHTML = `Welcome ${username.value}`

        } else {

            alertinputs.classList.replace("d-none", "d-block");

        }

    }
    localStorage.setItem("informationsList", JSON.stringify(InformationsList));
})




function clear() {
    
    email.value = ""
    password.value = ""
}


signup.addEventListener("click", function () {


    name.classList.replace("d-none", "d-block");
    Loginbtn.classList.add("d-none");
    Signupbtn.classList.replace("d-none", "d-block");
    signin.classList.remove("d-none");
    signup.classList.add("d-none");

});

signin.addEventListener("click", function () {


    name.classList.replace("d-block", "d-none");
    Loginbtn.classList.replace("d-none", "d-block");
    Signupbtn.classList.replace("d-block", "d-none");
    signin.classList.add("d-none");
    signup.classList.remove("d-none");
    Succesinputs.classList.add("d-none");
    emptyinputs.classList.add("d-none");

});

SignOutbtn.addEventListener("click",function(){

    localStorage.removeItem("informationsList");

    LightBoxContainer.classList.add("d-none");

}) 






// function ValidateEmail() {

//     let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

//     if (regex.test(email.value) == false) {

//         return false;
//     }


// }