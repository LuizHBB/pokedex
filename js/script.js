
const pokemonName = document.querySelector('.pokemon-name');
const pokemonNumber = document.querySelector('.pokemon-number');
const pokemonImage = document.querySelector('.pokemon-image');

const pokemonForm = document.querySelector('.form');
const pokemonInput = document.querySelector('.input-search');

const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');
let PokemonID = 1;

//async - usado para chaamdas assincronas, permitindo que utilize o metodo await
const fetchPokemon  = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data  = await APIResponse.json();
        return data;
    }
}

//tazendo o pokemon que foi buscado
const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    const data = await fetchPokemon(pokemon);
    if(data){
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    //vai até o 649
        PokemonID = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not Found!';
        pokemonNumber.innerHTML = '';
    }
    pokemonInput.value = '';
}

//submetendo pesquisa do usuario e mandando valor para a variavel
pokemonForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    renderPokemon(pokemonInput.value.toLowerCase());
})

btnPrev.addEventListener('click', () => {
    if(PokemonID > 1) {
        PokemonID -= 1;
        renderPokemon(PokemonID)
    }
});

btnNext.addEventListener('click', () => {
    if(PokemonID < 649){
        PokemonID +=1;
        renderPokemon(PokemonID)
    } else {
        pokemonName.innerHTML = 'Only Gen. V!';
        pokemonNumber.innerHTML = '';
    }
});

renderPokemon('pokemonID');




