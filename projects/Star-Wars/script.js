document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll("button");
    const dataElement = document.getElementById("data");
    const errorMessage = document.getElementById("error-message");

    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.id.replace("fetch", "").toLowerCase();
            fetchData(category);
        });
    });

    function fetchData(category) {
        dataElement.innerHTML = "";
        errorMessage.style.display = "none";

        fetch(`https://swapi.dev/api/${category}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch ${category}: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                displayData(data.results, category);
            })
            .catch(error => {
                errorMessage.textContent = error.message;
                errorMessage.style.display = "block";
            });
    }

    function displayData(results, category) {
        if (!results.length) {
            errorMessage.textContent = "No data available for " + category;
            errorMessage.style.display = "block";
            return;
        }

        results.forEach(item => {
            const card = document.createElement("div");
            card.className = "card";
            const itemId = item.url.split('/').filter(Boolean).pop();

            const imageUrl = getImageUrl(category, itemId);
            const img = document.createElement("img");
            img.src = imageUrl;
            img.alt = item.name || item.title || 'Star Wars';
            img.onerror = () => { img.src = 'https://via.placeholder.com/400x400?text=No+Image'; };
            card.appendChild(img);

            Object.entries(item).forEach(([key, value]) => {
                const element = document.createElement("p");
                element.textContent = `${key}: ${value}`;
                card.appendChild(element);
            });

            dataElement.appendChild(card);
        });
    }

    function getImageUrl(category, id) {
        switch (category) {
            case 'people':
                return `https://starwars-visualguide.com/assets/img/characters/${id}.jpg`;
            case 'planets':
                return `https://starwars-visualguide.com/assets/img/planets/${id}.jpg`;
            case 'starships':
                return `https://starwars-visualguide.com/assets/img/starships/${id}.jpg`;
            case 'vehicles':
                return `https://starwars-visualguide.com/assets/img/vehicles/${id}.jpg`;
            case 'species':
                return `https://starwars-visualguide.com/assets/img/species/${id}.jpg`;
            case 'films':
                return `https://starwars-visualguide.com/assets/img/films/${id}.jpg`;
            default:
                return 'https://via.placeholder.com/400x400?text=No+Image';
        }
    }
});
