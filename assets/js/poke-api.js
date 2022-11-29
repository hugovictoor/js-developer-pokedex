
const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const roundStats = (stat) => {
        if(stat <= 30){
            return stat = "*"
        }
        if(stat >= 30 &&  stat <= 60){
            return stat = "* *"
        }
        if(stat > 60 &&  stat <= 90){
            return stat = "* * *"
        }
        if(stat > 90 &&  stat <= 115){
            return stat = "* * * *"
        }
        if(stat > 115 &&  stat <= 135){
            return stat = "* * * * *"
        }
        if(stat > 135){
            return stat = "* * * * * *"
        }
       
    }

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    const stats = pokeDetail.stats.map((basestat) => basestat.base_stat)
    const [hp, attack, defence, spattack, spdefence, speed] = stats

    pokemon.hp = roundStats(hp)
    pokemon.attack = roundStats(attack)
    pokemon.defence = roundStats(defence)
    pokemon.spattack = roundStats(spattack)
    pokemon.spdefence = roundStats(spdefence)
    pokemon.speed = roundStats(speed)

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url) 
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}

