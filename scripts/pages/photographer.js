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
  const imagesLightbox = document.querySelectorAll('#photographer-images figure img');
  imagesLightbox.forEach((image, index) => {
    image.addEventListener('click', () => {
      const x = event.clientX;
      const y = event.clientY;
      const imgTitle = image.getAttribute('alt')
      lightboxImg.setAttribute('src', image.getAttribute('src'));
      lightboxCaption.innerText = imgTitle;
      openLightbox(imagesLightbox, x, y, index);
    });
  });

};

async function init() {
  const loader = document.querySelector('.loader');
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

const sortImagesSelect = document.getElementById('sort-images-select');
const sortImagesButton = document.getElementById('sort-images-button');
const sortDropdown = sortImagesSelect.parentElement
const lightboxImg = document.querySelector('.lightbox-img');
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
