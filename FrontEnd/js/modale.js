document.querySelector(".ouvrir").addEventListener("click", function() {
  document.querySelector(".modal").style.display = "flex";
});

document.querySelector(".modal__close").addEventListener("click", function() {
  document.querySelector(".modal").style.display = "none";
});
document.querySelector(".ouvrir").addEventListener("click", function() {
  const modalBody = document.querySelector(".modal__body");
  modalBody.innerHTML = ""; // Réinitialise le contenu de la modal__body

  const cartes = document.getElementById("cartes").innerHTML;
  modalBody.innerHTML = cartes;

  document.querySelector(".modal").style.display = "flex";
});

document.querySelector(".modal__close").addEventListener("click", function() {
  document.querySelector(".modal").style.display = "none";
});

document.querySelector(".modal__footer_supprimer").addEventListener("click", function() {
  const modalBody = document.querySelector(".modal__body");
  modalBody.innerHTML = "";
});
document.querySelector(".modal__footer_button").addEventListener("click", function() {
  // Afficher la deuxième modale
  document.querySelector(".modal2").style.display = "flex";

  // Disparition de la première modale
  document.querySelector(".modal").style.display = "none";
});
document.querySelector(".modal2__close").addEventListener("click", function() {
  document.querySelector(".modal2").style.display = "none";
});
    