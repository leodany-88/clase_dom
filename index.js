const initialURL = "https://pokeapi.co/api/v2/pokemon/";
const P_NAME_KEY = "%P_NAME%";
const imageURL = `https://img.pokemondb.net/artwork/${P_NAME_KEY}.jpg`;

function initializeDummyPokedex() {
    processPokedexFetch({"count":949,"previous":null,"results":[{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/1\/","name":"bulbasaur"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/2\/","name":"ivysaur"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/3\/","name":"venusaur"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/4\/","name":"charmander"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/5\/","name":"charmeleon"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/6\/","name":"charizard"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/7\/","name":"squirtle"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/8\/","name":"wartortle"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/9\/","name":"blastoise"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/10\/","name":"caterpie"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/11\/","name":"metapod"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/12\/","name":"butterfree"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/13\/","name":"weedle"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/14\/","name":"kakuna"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/15\/","name":"beedrill"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/16\/","name":"pidgey"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/17\/","name":"pidgeotto"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/18\/","name":"pidgeot"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/19\/","name":"rattata"},{"url":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/20\/","name":"raticate"}],"next":"https:\/\/pokeapi.co\/api\/v2\/pokemon\/?limit=20&offset=20"})
}

function fetchPokedex(url) {
    console.log(url);
    const loadingAlert = document.getElementById("loading-alert");
    loadingAlert.style.display = "block";
    fetch(url).then(
        function(response) {
            if (response.status !== 200) {
                console.log(`Request error. Status: ${response.status}`)
            } 
            else {
                response.json().then(function(data) {
                    console.log(data);
                    loadingAlert.style.display = "none";
                    processPokedexFetch(data);
                });
            }
        }).catch( function(err) {
            console.log(`Fetch error ${err}`)
        });
    console.log("intialize pokedex")
}

function processPokedexFetch(data) {
    console.log(data)
    if(!data.results)
        return;
    const pokedexList = document.getElementById("pokedex-list");
    for (let i = 0; i < data.results.length; i++)
    {
        const currentPokemon = data.results[i];
        const currentPokemonName = currentPokemon.name;
        const currentPokemonImage = getPokedexImage(currentPokemonName);
        const pokemonNumber = getPokedexNumber(currentPokemon);
        pokedexList.innerHTML += getPokemonHtmlElement(currentPokemonName, currentPokemonImage, pokemonNumber);
    }
    if(data.next)
    {
        pokedexList.innerHTML += getLoadMoreLink(data.next);
    }
}

function handleLoadMore(next){
    //remove current
    const link = document.getElementById("load-more");
    link.outerHTML = "";
    delete link;
    fetchPokedex(next);
}

function getLoadMoreLink (next) {
    return `<div id="load-more" class="extra-element pointable" onclick=handleLoadMore("${next}")>Cargar más...</div>`
}

function getPokemonHtmlElement (name, image, number) {
    return `<div class="pokedex-entry"><a href="pokemon.html?number=${number}">${number} - ${name}<img src="${image}" ><a></div>`;
}

function getPokedexImage(pokemon) {
    return imageURL.replace(P_NAME_KEY, pokemon);
}

function getPokedexNumber(pokemon) {
    // extract the url deleting the last symbol
    let number = pokemon.url.substring(0, pokemon.url.length-1);
    number = number.substring(number.lastIndexOf("/")+1,number.length);
    return number;
}