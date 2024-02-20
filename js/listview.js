// SETTING UP URL PARAMETERS

const urlParams = new URLSearchParams(window.location.search);
const seasonURL = urlParams.get("seasons");
let url;

// FILTER BY SEASON

if (seasonURL) {
  // SEARCH URL FOR SEASON PARAMETER
  url = `https://exjdxiojjqpysmemownv.supabase.co/rest/v1/wildfood_mushrooms?season=cs.["${seasonURL}"]`;

  // HIDE AND DISPLAY DIFFERENT HEADINGS
  document.querySelector("#discover_hero h1.no_season").classList.add("hide");
  document.querySelector("#discover_hero h1.season").classList.remove("hide");

  // CHANGE HERO IMAGE AND HEADING BASED ON SEASON
  if (seasonURL == "Winter") {
    document.querySelector("#discover_hero").style.backgroundImage =
      "url('../svg/season_winter.svg')";
    document.querySelector("#discover_hero h1.season").textContent = "Winter";
  } else if (seasonURL == "Spring") {
    document.querySelector("#discover_hero").style.backgroundImage =
      "url('../svg/season_spring.svg')";
    document.querySelector("#discover_hero h1.season").textContent = "Spring";
  } else if (seasonURL == "Summer") {
    document.querySelector("#discover_hero").style.backgroundImage =
      "url('../svg/season_summer.svg')";
    document.querySelector("#discover_hero h1.season").textContent = "Summer";
  } else if (seasonURL == "Fall") {
    document.querySelector("#discover_hero").style.backgroundImage =
      "url('../svg/season_fall.svg')";
    document.querySelector("#discover_hero h1.season").textContent = "Fall";
  }
} else {
  // SET URL TO DEFAULT WITHOUT SEASON FILTER
  url = "https://exjdxiojjqpysmemownv.supabase.co/rest/v1/wildfood_mushrooms";

  // HIDE AND DISPLAY DIFFERENT HEADINGS
  document
    .querySelector("#discover_hero h1.no_season")
    .classList.remove("hide");
  document.querySelector("#discover_hero h1.season").classList.add("hide");
}

// FETCH DATA FROM SUPABASE WITH API KEY
fetch(url, {
  method: "GET",
  headers: {
    apikey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4amR4aW9qanFweXNtZW1vd252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NTQ1ODUsImV4cCI6MjAyMzMzMDU4NX0.WQS4qbT85SblGCNw_3RYRrYkS1sJyqQsQTieV30-wvM",
  },
})
  .then((res) => res.json())
  .then(showData);

// LOOP DATA IN PREPARATION FOR TEMPLATE

function showData(mushrooms) {
  console.log(mushrooms);
  mushrooms.forEach(listMushrooms);
}

function listMushrooms(mushroom) {
  // CREATE AND CLONE TEMPLATE
  const cardTemplate = document.querySelector(".card_template").content;
  const tempClone = cardTemplate.cloneNode(true);

  // EDIT CONTENT IN TEMPLATE
  tempClone.querySelector("h1").textContent = mushroom.name;
  tempClone.querySelector("h2").textContent = mushroom.intro_text;
  tempClone.querySelector("img").src = mushroom.img_src;
  tempClone.querySelector("a").href = `mushroom.html?id=${mushroom.id}`;

  // APPEND TEMPLATE IN HTML FILE
  const listContainer = document.querySelector(".grid_container");
  listContainer.appendChild(tempClone);
}
