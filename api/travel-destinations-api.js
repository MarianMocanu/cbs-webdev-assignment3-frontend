export const fetchTravelDestinations = async () => {
  const response = await fetch("http://localhost:3000/travel-destinations");
  return response;
};

export const createTravelDestination = async (travelDestination) => {
  const response = await fetch("http://localhost:3000/travel-destinations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(travelDestination),
  });
  return response;
};
