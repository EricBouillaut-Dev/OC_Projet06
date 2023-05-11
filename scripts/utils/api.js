// Récupération des données avec fetch
class Api {
    constructor(url) {
      this._url = url;
    }
  
    async get() {
      try {
        const response = await fetch(this._url);
        if (!response.ok) {
          throw new Error("La réponse du réseau n'est pas correcte");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Erreur sur la récupération des données:', error);
      }
    }
}

// Construction du photographe
class Photographer {
  constructor(data) {
    this._name = data.name;
    this._id = data.id;
    this._city = data.city;
    this._country = data.country;
    this._tagline = data.tagline;
    this._price = data.price;
    this._portrait = data.portrait;
  }
  get name() {return this._name;}
  get id() {return this._id;}
  get tagline() {return this._tagline;}
  get price() {return this._price;}
  get portrait() {return `assets/photographers/small/${this._portrait}`;}
  get location() {return `${this._city}, ${this._country}`;}
  get medias() {return [];}
}

// Construction des medias
class Media {
  constructor(data) {
    this._id = data.id;
    this._photographerId = data.photographerId;
    this._title = data.title;
    this._likes = data.likes;
    this._date = data.date;
    this._price = data.price;
    this._image = data.image;
    this._video = data.video;
    this._type = null
    this._url = null
  }
  get id() {return this._id}
  get photographerId() {return this._photographerId}
  get title() {return this._title}
  get likes() {return this._likes}
  get date() {return this._date}
  get price() {return this._price}
  get type() {
    if (this._type === null) {
      if (this._image) {
        this._type = 'image';
      } else if (this._video) {
        this._type = 'video';
      }
    }
    return this._type;
  }

  get url() {
    if (this._url === null) {
      if (this._type === 'image') {
        this._url = this._image;
      } else if (this._type === 'video') {
        this._url = this._video;
      }
    }
    return this._url;
  }
}

// Récupération des données et construction des objets de chaque photographe
async function getPhotographers(){
  const api = new Api('./data/photographers.json');
  const data = await api.get();

  const photographers = data.photographers.map(photographerData => {
    const photographer = new Photographer(photographerData);
    return {
      name: photographer.name,
      id: photographer.id,
      tagline: photographer.tagline,
      price: photographer.price,
      portrait: photographer.portrait,
      location: photographer.location,
      medias: photographer.medias
    };
  });
  
  const medias = data.media.map(mediaData => {
    const media = new Media(mediaData);
    return {
      id: media.id,
      photographerId: media.photographerId,
      title: media.title,
      likes: media.likes,
      date: media.date,
      price: media.price,
      type: media.type,
      url: media.url
    };
  });

  // Ajout d'un tableau contenant les medias pour chaque photographe
  medias.forEach(media => {
    const photographer = photographers.find(p => p.id === media.photographerId);
    const tmpName = photographer.name;
    const tmpUrl = media.url

    if (photographer) {
      if(media.type === "image"){
        media.url = `assets/images/${tmpName}/small/${tmpUrl}`
        photographer.medias.push(media);
      }
      else{
        media.url = `assets/images/${tmpName}/${tmpUrl}`
        photographer.medias.push(media);
      }
    }
  });
  return photographers;
}
