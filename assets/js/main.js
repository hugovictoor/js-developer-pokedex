const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 9
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name} </span>
            

            <div class="detail">         
             <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="OnHover">
            
                <span class="numberOnHover ${pokemon.type}">#${pokemon.number}  ${pokemon.name}</span>
                <img class ="imgOnHover" src="${pokemon.photo}"
                                       alt="${pokemon.name}">

                               
                       <div class="detailOnHover" >
                       <div class="${pokemon.type}"> 
                       <h3>STATS:</h3>
                 <ol class="stats">
                    <ol class="statInline">
                        <li> HP: </li>
                        <li class ="statNumber">${pokemon.hp} </li>
                    </ol>
                    <ol class="statInline">
                        <li> Attack: </li>
                        <li class ="statNumber">${pokemon.attack} </li>
                    </ol>
                    <ol class="statInline">
                        <li> Defense: </li>
                        <li class ="statNumber">${pokemon.defence} </li>
                    </ol>
                    <ol class="statInline">
                        <li> spAttack: </li>
                        <li class ="statNumber">${pokemon.spattack} </li>
                    </ol>
                    <ol class="statInline">
                         <li> spDefense: </li>
                        <li class ="statNumber">${pokemon.spdefence} </li>
                    </ol>
                     <ol class="statInline">
                        <li> Speed: </li>
                        <li class ="statNumber">${pokemon.speed} </li>
                    </ol>
                    </ol>
                    </div> 
            </div>
     </div>
     
                     
             
        </li> 

        
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
