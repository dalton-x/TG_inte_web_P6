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
  const categories = await fetchRequest("categories/", { method: 'GET' });
  const filters = document.getElementById('filters');
  filters.innerHTML = "";

  // Internal function to manage the click on a badge
  function handleBadgeClick(categoryId) {
    getAllWorks(categoryId);
  }

  // Internal function to create a badge
  function createBadge(category) {
    const badge = document.createElement("div");
    badge.innerHTML = category.name;
    badge.className = 'badge ' + category.id;
    badge.addEventListener('click', () => handleBadgeClick(category.id));
    return badge;
  }

  // Internal function to filter jobs by category
  function filterWorksByCategory(badge, works) {
    return works.filter(work => badge.classList.contains(work.categoryId.toString()) || badge.classList.contains("0"));
  }

  // Internal function to add an item to the image selector
  function addOptionToImageSelector(category) {
    const selectNewImage = document.getElementById('category');
    const existingOption = selectNewImage.querySelector(`[value="${category.id}"]`);

    if (!existingOption) {
      const option = document.createElement("option");
      option.value = category.id;
      option.text = category.name;
      selectNewImage.appendChild(option);
    }
  }

  // Create "Tous" badge
  const allBadge = createBadge({ id: 0, name: "Tous" });
  allBadge.addEventListener('click', () => handleBadgeClick(0));

  if (!select) {
    const works = await fetchRequest("works/", { method: 'GET' });

    // Filter categories to add only those with matching jobs
    const badges = categories
      .map(createBadge)
      .filter(badge => {
        const matchingWorks = filterWorksByCategory(badge, works);
        return matchingWorks.length > 0;
      });

    badges.unshift(allBadge);

    // Add filtered badges to filters element
    badges.forEach(badge => filters.appendChild(badge));
  } else {
    // Add options to image selector
    categories.forEach(addOptionToImageSelector);
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
