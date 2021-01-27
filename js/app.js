const cafeList = document.querySelector("#cafe-list");
const addForm = document.querySelector("#add-cafe-form");

//creating one li element for each cafe
function renderCafe(doc) {
  let li = document.createElement("li");
  let name = document.createElement("span");
  let city = document.createElement("span");
  let remove = document.createElement("i");

  li.setAttribute("data-id", doc.id);
  name.textContent = doc.data().name;
  city.textContent = doc.data().city;
  remove.classList.add("material-icons");
  remove.innerHTML = "delete_forever";

  li.appendChild(name);
  li.appendChild(city);
  li.appendChild(remove);

  cafeList.appendChild(li);

  // deleting data
  remove.addEventListener("click", (e) => {
    let id = e.target.parentElement.getAttribute("data-id");

    db.collection("cafes").doc(id).delete();
  });
}

//getting data from db - static
// db.collection("cafes")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => renderCafe(doc));
//   });

// saving data to db
addForm.addEventListener("submit", (e) => {
  e.preventDefault();

  db.collection("cafes").add({
    name: addForm.name.value,
    city: addForm.city.value,
  });
  addForm.reset();
});

// filtering data
// db.collection("cafes")
//   .where("city", "==", "Kiev")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => renderCafe(doc));
//   });

//ordering data and creating custom indices
// db.collection("cafes")
//   .where("city", "==", "Kiev")
//   .orderBy("name")
//   .get()
//   .then((snapshot) => {
//     snapshot.docs.forEach((doc) => renderCafe(doc));
//   });

// real time listener
db.collection("cafes").onSnapshot((snapshot) => {
  let changes = snapshot.docChanges();
  changes.forEach((change) => {
    if (change.type === "added") {
      renderCafe(change.doc);
    } else if (change.type === "removed") {
      let li = document.querySelector(`[data-id="${change.doc.id}"`);
      cafeList.removeChild(li);
    }
  });
});
