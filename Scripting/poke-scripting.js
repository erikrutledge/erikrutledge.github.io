let pokemon = document.getElementById("pokemon")
let genDisplay = document.getElementById("genDisplay")
let button = document.getElementById("button")
let picture = document.getElementById("picture")

function update() {
    var gen = document.getElementById("generation")
    var value = gen.value
    return value
}

function resolveClick() {
    genSelection = update()
    id = generateId(genSelection)
    getPokemon(id)
}

function generateId(gen) {
    if (gen == 1) {
        result = getRandom(1,151)
    } else if (gen == 2) { 
        result = getRandom(152,251)
    } else if (gen == 3) { 
        result = getRandom(252,386)
    } else if (gen == 4) { 
        result = getRandom(387,493)
    } else if (gen == 5) { 
        result = getRandom(494,649)
    } else if (gen == 6) { 
        result = getRandom(650,719)
    } else if (gen == 7) { 
        result = getRandom(722,809)
    } else if (gen == 8) { 
        result = getRandom(810,905)
    } else
        result = getRandom(1,905)
    return result
}

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function getPokemon(id) {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
    pokemon.innerHTML = data.name
    picture.src = data.sprites.other["official-artwork"].front_default
    })
};
