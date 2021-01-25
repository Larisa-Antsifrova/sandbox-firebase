// References to DOM elements
const guideList = document.querySelector(".guides");

// Setting up guides
const setupGuides = (data) => {
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

  // guideList.innerHTML = html;
  guideList.insertAdjacentHTML("afterbegin", html);
};

// Setting up materialize components
document.addEventListener("DOMContentLoaded", function () {
  var modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  var items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
