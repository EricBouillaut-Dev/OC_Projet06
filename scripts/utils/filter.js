const imagesContainer = document.getElementById('photographer-images');
const sortImagesSelect = document.getElementById('sort-images-select');
const sortImagesButton = document.getElementById('sort-images-button');
const sortDropdown = sortImagesSelect.parentElement

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
  return photographer.media.sort((a, b) => a[property] > b[property] ? 1 : -1);
}

function displayImages(images) {
  imagesContainer.innerHTML = '';
  images.forEach(image => {


    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.src = `assets/images/${photographer.name}/small/${image.image}`;
    img.alt = image.title;
    figcaption.innerText = image.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    
    imagesContainer.appendChild(figure);
  });
}

sortImagesSelect.addEventListener('click', event => {
  if (event.target.tagName === 'LI') {
    const selectedOption = event.target.getAttribute('data-value');
    const sortedImages = sortImagesBy(selectedOption);
    displayImages(sortedImages);
  }

});

// Afficher les images triées par likes par défaut
const sortedImages = sortImagesBy('likes');
displayImages(sortedImages);
