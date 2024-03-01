// Run the function to display all projects when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  getUserLogged()
  getAllCategories();
  getAllWorks(0);
});


/**
 * From the work object
 * DOM creation for image and text creation 
 * for integration in gallery
 * @param {object} work 
 * @returns {DOM element}
 */
function createWork(work){

  // Create a figure tag
  document.querySelector("#portfolio .gallery").innerHTML = "";
  const figure = document.createElement("figure");
    
  // Create image tag
  const img = document.createElement("img");
  img.src = work.imageUrl;
  img.alt = work.title;

  // Create figure caption
  const figcaption = document.createElement("figcaption");
  figcaption.textContent = work.title;

  // Add image and figcaption to figure tag
  figure.appendChild(img);
  figure.appendChild(figcaption);

  return figure;
}

/**
 * Retrieves all wokrks with API
 * sort wokrks by idCategory
 * use createWork(work) to generate element
 * then add to gallery
 * @param {int} idCategory 
 */
async function getAllWorks(idCategory = 0) {
  // API request to retrieve objects
  try {
    // Retrieve location of gallery objects
    const gallery = document.querySelector("#portfolio .gallery");
    updateBadge(idCategory);
    
    gallery.innerHTML = "";
    const works = await fetchRequest("works/",{method:'GET'});

    // Loop over object list
    const elements = (idCategory === 0 ? works : works.filter((work) => work.category.id === idCategory))
    .map((work) => {
      return createWork(work);
    });

    // Add all figures to gallery
    elements.forEach((element) => {
      gallery.appendChild(element);
    });
  } catch (error) {
    console.error(error);
  }
}

/**
 * This "updateBadge" function updates the badges in a user interface according to the category supplied as a parameter.
 * @param {int} idCategory 
 */

function updateBadge(idCategory) {
  const badges = document.querySelectorAll('#filters .badge');
  [...badges].map((badge) => {
    badge.classList.remove('selected');
    if (badge.classList.contains(idCategory)) {
      return badge.classList.add('selected');
    }
  });
}


/**
 * Permet de récuperer toutes les categories via l'API
 * Le parametre permet de savoir si on est dans un select pour l'ajout des projets ou sur la page d'acceuil
 * @param {boolean} select 
 */
async function getAllCategories(select = false) {
  const categories = await fetchRequest("categories/",{method:'GET'});
  const filters = document.getElementById('filters');
  // Clear all filters
  filters.innerHTML = "";
  // Create a badge for all and assign id 0
  const allBadges = document.createElement("div");
  allBadges.innerHTML = "Tous";
  allBadges.className = 'badge selected 0';
  allBadges.addEventListener('click', function() {
    getAllWorks(0);
  });

  if (!select) {
    // Create other badges according to the database
    const badges = categories.map((category) => {
      const badge = document.createElement("div");
      badge.innerHTML = category.name;
      badge.className = 'badge '+category.id;
      badge.addEventListener('click', function() {
        getAllWorks(category.id);
      });
      return badge;
    });
    // Add the All badge to the top of the list to place it first
    badges.unshift(allBadges);

    const works = await fetchRequest("works/",{method:'GET'});
  
    // Add badges to the filters element only if they work in the category
    badges.forEach((badge) => {
      const matchingWorks = works.filter((work) => {
        return badge.classList.contains(work.categoryId.toString()) || badge.classList.contains("0");
      });
    
      if (matchingWorks.length > 0) {
        filters.appendChild(badge);
      }
    });
  } else {
    // Manage categories for the add image selector
    const selectNewImage = document.getElementById('category'); 
    const options = categories.map((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.text = category.name;
      return option;
    });

    // Add options to selectNewImage element
    options.forEach((option) => {
      // Check if value already exists
      if (!selectNewImage.querySelector(`[value="${option.value}"]`)) {
        selectNewImage.appendChild(option);
      }
    });
  }
}

function getUserLogged() {
  if (sessionStorage.getItem('token') != null) {
    const btnModifier = document.getElementById('modifier');
    btnModifier.classList.remove('display-none');
    const barreEdition = document.getElementById('containerEdition');
    barreEdition.classList.remove('display-none');
    btnModifier.addEventListener('click', function() {
      openModalUpdate()
      openModal()
    });
  }
}

async function openModalUpdate() {
  const works = await fetchRequest("works/",{method:'GET'});
  const projets = document.getElementById("listeProjets")
  document.querySelector("#listeProjets").innerHTML = "";
  works.map((work) => {
    const workItem = document.createElement("div");
    workItem.classList.add("grid-item");
    // Create an image tag
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    workItem.appendChild(img);
    // Creation of a recycle garbage can
    const trash = document.createElement("div");
    trash.classList.add("trash");
    trash.addEventListener('click', function() {
      deleteWorkById(work.id);
    });
    const fontTrash = document.createElement("i");
    fontTrash.classList.add("fa-solid");
    fontTrash.classList.add("fa-trash-can");
    trash.appendChild(fontTrash);
    workItem.appendChild(trash);
    projets.appendChild(workItem);
  })
}
