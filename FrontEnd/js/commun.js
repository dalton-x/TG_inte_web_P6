// function for request api
async function fetchRequest(api, params = {}) {
  try {
    const token = sessionStorage.getItem('token');
    let requestOptions = {
      method:params.method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'accept': '*/*'
      }
    };
    if (params.body != undefined) {
      requestOptions.body = params.body;
    }
    const response = await fetch(URLDB + api, requestOptions);
    return response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Permet un scroll smooth
function scrollToAnchor(event, anchorId) {
  event.preventDefault(); // Empêche le comportement de lien par défaut

  const targetElement = document.getElementById(anchorId);
  const targetOffset = targetElement.offsetTop;
  const duration = 800; // Durée de l'animation en millisecondes
  const startOffset = window.scrollY;
  const distance = targetOffset - startOffset;
  let startTime = null;

  function scrollAnimation(currentTime) {
    if (startTime === null) {
      startTime = currentTime;
    }
    const elapsedTime = currentTime - startTime;
    const scrollProgress = Math.min(elapsedTime / duration, 1);
    const easing = scrollProgress < 0.5 ? 2 * scrollProgress * scrollProgress : -1 + (4 - 2 * scrollProgress) * scrollProgress;
    const scrollTo = startOffset + distance * easing;
    window.scrollTo(0, scrollTo);
    if (scrollProgress < 1) {
      window.requestAnimationFrame(scrollAnimation);
    }
  }
  window.requestAnimationFrame(scrollAnimation);
}