import validatedForm from "./form-validation.js";
import {
  createTravelDestination,
  fetchTravelDestination,
  updateTravelDestination,
} from "../../../api/travel-destinations-api.js";
import { base64toFile, imageToBase64 } from "../../../app/util.js";

const form = document.getElementById("travel-destination-form");

const title = document.getElementById("title");
const link = document.getElementById("link");
const arrivalDate = document.getElementById("arrival-date");
const departureDate = document.getElementById("departure-date");
const image = document.getElementById("image");
const description = document.getElementById("description");
const country = document.getElementById("country");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

document.addEventListener("DOMContentLoaded", async () => {
  if (id) {
    document.querySelector(".title").textContent = "Update destination";
    document.getElementById("submit-btn").textContent = "Update";
    // fetch the destination
    const destinationResponse = await fetchTravelDestination(id);
    if (destinationResponse.ok) {
      const destination = await destinationResponse.json();
      console.log(destination);
      fillForm(destination);
    }

    // pre fill form
  }
});

const fillForm = (destination) => {
  title.value = destination.title;
  country.value = destination.country;
  link.value = destination.link ? destination.link : "";
  arrivalDate.value = destination.arrivalDate ? destination.arrivalDate.split("T")[0] : "";
  departureDate.value = destination.departureDate ? destination.departureDate.split("T")[0] : "";
  // TODO: find a way to handle the abse 64 image
  // image.files = [base64toFile(destination.image)];
  description.value = destination.description ? destination.description : "";
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  if (!validatedForm(data)) {
    return;
  }
  // TODO: handling of empty dates and image
  if (id) {
    update(id);
  } else {
    create();
  }
});

const create = async () => {
  const response = await createTravelDestination({
    country: country.value,
    title: title.value,
    link: link.value,
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
};

const update = async (travelDestinationId) => {
  const updatedTD = {
    country: country.value,
    title: title.value,
    link: link.value,
    arrivalDate: arrivalDate.value ? new Date(arrivalDate.value).toISOString() : null,
    departureDate: departureDate.value ? new Date(departureDate.value).toISOString() : null,
    image: image.files[0] ? await imageToBase64(image.files[0]) : null,
    description: description.value,
  };

  console.log("updatedTD", updatedTD);

  const response = await updateTravelDestination(travelDestinationId, updatedTD);
  if (response.ok) {
    const body = await response.json();
    // TODO update UI / give feedback
    console.log(body);
    closeFormPage();
  }
};

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
  window.location.href = "../view/view-travel-destinations.html";
};

const cancelBtn = document.getElementById("cancel-btn");
cancelBtn.addEventListener("click", () => closeFormPage());
