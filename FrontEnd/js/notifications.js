// Fonction pour créer une notification
function createNotification(message, type) {
  // Créer l'élément de notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Ajouter la notification au conteneur
  const container = document.getElementById('notification-container');
  container.appendChild(notification);

  // Supprimer la notification après quelques secondes
  setTimeout(() => {
    closeNotification()
    container.removeChild(notification);
  }, 3000);
}

// Ouvrir le modal
function openNotifications(message, type) {
  createNotification(message, type);
  const modal = document.getElementById('modal-notifications-container');
  modal.style.display = 'block';
}

// Fermer le modal
function closeNotification() {
  const modal = document.getElementById('modal-notifications-container');
  const container = document.getElementById('notification-container');
  container.innerHTML = '';
  modal.style.display = 'none';
}

// Bouton OK pour fermer le modal
const closeButton = document.getElementById('modal-close-button');
closeButton.addEventListener('click', closeNotification);
