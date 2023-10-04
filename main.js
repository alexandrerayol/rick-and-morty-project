function getCharacter(){

const searchInput = document.querySelector('#search-input');
const btnBuscar = document.querySelector('#btn-buscar');
const cardsContainer = document.querySelector('#cards-container');
const inputErrorValue = document.querySelector('#input-error-value');


const endPoints = {
    "characters": "https://rickandmortyapi.com/api/character",
    "locations": "https://rickandmortyapi.com/api/location",
    "episodes": "https://rickandmortyapi.com/api/episode"
}

let inputValue;
let query;

btnBuscar.addEventListener('click', () => {
    getValue();
    if(getValue()){
        resetDisplay()
        setQuery()
        getResponse().catch(erro => {
            console.log('erro ao realizar requisição ' + erro)
            setQueryError(true);
        })
    }
})

function getValue(){
    const value = searchInput.value;

    if(value == '' || value == undefined){
        setErrorInput(true);
    }else{
        setErrorInput(false);
        inputValue = value.toLowerCase();
        return true;
    }
}

function setErrorInput(boolean){
    if(boolean){
        btnBuscar.classList.add('input-error');
        searchInput.classList.add('input-error');
        inputErrorValue.style.display = 'block';
    }else{
        btnBuscar.classList.remove('input-error');
        searchInput.classList.remove('input-error');
        inputErrorValue.style.display = 'none';
    }
}


function setQuery(){
    let valueFormated = inputValue.split(' ');
    valueFormated = valueFormated.join('%20');
    query = '/?name=' + valueFormated;
}

function setQueryError(boolean){
    if(boolean){
    const elementComplete = `<div class="h1-text"><h1>Não foi possível encontrar por "${inputValue.toLowerCase()}"</h1></div>`;
    cardsContainer.innerHTML = elementComplete;
    cardsContainer.classList.add('shadow');
    }else{
        cardsContainer.innerHTML = '';
        cardsContainer.classList.remove('shadow')
    }
}

async function getResponse(){
    const response = await fetch(`${endPoints.characters}${query}`, {
        method: 'GET'
    })
    const responseConverted = await response.json();
    for(let i of responseConverted.results){
        displayCharacters(i)
    }
}

function displayCharacters(response){
    cardsContainer.classList.add('shadow');
    const character = {
        nome: response.name,
        image: response.image,
        specie: response.species,
        status: response.status,
    }
    const cardCompletString = `<div class="card"><img src="${character.image}" alt="${character.name}"><div class="card-details"><ul><li>🛸${character.nome}</li><li>🛸${character.specie}</li><li>🛸${character.status}</li></ul></div></div>`;
    cardsContainer.innerHTML += cardCompletString;
}

function resetDisplay(){
    cardsContainer.innerHTML = '';
    cardsContainer.classList.remove('shadow', 'intro-card', 'h1-text');
}

}

getCharacter();
