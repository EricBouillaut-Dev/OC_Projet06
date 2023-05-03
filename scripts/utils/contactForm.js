function displayModal() {
    const photographerName = document.querySelector(".photograph-name");
    const photographerContact = document.querySelector(".modal p");
    console.log(photographerName.innerText);
    photographerContact.innerText = `${photographerName.innerText}`;
	modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
    form.reset();
}

function sendContact() {
    // Récupère le formulaire et les données soumises
    const formData = new FormData(form);
  
    // Accède aux valeurs soumises pour chaque champ
    const prenom = formData.get('prenom');
    const nom = formData.get('nom');
    const email = formData.get('email');
    const message = formData.get('message');
  
    // Afficher les données dans la console
    const contactData = {
        Prenom: prenom,
        Nom: nom,
        email: email,
        Message: message
    }
    console.log(contactData);

    modal.style.display = "none";
    form.reset();
    
    // Empêche la soumission du formulaire
    event.preventDefault();
  }
  const modal = document.getElementById("contact_modal");
  const form = document.querySelector('form');

