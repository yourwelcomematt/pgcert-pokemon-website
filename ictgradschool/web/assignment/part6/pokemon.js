/* Base address for the Pokemon endpoints. Add the endpoint name and parameters onto this */
const ENDPOINT_BASE_URL = "https://trex-sandwich.com/pokesignment/";


/* TODO: Your code here */
window.addEventListener("load", function () {

    const pokemonOfTheDayPanel = document.querySelector("#pokemonOfTheDayPane");
    const pokemonDetailsPanel = document.querySelector("#detailsPane");

    displayPokemonOfTheDayPanel();
    displayPokemonDetailsPanel();

    const randomPokemonButton = document.querySelector("#loadButton");
    const navRandomPokemonButton = document.querySelector("#navRandomPokemonButton");
    const showListButton = document.querySelector("#listButton");
    const navShowListButton = document.querySelector("#navShowPokemonList");
    const navPokemonOfTheDay = document.querySelector("#navShowPokemonOfTheDay");

    randomPokemonButton.addEventListener("click", loadRandomPokemon);
    navRandomPokemonButton.addEventListener("click", loadRandomPokemon);
    showListButton.addEventListener("click", showPokemonList);
    navShowListButton.addEventListener("click", showPokemonList);


    //This function returns a random Pokemon object
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

        const descriptionElement = document.createElement("p");
        descriptionElement.innerHTML = randomPokemonObject.description;
        descriptionElement.style.fontSize = "small";
        descriptionElement.style.textAlign = "justify";
        descriptionElement.style.margin = "15px";
        pokemonOfTheDayPanel.appendChild(descriptionElement);

        const buttonElement = document.createElement("button");
        buttonElement.innerHTML = "Show Details";
        buttonElement.id = name;
        buttonElement.setAttribute("class", "button");
        buttonElement.setAttribute("type", "button");
        buttonElement.addEventListener("click", displayClickedPokemonDetails);
        pokemonOfTheDayPanel.appendChild(buttonElement);

        navPokemonOfTheDay.id = name;
        navPokemonOfTheDay.addEventListener("click", displayClickedPokemonDetails)
    };
    

    //This function refreshes the Pokemon of the day panel with a new random Pokemon
    async function refreshPokemonOfTheDayPanel() {
        const imageElement = document.querySelector("#pokemonOfTheDayPane > img");
        const nameElement = document.querySelector("#pokemonOfTheDayPane > h2");
        const descriptionElement = document.querySelector("#pokemonOfTheDayPane > p");
        const buttonElement = document.querySelector("#pokemonOfTheDayPane > button");
        imageElement.remove();
        nameElement.remove();
        descriptionElement.remove();
        buttonElement.remove();
        navPokemonOfTheDay.id = "";
        displayPokemonOfTheDayPanel();
    };


    //This function creates the Pokemon details panel
    async function displayPokemonDetailsPanel() {
        const pokemonDetailsListDiv = document.querySelector("#pokemonListDiv");
        const pokemonArrayResponse = await fetch(`https://trex-sandwich.com/pokesignment/pokemon`);
        const pokemonArray = await pokemonArrayResponse.json();
        for (let i = 0; i < pokemonArray.length; i++ ) {
            const pokemon = pokemonArray[i];
            const pokemonAddress = "https://trex-sandwich.com/pokesignment/pokemon?pokemon=" + pokemon;
            const pokemonResponseObject = await fetch(pokemonAddress);
            const pokemonObject = await pokemonResponseObject.json();
            generatePokemonPanel(pokemonDetailsListDiv, pokemonObject);
        };
    };


    /*
    This function creates an individual panel for a given Pokemon object which contains the Pokemon's 
    image and name, and appends it to a specified panel
    */
    async function generatePokemonPanel(panelToAppendTo, pokemonObject) {
        const name = pokemonObject.name;

        const pokemonPanel = document.createElement("div");
        pokemonPanel.id = name;
        pokemonPanel.setAttribute("class", "panel");
        pokemonPanel.addEventListener("click", displayClickedPokemonDetails);
        panelToAppendTo.appendChild(pokemonPanel);

        const pokemonPanelPictureElement = document.createElement("img");
        pokemonPanelPictureElement.id = name;
        const pokemonPanelPictureAddress = "https://trex-sandwich.com/pokesignment/img/" + pokemonObject.image;
        pokemonPanelPictureElement.src = pokemonPanelPictureAddress;
        pokemonPanelPictureElement.setAttribute("width", "90%");
        pokemonPanel.appendChild(pokemonPanelPictureElement);

        const pokemonPanelNameElement = document.createElement("h2");
        pokemonPanelNameElement.id = name;
        pokemonPanelNameElement.innerHTML = `<strong id=${name}>${name}</strong>`;
        pokemonPanelNameElement.style.paddingBottom = "10px";
        pokemonPanelNameElement.setAttribute("width", "100")
        pokemonPanel.appendChild(pokemonPanelNameElement);
    };


    /*This function removes all individual Pokemon panels from the Pokemon details panel and gets 
    the clicked Pokemon's id before calling the generateClickedPokemonDetails() function to create the 
    clicked Pokemon's profile
    */
    async function displayClickedPokemonDetails (event) {
        clearPokemonDetailsPanel();
        const clickedPokemon = event.target.id;
        generateClickedPokemonDetails(clickedPokemon);
    };


    //This function creates the clicked Pokemon's profile
    async function generateClickedPokemonDetails(clickedPokemon) {
        const clickedPokemonJson = await fetch("https://trex-sandwich.com/pokesignment/pokemon?pokemon=" + clickedPokemon);
        const clickedPokemonObject = await clickedPokemonJson.json();

        const clickedPokemonColumn = document.createElement("div");
        const strongAgainstColumn = document.createElement("div");
        const weakAgainstColumn = document.createElement("div");

        clickedPokemonColumn.style.gridArea = "click";
        strongAgainstColumn.style.gridArea = "strong"
        weakAgainstColumn.style.gridArea = "weak"

        const clickedPokemonName = clickedPokemonObject.name;
        const clickedPokemonImage = clickedPokemonObject.image;
        const clickedPokemonDescription = clickedPokemonObject.description;
        const clickedPokemonStrongAgainstArray = clickedPokemonObject.opponents.strong_against;
        const clickedPokemonWeakAgainstArray = clickedPokemonObject.opponents.weak_against;

        const clickedPokemonNameElement = document.createElement("h1");
        clickedPokemonNameElement.innerHTML = clickedPokemonName;
        clickedPokemonNameElement.style.fontSize = "xx-large";
        clickedPokemonColumn.appendChild(clickedPokemonNameElement);

        const clickedPokemonImageElement = document.createElement("img")
        clickedPokemonImageElement.src = "https://trex-sandwich.com/pokesignment/img/" + clickedPokemonImage;
        clickedPokemonImageElement.setAttribute("width", "75%")
        clickedPokemonColumn.appendChild(clickedPokemonImageElement);

        const clickedPokemonDescriptionElement = document.createElement("p");
        clickedPokemonDescriptionElement.innerHTML = clickedPokemonDescription;
        clickedPokemonDescriptionElement.style.textAlign = "justify";
        clickedPokemonDescriptionElement.style.margin = "40px"
        clickedPokemonColumn.appendChild(clickedPokemonDescriptionElement);

        const clickedPokemonClassesAndMovesDiv = document.createElement("div");
        const clickedPokemonClasses = document.createElement("div");
        const clickedPokemonMoves = document.createElement("div");

        clickedPokemonClassesAndMovesDiv.id = "classesAndMovesDiv";
        clickedPokemonClasses.id = "clickedPokemonClasses";
        clickedPokemonMoves.id = "clickedPokemonMoves";

        const classTitle = document.createElement("h2");
        classTitle.innerHTML = "Class List";
        clickedPokemonClasses.appendChild(classTitle);

        const movesTitle = document.createElement("h2");
        movesTitle.innerHTML = "Signature Moves";
        clickedPokemonMoves.appendChild(movesTitle);

        generateClassesBox(clickedPokemonObject, clickedPokemonClasses);
        generateMovesBox(clickedPokemonObject, clickedPokemonMoves);
        
        clickedPokemonClassesAndMovesDiv.appendChild(clickedPokemonClasses);
        clickedPokemonClassesAndMovesDiv.appendChild(clickedPokemonMoves);
        clickedPokemonColumn.appendChild(clickedPokemonClassesAndMovesDiv);

        const weakAgainstText = document.createElement("h2");
        weakAgainstText.innerHTML = "Weak Against"
        weakAgainstText.style.fontStyle = "italic"
        weakAgainstColumn.appendChild(weakAgainstText);

        const strongAgainstText = document.createElement("h2");
        strongAgainstText.innerHTML = "Strong Against";
        strongAgainstText.style.fontStyle = "italic"
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

        pokemonDetailsPanel.appendChild(weakAgainstColumn);
        pokemonDetailsPanel.appendChild(clickedPokemonColumn);
        pokemonDetailsPanel.appendChild(strongAgainstColumn);

        const detailsPaneTitle = document.querySelector("#detailsPane > h1")
        detailsPaneTitle.style.gridArea = "title";
        clickedPokemonClassesAndMovesDiv.gridArea = "movesClasses"

        pokemonDetailsPanel.style.display = "grid";
        pokemonDetailsPanel.style.gridTemplateColumns = "1fr 2fr 1fr";
        pokemonDetailsPanel.style.gridTemplateRows = "auto auto auto";
        pokemonDetailsPanel.style.gridTemplateAreas = `"title title title" "weak click strong" ". movesClasses ."`
    };


    //This function creates the class list box
    async function generateClassesBox(pokemonObject, div) {
        const classArray = pokemonObject.classes;
        for (i = 0; i < classArray.length; i++) {
            div.innerHTML += `<p>${classArray[i]}</p>`;
        };
    };


    //This function creates the signature moves box
    function generateMovesBox(pokemonObject, div) {
        const movesArray = pokemonObject.signature_skills;
        for (i = 0; i < movesArray.length; i++) {
            div.innerHTML += `<p>${movesArray[i]}</p>`;
        };
    };


    //This function loads the profile for the Pokemon of the Day
    async function loadRandomPokemon() {
        const randomPokemonObject = await getPokemonOfTheDay();
        clearPokemonDetailsPanel();
        await generateClickedPokemonDetails(randomPokemonObject.name);
    };


    //This function loads the home page, which displays all of the Pokemon in panels
    async function showPokemonList() {
        clearPokemonDetailsPanel();
        const replacementDiv = document.createElement("div");
        replacementDiv.id = "pokemonListDiv"
        pokemonDetailsPanel.appendChild(replacementDiv);
        pokemonDetailsPanel.style.display = "grid";
        pokemonDetailsPanel.style.gridTemplateColumns = "1fr";
        pokemonDetailsPanel.style.gridTemplateRows = "auto";
        await displayPokemonDetailsPanel();
    };


    //This function clears the Pokemon details panel of all content except for the title
    async function clearPokemonDetailsPanel() {
        const pokemonDetailsPanelArray = document.querySelectorAll("#detailsPane > div");
        for (i = 0; i < pokemonDetailsPanelArray.length; i++) {
            pokemonDetailsPanelArray[i].remove();
        }
    };
});