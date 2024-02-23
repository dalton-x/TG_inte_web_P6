let templateFormNewImage =  '<span id="templateFormNewImage">'+
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
                            '    <form>'+
                            '     <div class="form-group-new-image">'+
                            '       <div class="form-label">'+
                            '         <label for="title">Titre</label>'+
                            '       </div>'+
                            '       <div class="form-input">'+
                            '         <input type="text" name="title" id="title" />'+
                            '       </div>'+
                            '       <div class="form-label">'+
                            '         <label for="category">Catégorie</label>'+
                            '       </div>'+
                            '       <div class="form-input">'+
                            '         <select name="category" id="category">'+
                            '           <option value="">Choisir un categorie</option>'+
                            '         </select>'+
                            '       </div>'+
                            '     </div>'+
                            '    </form>'+
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
  // Add a new image
  document.getElementById("btnAddImage").addEventListener("click", function() {
    document.getElementById("projets").style.display = "none";
    document.getElementById("ajoutProjet").style.display = "block";
    getAllCategories(true);
  })
}

function btnReturn() {
  document.getElementById("projets").style.display = "block";
  document.getElementById("ajoutProjet").style.display = "none";
  let modalBody = document.getElementById('modalBodyTemplate');
  modalBody.innerHTML = '';
  modalBody.innerHTML = templateFormNewImage;
  openModalUpdate()
}

// Manage thumbnails
function insertThumbnail(event){
  let file = event.target.files[0];
  const logo = document.getElementById('logo');
  const typeMime = document.getElementById('typeMime');
  const inputUpload = document.getElementsByClassName('input-upload')[0];

  const mimeType = [
    'image/jpeg',
    'image/png'
  ]

  // Check if a file has been selected
  if (file) {
    // Test if the file is authorized
    if (mimeType.includes(file.type)) {
      // Create a URL object for the file
      const imageURL = URL.createObjectURL(file);
  
      // Replace logo with temporary image
      logo.innerHTML = `<img src="${imageURL}" alt="Image téléchargée">`;
      inputUpload.style.display = 'none';
      typeMime.style.display = 'none';
    } else {
      event.target.files[0] = {};
      openNotifications('Fichier non valide', 'error');
    }
  }
}

// Manage moadl for project updates
// Close modal
function closeModal(){
  document.getElementById("modal-container").style.display = "none";
  document.body.style.overflow = "auto";
  document.getElementById("projets").style.display = "block";
  document.getElementById("ajoutProjet").style.display = "none";
  getAllCategories()
  getAllWorks();
}

function openModal() {
  document.getElementById("modal-container").style.display = "block";
  document.body.style.overflow = "hidden";
}

function deleteWorkById(idWork) {

  openNotifications('Etes vous sûr de vouloir supprimer ce projet ?', 'info', async function(result) {
    if (result) {
      // OK button clicked
      let params = {
        method: 'DELETE',
      }
      await fetchRequest("works/"+idWork, params);
      openModalUpdate()
    }
  });
}
