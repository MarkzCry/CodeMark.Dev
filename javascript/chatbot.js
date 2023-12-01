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
    let startTime = performance.now(); // Get the start time when calling the API

    // Display "AI is typing..." with the initial time elapsed
    const typingMessage = document.createElement('div');
    typingMessage.classList.add('message');
    typingMessage.innerHTML = `<strong>AI:</strong> AI is thinking... (Time Elapsed: 0s 0ms)`;
    chatContainer.appendChild(typingMessage);

    const timerInterval = setInterval(() => {
        const elapsedTime = (performance.now() - startTime) / 1000; // Calculate elapsed time in seconds
        const seconds = Math.floor(elapsedTime);
        const milliseconds = Math.floor((elapsedTime - seconds) * 1000);
        const roundedMilliseconds = Math.floor(milliseconds / 10); // Round milliseconds to only two digits

        typingMessage.innerHTML = `<strong>AI:</strong> AI is thinking... (Time Elapsed: ${seconds}s ${roundedMilliseconds}ms)`;

        if (elapsedTime >= 60) {
            alert('Request took to long refreshing page...\nIf this continues to happen, please contact me!')
            clearInterval(timerInterval);
            window.location.reload();
        }
    }, 100);

    fetch(`https://codemarkserver1.codemarkapp.repl.co/getAiResponse?msg=${encodeURIComponent(userMessage)}`)
        .then(responseAI => responseAI.json())
        .then(data => {
            console.log('API Response:', data);

            const aiResponse = data.responseAI;

            clearInterval(timerInterval); // Clear the timer interval when the response is received

            const typingMessage = chatContainer.lastChild;
            chatContainer.removeChild(typingMessage);

            if (aiResponse && aiResponse.trim() !== '') {
                typeResponse('AI', aiResponse);
                setTimeout(() => {
                    isMessageEnabled = true;
                }, 1000)
            } else {
                // Handle empty response
                addMessage('AI', "Sorry, I couldn't generate a response.");
            }
        })
        .catch(error => {
            console.error('Error fetching AI response:', error);
            addMessage('AI', "Sorry, I couldn't generate a response.");
        });
}




function typeResponse(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    chatContainer.appendChild(messageElement);

    let i = 0;
    let typingSpeed = 25;

    if (message.length > 200) {
        typingSpeed = 8;
    }

    const typingInterval = setInterval(function () {
        const slicedMessage = message.slice(0, i);
        const formattedMessage = slicedMessage.replace(/\n/g, '<br>');

        messageElement.innerHTML = `<strong>${sender}:</strong> ${formattedMessage}`;

        const shouldPause = Math.random() > 0.9 && i > 5;
        const shouldBackspace = Math.random() > 0.95 && i > 5;

        if (shouldPause) {
            setTimeout(() => {
                i++;
            }, typingSpeed * 10);
        } else if (shouldBackspace) {
            i -= Math.floor(Math.random() * 3) + 1;
        } else {
            i++;
        }

        if (i >= message.length) {
            clearInterval(typingInterval);
        }

        chatContainer.scrollTop = chatContainer.scrollHeight;
    }, typingSpeed);
}
