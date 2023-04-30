const lightboxCaption = document.getElementById('lightbox-caption');

function openLightbox(images, x, y, currentIndex){
const lightbox = document.querySelector('.lightbox');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const closeButton = document.querySelector('.close');

lightbox.style.backgroundColor = 'rgba(255, 255, 255, 1)';
lightbox.style.top = `${y}px`;
lightbox.style.left = `${x}px`;
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
    currentIndex = images.length - 1;
  }
  const newImageSrc = images[currentIndex].getAttribute('src');
  const newImageCaption = images[currentIndex].getAttribute('alt');
  lightboxImg.setAttribute('src', newImageSrc);
  lightboxCaption.innerText = newImageCaption;
});

nextButton.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  const newImageSrc = images[currentIndex].getAttribute('src');
  const newImageCaption = images[currentIndex].getAttribute('alt');
  lightboxImg.setAttribute('src', newImageSrc);
  lightboxCaption.innerText = newImageCaption;
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