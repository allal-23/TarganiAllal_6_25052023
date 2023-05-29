// fetch("http://localhost:5678/api/works", { method: "GET" })
//   .then((data) => {
//     return data.json();
//   })
//   .then((projets) => {
//     console.log(projets);
//   });
//  let HTML= document.getElementById("cartes")

// let myHTML=""

// projets.forEach(projet => {
//     console.log(projet.imageUrl)
//     console.log(projet.title)
//     myHTML +=`<figure>
//     <img src="${projet.imageUrl}" alt="${projet.title}" />
//     <figcaption>${projet.title}</figcaption>
//   </figure>`
    
// });

// console.log(myHTML)
// HTML.innerHTML=myHTML

fetch("http://localhost:5678/api/works", { method: "GET" })
  .then((data) => {
    return data.json();
  })
  .then((projets) => {
    console.log(projets);

    let HTML = document.getElementById("cartes");
    let myHTML = "";

    projets.forEach((projet) => {
      console.log(projet.imageUrl);
      console.log(projet.title);
      myHTML += `<figure>
        <img src="${projet.imageUrl}" alt="${projet.title}" />
        <figcaption>${projet.title}</figcaption>
      </figure>`;
    });

    console.log(myHTML);
    HTML.innerHTML = myHTML;
  });
