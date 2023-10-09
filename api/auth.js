export async function logout(userId) {
    console.log("log out", userId);
    localStorage.removeItem('userToken')
    const userTag = document.querySelector("#user-tag");
    document.querySelector("#logout-btn").classList.add("hidden")
    document.querySelector("#login-btn").classList.remove("hidden")
    document.querySelector("#welcome-txt").classList.add("hidden")
    userTag.textContent = '';
  }

  export async function login(userObject) {
    try {
      const response = await fetch("http://localhost:3000/auth/login", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...userObject,
            returnSecureToken: true
          }),
      });
      return response;
    }
    catch(error) {
      console.log(error);
    }

}

  export async function signup(userObject) {
    console.log("signup");
    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json'
           },
           body: JSON.stringify({
               ...userObject,
               returnSecureToken: true
           }),
       });
       console.log("success");
       return response;
    }
    catch(error) {
      console.log(error);
    }
 }