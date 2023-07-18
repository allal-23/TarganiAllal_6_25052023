document
  .getElementById("connexion")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut

    const email = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;
    console.log(email, password);

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Authentification réussie
          return response.json(); // Récupère la réponse JSON du serveur
        } else {
          // Combinaison utilisateur - mot de passe incorrecte
          return response.json().then((data) => {
            console.log(data);
            throw new Error(data.message);
          });
        }
      })
      .then((data) => {
        console.log(data);
        // Stocke le token d'authentification dans le stockage local
        localStorage.setItem("token", data.token);
        // Redirige vers la page d'accueil
        window.location.href = "./index.html";

        // Vérifier si le token est présent et masquer la div options si c'est le cas
        const token = data.token;
        const optionsElement = document.getElementById("options");
        if (token && token !== "null") {
          optionsElement.style.display = "none";
        }

        // Mettre à jour la visibilité de la classe "ban"
        updateBanVisibility();
      })
      .catch((error) => {
        console.error(error);
        // Affiche un message d'erreur générique
        const errorMessageElement = document.getElementById("errorMessage");
        errorMessageElement.textContent =
          "Une erreur s'est produite lors de l'authentification";

        // Mettre à jour la visibilité de la classe "ban"
        updateBanVisibility();
      });
  });
