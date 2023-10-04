import { fetchTravelDestinations } from "../../../api/travel-destinations-api.js";
import { formatDate } from "../../../app/util.js";
import { logout } from '../../../api/auth.js';




const logoutBtn = document.getElementById('logout-btn');

const openFormPage = () => {
  window.location.href = "../create/create-travel-destination.html";
};


document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetchTravelDestinations();
  let travelDestinations;
  if (response.ok) {
    travelDestinations = await response.json();
    updateUI(travelDestinations);
  }


});

const updateUI = (destinations) => {
  const destinationsContainer = document.getElementById("destinations-container");
  const htmlDestinations = convertToHTML(destinations);
  destinationsContainer.append(...htmlDestinations);
};

const convertToHTML = (destinations) => {
  const htmlDestinations = destinations.map((destination) => {
    const clone = cloneTemplate();
    clone.getElementById("td-country").textContent = destination.country;
    clone.getElementById("td-title").textContent = destination.title;
    destination.description
      ? (clone.getElementById("td-description").textContent = destination.description)
      : undefined;
    destination.image ? (clone.getElementById("td-image").src = destination.image) : undefined;
    destination.link
      ? (clone.getElementById("td-link").href = destination.link)
      : clone.getElementById("td-link").classList.add("hidden");
    destination.arrivalDate && destination.departureDate
      ? (clone.getElementById("td-date").textContent = `${formatDate(destination.arrivalDate)} - ${formatDate(
          destination.departureDate
        )}`)
      : undefined;
    return clone;
  });
  return htmlDestinations;
};

function cloneTemplate() {
  const template = document.getElementById("destination-template");
  const clone = document.importNode(template.content, true);
  return clone;
}

document.querySelector(".btn-shadow").addEventListener("click", openFormPage);
logoutBtn.addEventListener('click', logout())
