// References to DOM elements
const guideList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

// Setting up UI
const setupUI = (user) => {
  if (user) {
    // account info
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        const html = `
        <div>Logged in as ${user.displayName}</div>
        <div>Your e-mail is ${user.email}</div>
        <div>${doc.data().number}</div>
        <div>${doc.data().bio}</div>
      `;
        accountDetails.innerHTML = html;
      });

    // toggle user UI elements
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  } else {
    // clear account info
    accountDetails.innerHTML = "";

    // toggle user elements
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};

// Setting up guides
const setupGuides = (data) => {
  if (data.length) {
    let html = "";

    data.forEach((doc) => {
      const guide = doc.data();

      // .data() is the method to get actual data from one firestore document
      console.log("guide", guide);

      const li = `
      <li>
        <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
        <div class="collapsible-body white"> ${guide.content} </div>
      </li>
    `;

      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML =
      '<h5 class="center-align">Hello there! Login to view guides.</h5>';
  }
};

// Setting up materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
