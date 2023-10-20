const menuBtn = document.querySelector(".menu-icon span");
const searchBtn = document.querySelector(".search-icon");
const cancelBtn = document.querySelector(".cancel-icon");
const items = document.querySelector(".nav-items");
const form = document.querySelector("form");
menuBtn.onclick = () => {
  items.classList.add("active");
  menuBtn.classList.add("hide");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
};
cancelBtn.onclick = () => {
  items.classList.remove("active");
  menuBtn.classList.remove("hide");
  searchBtn.classList.remove("hide");
  cancelBtn.classList.remove("show");
  form.classList.remove("active");
  cancelBtn.style.color = "#ff3d00";
};
searchBtn.onclick = () => {
  form.classList.add("active");
  searchBtn.classList.add("hide");
  cancelBtn.classList.add("show");
};

// Tombol search
// const data = ["Apple", "Banana", "Orange", "Mango", "Grapes", "Pineapple"];

// function search() {
//   const searchInput = document
//     .getElementById("search-input")
//     .value.toLowerCase();
//   const resultsList = document.getElementById("results-list");
//   resultsList.innerHTML = "";

//   const filteredData = data.filter((item) =>
//     item.toLowerCase().includes(searchInput)
//   );

//   filteredData.forEach((item) => {
//     const listItem = document.createElement("li");
//     listItem.textContent = item;
//     resultsList.appendChild(listItem);
//   });
// }
