import { login, signup } from "../../api/auth.js";
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

async function validateSignup(event) {
  event.preventDefault();
  document.querySelector(".unvalid-pass2").classList.add("hidden");
  const signupData = new FormData(signupForm);
  const signupObject = formDataToObject(signupData);
  const cleanedObject = (({ passwordRepeated, ...rest }) => rest)(signupObject);
  if (validatedForm(cleanedObject)) {
    if (signupObject.password === signupObject.passwordRepeated) {
      const signupResponse = await signup(cleanedObject);
      if (signupResponse.ok) {
        showLoginSection();
      }
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
  if (loginResponse.ok) {
    console.log("inside token");
    const token = (await loginResponse.json()).token;
    localStorage.setItem("userToken", token);
    window.location.href = "../travel-destination/view/view-travel-destinations.html";
  }
}

function formDataToObject(formData) {
  const result = {};
  for (const [key, value] of formData.entries()) {
    result[key] = value;
  }
  return result;
}
