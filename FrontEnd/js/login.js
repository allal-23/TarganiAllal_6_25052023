document.querySelector('.connexion').addEventListener('click', function(event) {
    event.preventDefault(); // Empêche la soumission du formulaire par défaut
  
    const username = document.getElementById("usernameInput").value;
    const password = document.getElementById("passwordInput").value;
  
    fetch("http://localhost:5678/api/users/login", {
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
          window.location.href = 'FrontEnd/index.html';
        } else {
          // Combinaison utilisateur - mot de passe incorrecte
          return response.json().then(data => {
            const errorMessageElement = document.getElementById('errorMessage');
            errorMessageElement.textContent = data.message;
          });
        }
      })
      .catch(error => {
        console.error(error);
        // Afficher un message d'erreur générique
        const errorMessageElement = document.getElementById('errorMessage');
        errorMessageElement.textContent = 'Une erreur s\'est produite lors de l\'authentification';
      });
  });
  