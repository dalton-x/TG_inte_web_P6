// Add an event handler for button clicks
document.getElementById("submitForm").addEventListener("click", function(event) {
  // Prevent default form behavior (page reload)
  event.preventDefault();

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let params = {
    body: JSON.stringify({ 'email':email, 'password':password }),
    method: 'POST'
  }
  console.log(params);
  getUserData(params)

});

async function getUserData(params) {
  // If you are already connected, disconnect to regenerate a new token
  sessionStorage.removeItem('token');
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