function openLightbox(medias, x, y, currentIndex){

  function copyMedia(){
    const clone = medias[currentIndex].cloneNode(true);
    document.querySelector('.lightbox-img').remove();
    
    lightboxCaption.parentNode.insertBefore(clone, lightboxCaption);
    clone.className = "lightbox-img";
  
    const newImageCaption = medias[currentIndex].getAttribute('alt');

    if (clone instanceof HTMLVideoElement) {
      clone.controls = true;
      // clone.className = "lightbox-img";
      clone.id = "video";
    }

    clone.style.opacity = '0';
    lightboxCaption.innerText = newImageCaption;
    setTimeout(() => {
      clone.style.opacity = '1';
    }, 100);
  }

  const prevButton = document.querySelector('.prev');
  const nextButton = document.querySelector('.next');
  const closeButton = document.querySelector('.close');
  const lightbox = document.querySelector('.lightbox');
  // const lightboxImg = document.querySelector('.lightbox-img');

  lightbox.style.top = `${y}px`;
  lightbox.style.left = `${x}px`;
  lightbox.style.backgroundColor = 'rgba(255, 255, 255, 1)';
  lightbox.style.transform = `translate(-${x}px, -${y}px) scale(1)`;
  lightbox.style.transition = 'transform 0.3s ease-in, background-color 0.3s cubic-bezier( 1, 0, 1, 0 )';
  prevButton.innerHTML = '&#10094;';
  nextButton.innerHTML = '&#10095;';
  closeButton.innerHTML = '&times;';

  closeButton.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    lightbox.style.backgroundColor = 'rgba(255, 255, 255, 0)';
    lightbox.style.transform = `translate(-50%, -50%) scale(0)`;
    lightbox.style.transition = 'transform 0.3s ease-in, background-color 0.3s cubic-bezier( 0, 1, 0, 1 )';
    prevButton.innerText = '';
    nextButton.innerText = '';
    closeButton.innerText = '';
  });

  prevButton.addEventListener('click', () => {
    currentIndex--;
    if (currentIndex < 0) {
      currentIndex = medias.length - 1;
    }
    copyMedia();
  });

  nextButton.addEventListener('click', () => {
    currentIndex++;
    if (currentIndex >= medias.length) {
      currentIndex = 0;
    }
    copyMedia();
  });

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