export const fetchCurrentUser = async (token) => {
  try {
    return await fetch("http://localhost:3000/auth/logedinUser", { headers: { Authorization: token } });
  } catch (error) {
    console.error(error);
  }
};
