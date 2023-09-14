const form = document.getElementById("travel-destination-form");

const title = document.getElementById("title");
const link = document.getElementById("link");
const arrivalDate = document.getElementById("arrival-date");
const departureDate = document.getElementById("departure-date");
const image = document.getElementById("image");
const description = document.getElementById("description");
const country = document.getElementById("country");

const imageToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!country.value) {
    // TODO Feedback for user
    console.log("Country is required");
    return;
  }
  if (!title.value) {
    // TODO Feedback for user
    console.log("Title is required");
    return;
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

const createTravelDestination = async (travelDestination) => {
  const response = await fetch("http://localhost:3000/travel-destination", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travelDestination),
  });
  return response;
};

const closeFormPage = () => {
  window.location.href = "view-travel-destinations.html";
};
