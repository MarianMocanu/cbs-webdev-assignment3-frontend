import { fetchTravelDestinations } from "./travel-destinations-api.js";
import { formatDate } from "./util.js";

const openFormPage = () => {
  window.location.href = "create-travel-destination.html";
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
    const destinationContainer = document.createElement("div");
    destinationContainer.classList.add("destination-container");

    const image = document.createElement("img");
    image.classList.add("td-image");
    if (destination.image) {
      image.src = destination.image;
    } else {
      image.src = "assets/no-image-available.png";
    }

    const detailsContainer = document.createElement("div");
    detailsContainer.classList.add("details-container");

    const header = document.createElement("div");
    header.classList.add("td-header");

    const path = document.createElement("img");
    path.classList.add("path");
    path.src = "assets/path.svg";

    const country = document.createElement("span");
    country.classList.add("country");
    country.textContent = destination.country;

    const link = document.createElement("a");
    link.classList.add("td-link");
    if (destination.link) {
      link.href = destination.link;
      link.target = "_blank";
      link.textContent = "View on Google Maps";
    }

    header.append(path, country, link);

    const title = document.createElement("div");
    title.classList.add("td-title");
    title.textContent = destination.title;

    const date = document.createElement("div");
    date.classList.add("td-date");
    if (destination.arrivalDate && destination.departureDate) {
      date.textContent = `${formatDate(destination.arrivalDate)} - ${formatDate(destination.departureDate)}`;
    }

    const description = document.createElement("div");
    description.classList.add("td-description");
    description.textContent = destination.description;

    detailsContainer.append(header, title, date, description);

    destinationContainer.append(image, detailsContainer);

    return destinationContainer;
  });
  return htmlDestinations;
};
