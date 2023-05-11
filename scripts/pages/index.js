// Affiche les données des photographes
function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// Initialisation
async function init() {
    const loader = document.querySelector('.loader');
    loader.style.display = 'flex';
    
    //On attend la récupération des données
    const photographers = await getPhotographers();
    displayData(photographers);
    loader.style.display = 'none';
}

init();
    
