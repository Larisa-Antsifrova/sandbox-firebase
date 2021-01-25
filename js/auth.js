// signup
const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm["signup-email"].value;
  console.log("email: ", email);
  const password = signupForm["signup-password"].value;
  console.log("password: ", password);

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then((cred) => {
    // information about the newly signed up user
    console.log(cred.user);

    // close the signup modal & reset form
    const modal = document.querySelector("#modal-signup");
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});
