const images = document.querySelectorAll('#photographer-images figure img');
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentIndex = 0;

images.forEach((image, index) => {
  image.addEventListener('click', () => {
    lightboxImg.setAttribute('src', image.getAttribute('src'));
    currentIndex = index;
    lightbox.style.display = 'flex';
  });
});

const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', () => {
  lightbox.style.display = 'none';
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
