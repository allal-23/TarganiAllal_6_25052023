document.querySelector(".ouvrir").addEventListener("click", function () {
  document.querySelector(".modal").style.display = "flex";
});

document.querySelector(".modal__close").addEventListener("click", function () {
  document.querySelector(".modal").style.display = "none";
});

document
  .querySelector(".modal__footer_supprimer")
  .addEventListener("click", function () {
    const modalBody = document.querySelector(".modal__body");
    modalBody.innerHTML = "";
  });

document
  .querySelector(".modal__footer_button")
  .addEventListener("click", function () {
    // Afficher la deuxième modale
    document.querySelector(".modal2").style.display = "flex";

    // Disparition de la première modale
    document.querySelector(".modal").style.display = "none";
  });

document.querySelector(".modal2__close").addEventListener("click", function () {
  document.querySelector(".modal2").style.display = "none";
});

// Fonction pour créer et ajouter une div d'image avec texte, lien d'édition et icône supprimer
function createImageTextDiv(imageData) {
  const modalBody = document.querySelector(".modal__body");

  // Créer un conteneur pour l'image et le texte
  const imageTextContainer = document.createElement("div");
  imageTextContainer.classList.add("image-text-container");

  // Créer un élément d'image
  const imageElement = document.createElement("img");
  imageElement.src = imageData.imageUrl;

  // Créer un élément de texte
  const textElement = document.createElement("p");
  textElement.textContent = imageData.text;

  // Créer un lien d'édition
  const editLink = document.createElement("a");
  editLink.href = "#"; // Ajoutez le lien approprié pour l'édition
  editLink.textContent = "Éditer";

  // Créer une icône supprimer
  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.innerHTML = "&#x2716;"; // Utilisez le code HTML ou l'icône de votre choix

  // Ajouter l'image, le texte, le lien d'édition et l'icône supprimer au conteneur image-texte
  imageTextContainer.appendChild(imageElement);
  imageTextContainer.appendChild(textElement);
  imageTextContainer.appendChild(editLink);
  imageTextContainer.appendChild(deleteIcon);

  // Ajouter le conteneur image-texte à la modal__body
  modalBody.appendChild(imageTextContainer);

  // Ajouter un gestionnaire d'événements à l'icône supprimer pour supprimer la div parent
  deleteIcon.addEventListener("click", function () {
    imageTextContainer.remove();
  });
}

// Fonction pour charger les images depuis l'API avec fetch
function fetchImages() {
  fetch("http://localhost:5678/api/works", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      data.forEach((imageData) => {
        createImageTextDiv(imageData);
      });
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des images :", error);
    });
}

// Appel de la fonction pour charger les images depuis l'API
fetchImages();
