async function getPhotographers() {
    try {
      const response = await fetch('./data/photographers.json');
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
  }
  


// async function getPhotographers() {
//     try {
//       const response = await fetch('./data/photographers.json');
//       if (!response.ok) {
//         throw new Error(`Impossible d'effectuer le fetch: ${response.status} ${response.statusText}`);
//       }
//       const data = await response.json();
//       if (!data || !data.photographers || data.photographers.length === 0) {
//         throw new Error('Aucun photographe trouvé');
//       }
//       return data.photographers;
//     } catch (error) {
//       console.error(error);
//       throw error;
//     }
//   }

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        console.log(userCardDOM);
        photographersSection.appendChild(userCardDOM);
            // console.log(userCardDOM);
    });
};

async function init() {
    // Récupère les datas des photographes
    const photographers = await getPhotographers();
    console.log(photographers);
    displayData(photographers);
};
init();
    
