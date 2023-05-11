function photographerFactory(data) {
    const { name, portrait, location, tagline, price, id} = data;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.innerHTML = `
            <a href="photographer.html?id=${id}">
                <img src=${portrait} alt="${name}">
                <h2 class="photograph-name">${name}</h2>
            </a>
            <p class="photograph-location">${location}</p>
            <p class="photograph-tagline">${tagline}</p>
            <p class="photograph-price">${price}€/jour</p>
        `;
        return (article);
    }
    return { name, portrait, location, tagline, getUserCardDOM }
}

function mediaFactory(media) {
    const { title, likes, price, date, type, url, id} = media;

    function getMediaCardDOM() {
        const figure = document.createElement( 'figure' );
        const uri = url.replace(" ","%20")
        // figure.tabIndex = 0;
        if(type === "image"){
            figure.innerHTML = `
            <img src="${uri}" alt="${title}" title="${title}" id="${id}" tabindex="0">
            <figcaption>${title}</figcaption>
        `;
        }
        else{
            figure.innerHTML = `
            <video src="${uri}" type="video/mp4" alt="${title}" title="${title}" id="${id}" tabindex="0"></video>
            <figcaption class="video-caption">${title}</figcaption>
        `;
        }
        figure.innerHTML += `
            <span tabindex="0" aria-label="likes">${likes}</span>           
            <i class="fa-solid fa-heart"></i>
        `
        return (figure);
    }
    return { title, likes, price, date, type, url, id, getMediaCardDOM }
}
