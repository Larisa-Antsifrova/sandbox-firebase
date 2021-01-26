// listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    console.log("user logged in: ", user);
    // getting collection of guides from firestore
    db.collection("guides")
      .get()
      .then(
        (snapshot) => {
          setupUI(user);
          setupGuides(snapshot.docs);
        },
        (err) => console.log(err)
      );
  } else {
    console.log("user logged out");
    setupUI();
    setupGuides([]);
  }
});

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
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        bio: signupForm["signup-bio"].value,
      });
    })
    .then(() => {
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
  auth.signOut();
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
    // close the signup modal & reset form
    const modal = document.querySelector("#modal-login");
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });
});

// update the user info
const updateForm = document.querySelector("#update-form");

updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = firebase.auth().currentUser;
  //get user update info
  const newDisplayName = updateForm["update-display-name"].value;
  const newEmail = updateForm["update-email"].value;
  const newBio = updateForm["update-bio"].value;
  const newNumber = updateForm["update-number"].value;

  if (newDisplayName) {
    user
      .updateProfile({
        displayName: newDisplayName,
      })
      .then(function () {
        console.log("Display name updated");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  if (newEmail) {
    user
      .updateEmail(newEmail)
      .then(function () {
        setupUI(user);
        console.log("Email updated");
      })
      .catch(function (error) {
        console.log(error.message);
      });
  }

  if (newBio) {
    db.collection("users").doc(user.uid).set(
      {
        bio: newBio,
      },
      { merge: true }
    );
  }
  if (newNumber) {
    db.collection("users").doc(user.uid).set(
      {
        number: newNumber,
      },
      { merge: true }
    );
  }

  setupUI(user);

  // close the signup modal & reset form
  const modal = document.querySelector("#modal-update-account");
  M.Modal.getInstance(modal).close();
  updateForm.reset();
});
