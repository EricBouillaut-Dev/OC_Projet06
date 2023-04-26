function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price} = data;

    const picture = `assets/photographers/small/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const h2 = document.createElement( 'h2' );
        h2.className = 'photograph-name';
        h2.textContent = name;

        const h3 = document.createElement( 'h3' );
        h3.className = 'photograph-location';
        h3.textContent = city + ", " + country;

        const h4 = document.createElement( 'h4' );
        h4.className = 'photograph-tagline';
        h4.textContent = tagline;

        const h5 = document.createElement( 'h5' );
        h5.className = 'photograph-price';
        h5.textContent = price + "€/jour";

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(h4);
        article.appendChild(h5);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}