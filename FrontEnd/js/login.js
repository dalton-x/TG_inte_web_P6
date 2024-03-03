// Add an event handler for button clicks
document.getElementById("submitForm").addEventListener("click", function(event) {
  // Prevent default form behavior (page reload)
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const params = {
    body: JSON.stringify({ 'email':email, 'password':password }),
    method: 'POST'
  };
  getUserData(params)
});

/**
 * Get token with credentials used in login form
 * IF credentials OK -> store token in sessionStorage then route to index page
 * IF credentials KO -> display error message
 * @param {object} params 
 */
async function getUserData(params) {
  // If you are already connected, disconnect to regenerate a new token
  sessionStorage.removeItem('token');
  const user = await fetchRequest("users/login",params)
  if (user.token != undefined) {
    sessionStorage.setItem('token', user.token);
    location.href = './index.html';
    generateErrorMessage(false);
  } else {
    generateErrorMessage(true);
  }
}

/**
 * Displays or hides error message * @param {boolean} display 
 */
function generateErrorMessage(display) {
  const messageError = document.querySelector('.errorLogin');
  if (display) {
    messageError.classList.remove('display-none');
  } else {
    messageError.classList.add('display-none');
  }
}
