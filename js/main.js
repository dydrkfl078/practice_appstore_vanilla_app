import iPads from "../data/ipads.js";
import navigations from "../data/navigations.js";

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
searchCloserEl.addEventListener("click", function (event) {
  event.stopPropagation();
  hideSearchBar();
});
shadowEl.addEventListener("click", hideSearchBar);

function showSearchBar() {
  headerEl.classList.add("searching");
  stopScroll();
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
  playScroll();
  headerMenuEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / headerMenuEls.length + "s";
  });
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = (index * 0.4) / searchDelayEls.length + "s";
  });
  searchDelayEls.reverse();

  searchInputEl.value = "";
}

function stopScroll() {
  document.documentElement.classList.add("fixed");
}
function playScroll() {
  document.documentElement.classList.remove("fixed");
}

// Header MobileMode - Searching
const cancelerEl = document.querySelector("header .search-canceler");
const textfieldEl = document.querySelector("header .textfield");

cancelerEl.addEventListener("click", function () {
  headerEl.classList.remove("searching--mobile");
});

textfieldEl.addEventListener("click", function () {
  headerEl.classList.add("searching--mobile");
  searchInputEl.focus();
});

// Header btn_main_menu toggle
const btnMenuEl = document.querySelector(".main_menu .btn_main_menu");
btnMenuEl.addEventListener("click", function () {
  if (headerEl.classList.contains("menuing")) {
    headerEl.classList.remove("menuing");
    playScroll();
    searchInputEl.value = "";
    headerEl.classList.remove("searching--mobile");
  } else {
    headerEl.classList.add("menuing");
    stopScroll();
  }
});

// Exception Handling - Searching, Searching--mobile
window.addEventListener("resize", function () {
  if (this.window.innerWidth >= 740) {
    headerEl.classList.remove("searching");
  } else {
    headerEl.classList.remove("searching--mobile");
  }
});

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

const navigationsEl = document.querySelector("footer .navigations");
navigations.forEach(function (nav) {
  const navEl = document.createElement("div");
  navEl.classList.add("map");

  let mapList = "";
  nav.maps.forEach(function (map) {
    mapList += /* html */ `
      <li>
        <a href="${map.url}">${map.name}</a>
      </li>
    `;
  });

  navEl.innerHTML = /* html */ `
    <h3>
      <span class="text">${nav.title}</span>
    </h3>
    <ul>
      ${mapList}
    </ul>


  `;

  navigationsEl.append(navEl);
});

const thisYearEl = document.querySelector(".thisyear");
thisYearEl.textContent = new Date().getFullYear();
