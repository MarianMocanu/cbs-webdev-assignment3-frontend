const url = "http://localhost:3000/travel-destinations";

export const fetchTravelDestinations = async () => {
  try {
    return await fetch(url);
  } catch (error) {
    console.error(error);
  }
};

export const createTravelDestination = async (travelDestination) => {
  try {
    return await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(travelDestination),
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteTravelDestination = async (travelDestinationId, token) => {
  try {
    return await fetch(`${url}/${travelDestinationId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json", Authorization: token },
    });
  } catch (error) {
    console.error(error);
  }
};
