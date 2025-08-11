//const btn_generator = document.getElementById("btn_generator");
const btn_previous = document.getElementById("btn_previous");
const btn_next = document.getElementById("btn_next");
const root = document.getElementById("root");

const image1 = document.getElementsByClassName("image-1")[0];
const image2 = document.getElementsByClassName("image-2")[0];
const image3 = document.getElementsByClassName("image-3")[0];

// execute display none one time at start
image1.style.display = "none";
image2.style.display = "none";
image3.style.display = "none";

let counter = 0;

setInterval(() => {
  image1.style.display = counter === 0 ? "" : "none";
  image2.style.display = counter === 1 ? "" : "none";
  image3.style.display = counter === 2 ? "" : "none";
  counter = (counter + 1) % 3;
}, 4000);

const baseUrl = "https://dragonball-api.com/api/characters";
let characters = [];

const abreviacoesPadrao = {
  billion: "B",
  trillion: "T",
  quadrillion: "Qa",
  quintillion: "Qi",
  sextillion: "Sx",
  septillion: "Sp",
  octillion: "Oc",
  nonillion: "No",
  decillion: "Dc",
  googolplex: "Gp",
};

const superCharacter = (character) => {
  let poderBase = String(character.ki || "")
    .toLowerCase()
    .replaceAll(",", ".");
  let isSuper = false;

  for (const [key, value] of Object.entries(abreviacoesPadrao)) {
    if (poderBase.includes(key)) {
      poderBase = poderBase.replaceAll(key, value);
    }
  }

  let poderMaximo = String(character.maxKi || "")
    .toLowerCase()
    .replaceAll(",", ".");
  for (const [key, value] of Object.entries(abreviacoesPadrao)) {
    if (poderMaximo.includes(key)) {
      isSuper = true;
      poderMaximo = poderMaximo.replaceAll(key, value);
    }
  }


  if (isSuper) {
    return `
      <div class="character">
        <div class="dragon-ball-icon-container">
          <img class="dragon-ball-icon" src="./assets/stars.png" alt="4 stars dragon ball" />
        </div>
        <h2>${character.name}</h2>
        <div class="character-image-container">
          <img class="character-image" src="${character.image}" alt="${character.name}" />
        </div>
        <p><span class="bold_info">Poder Base: </span> <br /> ${poderBase}</p>
        <p><span class="bold_info">Poder Máximo: </span> <br /> ${poderMaximo}</p>
      </div>
    `;
  }

  return `
    <div class="character">
      <h2>${character.name}</h2>
        <div class="character-image-container">
          <img class="character-image" src="${character.image}" alt="${character.name}" />
        </div>
      <p> <span class="bold_info">Poder Base: </span> <br /> ${poderBase}</p>
      <p><span class="bold_info">Poder Máximo: </span> <br /> ${poderMaximo}</p>
    </div>
  `;
};

const fetchApi = (link) => {
  if (!link) return;
  fetch(link)
    .then((response) => response.json())
    .then((data) => {
      characters = data.items;
      root.innerHTML = characters
        .map((character) => superCharacter(character))
        .join("");
      links = {
        previous: data.links.previous,
        next: data.links.next,
      };
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};

fetchApi(baseUrl);

btn_previous.addEventListener("click", () => {
  if (links.previous) {
    fetchApi(links.previous);
  }
});

btn_next.addEventListener("click", () => {
  if (links.next) {
    fetchApi(links.next);
  }
});
