import { deleteTravelDestination, fetchTravelDestinations } from "../../../api/travel-destinations-api.js";
import { fetchCurrentUser } from "../../../api/user-api.js";
import { formatDate } from "../../../app/util.js";

let token = localStorage.getItem("token");
let user = undefined;

document.querySelector(".btn-shadow").addEventListener("click", () => {
  window.location.href = "../create/create-travel-destination.html";
});

document.addEventListener("DOMContentLoaded", async () => {
  if (token) {
    const userResponse = await fetchCurrentUser(token);
    if (userResponse.ok) {
      user = await userResponse.json();
    }
  }

  const travelDestinationsResponse = await fetchTravelDestinations();
  if (travelDestinationsResponse.ok) {
    const travelDestinations = await travelDestinationsResponse.json();
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
    clone.querySelector(".destination-container").id = destination._id;
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
    // TODO: update button

    // Delete button
    const deleteButton = clone.getElementById("delete-travel-destination");
    user && user.id ? deleteButton.addEventListener("click", deleteTD) : (deleteButton.style.display = "none");
    return clone;
  });
  return htmlDestinations;
};

const deleteTD = async (event) => {
  const destination = event.target.closest(".destination-container");
  if (!destination) {
    return; // No matching destination, exit early
  }
  const confirmation = window.confirm("Are you sure you want to delete this travel destination?");
  if (!confirmation) {
    return; // User canceled, exit early
  }
  const response = await deleteTravelDestination(destination.id, token);
  if (!response.ok) {
    return; // Delete request failed, exit early
  }
  const result = await response.json();
  if (result.deletedId !== destination.id) {
    return; // Deletion was not successful, exit early
  }
  destination.remove();
};

const cloneTemplate = () => {
  const template = document.getElementById("destination-template");
  const clone = document.importNode(template.content, true);
  return clone;
};
