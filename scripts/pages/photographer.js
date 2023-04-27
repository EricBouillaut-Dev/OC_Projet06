let params = (new URL(document.location)).searchParams;
let photographerId = params.get('id');

const photographer = JSON.parse(localStorage.getItem(`OC_P6_photographer-${photographerId}`));
console.log(photographer);
console.log(photographer.media[0].id);

const photograpHeader = document.querySelector(".photograph-header");
const insert1 = document.createElement('div');
insert1.className = 'photograph-header__bloc-titre'
insert1.innerHTML = `
    <h1 class="photograph-name">${photographer.name}</h1>
    <p class="photograph-location">${photographer.city}, ${photographer.country}</p>
    <p class="photograph-tagline">${photographer.tagline}</p>
`;

const picture = `assets/photographers/small/${photographer.portrait}`;
const img = document.createElement( 'img' );
img.setAttribute("src", picture);
photograpHeader.appendChild(img);

// Ajout de la page au DOM

photograpHeader.insertBefore(insert1, photograpHeader.querySelector('.contact_button'));
// photograpHeader.appendChild(page);


console.log(photographer.name);
console.log(photographer.tagline);
console.log(photographer.city);
