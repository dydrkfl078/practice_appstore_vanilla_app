// Shopping Bag

const btnShopBagEl = document.querySelector("header .btn_shopping_bag");
const shopBagEl = btnShopBagEl.querySelector(".shopping_bag");

btnShopBagEl.addEventListener("click", function (event) {
  event.stopPropagation();
  console.log("click");
  if (shopBagEl.classList.contains("show")) {
    closeShopBag();
  } else {
    openShopBag();
  }
});

shopBagEl.addEventListener("click", function (event) {
  event.stopPropagation();
});

window.addEventListener("click", function () {
  closeShopBag();
});

function closeShopBag() {
  shopBagEl.classList.remove("show");
}

function openShopBag() {
  shopBagEl.classList.add("show");
}

// Header_SearchBar

const headerEl = document.querySelector("header");
const searchBtnEl = document.querySelector(".btn_search");
const searchCloserEl = document.querySelector(".search-closer");
const shadowEl = headerEl.querySelector(".shadow");

searchBtnEl.addEventListener("click", showSearchBar);
searchCloserEl.addEventListener("click", hideSearchBar);
shadowEl.addEventListener("click", hideSearchBar);

function showSearchBar() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
}
function hideSearchBar() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
}
