function getCharacter(){

const searchInput = document.querySelector('#search-input');
const btnBuscar = document.querySelector('#btn-buscar');
const cardsContainer = document.querySelector('#cards-container');
const cardsContainer2 = document.querySelectorAll('#cards-container-2');
const erroBusca = document.querySelector('#erro-busca'); 
const queryErrorValue = document.querySelector('#query-error-value');
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
        getResponse()
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

function getResponse(){
    const response = fetch(`${endPoints.characters}${query}`, {
        method: 'GET'
    })
    .then( (response) => {
        return response.json();
    })
    .then( (response) => {
        setQueryError(false);
        for(let i of response.results){
            displayCharacters(i)
        }
        
    }).catch( (error) => {
        console.log('erro ao realizar requisição')
        setQueryError(true)
        

    } )
}

function setQueryError(boolean){
    if(boolean){
        erroBusca.style.display = 'block';
        queryErrorValue.innerText = `"${inputValue}"`; 
        cardsContainer2.classList.add('posDisplay');
    }else{
        erroBusca.style.display = 'none';
        queryErrorValue.innerText = ``;
    }
}


function displayCharacters(response){
    cardsContainer.classList.add('posDisplay');
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
    cardsContainer.classList.remove('posDisplay');
    setQueryError(false);
}






}

getCharacter();
