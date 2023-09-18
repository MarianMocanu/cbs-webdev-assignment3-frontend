export default function validatedForm(data) {
  let result = true;
  if (!isFieldValidated(data.get("country"))) {
    document.getElementById("country").classList.add("error");
    result = false;
  }
  if (!isFieldValidated(data.get("title"))) {
    document.getElementById("title").classList.add("error");
    result = false;
  }
  return result;
}

function isFieldValidated(field) {
console.log(field);
  if (field.length < 3) {
    return false;
  }
  return true;
}
