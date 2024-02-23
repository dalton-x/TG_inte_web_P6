// Select the button by its ID
let validateNewImageBtn = document.getElementById("btnValidate");

// Add an event handler for button clicks
validateNewImageBtn.addEventListener("click", async function(event) {
  // Prevent default form behavior (page reload)
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

    let response = await setNewImage(params);
    if (response) {
      openNotifications('Le projet "'+response.title+'" à bien étè ajouté', 'success')
    } else {
      openNotifications('Probleme sur l\'envoi du projet', 'error')
    }
  }else{
    var errorForm = [];
    (!fileInput)?errorForm.push('Image Manquante'):'';
    (!title)?errorForm.push('Titre manquant'):'';
    (!category)?errorForm.push('Categorie manquante'):'';
    let message = '<ul>';
    errorForm.map((el) => {
      message += '<li>'+ el + '</li>';
    });
    message += '</ul>'
    openNotifications(message, 'error')
  }
});

async function setNewImage(params) {
  let token = sessionStorage.getItem('token');
  if (token != null) { // we're connected
    return await fetchRequest("works/",params);
  } else {
    console.log('pas token');
  }
}