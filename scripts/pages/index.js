async function getPhotographers() {
  const loader = document.querySelector('.loader');
  const keyPrefix = 'OC_P6_photographer-';
  const photographers = [];
  const keys = Object.keys(localStorage).filter(key => key.startsWith(keyPrefix));
  if (keys.length > 0) {
    loader.style.display = 'flex';
    localKeyExist=true;
    keys.forEach(value => {
      const photographer = JSON.parse(localStorage.getItem(value));
      photographers.push(photographer);
    });
    console.log("Build a partir du local storage");
    loader.style.display = 'none';
    return photographers;
  }
  else{
    console.log("Build fetch");
    try {
      loader.style.display = 'flex';
      const response = await fetch('./data/photographers.json');
      await new Promise(resolve => setTimeout(resolve, 2000));
      if (!response.ok) {
        throw new Error(`Impossible d'effectuer le fetch: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      if (!data || !data.photographers || data.photographers.length === 0) {
        throw new Error('Aucun photographe trouvé');
      }
      return data.photographers.map((photographer) => {
        return {
          ...photographer,
          media: data.media.filter((media) => media.photographerId === photographer.id)
        };
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
    finally {
      loader.style.display = 'none';
    }
  }
}
  
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        // console.log(photographerModel);
        const userCardDOM = photographerModel.getUserCardDOM();
        // console.log(userCardDOM);
        photographersSection.appendChild(userCardDOM);
            // console.log(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    console.log(photographers);
    // Stockage des photographes dans le localStorage
    if(!localKeyExist){
      photographers.forEach(photographer => {
        localStorage.setItem(`OC_P6_photographer-${photographer.id}`, JSON.stringify(photographer));
      });
      console.log("ajout local storage");
    }

    displayData(photographers);
};
let localKeyExist=false;
init();
    
