// Fonction pour créer une notification
function createNotification(message, type, callback = null) {
  // Créer l'élément de notification
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.innerHTML = message;

  // Ajouter les boutons OK et Annuler uniquement si un rappel est fourni
  if (callback != null) {
    const okButton = document.getElementById('modal-close-button-ok');
    okButton.addEventListener('click', () => {
      closeNotification();
      callback(true);
    });

    const cancelButton = document.getElementById('modal-close-button-cancel');
    cancelButton.addEventListener('click', () => {
      closeNotification();
      callback(false);
    });
  }else{
    // Cache le bouton annuler quand il y en as pas besoin
    const cancelButton = document.getElementById('modal-close-button-cancel');
    cancelButton.style.display = 'none';

    const okButton = document.getElementById('modal-close-button-ok');
    okButton.addEventListener('click', () => {
      closeNotification();
      callback(true);
    });
  }

  // Ajouter la notification au conteneur
  const container = document.getElementById('notification-container');
  container.appendChild(notification);

  // Supprimer la notification après quelques secondes si aucun rappel n'est fourni
  if (callback == null) {
    setTimeout(() => {
      closeNotification();
      (container.innerText != '') ? container.removeChild(notification) : '';
    }, 3000);
  }
}

// Ouvrir le modal
function openNotifications(message, type, callback) {
  createNotification(message, type, callback);
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
