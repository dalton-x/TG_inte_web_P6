// Launch the function to display all projects when the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  getUserLogged()
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
    // Retrieve the location for the gallery objects
    const gallery = document.querySelector("#portfolio .gallery");
    updateBadge(idCategory);
    
    gallery.innerHTML = "";
    const works = await fetchRequest("works/",{method:'GET'});

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
  const badges = document.querySelectorAll('#filters .badge');
  [...badges].map((badge) => {
    badge.classList.remove('selected');
    if (badge.classList.contains(idCategory)) {
      return badge.classList.add('selected');
    }
  });
}

async function getAllCategories(select = false) {
  const categories = await fetchRequest("categories/",{method:'GET'});
  const filters = document.getElementById('filters');
  // Clear all filters
  filters.innerHTML = "";
  // Create a badge for all and assign it id 0
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
    // Add the Tous badge at the beginning of the list to put it first
    badges.unshift(allBadges);

    const works = await fetchRequest("works/",{method:'GET'});
  
    // Add badges to filters element only if works in category
    badges.forEach((badge) => {
      const matchingWorks = works.filter((work) => {
        return badge.classList.contains(work.categoryId.toString()) || badge.classList.contains("0");
      });
    
      if (matchingWorks.length > 0) {
        filters.appendChild(badge);
      }
    });
  } else {
    // Category management for the add new image selector
    const selectNewImage = document.getElementById('category'); 
    const options = categories.map((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.text = category.name;
      return option;
    });

    // Add options to selectNewImage element
    options.forEach((option) => {
      // Check if the value already exists
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
    // Create image tag
    const img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    workItem.appendChild(img);
    // Create trash
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

function deleteWorkById(idWork) {

  openNotifications('Etes vous sûr de vouloir supprimer ce projet ?', 'info', async function(result) {
    if (result) {
      // Le bouton OK a été cliqué
      let params = {
        method: 'DELETE',
      }
      await fetchRequest("works/"+idWork, params);
      openModalUpdate()
    }
  });
}
