function sortMediaBy(property,media) {
  const updateButton = property.replace('likes','Popularité').replace('date','Date').replace('title','Titre');
  sortImagesButton.innerText = updateButton;
  return media.sort((a, b) => a[property] > b[property] ? 1 : -1);
}

function displayMedia(medias) {
  const imagesContainer = document.getElementById('photographer-images');
  imagesContainer.innerHTML = "";
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    imagesContainer.appendChild(mediaCardDOM);
  });

  const imagesLightbox = document.querySelectorAll('#photographer-images figure img, #photographer-images figure video');
  imagesLightbox.forEach((media, index) => {
    media.addEventListener('click', () => {
      const x = event.clientX;
      const y = event.clientY;
      
      const clone = media.cloneNode(true);
      document.querySelector('.lightbox-img').remove();
            
      lightboxCaption.parentNode.insertBefore(clone, lightboxCaption);
      clone.className = "lightbox-img";
      if (clone instanceof HTMLVideoElement) {
        clone.controls = true;
        clone.id = "video";
      }
  
      const imgTitle = media.getAttribute('alt');
      console.log(media);
      lightboxCaption.innerText = imgTitle;
      openLightbox(imagesLightbox, x, y, index);
    });
  });

};

async function init() {
  loader.style.display = 'flex';
  
  const params = (new URL(document.location)).searchParams;
  const photographerId = params.get('id');

  const photographers = await getPhotographers();
  const photographer = photographers.find(p => p.id == photographerId);

  headerFactory(photographer);
  const sortedMedias = sortMediaBy('likes',photographer.medias);
  displayMedia(sortedMedias);

  sortImagesSelect.addEventListener('click', event => {
    if (event.target.tagName === 'LI') {
      const selectedOption = event.target.getAttribute('data-value');
      const sortedMedia = sortMediaBy(selectedOption,photographer.medias);
      displayMedia(sortedMedia);
    }
  
  });
  loader.style.display = 'none';
};
const loader = document.querySelector('.loader');

const sortImagesSelect = document.getElementById('sort-images-select');
const sortImagesButton = document.getElementById('sort-images-button');
const sortDropdown = sortImagesSelect.parentElement
const lightboxCaption = document.getElementById('lightbox-caption');

sortImagesButton.addEventListener('click', event => {
  sortImagesButton.setAttribute('aria-expanded', 'true');
  sortImagesButton.classList.toggle('active');
  sortImagesSelect.classList.toggle('active');
});

sortDropdown.addEventListener('mouseleave', event => {
  sortImagesButton.setAttribute('aria-expanded', 'false');
  sortImagesButton.removeAttribute ('class');
  sortImagesSelect.removeAttribute ('class');
});

init();
