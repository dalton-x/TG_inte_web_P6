// Add an event handler for button clicks
document.getElementById("btnValidate").addEventListener("click", async function(event) {
  // Prevent default form behavior (page reload)
  event.preventDefault();

  function getDataSetNewImage() {
    const fileInput = document.getElementById("upload").files[0];
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    
    if (!fileInput || !title || !category) {
      const errorForm = [];
      (!fileInput) && errorForm.push('Image manquante');
      (!title) && errorForm.push('Titre manquant');
      (!category) && errorForm.push('Categorie manquante');
      
      if (errorForm.length > 0) {
        const message = '<ul>' + errorForm.map(error => '<li>' + error + '</li>').join('') + '</ul>';
        openNotifications(message, 'error');
        return [];
      }
    }
    return [fileInput, title, category];
  }

  let [fileInput,title,category] = getDataSetNewImage();
  if (fileInput && title && category) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", fileInput);

    const params = {
      body: formData,
      method: 'POST'
    };

    const response = await setNewImage(params);
    if (response) {
      openNotifications('Le projet "'+response.title+'" à bien étè ajouté', 'success');
      document.getElementById('btnReturn').click();
    } else {
      openNotifications('Probleme sur l\'envoi du projet', 'error')
    }
  }
});

async function setNewImage(params) {
  let token = sessionStorage.getItem('token');
  if (token != null) { // we're connected
    return await fetchRequest("works/",params);
  }
}