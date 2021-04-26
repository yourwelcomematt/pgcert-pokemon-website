/* Base address for the Pokemon endpoints. Add the endpoint name and parameters onto this */
const ENDPOINT_BASE_URL = "https://trex-sandwich.com/pokesignment/";


/* TODO: Your code here */
window.addEventListener("load", function () {

    const pokemonOfTheDayPanel = document.querySelector("#pokemonOfTheDayPane");
    const pokemonDetailsPanel = document.querySelector("#detailsPane");
    // const pokemonDetailsListDiv = document.querySelector("#pokemonListDiv");

    displayPokemonOfTheDayPanel();
    displayPokemonDetailsPanel();

    const randomPokemonButton = document.querySelector("#loadButton");
    const pokemonListButton = document.querySelector("#listButton");

    console.log(randomPokemonButton);
    console.log(pokemonListButton);

    randomPokemonButton.addEventListener("click", loadRandomPokemon);
    pokemonListButton.addEventListener("click", showPokemonList);



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

        const buttonElement = document.createElement("button");
        buttonElement.innerHTML = "Show Details";
        buttonElement.id = "detailsButton";
        buttonElement.setAttribute("class", "button");
        buttonElement.setAttribute("type", "button");
        pokemonOfTheDayPanel.appendChild(buttonElement);
        // pokemonOfTheDayPanel.innerHTML += `<button type="button" class="button" id="detailsButton">Show Details</button>`;
    };
    
    //This function refreshes the Pokemon of the day panel with a new random Pokemon//
    async function refreshPokemonOfTheDayPanel() {
        const imageElement = document.querySelector("#pokemonOfTheDayPane > img");
        const nameElement = document.querySelector("#pokemonOfTheDayPane > h2");
        const descriptionElement = document.querySelector("#pokemonOfTheDayPane > p");
        const buttonElement = document.querySelector("#detailsButton");
        imageElement.remove();
        nameElement.remove();
        descriptionElement.remove();
        buttonElement.remove();
        displayPokemonOfTheDayPanel();
    };

    //This function creates the Pokemon details panel//
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
        clickedPokemonImageElement.setAttribute("width", "100%")

        const clickedPokemonDescriptionElement = document.createElement("p");
        clickedPokemonDescriptionElement.innerHTML = clickedPokemonDescription;
        clickedPokemonDescriptionElement.style.textAlign = "left";
        clickedPokemonColumn.appendChild(clickedPokemonDescriptionElement);





        const clickedPokemonClassesAndMovesDiv = document.createElement("div");
        clickedPokemonClassesAndMovesDiv.id = "classesAndMovesDiv";
        const clickedPokemonClasses = document.createElement("div");
        clickedPokemonClasses.id = "clickedPokemonClasses";
        const clickedPokemonMoves = document.createElement("div");
        clickedPokemonMoves.id = "clickedPokemonMoves";

        // clickedPokemonClasses.style.gridArea = "classes";
        // clickedPokemonMoves.style.gridArea = "moves";

        const classTitle = document.createElement("h2");
        classTitle.innerHTML = "Class List";
        classTitle.style.fontSize = "medium";
        clickedPokemonClasses.appendChild(classTitle);

        const movesTitle = document.createElement("h2");
        movesTitle.innerHTML = "Signature Moves";
        movesTitle.style.fontSize = "medium";
        clickedPokemonMoves.appendChild(movesTitle);

        // generateClassesBox(clickedPokemonObject, clickedPokemonClasses);
        generateMovesBox(clickedPokemonObject, clickedPokemonMoves);
        
        clickedPokemonClassesAndMovesDiv.appendChild(clickedPokemonClasses);
        clickedPokemonClassesAndMovesDiv.appendChild(clickedPokemonMoves);
        clickedPokemonColumn.appendChild(clickedPokemonClassesAndMovesDiv);





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
        clickedPokemonClassesAndMovesDiv.gridArea = "movesClasses"
        pokemonDetailsPanel.style.display = "grid";
        pokemonDetailsPanel.style.gridTemplateColumns = "1fr 2fr 1fr";
        pokemonDetailsPanel.style.gridTemplateRows = "auto auto auto";
        pokemonDetailsPanel.style.gridTemplateAreas = `"title title title" "weak click strong" ". movesClasses ."`
    };

    // async function generateAgainstPanels(array, panelToAppendTo) {
    //     for (i = 0; i < array.length; i++) {
    //         const againstAddress = "https://trex-sandwich.com/pokesignment/pokemon?pokemon=" + array[i];
    //         const againstResponseObject = await fetch (againstAddress);
    //         const againstObject = await againstResponseObject.json();
    //         generatePokemonPanel(panelToAppendTo, againstObject);
    //     };
    // };

    // async function generateClassesBox(pokemonObject, div) {
    //     const classArray = pokemonObject.classes;
    //     console.log(classArray);
    //     for (i = 0; i < classArray.length; i++) {
            // console.log(classArray[i])
            // const classType = classArray[i]
            // const coloringAddress = "https://trex-sandwich.com/pokesignment/keyword?keyword=" + classType;
            // console.log(classType);
            // const coloringResponse = await fetch (coloringAddress);
            // const coloringObject = await coloringResponse.json();
            // const classTextElement = await setClassColor(classType, coloringObject);
            // div.innerHTML += classTextElement;
            // console.log(coloringObject)
    //     }
    // };

    // async function setClassColor(classText, coloringObject) {
    //     const classTextElement = document.createElement("p");
    //     classTextElement.style.border = "1px solid black"
    //     classTextElement.innerHTML = classText.toUpperCase();
    //     classTextElement.style.color = await coloringObject.background;
    //     classTextElement.backgroundColor = await coloringObject.foreground;
    //     return classTextElement;
    // };

    function generateMovesBox(pokemonObject, div) {
        const name = pokemonObject.name;
        const movesArray = pokemonObject.signature_skills;
        for (i = 0; i < movesArray.length; i++) {
            div.innerHTML += `<p>${movesArray[i]}</p>`
        }
    };

    async function loadRandomPokemon() {
        const randomPokemonObject = await getPokemonOfTheDay();
        clearPokemonDetailsPanel();
        await generateClickedPokemonDetails(randomPokemonObject.name);
    };

    async function showPokemonList() {
        clearPokemonDetailsPanel();
        const replacementDiv = document.createElement("div");
        replacementDiv.id = "pokemonListDiv"
        // replacementDiv.setAttribute("class", "replacementDiv")
        pokemonDetailsPanel.appendChild(replacementDiv);
        await displayPokemonDetailsPanel();
    };

    async function clearPokemonDetailsPanel() {
        const pokemonDetailsPanelArray = document.querySelectorAll("#detailsPane > div");
        for (i = 0; i < pokemonDetailsPanelArray.length; i++) {
            pokemonDetailsPanelArray[i].remove();
        }
    };
});