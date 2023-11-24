// Establish a Socket.io connection
const socket = io("https://chatserver.codemarkapp.repl.co/");

// Function to display messages in the chat UI
function displayMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  document.getElementById('chat-messages').appendChild(messageElement);
}

// Listen for initial messages from the server when the client connects
socket.on('initialMessages', (messages) => {
  messages.forEach((messageObj) => {
    displayMessage(messageObj.text);
  });
});

// Event listener for sending messages via Fetch API
document.getElementById('send-btn').addEventListener('click', () => {
  const message = document.getElementById('message-input').value.trim();
  if (message !== '') {
    fetch('https://chatserver.codemarkapp.repl.co/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    })
      .then(response => {
        // Handle the response from the server (if needed)
        if (response.ok) {
          console.log('Message sent successfully');
        } else {
          console.error('Failed to send message');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    document.getElementById('message-input').value = ''; // Clear input field after sending message
  }
});

// Listen for new messages broadcasted from the server using Socket.io
socket.on('newMessage', (data) => {
  displayMessage(data.message);
});
