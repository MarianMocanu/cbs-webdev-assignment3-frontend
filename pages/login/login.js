import { login, logout, signup } from '../../api/auth.js'

const loginSection = document.querySelector(".login-section");
const signupSection = document.querySelector(".signup-section");
const notMemberBtn = document.getElementById('show-signup-btn');
const memberBtn = document.getElementById('show-login-btn');
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

notMemberBtn.addEventListener('click', showSignupSection);
memberBtn.addEventListener('click', showLoginSection);
signupForm.addEventListener('submit', validateSignup);
loginForm.addEventListener('submit', validateLogin);

function showSignupSection() {
    loginSection.classList.add('hidden');
    signupSection.classList.remove('hidden');
}
function showLoginSection() {
    loginSection.classList.remove('hidden');
    signupSection.classList.add('hidden');
}


function validateSignup(ev) {
    ev.preventDefault();
    const data = new FormData(signupForm);
    const dataObject = formDataToObject(data);
    console.log("validate signup", dataObject.passwordRepeated,  dataObject.password);
    if(dataObject.password === dataObject.passwordRepeated) {
        const cleanedObject = (({ passwordRepeated, ...rest }) => rest)(dataObject);
        signup(cleanedObject)
    }
}

function validateLogin(ev) {
    ev.preventDefault();
    const data = new FormData(loginForm);
    const dataObject = formDataToObject(data);
    console.log("validate login", dataObject);
    login(dataObject);
}

function formDataToObject(formData) {
    const toReturn = {};
  
    for (const [key, value] of formData.entries()) {
      toReturn[key] = value;
    }
    return toReturn;
  }



