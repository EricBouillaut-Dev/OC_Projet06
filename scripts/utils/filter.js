const imagesContainer = document.getElementById('photographer-images');
const sortImagesSelect = document.getElementById('sort-images-select');
const sortImagesButton = document.getElementById('sort-images-button');
const sortDropdown = sortImagesSelect.parentElement
const lightboxImg = document.querySelector('.lightbox-img');

// let imgTitle = "";

sortImagesButton.addEventListener('click', event => {
  sortImagesButton.setAttribute('aria-expanded', 'true');
  sortImagesButton.classList.toggle('active');
  sortImagesSelect.classList.toggle('active');
  
  // sortImagesSelect.style.display = 'block';
});

sortDropdown.addEventListener('mouseleave', event => {
  sortImagesButton.setAttribute('aria-expanded', 'false');
  sortImagesButton.removeAttribute ('class');
  sortImagesSelect.removeAttribute ('class');

  // sortImagesSelect.style.display = 'none';
});

function sortImagesBy(property) {
  const updateButton = `${property}`.replace('likes','Popularité').replace('date','Date').replace('title','Titre');
  sortImagesButton.innerText = updateButton;
  return mediaImages.sort((a, b) => a[property] > b[property] ? 1 : -1);
  // return mediaImages.sort((a, b) => a[property] > b[property] ? 1 : -1);
}
function sortVideoBy(property) {
  // const updateButton = `${property}`.replace('likes','Popularité').replace('date','Date').replace('title','Titre');
  // sortImagesButton.innerText = updateButton;
  return mediaVideo.sort((a, b) => a[property] > b[property] ? 1 : -1);
  // return mediaImages.sort((a, b) => a[property] > b[property] ? 1 : -1);
}

function displayImages(images) {
  imagesContainer.innerHTML = '';
  images.forEach(image => {
    // imgTitle = image.title;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    
    img.src = `assets/images/${photographer.name}/small/${image.image}`;
    img.alt = image.title;
    figcaption.innerHTML = image.title;
    
    figure.appendChild(img);
    figure.appendChild(figcaption);
    
    imagesContainer.appendChild(figure);
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
}
function displayVideo(videos) {
  // imagesContainer.innerHTML = '';
  videos.forEach(video => {
    // imgTitle = image.title;

    const figure = document.createElement('figure');
    const vid = document.createElement('video');
    const figcaption = document.createElement('figcaption');
    
    vid.src = `assets/images/${photographer.name}/${video.video}`;
    
    figcaption.innerHTML = '[VIDEO]' + video.title;
    
    figure.appendChild(vid);
    figure.appendChild(figcaption);
    
    imagesContainer.appendChild(figure);
  });
  
  // const imagesLightbox = document.querySelectorAll('#photographer-images figure img');
  // imagesLightbox.forEach((image, index) => {
  //   image.addEventListener('click', () => {
  //     const x = event.clientX;
  //     const y = event.clientY;
  //     const imgTitle = image.getAttribute('alt')
  //     lightboxImg.setAttribute('src', image.getAttribute('src'));
  //     lightboxCaption.innerText = imgTitle;
  //     openLightbox(imagesLightbox, x, y, index);
  //   });
  // });
}

sortImagesSelect.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    const selectedOption = event.target.getAttribute('data-value');
    const sortedImages = sortImagesBy(selectedOption);
    const sortedVideo = sortVideoBy(selectedOption);
    console.log(sortedVideo);
    displayImages(sortedImages);
    displayVideo(sortedVideo);
  }

});

// Afficher les images triées par likes par défaut
const sortedImages = sortImagesBy('likes');
const sortedVideo = sortVideoBy('likes');
displayImages(sortedImages);
displayVideo(sortedVideo);