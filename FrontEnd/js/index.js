let projets;
let categoriesArray = ["Tous"];

function getWorksAndInit() {
  fetch("http://localhost:5678/api/works", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      projets = data;
      console.log(projets);

      let cartesHTML = document.getElementById("cartes");
      cartesHTML.innerHTML = "";

      const modalBody = document.querySelector(".modal__body");
      modalBody.innerHTML = "";

      projets.forEach((projet) => {
        createFigure(projet, cartesHTML);

        createImageTextDiv(projet, modalBody);

        if (!categoriesArray.includes(projet.category.name)) {
          categoriesArray.push(projet.category.name);
        }
      });

      console.log(categoriesArray);

      generateCategories(categoriesArray, projets);

      console.log("Nombre de projets:", projets.length);
      console.log("Nombre de catégories:", categoriesArray.length);
    });
}

getWorksAndInit();

function generateCategories(categoriesArray, projets) {
  let optionsHTML = document.getElementById("options");
  let selectCategory = document.getElementById("categoryId");

  // Créer le bouton "Tous"
  let allButton = document.createElement("a");
  allButton.textContent = "Tous";
  allButton.href = "#";
  let allDiv = document.createElement("div");
  let allSpan = document.createElement("span");
  allSpan.appendChild(allButton);
  allDiv.appendChild(allSpan);
  optionsHTML.appendChild(allDiv);

  // Ajouter un événement click pour afficher tous les projets sans filtrage de catégorie
  allButton.addEventListener("click", (event) => {
    event.preventDefault();
    updateDisplayedProjects(projets);

    // Supprimer la classe "active" de tous les liens
    const links = document.querySelectorAll("#options a");
    links.forEach((link) => {
      link.classList.remove("active");
    });

    // Ajouter la classe "active" au lien "Tous"
    allButton.classList.add("active");
  });

  // Utiliser une requête Fetch pour récupérer les ID de catégorie auprès de l' API
  fetch("http://localhost:5678/api/categories", { method: "GET" })
    .then((response) => response.json())
    .then((data) => {
      // data contient les informations sur les catégories, y compris leurs ID
      data.forEach((categorie, index) => {
        if (categorie.name !== "Tous") {
          let option = document.createElement("option");
          option.value = categorie.id; // Utiliser l'ID de catégorie comme valeur
          option.textContent = categorie.name; // Utiliser le nom de catégorie comme texte

          selectCategory.appendChild(option);

          // Créer les pages
          let div = document.createElement("div");
          let span = document.createElement("span");
          let link = document.createElement("a");

          link.textContent = categorie.name;
          link.href = "#" + categorie.name.toLowerCase();

          span.appendChild(link);
          div.appendChild(span);
          optionsHTML.appendChild(div);

          link.addEventListener("click", (event) => {
            event.preventDefault();

            let selectedCategory = link.textContent.trim();

            let filteredProjects;
            if (selectedCategory === "Tous") {
              filteredProjects = projets;
            } else {
              filteredProjects = projets.filter(
                (projet) => projet.category.name === selectedCategory
              );
            }

            updateDisplayedProjects(filteredProjects);

            // Supprimer la classe "active" de tous les liens
            const links = document.querySelectorAll("#options a");
            links.forEach((link) => {
              link.classList.remove("active");
            });

            // Ajouter la classe "active" au lien sélectionné
            link.classList.add("active");
          });
        }
      });
    })
    .catch((error) => {
      console.error("Erreur lors du chargement des catégories :", error);
    });
}

function updateDisplayedProjects(projects) {
  let cartesHTML = document.getElementById("cartes");
  cartesHTML.innerHTML = "";

  projects.forEach((projet) => {
    createFigure(projet, cartesHTML);
  });
}

const createFigure = (projet, cartesHTML) => {
  let figure = document.createElement("figure");
  let img = document.createElement("img");
  img.src = projet.imageUrl;
  img.alt = projet.title;
  let figcaption = document.createElement("figcaption");
  figcaption.textContent = projet.title;

  figure.appendChild(img);
  figure.appendChild(figcaption);

  cartesHTML.appendChild(figure);
};

// Fonction pour mettre à jour la visibilité de la classe "ban" et de la div "options"
function updateBanVisibility() {
  // Récupérer le token du stockage local
  const token = localStorage.getItem("token");

  // Sélectionner l'élément avec la classe "ban"
  const banElement = document.querySelector(".ban");

  // Sélectionner l'élément avec l'id "options"
  const optionsElement = document.getElementById("options");

  // Sélectionner l'élément avec l'id "toggleButton"
  const toggleButton = document.getElementById("toggleButton");

  // Vérifier si le token existe et si l'utilisateur est authentifié
  if (token && token !== "null") {
    // Afficher la classe "ban"
    banElement.style.display = "flex";

    // Masquer la div avec l'id "options"
    optionsElement.style.display = "none";

    // Afficher le bouton avec l'icône
    toggleButton.style.display = "block";

    // Ajouter l'icône à la div du bouton
    // const icon = document.createElement("i");
    // icon.classList.add("fa", "fa-solid", "fa-pen-to-square");
    // toggleButton.appendChild(icon);

    // Rediriger vers la modale lorsque le bouton est cliqué
    toggleButton.addEventListener("click", function () {
      // Code pour ouvrir la modale
      const mainModal = document.querySelector(".modal");
      mainModal.style.display = "flex";
    });
  } else {
    // Masquer la classe "ban"
    banElement.style.display = "none";

    // Afficher la div avec l'id "options"
    optionsElement.style.display = "flex";

    // Masquer le bouton
    toggleButton.style.display = "none";
  }
}

updateBanVisibility();
function mettreAJourLienConnexion() {
  const lienConnexion = document.getElementById("loginLink");
  const token = localStorage.getItem("token");

  if (token && token !== "null") {
    // L'utilisateur est connecté
    lienConnexion.textContent = "Logout";
  } else {
    // L'utilisateur est déconnecté
    lienConnexion.textContent = "Login";
  }
}

// Gérer le clic sur le lien "login/logout"
document
  .getElementById("loginLink")
  .addEventListener("click", function (event) {
    event.preventDefault();

    const token = localStorage.getItem("token");

    if (token && token !== "null") {
      // L'utilisateur est connecté et souhaite se déconnecter
      localStorage.removeItem("token");
      window.location.reload();
    } else {
      // L'utilisateur est déconnecté et souhaite se connecter (redirection vers la page de connexion)
      window.location.href = "/FrontEnd/login.html";
    }

    // Mettre à jour le lien de connexion/déconnexion après la connexion/déconnexion
    mettreAJourLienConnexion();
  });

// Appeler la fonction pour mettre à jour le lien de connexion/déconnexion au chargement de la page
mettreAJourLienConnexion();
