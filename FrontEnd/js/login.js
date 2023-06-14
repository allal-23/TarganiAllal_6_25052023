document.getElementById('connexion').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut
  
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;
    console.log(username, password)
    fetch("http://127.0.0.1:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: username,
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
        console.log(data)
        // Stocke le token d'authentification dans le stockage local
        localStorage.setItem("token", data.token);
        // Redirige vers la page d'accueil
        window.location.href = './index.html';
      })
      .catch(error => {
        console.error(error);
        // Affiche un message d'erreur générique
        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.textContent = "Une erreur s'est produite lors de l'authentification";
        
      });
  });
  