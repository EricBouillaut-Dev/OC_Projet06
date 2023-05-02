function photographerFactory(data) {
    const { name, portrait, location, tagline, price, id} = data;
    console.log(name);

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        article.innerHTML = `
            <a href="photographer.html?id=${id}&name=${name}&location=${location}&tagline=${tagline}&url=${portrait}">
                <img src=${portrait}>
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
    const { title, likes, price, date, type, url} = media;

    function getMediaCardDOM() {
        const figure = document.createElement( 'figure' );
        const uri = url.replace(" ","%20")
        if(type === "image"){
            figure.innerHTML = `
            <img src="${uri}" alt="${title}" title="${uri}">
            <figcaption alt="${title}" title="${title}">${title}</figcaption>
        `;
        }
        else{
            figure.innerHTML = `
            <video src="${uri}"> type="video/mp4" alt="${title}" title="${title}></video>
            <figcaption class="video-caption" alt="${title}" title="${title}">${title}</figcaption>
        `;
        }
        return (figure);
    }
    return { title, likes, price, date, type, url, getMediaCardDOM }
}
function headerFactory(photographer){
    const photographeName = document.querySelector('.photograph-name');
    const photographeLocation = document.querySelector('.photograph-location');
    const photographeTagline = document.querySelector('.photograph-tagline');
    const photographeHeader = document.querySelector(".photograph-header");
    
    photographeName.innerText = photographer.name;
    photographeLocation.innerText = photographer.location;
    photographeTagline.innerText = photographer.tagline;
    
    const img = document.createElement( 'img' );
    img.setAttribute("src", photographer.portrait);
    img.setAttribute('alt', photographer.name)
    photographeHeader.appendChild(img);
}
