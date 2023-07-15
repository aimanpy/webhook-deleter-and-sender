function toggleTheme() {
  var body = document.body;
  body.classList.toggle('dark-mode');
}

document.getElementById('messageForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var webhookURL = document.getElementById('webhookURL').value;
  var messageContent = document.getElementById('messageContent').value;

  var requestData = {
    content: messageContent
  };

  fetch(webhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestData)
  })
  .then(function(response) {
    if (response.ok) {
      showResponse('Mensaje enviado correctamente a Discord', 'success');
    } else {
      showResponse('Error al enviar el mensaje a Discord', 'error');
    }
  })
  .catch(function(error) {
    showResponse('Error al enviar el mensaje a Discord: ' + error, 'error');
  });
});

document.getElementById('deleteForm').addEventListener('submit', function(event) {
  event.preventDefault();

  var webhookURLToDelete = document.getElementById('webhookURLToDelete').value;

  fetch(webhookURLToDelete, {
    method: 'DELETE',
  })
  .then(function(response) {
    if (response.ok) {
      showDeleteResponse('Webhook eliminado correctamente de Discord', 'success');
    } else {
      showDeleteResponse('Error al eliminar el webhook de Discord', 'error');
    }
  })
  .catch(function(error) {
    showDeleteResponse('Error al eliminar el webhook de Discord: ' + error, 'error');
  });
});

function showResponse(message, className) {
  var responseDiv = document.getElementById('response');
  responseDiv.innerHTML = message;
  responseDiv.className = 'response ' + className;
}

function showDeleteResponse(message, className) {
  var responseDiv = document.getElementById('deleteResponse');
  responseDiv.innerHTML = message;
  responseDiv.className = 'response ' + className;
}
