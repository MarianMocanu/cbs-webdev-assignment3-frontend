export default function validatedForm(data) {

    const unvalidName= document.querySelector(".unvalid-name");
    const unvalidEmail= document.querySelector(".unvalid-email");
    const unvalidPassword= document.querySelector(".unvalid-pass1");

    unvalidName.classList.add("hidden");
    unvalidEmail.classList.add("hidden");
    unvalidPassword.classList.add("hidden");

    let result = true;
    if (!isFieldValidated(data.name, "name")) {
        unvalidName.classList.remove("hidden");
      result = false;
    }
    if (!isFieldValidated(data.email, "email")) {
        unvalidEmail.classList.remove("hidden");
        result = false;
    }
    if (!isPasswordValidated(data.password)) {
        unvalidPassword.classList.remove("hidden");
        result = false;
    }
    return result;
  }
  
  function isFieldValidated(field, type) {
    console.log(field);
    if(type === "name") {
        if (field.length < 2) {
            return false;
          }
    } else if(type === "email") {
        if (field.length < 5) {
            return false;
          }
    } 
    return true;
  }

  function isPasswordValidated(field) {
    console.log(field);
    if (field.length < 8) {
      return false;
    }
    return true;
  }
  