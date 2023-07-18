const mainModal = document.querySelector(".modal");
const formModal = document.querySelector(".modal2");

const openModal = document.querySelector(".ouvrir");
openModal.addEventListener("click", function () {
  mainModal.style.display = "flex";
});

const closeButton = document.querySelector(".modal__close");
closeButton.addEventListener("click", function () {
  mainModal.style.display = "none";
});

const supprimerButton = document.querySelector(".modal__footer_supprimer");
supprimerButton.addEventListener("click", function () {
  const modalBody = document.querySelector(".modal__body");
  modalBody.innerHTML = "";
});

const footerButton = document.querySelector(".modal__footer_button");
footerButton.addEventListener("click", function () {
  formModal.style.display = "flex";
  mainModal.style.display = "none";
});

const closeFormButton = document.querySelector(".modal2__close");
closeFormButton.addEventListener("click", function () {
  formModal.style.display = "none";
});

function createImageTextDiv(projet) {
  const modalBody = document.querySelector(".modal__body");
  const imageTextContainer = document.createElement("div");
  imageTextContainer.classList.add("image-text-container");
  const imageElement = document.createElement("img");
  imageElement.src = projet.imageUrl;
  const textElement = document.createElement("p");
  textElement.textContent = projet.title;

  const editLink = document.createElement("a");
  editLink.href = "#";
  editLink.textContent = "Éditer";
  const deleteIcon = document.createElement("span");
  deleteIcon.classList.add("delete-icon");
  deleteIcon.classList.add("fas", "fa-trash");

  imageTextContainer.appendChild(imageElement);
  imageTextContainer.appendChild(textElement);
  imageTextContainer.appendChild(editLink);
  imageTextContainer.appendChild(deleteIcon);

  modalBody.appendChild(imageTextContainer);

  deleteIcon.addEventListener("click", function () {
    // Appel à la fonction pour supprimer le travail côté backend
    deleteWork(projet.id);
    // Suppression du container côté frontend
    imageTextContainer.remove();
  });
}

// Fonction pour supprimer un travail (work) côté backend
function deleteWork(workId) {
  // Utiliser l'URL appropriée avec l'ID du travail à supprimer
  const url = `http://localhost:5678/api/works/${workId}`;

  // Envoyer la requête DELETE avec fetch
  fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Une erreur s'est produite lors de la suppression du travail."
        );
      }
      console.log("Travail supprimé avec succès !");
    })
    .catch((error) => {
      console.log(error);
      alert("Une erreur s'est produite lors de la suppression du travail.");
    });
}

const addForm = document.getElementById("ajouterForm");
addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData();

  const title = document.getElementById("title").value;
  const imageFile = document.getElementById("imageFile").files[0];
  const categoryId = document.getElementById("categoryId").value; // Utiliser la valeur de l'ID de catégorie au lieu du nom

  formData.append("title", title);
  formData.append("image", imageFile);
  formData.append("category", categoryId);

  // Vérifier si toutes les informations nécessaires sont présentes
  if (
    title.trim() === "" ||
    imageFile === undefined ||
    categoryId.trim() === ""
  ) {
    // Afficher un message d'erreur si le formulaire n'est pas correctement rempli
    alert("Veuillez remplir tous les champs du formulaire.");
    return;
  }

  const token = localStorage.getItem("token");
  console.log(token);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData,
    headers: {
      // Ajouter le header d'authentification avec la valeur du token
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      // Traiter la réponse de l'API et mettre à jour le DOM
      console.log(data);
      // Afficher la nouvelle image dans la galerie
      // ...
      // Fermer la fenêtre modale
      document.getElementById("modal").style.display = "none";
    });
  // .catch((error) => {
  //   console.log(error);
  //   // Afficher un message d'erreur si la requête échoue
  //   alert("Une erreur s'est produite lors de l'ajout de l'image.");
  // });
});
