/* Base address for the Pokemon endpoints. Add the endpoint name and parameters onto this */
const ENDPOINT_BASE_URL = "https://trex-sandwich.com/pokesignment/";


/* TODO: Your code here */
window.addEventListener("load", function () {

    const pokemonOfTheDayPanel = document.querySelector("#pokemonOfTheDayPane");

    displayPokemonOfTheDay();

    pokemonOfTheDayPanel.addEventListener("click", refreshPokemonOfTheDay); 
    
    async function getPokemonOfTheDay() {
        const response = await fetch(`https://trex-sandwich.com/pokesignment/pokemon?random=random`);
        const responseObject = await response.json();
        return responseObject;
    };
    
    async function displayPokemonOfTheDay() {
        const randomPokemonObject = await getPokemonOfTheDay();

        const imageElement = document.createElement("img");
        const imageAddress = "https://trex-sandwich.com/pokesignment/img/" + randomPokemonObject.image;
        imageElement.src = imageAddress
        imageElement.setAttribute("width", "100%");
        pokemonOfTheDayPanel.appendChild(imageElement);


        const nameElement = document.createElement("h2");
        const name = randomPokemonObject.name;
        nameElement.innerHTML = `<strong>${name}</strong>`;
        pokemonOfTheDayPanel.appendChild(nameElement);
        nameElement.style.fontSize = "medium";

        const descriptionElement = document.createElement("p");
        const description = randomPokemonObject.description;
        descriptionElement.innerHTML = description;
        pokemonOfTheDayPanel.appendChild(descriptionElement);
        descriptionElement.style.fontSize = "small";
        descriptionElement.style.textAlign = "justify";
    };
    
    async function refreshPokemonOfTheDay() {
        const imageElement = document.querySelector("#pokemonOfTheDayPane > img");
        const nameElement = document.querySelector("#pokemonOfTheDayPane > h2");
        const descriptionElement = document.querySelector("#pokemonOfTheDayPane > p");
        imageElement.remove();
        nameElement.remove();
        descriptionElement.remove();
        displayPokemonOfTheDay();
    };
    
});