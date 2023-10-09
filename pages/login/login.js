import { login, logout, signup } from "../../api/auth.js";
import validatedForm from "./form-validation.js";

const loginSection = document.querySelector(".login-section");
const signupSection = document.querySelector(".signup-section");
const notMemberBtn = document.getElementById("show-signup-btn");
const memberBtn = document.getElementById("show-login-btn");
const loginForm = document.getElementById("login-form");
const signupForm = document.getElementById("signup-form");

notMemberBtn.addEventListener("click", showSignupSection);
memberBtn.addEventListener("click", showLoginSection);
signupForm.addEventListener("submit", validateSignup);
loginForm.addEventListener("submit", validateLogin);

function showSignupSection() {
  loginSection.classList.add("hidden");
  signupSection.classList.remove("hidden");
}
function showLoginSection() {
  loginSection.classList.remove("hidden");
  signupSection.classList.add("hidden");
}

function validateSignup(ev) {
  ev.preventDefault();
  document.querySelector(".unvalid-pass2").classList.add("hidden");
  const data = new FormData(signupForm);
  const dataObject = formDataToObject(data);
  console.log("validate signup", dataObject);
  const cleanedObject = (({ passwordRepeated, ...rest }) => rest)(dataObject);
  if (validatedForm(cleanedObject)) {
    if (dataObject.password === dataObject.passwordRepeated) {
      signup(cleanedObject);
    } else {
      //password not match
      document.querySelector(".unvalid-pass2").classList.remove("hidden");
    }
  }
}

async function validateLogin(ev) {
  ev.preventDefault();
  const data = new FormData(loginForm);
  const dataObject = formDataToObject(data);
  console.log("validate login", dataObject);
  const loginResponse = await login(dataObject);
  console.log(loginResponse);
  if(loginResponse.ok) {
    console.log("inside token");
        const token = (await loginResponse.json()).token;
        localStorage.setItem('userToken',token);
        window.location.href = '../travel-destination/view/view-travel-destinations.html'
  }

 }

function formDataToObject(formData) {
  const toReturn = {};

  for (const [key, value] of formData.entries()) {
    toReturn[key] = value;
  }
  return toReturn;
}
