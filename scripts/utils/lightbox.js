function openLightbox(images, x, y, currentIndex){
const lightbox = document.querySelector('.lightbox');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

lightbox.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
lightbox.style.top = `${y}px`;
lightbox.style.left = `${x}px`;
lightbox.style.transform = `translate(-${x}px, -${y}px) scale(1)`;

const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', () => {
  lightbox.style.backgroundColor = 'rgba(255, 255, 255, 0)';
  lightbox.style.transform = `translate(-50%, -50%) scale(0)`;
});

prevButton.addEventListener('click', () => {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = images.length - 1;
  }
  const newImageSrc = images[currentIndex].getAttribute('src');
  lightboxImg.setAttribute('src', newImageSrc);
});

nextButton.addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= images.length) {
    currentIndex = 0;
  }
  const newImageSrc = images[currentIndex].getAttribute('src');
  lightboxImg.setAttribute('src', newImageSrc);
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