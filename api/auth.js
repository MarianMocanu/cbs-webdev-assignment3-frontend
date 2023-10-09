export async function login(userObject) {
  try {
    const response = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userObject,
        returnSecureToken: true,
      }),
    });
    return response;
  } catch (error) {
    console.log(error);
  }
}

export async function signup(userObject) {
  console.log("signup");
  try {
    const response = await fetch("http://localhost:3000/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...userObject,
        returnSecureToken: true,
      }),
    });
    console.log("success");
    return response;
  } catch (error) {
    console.log(error);
  }
}
