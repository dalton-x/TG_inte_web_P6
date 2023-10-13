let templateFormNewImage = 
'<span id="templateFormNewImage">'+
'  <div class="container-upload-image" id="contenuTemplate">'+
'    <div class="logo-upload" id="logo">'+
'      <i class="fa-regular fa-image fa-6x"></i>'+
'    </div>'+
'    <div class="input-upload">'+
'      <input type="file" id="upload" onInput="insertThumbnail(event)" class="input-file" />'+
'      <label for="upload" class="file-label">'+
'        <span class="file-text">+ Ajouter photo</span>'+
'      </label>'+
'    </div>'+
'    <div class="text-file-mime" id="typeMime">jpg, png : 4mo max</div>'+
'  </div>'+
'  <div id="formNewImage">'+
'    <div class="form-group">'+
'      <div class="form-label">'+
'        <label for="title">Titre</label>'+
'      </div>'+
'      <div class="form-input">'+
'        <input type="text" name="title" id="title" />'+
'      </div>'+
'      <div class="form-label">'+
'        <label for="category">Catégorie</label>'+
'      </div>'+
'      <div class="form-input">'+
'        <select name="category" id="category">'+
'        </select>'+
'      </div>'+
'    </div>'+
'  </div>'+
'</span>';
document.addEventListener("DOMContentLoaded", function () {
  btnAddImage();
  btnReturn();
  let modalBody = document.getElementById('modalBodyTemplate');
  modalBody.innerHTML = templateFormNewImage;
  getAllCategories(true)
});

function btnAddImage() {
  // Gestion ajout une nouvelle image
  document.getElementById("btnAddImage").addEventListener("click", function() {
    document.getElementById("projets").style.display = "none";
    document.getElementById("ajoutProjet").style.display = "block";
  })
}

function btnReturn() {
  // document.getElementById("btnReturn").addEventListener("click", function() {
    document.getElementById("projets").style.display = "block";
    document.getElementById("ajoutProjet").style.display = "none";
  // });
  let modalBody = document.getElementById('modalBodyTemplate');
  modalBody.innerHTML = '';
  modalBody.innerHTML = templateFormNewImage;
  getAllCategories(true)
}

// Gestion de la miniature
function insertThumbnail(event){
  let file = event.target.files[0];
  const logo = document.getElementById('logo');
  const typeMime = document.getElementById('typeMime');
  const inputUpload = document.getElementsByClassName('input-upload')[0];

  const mimeType = [
    'image/jpeg',
    'image/png'
  ]

  // Vérifier si un fichier a été sélectionné
  if (file) {
    // Test si le fichier est autorisé
    if (mimeType.includes(file.type)) {
      // Créer un objet URL pour le fichier
      const imageURL = URL.createObjectURL(file);
  
      // Remplacer le logo par l'image temporaire
      logo.innerHTML = `<img src="${imageURL}" alt="Image téléchargée">`;
      inputUpload.style.display = 'none';
      typeMime.style.display = 'none';
    } else {
      event.target.files[0] = {};
      // event.target.files[0].type
      openNotifications('Fichier non valide', 'error');
    }
  }
}

// Gestion de la moadl pour la mise a jour des projets
// Pour fermer la modal
function closeModal(){
  document.getElementById("modal-container").style.display = "none";
  document.body.style.overflow = "auto";
  document.getElementById("projets").style.display = "block";
  document.getElementById("ajoutProjet").style.display = "none";
}

function openModal() {
  document.getElementById("modal-container").style.display = "block";
  document.body.style.overflow = "hidden";
}
