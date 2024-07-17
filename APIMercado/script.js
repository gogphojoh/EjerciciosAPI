document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchQuery').value;
    searchProducts(query);
});

function searchProducts(query) {
    const url = `https://api.mercadolibre.com/sites/MLA/search?q=${query}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayResults(data.results);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayResults(products) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';

        productElement.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>Precio: $${product.price}</p>
            <a href="${product.permalink}" target="_blank">Ver producto</a>
        `;

        resultsContainer.appendChild(productElement);
    });
}
