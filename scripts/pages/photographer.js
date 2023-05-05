function sortMediaBy(property,media) {
  const updateButton = property.replace('likes','Popularité').replace('date','Date').replace('title','Titre');
  sortImagesButton.innerText = updateButton;
  if(updateButton === 'Titre'){return media.sort((a, b) => a[property] > b[property] ? 1 : -1);};
  return media.sort((b, a) => a[property] > b[property] ? 1 : -1);
}

function displayMedia(medias) {
  const imagesContainer = document.getElementById('photographer-images');
  imagesContainer.innerHTML = "";
  medias.forEach((media) => {
    const mediaModel = mediaFactory(media);
    const mediaCardDOM = mediaModel.getMediaCardDOM();
    imagesContainer.appendChild(mediaCardDOM);
  });
};

async function init() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'flex'; // On affiche le loader en attendant le résultat du process

  // Récupération de l'ID du photographe
  const params = (new URL(document.location)).searchParams;
  const photographerId = params.get('id');

  // Récupération de l'objet photographe correspondant avec ses medias
  const photographers = await getPhotographers();
  const photographer = photographers.find(p => p.id == photographerId);

  // Evenement 'click' sur toute la page
  const main = document.getElementById('main');
  main.addEventListener('click', event => {
    // On attend un click sur les choix du filtre
    if (event.target.tagName === 'LI') {
      const selectedOption = event.target.getAttribute('data-value');
      const sortedMedia = sortMediaBy(selectedOption,photographer.medias);
      displayMedia(sortedMedia);
    };

    // On attend un click sur le bouton de la modale de contact (formulaire)
    if (event.target.className === 'contact_button') {
      displayModal();
    };

    // On attend un click sur le bouton du filtre
    if (event.target.id === 'sort-images-button') {
      sortImagesButton.setAttribute('aria-expanded', 'true');
      sortImagesButton.classList.toggle('active');
      sortImagesSelect.classList.toggle('active');
    }

    // On récupère les ccordonnées du click
    const x = event.clientX;
    const y = event.clientY;

    // On récupère l'index de l'image cliquée dans les medias
    if (event.target.tagName === 'IMG' || event.target.tagName === 'VIDEO') {
      const photographerMedias = photographer.medias;
      const mediaId = event.target.id;
      const media = photographerMedias.find(media => media.id == mediaId);
      const mediaIndex = photographerMedias.indexOf(media);
      // console.log(mediaIndex);
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
  
  // Récupération des valeurs pour la bannière des likes
  const countLikes = document.querySelector('.count-likes');
  const tarif = document.querySelector('.tarif');

  // On tag le total des likes et du tarif journalier dans la bannière
  let totalLikes = photographer.medias.reduce((sum, obj) => sum + obj.likes, 0);
  countLikes.innerText = `${totalLikes}`;
  tarif.innerText = `${photographer.price}€/jour`

  // const likeButtons = document.querySelectorAll('.fa-solid.fa-heart');
  //   console.log(likeButtons);

  // likeButtons.forEach(button => {
  //   button.addEventListener('click', () => {
  //     button.disabled = true; // désactiver le bouton
  //     // effectuer l'action de like ici
  //   });
  // });



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
const sortDropdown = sortImagesSelect.parentElement
const lightboxCaption = document.getElementById('lightbox-caption');

sortDropdown.addEventListener('mouseleave', event => {
  sortImagesButton.setAttribute('aria-expanded', 'false');
  sortImagesButton.removeAttribute ('class');
  sortImagesSelect.removeAttribute ('class');
});

init();
