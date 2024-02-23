// function for request api
async function fetchRequest(api, params = {}) {
  try {
    const { method = 'GET', body } = params;
    const token = sessionStorage.getItem('token');
    // default option for fetch request
    let requestOptions = {
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",      
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      method: method,
      body: body,
    }

    // add token to headers if connected
    if (token != null && token != undefined) {
      requestOptions = {
        ...requestOptions,
        headers: {
          "Authorization" : `Bearer ${token}`
        }
      };
    }

    const response = await fetch(URLDB + api , requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// Enables smooth scrolling
function scrollToAnchor(event, anchorId) {
  event.preventDefault(); // Prevent default link behavior

  const targetElement = document.getElementById(anchorId);
  const targetOffset = targetElement.offsetTop;
  const duration = 800; // Animation duration in milliseconds
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
