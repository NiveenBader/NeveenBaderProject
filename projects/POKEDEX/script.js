document.addEventListener("DOMContentLoaded", function () {
    const pokemonCards = document.getElementById("pokemon-cards");
    const typeSelect = document.getElementById("type-select");
    let currentlyEnlargedCard = null;

    // Fetch all Pokemon types and populate the select element
    fetch("https://pokeapi.co/api/v2/type/")
        .then(response => response.json())
        .then(data => {
            const types = data.results;
            types.forEach(type => {
                const option = document.createElement("option");
                option.text = type.name;
                option.value = type.name;
                typeSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.log("Error fetching types:", error);
        });

    function fetchAllPokemon(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const pokemonList = data.results;
                pokemonList.forEach(pokemon => {
                    fetchPokemonDetails(pokemon.url);
                });
                if (data.next) {
                    fetchAllPokemon(data.next);
                }
            })
            .catch(error => {
                console.log("Error fetching data:", error);
                pokemonCards.innerHTML = "<p>Error fetching data. Please try again later.</p>";
            });
    }

    function fetchPokemonDetails(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
                const types = data.types.map(type => type.type.name).join(', ');

                const pokemonCard = document.createElement("div");
                pokemonCard.classList.add("pokemon-card");
                pokemonCard.innerHTML = `
          <h2>${data.name}</h2>
          <p><strong>Height:</strong> ${data.height}</p>
          <p><strong>Weight:</strong> ${data.weight}</p>
          <p><strong>Abilities:</strong> ${abilities}</p>
          <p><strong>Types:</strong> ${types}</p>
          <img src="${data.sprites.front_default}" alt="${data.name}">
        `;
                pokemonCard.addEventListener('click', function () {
                    if (currentlyEnlargedCard && currentlyEnlargedCard !== this) {
                        currentlyEnlargedCard.classList.remove('enlarged');
                    }
                    this.classList.toggle('enlarged');
                    currentlyEnlargedCard = this.classList.contains('enlarged') ? this : null;
                });


                pokemonCards.appendChild(pokemonCard);
            })
            .catch(error => {
                console.log("Error fetching Pokemon details:", error);
            });
    }

    // Event listener for type select change
    typeSelect.addEventListener("change", function () {
        const selectedType = this.value;
        pokemonCards.innerHTML = ""; // Clear previous content
        if (selectedType) {
            // Filter Pokemon by selected type
            fetch(`https://pokeapi.co/api/v2/type/${selectedType}`)
                .then(response => response.json())
                .then(data => {
                    const pokemonOfType = data.pokemon;
                    pokemonOfType.forEach(pokemon => {
                        fetchPokemonDetails(pokemon.pokemon.url);
                    });
                })
                .catch(error => {
                    console.log("Error fetching Pokemon of type:", error);
                });
        } else {
            // Fetch all Pokemon if no type selected
            fetchAllPokemon("https://pokeapi.co/api/v2/pokemon/");
        }
    });

    // Fetch all Pokemon initially
    fetchAllPokemon("https://pokeapi.co/api/v2/pokemon/");
});

function toggleEnlarge(element) {
    element.classList.toggle('enlarged');
}
