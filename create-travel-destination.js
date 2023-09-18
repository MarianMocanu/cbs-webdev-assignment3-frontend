import validatedForm from "./form-validation.js";
import { createTravelDestination } from "./travel-destinations-api.js";
import { imageToBase64 } from "./util.js";

const form = document.getElementById("travel-destination-form");

const title = document.getElementById("title");
const link = document.getElementById("link");
const arrivalDate = document.getElementById("arrival-date");
const departureDate = document.getElementById("departure-date");
const image = document.getElementById("image");
const description = document.getElementById("description");
const country = document.getElementById("country");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  console.log(data.get('country'));
  if(!validatedForm(data)) {
    return
  }


  // TODO handling of empty dates and image

  const response = await createTravelDestination({
    country: country.value,
    title: title.value,
    link: link.value ? link.value : undefined,
    arrivalDate: arrivalDate.value ? new Date(arrivalDate.value).toISOString() : undefined,
    departureDate: departureDate.value ? new Date(departureDate.value).toISOString() : undefined,
    image: image.files[0] ? await imageToBase64(image.files[0]) : undefined,
    description: description.value ? description.value : undefined,
  });
  if (response.ok) {
    const body = await response.json();
    // TODO update UI / give feedback
    console.log(body);
    closeFormPage();
  }
});

arrivalDate.addEventListener("input", () => {
  departureDate.min = arrivalDate.value;
});

departureDate.addEventListener("input", () => {
  console.log(arrivalDate.value);
  if (!arrivalDate.value) {
    arrivalDate.value = departureDate.value;
    departureDate.value = "";
  }
});

const closeFormPage = () => {
  window.location.href = "view-travel-destinations.html";
};

const cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", () => closeFormPage());
