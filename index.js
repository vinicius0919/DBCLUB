//const btn_generator = document.getElementById("btn_generator");
const btn_previous = document.getElementById("btn_previous");
const btn_next = document.getElementById("btn_next");
const root = document.getElementById("root");

const baseUrl = "https://dragonball-api.com/api/characters";
let characters = [];

;

const superCharacter = (character) => {
    if(parseInt((character.ki).replaceAll(".", "")) > 9000) {
    return`
        <div class="character">
            <img class="dragon-ball-icon" src="./assets/dragonball2.png" alt="4 stars dragon ball" />
            <h2>${character.name}</h2>
            <img class="character-image" src="${character.image}" alt="${character.name}" />
            <p>
            <span class="bold_info">Power Level: </span> ${character.ki}</p>
        </div>
    `
    }
    return `
        <div class="character">
            <h2>${character.name}</h2>
            <img class="character-image" src="${character.image}" alt="${character.name}" />
            <p>
            <span class="bold_info">Power Level: </span> ${character.ki}</p>
        </div>
    `
};

const fetchApi = (link) => {
  if (!link) return;
  fetch(link)
      .then((response) => response.json())
      .then((data) => {
        characters = data.items;
        root.innerHTML = characters
          .map(
            (character) => superCharacter(character)
          )
          .join("");
        links = {
          previous: data.links.previous,
          next: data.links.next
        };
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
    }




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
