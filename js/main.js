import iPads from "../data/ipads.js";

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
        entry.target.classList.remove("show");
      } else {
        entry.target.classList.add("show");
      }
    });
  },
  {
    rootMargin: "150px 0px 0px 0px",
    threshold: 0.3,
  }
);
const infoEls = document.querySelectorAll(".info");
infoEls.forEach(function (el) {
  io.observe(el);
});

const playBtn = document.querySelector(".stage .controller--play");
const pauseBtn = document.querySelector(".stage .controller--pause");
const videoEl = document.querySelector(".stage video");

playBtn.addEventListener("click", function () {
  videoEl.play(), playBtn.classList.add("hide");
  pauseBtn.classList.remove("hide");
});

pauseBtn.addEventListener("click", function () {
  videoEl.pause(), pauseBtn.classList.add("hide");
  playBtn.classList.remove("hide");
});

// '당신에게 맞는 iPad는?' 렌더링

const itemsEl = document.querySelector("section.compare .items");
iPads.forEach(function (iPad) {
  const itemEl = document.createElement("div");
  itemEl.classList.add("item");

  let colorList = "";
  iPad.colors.forEach(function (color) {
    colorList += `<li style="background-color: ${color};"></li>`;
  });

  itemEl.innerHTML = /* html */ `
    <div class="thumbnail">
      <img src="${iPad.thumbnail}" alt="${iPad.name}"/>
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${iPad.name}</h3>
    <p class="tagline">${iPad.tagline}</p>
    <p class="price">￦${iPad.price.toLocaleString("en-US")}</p>
    <button class="btn">구입하기</button>
    <a href="${iPad.url}" class="link">더 알아보기</a>  
  `;

  itemsEl.append(itemEl);
});
