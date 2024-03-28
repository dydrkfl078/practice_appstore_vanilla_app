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
const headerMenuEls = [...headerEl.querySelectorAll("ul.main_menu li")];
const searchDelayEls = [...headerEl.querySelectorAll(".search li")];
const searchInputEl = headerEl.querySelector("input");

searchBtnEl.addEventListener("click", showSearchBar);
searchCloserEl.addEventListener("click", hideSearchBar);
shadowEl.addEventListener("click", hideSearchBar);

function showSearchBar() {
  headerEl.classList.add("searching");
  document.documentElement.classList.add("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  setTimeout(function () {
    console.log("setTimeOut!");
    searchInputEl.focus();
  }, 600);
}
function hideSearchBar() {
  headerEl.classList.remove("searching");
  document.documentElement.classList.remove("fixed");
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();

  searchInputEl.value = "";
}

//  Info Intersection Observer Animation
const io = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 1,
  }
);
const infoEls = document.querySelectorAll(".info");
infoEls.forEach(function (el) {
  io.observe(el);
});
