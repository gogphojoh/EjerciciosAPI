const URL = "https://pokeapi.co/api/v2/pokemon/";

const searchInput = document.getElementById("search");
const pokemonDisplay = document.getElementById("pokemon-display");
const pokemonImg = document.getElementById("pokemon-img");
const pokemonName = document.getElementById("pokemon-name");
const pokemonNumber = document.getElementById("pokemon-number");
const pokemonDescription = document.getElementById("pokemon-description");
const pokemonStats = document.getElementById("pokemon-stats");
const pokemonTypes = document.getElementById("pokemon-types");

function showError(msg) {
    pokemonDisplay.innerHTML = `<p class="error">${msg}</p>`;
}

async function searchPokemon() {
    const searchPokemon = searchInput.value.toLowerCase();
    try {
        const response = await fetch(URL + searchPokemon);
        if (!response.ok) {
            showError("No se encontró ningún Pokémon llamado: " + searchPokemon);
            return;
        }
        const data = await response.json();
        
        pokemonImg.src = data.sprites.front_default;
        pokemonName.textContent = data.name.charAt(0).toUpperCase() + data.name.slice(1);
        pokemonNumber.textContent = `ID: ${data.id}`;
        pokemonDescription.textContent = `Altura: ${data.height} m | Peso: ${data.weight} kg`;

        pokemonStats.innerHTML = `
            <h3>Stats</h3>
            <p>HP: ${data.stats[0].base_stat}</p>
            <p>Ataque: ${data.stats[1].base_stat}</p>
            <p>Defensa: ${data.stats[2].base_stat}</p>
            <p>Velocidad: ${data.stats[5].base_stat}</p>
        `;

        pokemonTypes.innerHTML = `<h3>Tipos</h3>`;
        data.types.forEach(typeInfo => {
            const typeElement = document.createElement("span");
            typeElement.textContent = typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1);
            pokemonTypes.appendChild(typeElement);
        });

    } catch (error) {
        console.error(error);
        showError('Ha ocurrido un error al buscar el Pokémon');
    }
}

document.getElementById("btn-search").addEventListener("click", searchPokemon);
