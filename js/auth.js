// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  console.log("email: ", email);
  const password = signupForm["signup-password"].value;
  console.log("password: ", password);

  // sign up a user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    // information about the newly signed up user
    console.log("user cred on sign up", cred.user);

    // close the signup modal & reset form
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout a user
const logout = document.querySelector("#logout");
logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("user signed out");
  });
});

// login a user
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // information about the logged in user
    console.log("user cred on log in", cred.user);

    // close the signup modal & reset form
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});
