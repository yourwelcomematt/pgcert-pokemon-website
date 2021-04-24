/* Base address for the Pokemon endpoints. Add the endpoint name and parameters onto this */
const ENDPOINT_BASE_URL = "https://trex-sandwich.com/pokesignment/";


/* TODO: Your code here */
window.addEventListener("load", function () {

    const pokemonOfTheDayPanel = document.querySelector("#pokemonOfTheDayPane");

    displayPokemonOfTheDay();

    pokemonOfTheDayPanel.addEventListener("click", refreshPokemonOfTheDay); 

    const pokemonDetailsPanel = document.querySelector("#detailsPane");

    displayPokemonDetails();

    





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

    async function displayPokemonDetails() {
        const pokemonArrayResponse = await fetch(`https://trex-sandwich.com/pokesignment/pokemon`);
        const pokemonArray = await pokemonArrayResponse.json();
        for (let i = 0; i < pokemonArray.length; i++ ) {
            const pokemon = pokemonArray[i];
            const pokemonAddress = "https://trex-sandwich.com/pokesignment/pokemon?pokemon=" + pokemon;
            const pokemonResponseObject = await fetch(pokemonAddress);
            const pokemonObject = await pokemonResponseObject.json();

            const pokemonPanel = document.createElement("div");
            pokemonPanel.style.backgroundColor = "#46ACC2"
            pokemonDetailsPanel.appendChild(pokemonPanel);
            pokemonPanel.style.margin = "50px";
            pokemonPanel.addEventListener("click", displayClickedPokemonDetails);

            const pokemonPanelPictureElement = document.createElement("img");
            const pokemonPanelPictureAddress = "https://trex-sandwich.com/pokesignment/img/" + pokemonObject.image;
            pokemonPanelPictureElement.src = pokemonPanelPictureAddress;
            pokemonPanel.appendChild(pokemonPanelPictureElement);

            const pokemonPanelNameElement = document.createElement("h2");
            const pokemonPanelName = pokemonObject.name;
            pokemonPanelNameElement.innerHTML = `<strong>${pokemonPanelName}</strong>`;
            pokemonPanel.appendChild(pokemonPanelNameElement);
            pokemonPanelNameElement.style.fontSize = "medium";
            pokemonPanelNameElement.style.paddingBottom = "35px";
        };
    };

    async function displayClickedPokemonDetails () {
        const pokemonDetailsPanelArray = document.querySelectorAll("#detailsPane > div");
        for (i = 0; i < pokemonDetailsPanelArray.length; i++) {
            pokemonDetailsPanelArray[i].remove();
        }

        
    };
    
});