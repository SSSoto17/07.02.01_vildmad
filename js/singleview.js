const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = `https://exjdxiojjqpysmemownv.supabase.co/rest/v1/wildfood_mushrooms?id=eq.${id}`;

// FETCHING DATABASE

fetch(url, {
  method: "GET",
  headers: {
    apikey:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4amR4aW9qanFweXNtZW1vd252Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc3NTQ1ODUsImV4cCI6MjAyMzMzMDU4NX0.WQS4qbT85SblGCNw_3RYRrYkS1sJyqQsQTieV30-wvM",
  },
})
  .then((res) => res.json())
  .then(showData);

function showData(mushroom) {
  console.log(mushroom);

  const singleShroom = mushroom[0];

  // CREATING MUSHROOM TEMPLATE
  const shroomTemplate = document.querySelector(".mushroom_template").content;
  // CLONING MUSHROOM TEMPLATE
  const tempClone = shroomTemplate.cloneNode(true);

  // INSERTING DATA INTO TEMPLATE
  tempClone.querySelector(
    "section.overview ul.breadcrumb li.mushroom a span"
  ).textContent = singleShroom.name;
  tempClone.querySelector("section.overview ul.breadcrumb li.mushroom a").href =
    "mushroom.html?id=" + singleShroom.id;
  tempClone.querySelector("section.overview img.location").src =
    singleShroom.location_img_src;
  tempClone.querySelector("section.overview img.mushroom").src =
    singleShroom.img_src;
  tempClone.querySelector("section.overview h1").textContent =
    singleShroom.name;
  tempClone.querySelector("section.overview p.intro_text").textContent =
    singleShroom.intro_text;
  tempClone.querySelector("section.overview p.description").textContent =
    singleShroom.description;
  tempClone.querySelector("section.info article p").textContent =
    singleShroom.season_text;
  tempClone.querySelector("section.info li.location span").textContent =
    singleShroom.location;
  tempClone.querySelector("section.info li.sub_biotype_q span").textContent =
    singleShroom.sub_biotype_question;
  tempClone.querySelector("section.info li.choice_a span").textContent =
    singleShroom.sub_biotype_choice01;
  tempClone.querySelector("section.info li.choice_b span").textContent =
    singleShroom.sub_biotype_choice02;

  // APPENDING TEMPLATE TO MAIN
  const main = document.querySelector("main");
  main.appendChild(tempClone);
}
