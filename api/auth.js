export async function logout(userId) {
    console.log("log out", userId);
    localStorage.removeItem('userToken')
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
      const token = (await response.json()).token;
      console.log(token);
      localStorage.setItem('userToken',token)
      return response;
    }
    catch(error) {
      console.log(error);
    }

}

  export async function signup(userObject) {
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