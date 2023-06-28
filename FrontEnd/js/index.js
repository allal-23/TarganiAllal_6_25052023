let projets;
let categoriesArray = ["Tous"];

fetch("http://localhost:5678/api/works", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    projets = data;
    console.log(projets);

    let cartesHTML = document.getElementById("cartes");

    projets.forEach((projet) => {
      createFigure(projet, cartesHTML);

      if (!categoriesArray.includes(projet.category.name)) {
        categoriesArray.push(projet.category.name);
      }
    });

    let optionsHTML = document.getElementById("options");

    categoriesArray.forEach((categorie) => {
      let div = document.createElement("div");
      let span = document.createElement("span");
      let link = document.createElement("a");

      link.textContent = categorie;
      link.href = "#" + categorie.toLowerCase();
      if (categorie === "Tous") {
        link.classList.add("active");
      }

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
    });

    console.log("Nombre de projets:", projets.length);
    console.log("Nombre de catégories:", categoriesArray.length);
  });
// ...

fetch("http://localhost:5678/api/works", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    projets = data;
    console.log(projets);

    let cartesHTML = document.getElementById("cartes");

    projets.forEach((projet) => {
      createFigure(projet, cartesHTML);

      if (!categoriesArray.includes(projet.category.name)) {
        categoriesArray.push(projet.category.name);
      }
    });

    let selectCategory = document.getElementById("categoryId");

    categoriesArray.forEach((categorie) => {
      let option = document.createElement("option");
      option.value = categorie.toLowerCase();
      option.textContent = categorie;

      selectCategory.appendChild(option);
    });

    console.log("Nombre de projets:", projets.length);
    console.log("Nombre de catégories:", categoriesArray.length);
  });

// ...

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

// Fonction pour mettre à jour la visibilité de la classe "ban"
function updateBanVisibility() {
  // Récupérer le token du stockage local
  const token = localStorage.getItem("token");

  // Sélectionner l'élément avec la classe "ban"
  const banElement = document.querySelector(".ban");

  // Vérifier si le token existe et si l'utilisateur est authentifié
  if (token && token !== "null") {
    // Afficher la classe "ban"
    banElement.style.display = "flex";
  } else {
    // Masquer la classe "ban"
    banElement.style.display = "none";
  }
}

updateBanVisibility();
