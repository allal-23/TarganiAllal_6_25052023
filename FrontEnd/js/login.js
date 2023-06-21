// Fonction pour mettre à jour la visibilité de la classe "ban"
function updateBanVisibility() {
  // Récupérer le token du stockage local
  const token = localStorage.getItem("token");

  // Sélectionner l'élément avec la classe "ban"
  const banElement = document.querySelector(".ban");

  // Vérifier si le token existe et si l'utilisateur est authentifié
  if (token && token !== "null") {
    // Afficher la classe "ban"
    banElement.style.display = "block";
  } else {
    // Masquer la classe "ban"
    banElement.style.display = "none";
  }
}

// Appeler la fonction updateBanVisibility() pour mettre à jour la visibilité initiale
updateBanVisibility();

document.getElementById('connexion').addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche la soumission du formulaire par défaut

  const username = document.getElementById("usernameInput").value;
  const password = document.getElementById("passwordInput").value;
  console.log(username, password);
  fetch("http://127.0.0.1:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  })
    .then(response => {
      if (response.ok) {
        // Authentification réussie
        return response.json(); // Récupère la réponse JSON du serveur
      } else {
        // Combinaison utilisateur - mot de passe incorrecte
        return response.json().then(data => {
          throw new Error(data.message);
        });
      }
    })
    .then(data => {
      console.log(data);
      // Stocke le token d'authentification dans le stockage local
      localStorage.setItem("token", data.token);
      // Redirige vers la page d'accueil
      window.location.href = './index.html';

      // Mettre à jour la visibilité de la classe "ban"
      updateBanVisibility();
    })
    .catch(error => {
      console.error(error);
      // Affiche un message d'erreur générique
      const errorMessageElement = document.getElementById('errorMessage');
      errorMessageElement.textContent = "Une erreur s'est produite lors de l'authentification";

      // Mettre à jour la visibilité de la classe "ban"
      updateBanVisibility();
    });
});

document.getElementById("ajouterForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var formData = new FormData();

  var title = document.getElementById("title").value;
  var imageFile = document.getElementById("imageFile").files[0];
  var categoryId = document.getElementById("categoryId").value;

  formData.append("title", title);
  formData.append("imageFile", imageFile);
  formData.append("categoryId", categoryId);
  formData.append("userId", 0);

  // Vérifier si toutes les informations nécessaires sont présentes
  if (title.trim() === '' || imageFile === undefined || categoryId.trim() === '') {
    // Afficher un message d'erreur si le formulaire n'est pas correctement rempli
    alert("Veuillez remplir tous les champs du formulaire.");
    return;
  }

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Traiter la réponse de l'API et mettre à jour le DOM
    console.log(data);
    // Afficher la nouvelle image dans la galerie
    // ...
    // Fermer la fenêtre modale
    document.getElementById("modal").style.display = "none";
  })
  .catch(error => {
    console.log(error);
    // Afficher un message d'erreur si la requête échoue
    alert("Une erreur s'est produite lors de l'ajout de l'image.");
  });
});
