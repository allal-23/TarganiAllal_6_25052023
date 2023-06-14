// JavaScript
document.getElementById("modifierBtn").addEventListener("click", function() {
    document.getElementById("modal").style.display = "block";
  });
  
  document.getElementsByClassName("close")[0].addEventListener("click", function() {
    document.getElementById("modal").style.display = "none";
  });
  
  window.addEventListener("click", function(event) {
    if (event.target == document.getElementById("modal")) {
      document.getElementById("modal").style.display = "none";
    }
  });
  
  document.getElementById("ajouterForm").addEventListener("submit", function(event) {
    event.preventDefault();
  
    // Récupérer les valeurs du formulaire
    var title = document.getElementById("title").value;
    var imageUrl = document.getElementById("imageUrl").value;
    var categoryId = document.getElementById("categoryId").value;
  
    // Vérifier si toutes les informations nécessaires sont présentes
    if (title.trim() === '' || imageUrl.trim() === '' || categoryId.trim() === '') {
      // Afficher un message d'erreur si le formulaire n'est pas correctement rempli
      alert("Veuillez remplir tous les champs du formulaire.");
      return;
    }
  
    // Créer l'objet de données à envoyer à l'API
    var newData = {
      title: title,
      imageUrl: imageUrl,
      categoryId: categoryId,
      userId: 0 // Remplacez par l'ID de l'utilisateur approprié
    };
  
    // Envoyer les données à l'API (exemple avec fetch)
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newData)
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
    });
  });
  