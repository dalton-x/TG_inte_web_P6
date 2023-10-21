// Sélectionnez le bouton par son ID
let validateNewImageBtn = document.getElementById("btnValidate");

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton
validateNewImageBtn.addEventListener("click", function(event) {
  // Empêche le comportement par défaut du formulaire (rechargement de la page)
  event.preventDefault();

  const fileInput = document.getElementById("upload").files[0];
  const title = document.getElementById("title").value;
  const category = document.getElementById("category").value;


  if (fileInput && title && category) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("image", fileInput);

    let params = {
      body: formData,
      method: 'POST'
    };

    setNewImage(params);
  }else{
    var errorForm = [];
    (!fileInput)?errorForm.push('Image Manquante'):'';
    (!title)?errorForm.push('Titre manquant'):'';
    (!category)?errorForm.push('Categorie manquante'):'';
    let message = '';
    errorForm.map((el, index) => {
      if (index < errorForm.length - 1) {
        message += el + ',';
      } else {
        message += el + '.';
      }
    });
    openNotifications(message, 'error')
  }
});

async function setNewImage(params) {
  let token = sessionStorage.getItem('token');
  if (token != null) { // on est connecté
    let response = await fetchRequest("works/",params,'application/json');
    console.log(response);
    if (response) {

      openNotifications('Projet ajouté', 'succes')
    } else {
      openNotifications('Probleme sur l\'envoi du projet', 'error')
    }
  } else {
    console.log('pas token');
  }
}