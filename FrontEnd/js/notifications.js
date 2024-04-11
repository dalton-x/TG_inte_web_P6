// Function to create a notification
let idSetTimeout = 0;
function createNotification(message, type, callback = null) {
  // Create the notification element
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = message;

  // Add OK and Cancel buttons only if a reminder is provided
  if (callback != null) {
    document.getElementById('modal-close-button-ok').addEventListener('click', () => {
      closeNotification();
      callback(true);
    });

    const cancelButton = document.getElementById('modal-close-button-cancel');
    cancelButton.style.display = 'block';
    cancelButton.addEventListener('click', () => {
      closeNotification();
      callback(false);
    });
  }else{
    // Hide cancel button when not needed
    const cancelButton = document.getElementById('modal-close-button-cancel');
    cancelButton.style.display = 'none';

    document.getElementById('modal-close-button-ok').addEventListener('click', () => {
      closeNotification();
      callback(true);
    });
  }

  // Add notification to container
  const container = document.getElementById('notification-container');
  container.appendChild(notification);

  // Delete the notification after a few seconds if no callback is provided
  if (callback == null) {
    idSetTimeout = setTimeout(() => {
      closeNotification();
      (container.innerText != '') ? container.removeChild(notification) : '';
    }, 3000);
  }
}

// Open modal
function openNotifications(message, type, callback) {
  createNotification(message, type, callback);
  const modal = document.getElementById('modal-notifications-container');
  modal.style.display = 'block';
}

// Close modal
function closeNotification() {
  const modal = document.getElementById('modal-notifications-container');
  const container = document.getElementById('notification-container');
  container.innerHTML = '';
  modal.style.display = 'none';
  clearTimeout(idSetTimeout);
}
