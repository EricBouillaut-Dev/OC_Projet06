const loader = document.querySelector('.loader');
loader.style.display = 'flex';

let params = (new URL(document.location)).searchParams;
let photographerId = params.get('id');

const photographer = JSON.parse(localStorage.getItem(`OC_P6_photographer-${photographerId}`));
const mediaImages = Object.values(photographer.media).filter(obj => obj.image);
const mediaVideo = Object.values(photographer.media).filter(obj => obj.video);
// const Images = mediaImages.map(img => img.image);


console.log(mediaImages);
console.log(mediaVideo);

const photographName = document.querySelector('.photograph-name');
const photographLocation = document.querySelector('.photograph-location');
const photographTagline = document.querySelector('.photograph-tagline');
const photograpHeader = document.querySelector(".photograph-header");

photographName.innerText = photographer.name;
photographLocation.innerText = `${photographer.city}, ${photographer.country}`;
photographTagline.innerText = photographer.tagline;

const picture = `assets/photographers/small/${photographer.portrait}`;
const img = document.createElement( 'img' );
img.setAttribute("src", picture);
img.setAttribute('alt', photographer.title)
photograpHeader.appendChild(img);

loader.style.display = 'none';

  
