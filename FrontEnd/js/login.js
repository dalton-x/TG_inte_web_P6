// Sélectionnez le bouton par son ID
let submitButton = document.getElementById("submitForm");

// Ajoutez un gestionnaire d'événements pour le clic sur le bouton
submitButton.addEventListener("click", function(event) {
  // Empêche le comportement par défaut du formulaire (rechargement de la page)
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let params = {
    body: JSON.stringify({ email, password }),
    method: 'POST'
  }
  getUserData(params)

});


async function getUserData(params) {
  let user = await fetchRequest("users/login",params)
  if (user.token != undefined) {
    sessionStorage.setItem('token', user.token);
    location.href = './index.html';
    generateErrorMessage(false)
  } else {
    generateErrorMessage(true)
  }
}

function generateErrorMessage(display) {
  const messageError = document.querySelector('.errorLogin');
  if (display) {
    messageError.classList.remove('display-none')
  } else {
    messageError.classList.add('display-none')
  }

}