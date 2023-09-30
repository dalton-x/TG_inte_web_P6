// API request to retrieve objects
fetch(URLDB+APIWORKS)
  .then((response) => response.json())
  .then((works) => {
    // Retrieve the location for the gallery objects
    const gallery = document.querySelector('#portfolio .gallery');
    // Loop over the list of objects
    works.forEach((work) => {
      // For each object
      // Create figure tag
      const figure = document.createElement('figure');
      // Create image tag
      const img = document.createElement('img');
      // Add image source
      img.src = work.imageUrl;
      // Add alternative text
      img.alt = work.title;
      // Create figcaption
      const figcaption = document.createElement('figcaption');
      // Add text to figcation
      figcaption.textContent = work.title;
      // add image to figure tag
      figure.appendChild(img);
      // Add figcation to figure tag
      figure.appendChild(figcaption);
      // Add figure to follow gallery
      gallery.appendChild(figure);
    });
  })
  // Returns an error if the fetch fails
  .catch((error) => console.error(error));
