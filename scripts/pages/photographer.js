const loader = document.querySelector('.loader');
loader.style.display = 'flex';
let params = (new URL(document.location)).searchParams;
let photographerId = params.get('id');

const photographer = JSON.parse(localStorage.getItem(`OC_P6_photographer-${photographerId}`));
console.log(photographer);
console.log(photographer.media[0].id);

const photograpHeader = document.querySelector(".photograph-header");
const insert = document.createElement('div');
insert.className = 'photograph-header__bloc-titre'
insert.innerHTML = `
    <h1 class="photograph-name">${photographer.name}</h1>
    <p class="photograph-location">${photographer.city}, ${photographer.country}</p>
    <p class="photograph-tagline">${photographer.tagline}</p>
`;
photograpHeader.insertBefore(insert, photograpHeader.querySelector('.contact_button'));

const picture = `assets/photographers/small/${photographer.portrait}`;
const img = document.createElement( 'img' );
img.setAttribute("src", picture);
photograpHeader.appendChild(img);

// Ajout de la page au DOM

// photograpHeader.appendChild(page);

loader.style.display = 'none';

const mediaImages = Object.values(photographer.media).filter(obj => obj.image);

  const Images = mediaImages.map(img => img.image);
  
  console.log(Images);
  
// launchLighbox();
// const images=photographer.media
console.log(photographer.name);
console.log(photographer.tagline);

// function exportToJsonFile(jsonData, fileName) {
//     let dataStr = JSON.stringify(jsonData, null, 2);
//     let dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
//     let linkElement = document.createElement('a');
//     linkElement.setAttribute('href', dataUri);
//     linkElement.setAttribute('download', fileName);
//     linkElement.click();
//   }

//   exportToJsonFile(photographer, "test.json")
