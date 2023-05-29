fetch("http://localhost:5678/api/works", { method: "GET" })
  .then((data) => {
    return data.json();
  })
  .then((projets) => {
    console.log(projets);
  });
