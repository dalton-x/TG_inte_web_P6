// Permet de la ncer la fonction pour avoir tout les projets au chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  getAllCategories();
  getAllWorks(0);
});

function createWork(work){

  // Create figure tag
  document.querySelector("#portfolio .gallery").innerHTML = "";
  const figure = document.createElement("figure");
    
  // Create image tag
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;

  // Create figcaption
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = work.title;

  // Add image and figcaption to figure tag
  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure;
}

async function getAllWorks(idCategory = 0) {
  // API request to retrieve objects
  try {
    const works = await fecthRequest("works/");
    // Retrieve the location for the gallery objects
    const gallery = document.querySelector("#portfolio .gallery");
    updateBadge(idCategory);

    // Loop over the list of objects
    const elements = (idCategory === 0 ? works : works.filter((work) => work.category.id === idCategory))
    .map((work) => {
      return createWork(work);
    });

    // Append all figures to the gallery
    elements.forEach((element) => {
      gallery.appendChild(element);
    });
  } catch (error) {
    console.error(error);
  }
}

function updateBadge(idCategory) {
  const badges = document.querySelectorAll('.badge');
  [...badges].map((badge) => {
    badge.classList.remove('selected');
    if (badge.classList.contains(idCategory)) {
      return badge.classList.add('selected');
    }
  });
}

async function getAllCategories() {
  const categories = await fecthRequest("categories/");
  const filters = document.getElementById('filters');
  // Create a badge for all and assign it id 0
  const tousBadge = document.createElement("div");
  tousBadge.innerHTML = "Tous";
  tousBadge.className = 'badge selected 0';
  tousBadge.addEventListener('click', function() {
    getAllWorks(0);
  });
  // Create other badges according to the database
  const elements = categories.map((category) => {
    const badge = document.createElement("div");
    badge.innerHTML = category.name;
    badge.className = 'badge '+category.id;
    badge.addEventListener('click', function() {
      getAllWorks(category.id);
    });
    return badge;
  });
  // Add the Tous badge at the beginning of the list to put it first
  elements.unshift(tousBadge);

  // Add badges to filters element
  elements.forEach((element) => {
    filters.appendChild(element);
  });
}
