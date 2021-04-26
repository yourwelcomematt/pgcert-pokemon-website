/* Base address for the Pokemon endpoints. Add the endpoint name and parameters onto this */
const ENDPOINT_BASE_URL = "https://trex-sandwich.com/pokesignment/";


/* TODO: Your code here */
window.addEventListener("load", function () {

    const pokemonOfTheDayPanel = document.querySelector("#pokemonOfTheDayPane");
    const pokemonDetailsPanel = document.querySelector("#detailsPane");

    displayPokemonOfTheDayPanel();
    displayPokemonDetailsPanel();


    //This function returns a random Pokemon object//
    async function getPokemonOfTheDay() {
        const response = await fetch(`https://trex-sandwich.com/pokesignment/pokemon?random=random`);
        const responseObject = await response.json();
        return responseObject;
    };
    
    /*
    This function calls the getPokemonOfTheDay() function and uses the returned random Pokemon object
    to create the Pokemon of the day panel
    */
    async function displayPokemonOfTheDayPanel() {
        const randomPokemonObject = await getPokemonOfTheDay();

        const imageElement = document.createElement("img");
        const imageAddress = "https://trex-sandwich.com/pokesignment/img/" + randomPokemonObject.image;
        imageElement.src = imageAddress
        imageElement.setAttribute("width", "100%");
        imageElement.addEventListener("click", refreshPokemonOfTheDayPanel); 
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
    
    //This function refreshes the Pokemon of the day panel with a new random Pokemon//
    async function refreshPokemonOfTheDayPanel() {
        const imageElement = document.querySelector("#pokemonOfTheDayPane > img");
        const nameElement = document.querySelector("#pokemonOfTheDayPane > h2");
        const descriptionElement = document.querySelector("#pokemonOfTheDayPane > p");
        imageElement.remove();
        nameElement.remove();
        descriptionElement.remove();
        displayPokemonOfTheDayPanel();
    };

    //This function creates the Pokemon details panel//
    async function displayPokemonDetailsPanel() {
        const pokemonArrayResponse = await fetch(`https://trex-sandwich.com/pokesignment/pokemon`);
        const pokemonArray = await pokemonArrayResponse.json();
        for (let i = 0; i < pokemonArray.length; i++ ) {
            const pokemon = pokemonArray[i];
            const pokemonAddress = "https://trex-sandwich.com/pokesignment/pokemon?pokemon=" + pokemon;
            const pokemonResponseObject = await fetch(pokemonAddress);
            const pokemonObject = await pokemonResponseObject.json();

            generatePokemonPanel(pokemonListDiv, pokemonObject);
        };
    };

    /*
    This function creates an individual panel for a given Pokemon object which contains the Pokemon's 
    image and name, and appends it to a specified panel
    */
    async function generatePokemonPanel(panelToAppendTo, pokemonObject) {
        const name = pokemonObject.name;
        
        const pokemonPanel = document.createElement("div");
        pokemonPanel.style.backgroundColor = "#46ACC2"
        panelToAppendTo.appendChild(pokemonPanel);
        pokemonPanel.style.margin = "50px";
        pokemonPanel.addEventListener("click", displayClickedPokemonDetails);
        pokemonPanel.id = name;

        const pokemonPanelPictureElement = document.createElement("img");
        const pokemonPanelPictureAddress = "https://trex-sandwich.com/pokesignment/img/" + pokemonObject.image;
        pokemonPanelPictureElement.src = pokemonPanelPictureAddress;
        pokemonPanel.appendChild(pokemonPanelPictureElement);
        pokemonPanelPictureElement.id = name;
        pokemonPanelPictureElement.setAttribute("width", "100%");

        const pokemonPanelNameElement = document.createElement("h2");
        const pokemonPanelName = pokemonObject.name;
        pokemonPanelNameElement.innerHTML = `<strong id=${name}>${name}</strong>`;
        pokemonPanel.appendChild(pokemonPanelNameElement);
        pokemonPanelNameElement.style.fontSize = "medium";
        pokemonPanelNameElement.style.paddingBottom = "10px";
        pokemonPanelNameElement.id = name;
        pokemonPanelNameElement.setAttribute("width", "100")
    };

    /*This function removes all individual Pokemon panels from the Pokemon details panel and gets 
    the clicked Pokemon's id before calling the generateClickedPokemonDetails() function to create the 
    clicked Pokemon's profile
    */
    async function displayClickedPokemonDetails (event) {
        const pokemonDetailsPanelArray = document.querySelectorAll("#detailsPane > div");
        for (i = 0; i < pokemonDetailsPanelArray.length; i++) {
            pokemonDetailsPanelArray[i].remove();
        }
        const clickedPokemon = event.target.id;
        generateClickedPokemonDetails(clickedPokemon);
    };
    
    //This function creates the clicked Pokemon's profile//
    async function generateClickedPokemonDetails(clickedPokemon) {
        const clickedPokemonJson = await fetch("https://trex-sandwich.com/pokesignment/pokemon?pokemon=" + clickedPokemon);
        const clickedPokemonObject = await clickedPokemonJson.json();

        // console.log(clickedPokemonObject);

        const clickedPokemonColumn = document.createElement("div");
        clickedPokemonColumn.style.gridArea = "click";
        const strongAgainstColumn = document.createElement("div");
        strongAgainstColumn.style.gridArea = "strong"
        const weakAgainstColumn = document.createElement("div");
        weakAgainstColumn.style.gridArea = "weak"

        const clickedPokemonName = clickedPokemonObject.name;
        const clickedPokemonImage = clickedPokemonObject.image;
        const clickedPokemonDescription = clickedPokemonObject.description;
        const clickedPokemonStrongAgainstArray = clickedPokemonObject.opponents.strong_against;
        const clickedPokemonWeakAgainstArray = clickedPokemonObject.opponents.weak_against;

        const clickedPokemonNameElement = document.createElement("h1");
        clickedPokemonNameElement.innerHTML = clickedPokemonName;
        clickedPokemonNameElement.style.fontSize = "large";
        clickedPokemonColumn.appendChild(clickedPokemonNameElement);

        const clickedPokemonImageElement = document.createElement("img")
        clickedPokemonImageElement.src = "https://trex-sandwich.com/pokesignment/img/" + clickedPokemonImage;
        clickedPokemonColumn.appendChild(clickedPokemonImageElement);

        const clickedPokemonDescriptionElement = document.createElement("p");
        clickedPokemonDescriptionElement.innerHTML = clickedPokemonDescription;
        clickedPokemonDescriptionElement.style.textAlign = "left";
        clickedPokemonColumn.appendChild(clickedPokemonDescriptionElement);

        const weakAgainstText = document.createElement("h2");
        weakAgainstText.innerHTML = "Weak Against"
        weakAgainstText.style.fontSize = "medium";
        weakAgainstColumn.appendChild(weakAgainstText);

        const strongAgainstText = document.createElement("h2");
        strongAgainstText.innerHTML = "Strong Against";
        strongAgainstText.style.fontSize = "medium";
        strongAgainstColumn.appendChild(strongAgainstText);

        for (i = 0; i < clickedPokemonWeakAgainstArray.length; i++) {
            const againstAddress = "https://trex-sandwich.com/pokesignment/pokemon?pokemon=" + clickedPokemonWeakAgainstArray[i];
            const againstResponseObject = await fetch (againstAddress);
            const againstObject = await againstResponseObject.json();
            generatePokemonPanel(weakAgainstColumn, againstObject);
        };

        for (i = 0; i < clickedPokemonStrongAgainstArray.length; i++) {
            const againstAddress = "https://trex-sandwich.com/pokesignment/pokemon?pokemon=" + clickedPokemonStrongAgainstArray[i];
            const againstResponseObject = await fetch (againstAddress);
            const againstObject = await againstResponseObject.json();
            generatePokemonPanel(strongAgainstColumn, againstObject);
        };

        // generateAgainstPanels(clickedPokemonWeakAgainstArray, weakAgainstColumn);
        // generateAgainstPanels(clickedPokemonStrongAgainstArray, strongAgainstColumn);

        pokemonDetailsPanel.appendChild(weakAgainstColumn);
        pokemonDetailsPanel.appendChild(clickedPokemonColumn);
        pokemonDetailsPanel.appendChild(strongAgainstColumn);

        const detailsPaneTitle = document.querySelector("#detailsPane > h1")
        detailsPaneTitle.style.gridArea = "title";
        pokemonDetailsPanel.style.display = "grid";
        pokemonDetailsPanel.style.gridTemplateColumns = "1fr 2fr 1fr";
        pokemonDetailsPanel.style.gridTemplateRows = "auto auto";
        pokemonDetailsPanel.style.gridTemplateAreas = `"title title title" "weak click strong"`
    };

    // async function generateAgainstPanels(array, panelToAppendTo) {
    //     for (i = 0; i < array.length; i++) {
    //         const againstAddress = "https://trex-sandwich.com/pokesignment/pokemon?pokemon=" + array[i];
    //         const againstResponseObject = await fetch (againstAddress);
    //         const againstObject = await againstResponseObject.json();
    //         generatePokemonPanel(panelToAppendTo, againstObject);
    //     };
    // };

});