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
