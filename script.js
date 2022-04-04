"use script";

const search = document.querySelector(".search").value;
const par5 = document.querySelector(".par5");
const cards = document.querySelector(".cards");
const searchButton = document.querySelector(".button");

let container = document.querySelector(".container");

let repice = document.querySelector(".get-repice");

let recipeMore = document.querySelector(".recipe");
let recipeName = document.querySelector(".recipe-name");
let recipeCategory = document.querySelector(".recipe-category");
let recipeDesc = document.querySelector(".recipe-desc");
let btnClose = document.querySelector(".close-recipe");

let data = 0;
const btn = document.querySelector(".btn");

recipeMore.style.display = "none";

const getFoodInfo = function (search) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((response) => response.json())
    .then((res) => {
      data = res;
      res.meals.forEach((element) => {
        renderHtml(element);
      });
    });
};

function renderHtml(obj) {
  let html = `<div class="card" id='${obj.idMeal}'>
  <img src="${obj.strMealThumb}" alt="Picture" class="picture" />
  <p class="food_name">${obj.strMeal}</p>
  <button class="btn">Get Recipe</button>
</div>`;

  cards.insertAdjacentHTML("beforeend", html);
}

document.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    cards.innerHTML = "";
    e.preventDefault();
    getFoodInfo(search);
  }
});

// searchButton.addEventListener("click", function (e) {
//   cards.innerHTML = "";
//   e.preventDefault();
//   getFoodInfo(search);
// });

cards.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn")) {
    let id = e.target.parentElement.id;
    let obj = data.meals.find((el) => el.idMeal == id);
    recipeName.textContent = obj.strMeal;
    recipeCategory.textContent = obj.strCategory;
    recipeDesc.textContent = obj.strInstructions;
    recipeMore.style.display = "block";
  }
});
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  recipeMore.style.display = "none";
});
