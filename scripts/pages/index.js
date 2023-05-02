function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    const loader = document.querySelector('.loader');
    loader.style.display = 'flex';
    
    const photographers = await getPhotographers();
    displayData(photographers);
    loader.style.display = 'none';
  };

init();
    
