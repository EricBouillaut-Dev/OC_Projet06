// Ouverture de la lightbox
function openLightbox(medias, x, y, currentIndex){
  // On affiche la bonne image par rapport à son index dans le tableau des medias
  function showMedia(){
    const url = medias[currentIndex].url;
    const title = medias[currentIndex].title;
    const lightboxImg = document.querySelector('.lightbox-img');

    const lightboxImgContainer = lightboxImg.parentElement;
    
    if(medias[currentIndex].type == 'image'){
      lightboxImgContainer.innerHTML = `
        <img src="${url}" class="lightbox-img" alt="${title}" title="${title}">
        <figcaption class="lightbox-caption">${title}</figcaption>
      `;
    }
    else{
      lightboxImgContainer.innerHTML = `
        <video controls src="${url}" class="lightbox-img" type="video/mp4" alt="${title}" title="${title}" id="video"></video>
        <figcaption class="lightbox-caption">${title}</figcaption>
      `;
    }    

    const newLightboxImg = document.querySelector('.lightbox-img');
    newLightboxImg.style.opacity = 0;

    setTimeout(() => {
      newLightboxImg.style.opacity = 1;
    }, 100);
    newLightboxImg.focus();
  }

  // initialisation des constantes
  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const closeButton = document.querySelector('.close');
  const lightbox = document.querySelector('.lightbox');
  const borderLightbox = document.querySelector('.border-lightbox');

  // On affiche l'image cliquée précédement avant d'ouvrir la lightbox
  showMedia();

  // animation qui ouvre la lightbox à partir du click de la souris
  lightbox.style.top = `${y}px`;
  lightbox.style.left = `${x}px`;
  lightbox.style.transform = `translate(-${x}px, -${y}px) scale(1)`;
  lightbox.style.transition = 'transform 0.5s ease-in';
  
  // Temporisation pour afficher l'image de fond semi-transparent, le temps que la lightbox soit de taille 1
  setTimeout(() => {
    lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  }, 500);
  borderLightbox.style.backgroundColor = 'rgba(255, 255, 255, 1)';
  borderLightbox.style.transition = "background-color 0.5s cubic-bezier( 1, 0, 1, 0 )"
  
  // Ajout d'un évènement 'click' sur toute la lightbox
  lightbox.addEventListener('click', event => {
    // Si click sur le bouton next, in incrémente l'index puis on affiche le media
    if (event.target.className === 'next') {
      currentIndex++;
      if (currentIndex >= medias.length) {
        currentIndex = 0;
      }
      showMedia();
      };
    
    // Si click sur le bouton prev, in décrémente l'index puis on affiche le media
    if (event.target.className === 'prev') {
      currentIndex--;
      if (currentIndex < 0) {
        currentIndex = medias.length - 1;
      }
      showMedia();
    };

    // Si click sur la croix, on ferme la lightbox avec l'animation inverse de l'ouverture
    if (event.target.className === 'close') {
      document.body.style.overflow = 'auto';
      lightbox.style.transform = `translate(-50%, -50%) scale(0)`;
      lightbox.style.transition = 'transform 0.5s ease-in';
      lightbox.style.backgroundColor = 'rgba(0, 0, 0, 0)';
      borderLightbox.style.backgroundColor = 'rgba(255, 255, 255, 0)';
      borderLightbox.style.transition = "background-color 0.2s ease-out"
    };
  });

  // Prise en charge des flèches de direction du clavier et de la touche echap
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      prevButton.click();
    }

    if (event.key === 'ArrowRight') {
      nextButton.click();
    }

    if (event.key === 'Escape') {
      closeButton.click();
    }
  });
}