// Fonction de tri des images
function sortMediaBy(property,media) {
  const updateButton = property.replace('likes','Popularité').replace('date','Date').replace('title','Titre');
  sortImagesButton.innerText = updateButton;
  if(updateButton === 'Titre'){return media.sort((a, b) => a[property] > b[property] ? 1 : -1);};
  return media.sort((b, a) => a[property] > b[property] ? 1 : -1);
}

// Fonction pour afficher la galerie d'images
function displayMedia(medias) {
  const imagesContainer = document.getElementById('photographer-images');
  imagesContainer.innerHTML = "";
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    imagesContainer.appendChild(mediaCardDOM);
  });
};

// Fonction de sélection du filtre (par click ou par touches)
function selectedFilter(event,medias){

  // Séléctionne le choix du filtre
  dropdownOptions.forEach(function(option) {
    option.setAttribute('aria-selected', 'false');
  });
  event.setAttribute('aria-selected', 'true');
  const selectedOption = event.getAttribute('data-value');

  // Tri les images
  const sortedMedia = sortMediaBy(selectedOption,medias);

  // ferme le menu déroulant
  sortImagesButton.setAttribute('aria-expanded', 'false');
  sortImagesButton.removeAttribute ('class');
  sortImagesSelect.removeAttribute ('class');

  // Affiche les images
  displayMedia(sortedMedia);
}



// Fonction d'initialisation
async function init() {
  
  const loader = document.querySelector('.loader');
  loader.style.display = 'flex'; // On affiche le loader en attendant le résultat du process

  // Récupération de l'ID du photographe
  const params = (new URL(document.location)).searchParams;
  const photographerId = params.get('id');

  // Récupération de l'objet photographe correspondant avec ses medias
  const photographers = await getPhotographers();
  const photographer = photographers.find(p => p.id == photographerId);

  // Evenement 'click' sur toute la partie main
  const main = document.getElementById('main');
  main.addEventListener('click', event => {

    // On attend un click sur le bouton du filtre
    if (event.target.id === 'sort-images-button') {
      sortImagesButton.setAttribute('aria-expanded', 'true');
      sortImagesButton.classList.toggle('active');
      sortImagesSelect.classList.toggle('active');
      dropdownOptions[0].focus();
    }

    // On attend un click sur les choix du filtre
    if (event.target.tagName === 'LI') {
      selectedFilter(event.target, photographer.medias);
    };
    
    // On attend un click sur le bouton de la modale de contact (formulaire)
    if (event.target.className === 'contact_button') {
      displayModal();
    };

    // On récupère les coordonnées du click
    const x = event.clientX;
    const y = event.clientY;

    // On récupère l'index de l'image cliquée dans les medias
    if (event.target.tagName === 'IMG' || event.target.tagName === 'VIDEO') {
      const photographerMedias = photographer.medias;
      const mediaId = event.target.id;
      const media = photographerMedias.find(media => media.id == mediaId);
      const mediaIndex = photographerMedias.indexOf(media);
        openLightbox (photographerMedias, x, y, mediaIndex);
    }

    // On incrémente une seule fois les compteurs de likes lorsqu'on clique dessus
    if (event.target.className === 'fa-solid fa-heart') {
     
      const liked = event.target.parentElement;
      
      if(!liked.classList.contains('liked')){
        liked.classList.add('liked');
        totalLikes ++;
        countLikes.innerText = `${totalLikes}`;
        const likeCount = liked.querySelector('span');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
        const heartIcons = liked.querySelector('.fa-solid.fa-heart');
        heartIcons.style.color = '#df00df';
      }
    };
  });

  // Evenement des touches pour le menu déroulant (flèches pour la naviguation et entrée/espace pour valider)
  sortImagesSelect.addEventListener('keydown', function(event) {

    const currentIndex = Array.prototype.indexOf.call(dropdownOptions, event.target);
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectedFilter(event.target, photographer.medias);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (currentIndex > 0) {
        dropdownOptions[currentIndex - 1].focus();
        dropdownOptions.forEach(function(option) {
          option.setAttribute('aria-selected', 'false');
        });
        dropdownOptions[currentIndex - 1].setAttribute('aria-selected', 'true');
      }
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (currentIndex < dropdownOptions.length - 1) {
        dropdownOptions[currentIndex + 1].focus();
        dropdownOptions.forEach(function(option) {
          option.setAttribute('aria-selected', 'false');
        });
        dropdownOptions[currentIndex + 1].setAttribute('aria-selected', 'true');
      }
    }
  });

  // Evenement de la validation de l'image au clavier (touche entrée/espace) pour lancer la lightbox
  photographerImage.addEventListener('keydown', function(event) {

    if ((event.target.tagName === 'IMG' || event.target.tagName === 'VIDEO') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      const photographerMedias = photographer.medias;
      const mediaId = event.target.id;
      const media = photographerMedias.find(media => media.id == mediaId);
      const mediaIndex = photographerMedias.indexOf(media);
      const x = window.innerWidth / 2;
      const y = window.innerHeight / 2;
      openLightbox (photographerMedias, x, y, mediaIndex);
    }
    if (event.target.tagName === 'SPAN' && (event.key === 'Enter' || event.key === ' ')){
      event.preventDefault();
      const liked = event.target.parentElement;
      
      if(!liked.classList.contains('liked')){
        liked.classList.add('liked');
        totalLikes ++;
        countLikes.innerText = `${totalLikes}`;
        const likeCount = liked.querySelector('span');
        likeCount.textContent = parseInt(likeCount.textContent) + 1;
        const heartIcons = liked.querySelector('.fa-solid.fa-heart');
        heartIcons.style.color = '#df00df';
      }
    }
  });

  // Récupération des valeurs pour la bannière des likes
  const countLikes = document.querySelector('.count-likes');
  const tarif = document.querySelector('.tarif');

  // On tag le total des likes et du tarif journalier dans la bannière
  let totalLikes = photographer.medias.reduce((sum, obj) => sum + obj.likes, 0);
  countLikes.innerText = `${totalLikes}`;
  tarif.innerText = `${photographer.price}€/jour`

  // On affiche l'entete du photographe
  headerFactory(photographer);
  const sortedMedias = sortMediaBy('likes',photographer.medias);
  
  // On affiche la galerie du photographe
  displayMedia(sortedMedias);

  // On ferme le loader
  loader.style.display = 'none';
};


const sortImagesSelect = document.getElementById('sort-images-select');
const sortImagesButton = document.getElementById('sort-images-button');
const dropdownOptions = sortImagesSelect.querySelectorAll('li');
const sortDropdown = sortImagesSelect.parentElement
const lightboxCaption = document.getElementById('lightbox-caption');
const photographerImage = document.getElementById('photographer-images');

sortDropdown.addEventListener('mouseleave', event => {
  sortImagesButton.setAttribute('aria-expanded', 'false');
  sortImagesButton.removeAttribute ('class');
  sortImagesSelect.removeAttribute ('class');
});

init();
