// Prompt for user's name when the page loads
let username = prompt('Please enter your name:');

if(username == null) {
  username = "User"
}
// You might want to add validation to ensure a valid username is entered

// Function to display messages in the chat UI with the associated username
// Establish a Socket.io connection
const socket = io("https://chatserver.codemarkapp.repl.co/");
function displayMessage(username, message) {
  const messageElement = document.createElement('div');
  messageElement.innerHTML = `<strong>${username}:</strong> ${message}`;
  document.getElementById('chat-messages').appendChild(messageElement);
}

// Function to display typing indicator
function displayTyping(username) {
  const typingElement = document.createElement('div');
  typingElement.innerHTML = `<em>${username} is typing...</em>`;
  typingElement.setAttribute('data-typing', username);
  typingElement.id = `typing-${username}`; // Unique ID for typing indicator
  document.getElementById('chat-messages').appendChild(typingElement);
}

let typingTimer;
const TYPING_DELAY = 1000; // Adjust the delay time as needed

document.getElementById('message-input').addEventListener('input', () => {
  clearTimeout(typingTimer);

  if (!typingTimer) {
    socket.emit('typing', username);
  }

  typingTimer = setTimeout(() => {
    socket.emit('stopTyping', username);
    typingTimer = null; // Reset typingTimer after emitting stopTyping event
  }, TYPING_DELAY);
});

socket.on('userTyping', (user) => {
  if (!document.getElementById(`typing-${user}`)) {
    displayTyping(user);
  }
});

socket.on('userStoppedTyping', (user) => {
  const typingElement = document.getElementById(`typing-${user}`);
  if (typingElement) {
    typingElement.remove();
  }
});



// Listen for initial messages from the server when the client connects
socket.on('initialMessages', (messages) => {
  messages.forEach((messageObj) => {
    displayMessage(messageObj.username, messageObj.text);
  });
});

// Event listener for sending messages via Fetch API
document.getElementById('send-btn').addEventListener('click', () => {
  const message = document.getElementById('message-input').value.trim();

  if (message !== '' && username) {
    fetch('https://chatserver.codemarkapp.repl.co/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message, username }),
    })
      .then(response => {
        if (response.ok) {
          console.log('Message sent successfully');
        } else {
          console.error('Failed to send message');
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    document.getElementById('message-input').value = '';
  }
});

socket.on('newMessage', (data) => {
  displayMessage(data.username, data.message);
});
