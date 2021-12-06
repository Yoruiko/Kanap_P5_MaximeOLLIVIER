// Requete API
        fetch('http://localhost:3000/api/products')
            .then(res => res.json())
            .then(data => {
                showProducts(data);})
        .catch(err => {
                alert('Error');
            });

        function showProducts(data) {
            for (products of data) {
            const items = document.getElementById("items")
            items.innerHTML +=
            `<a href="./product.html?id=${products._id}">
                <article>
                <img src="${products.imageUrl}" alt="${products.altTxt}">
                <h3 class="productName">${products.name}</h3>
                <p class="productDescription">${products.description}</p>
                </article>
            </a>`;
            }
}