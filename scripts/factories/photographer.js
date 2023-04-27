function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id} = data;

    const picture = `assets/photographers/small/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const a = document.createElement( 'a' );
        a.href = `photographer.html?id=${id}`;

        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        // img.alt = name;

        const h2 = document.createElement( 'h2' );
        h2.className = 'photograph-name';
        h2.textContent = name;

        a.appendChild(img);
        a.appendChild(h2);

        const pLocation = document.createElement( 'p' );
        pLocation.className = 'photograph-location';
        pLocation.textContent = city + ", " + country;

        const pTagline = document.createElement( 'p' );
        pTagline.className = 'photograph-tagline';
        pTagline.textContent = tagline;

        const pPrice = document.createElement( 'p' );
        pPrice.className = 'photograph-price';
        pPrice.textContent = price + "€/jour";

        article.appendChild(a);
        // article.appendChild(img);
        // article.appendChild(h2);
        article.appendChild(pLocation);
        article.appendChild(pTagline);
        article.appendChild(pPrice);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}