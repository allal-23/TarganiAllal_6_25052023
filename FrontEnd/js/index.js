let projets;
let categoriesArray = [];

fetch("http://localhost:5678/api/works", { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
    projets = data;
    console.log(projets);

    let cartesHTML = document.getElementById("cartes");

    projets.forEach((projet) => {
      let figure = document.createElement("figure");
      let img = document.createElement("img");
      img.src = projet.imageUrl;
      img.alt = projet.title;
      let figcaption = document.createElement("figcaption");
      figcaption.textContent = projet.title;

      figure.appendChild(img);
      figure.appendChild(figcaption);

      cartesHTML.appendChild(figure);

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

      span.appendChild(link);
      div.appendChild(span);
      optionsHTML.appendChild(div);

      link.addEventListener("click", (event) => {
        event.preventDefault();

        let selectedCategory = link.textContent.trim();

        let filteredProjects = projets.filter(
          (projet) => projet.category.name === selectedCategory
        );

        updateDisplayedProjects(filteredProjects);
      });
    });

    console.log("Nombre de projets:", projets.length);
    console.log("Nombre de catégories:", categoriesArray.length);
  });

function updateDisplayedProjects(projects) {
  let cartesHTML = document.getElementById("cartes");

  while (cartesHTML.firstChild) {
    cartesHTML.firstChild.remove();
  }

  projects.forEach((projet) => {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = projet.imageUrl;
    img.alt = projet.title;
    let figcaption = document.createElement("figcaption");
    figcaption.textContent = projet.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    cartesHTML.appendChild(figure);
  });
}
