function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price} = data;

    const picture = `assets/photographers/small/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const a = document.createElement( 'a' );
        a.href = "#";

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.alt = name;

        const h2 = document.createElement( 'h2' );
        h2.className = 'photograph-name';
        h2.textContent = name;

        a.appendChild(img);
        a.appendChild(h2);

        const spanLocation = document.createElement( 'span' );
        spanLocation.className = 'photograph-location';
        spanLocation.textContent = city + ", " + country;

        const spanTagline = document.createElement( 'span' );
        spanTagline.className = 'photograph-tagline';
        spanTagline.textContent = tagline;

        const spanPrice = document.createElement( 'span' );
        spanPrice.className = 'photograph-price';
        spanPrice.textContent = price + "€/jour";

        article.appendChild(a);
        article.appendChild(spanLocation);
        article.appendChild(spanTagline);
        article.appendChild(spanPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}