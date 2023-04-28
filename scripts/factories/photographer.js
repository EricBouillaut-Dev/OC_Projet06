function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id} = data;

    const picture = `assets/photographers/small/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.innerHTML = `
            <a href="photographer.html?id=${id}">
                <img src=${picture}>
                <h2 class="photograph-name">${name}</h2>
            </a>
            <p class="photograph-location">${city}, ${country}</p>
            <p class="photograph-tagline">${tagline}</p>
            <p class="photograph-price">${price}</p>
        `;
        return (article);
    }
    return { name, picture, getUserCardDOM }
}