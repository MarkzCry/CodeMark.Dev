const chatContainer = document.getElementById('chat');
const userMessageInput = document.getElementById('user-message');
const sendButton = document.getElementById('send-button');
const sentSound = new Audio('sounds/messageSent.mp3');
const receivedSound = new Audio('sounds/messageReceived.mp3');

let isMessageEnabled = true;


function enableSendingMessage() {
    isMessageEnabled = true;
}

function disableSendingMessage() {
    isMessageEnabled = false;
}

userMessageInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        if (isMessageEnabled) {
            sendMessage();
            disableSendingMessage();
        }
    }
});

sendButton.addEventListener('click', function() {
    if (isMessageEnabled) {
        sendMessage();
        disableSendingMessage();
    }
});

function sendMessage() {
    const userMessage = userMessageInput.value.trim();
    sentSound.play()
    if (userMessage !== '') {
        addMessage('User', userMessage);
        userMessageInput.value = '';
        userMessageInput.focus(); // Refocus on the input textbox

        // Make the API call to the Popcat Chatbot
        callPopcatChatbot(userMessage);
    }
}

function addMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatContainer.appendChild(messageElement);

    // Automatically scroll to the bottom of the chat container
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function callPopcatChatbot(userMessage) {
    // Display "AI is typing..."
    addMessage('AI', 'AI is typing...');

    fetch(`https://api.popcat.xyz/chatbot?msg=${encodeURIComponent(userMessage)}&owner=Code+Mark&botname=CodeMark+Bot`)
        .then(response => response.json())
        .then(data => {
            console.log('API Response:', data);

            const aiResponse = data.response;

            const typingMessage = chatContainer.lastChild;
            chatContainer.removeChild(typingMessage);

            if (aiResponse && aiResponse.trim() !== '') {
                typeResponse('AI', aiResponse);
                setTimeout(() => {
                    receivedSound.play()
                    isMessageEnabled = true;
                }, 1000)
            } else {
                // Handle empty response
                addMessage('AI', "Sorry, I couldn't generate a response.");
            }
        })
        .catch(error => {
            console.error('Error fetching AI response:', error);
        });
}


function typeResponse(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    chatContainer.appendChild(messageElement);

    let i = 0;
    const typingInterval = setInterval(function () {
        messageElement.innerHTML = `<strong>${sender}:</strong> ${message.slice(0, i)}`;
        i++;
        if (i > message.length) {
            clearInterval(typingInterval);
        }
        // Automatically scroll to the bottom of the chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, 50); // Adjust typing speed as needed
}
