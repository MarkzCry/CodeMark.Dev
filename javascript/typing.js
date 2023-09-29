const sentenceElement = document.getElementById("sentence");
const userInputElement = document.getElementById("userInput");
const feedbackElement = document.getElementById("feedback");
const restartButton = document.getElementById("restartButton");
const sectionElement = document.getElementById("content")
let sentences = [];
let sentence = "";
let userInput = "";
let currentIndex = 0;
let startTime;
let wordCount = 0;
let totalCharacters = 0;
let correctCharacters = 0;

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
});
userInputElement.addEventListener("paste", function (e) {
    e.preventDefault();
});
document.body.addEventListener("click", function (event) {
    if (event.target !== restartButton) {
        userInputElement.focus();
    }
});
fetch('sentences.json')
    .then(response => response.json())
    .then(data => {
        sentences = data.sentences;
        generateRandomSentence();
    })
    .catch(error => console.error('Error loading sentences:', error));

userInputElement.addEventListener("input", () => {
    if (!startTime) {
        startTime = Date.now();
    }
    userInput = userInputElement.value;
    checkTyping();
    updateSentenceDisplay();
});

restartButton.addEventListener("click", () => {
    userInputElement.value = "";
    userInput = "";
    currentIndex = 0;
    startTime = null;
    wordCount = 0;
    totalCharacters = 0;
    correctCharacters = 0;
    userInputElement.disabled = false;
    feedbackElement.textContent = "";
    sectionElement.style.border = "2px solid #FFFFFF";
    generateRandomSentence();
    userInputElement.focus();
    updateSentenceDisplay();
});
function messageDissapear() {
    feedbackElement.textContent = " ";
}
function checkTyping() {
    totalCharacters++;
    if (userInput === sentence.slice(0, userInput.length)) {
        sectionElement.style.border = "2px solid #FFFFFF";
        correctCharacters++;
    } else {
        sectionElement.style.border = "2px solid #ca4754";
        feedbackElement.textContent = "Mistake!";
        setTimeout(messageDissapear, 500)
        currentIndex = userInput.length;
    }

    if (userInput === sentence) {
        const endTime = Date.now();
        const totalTimeInSeconds = (endTime - startTime) / 1000;
        const wordsPerMinute = calculateWPM(totalTimeInSeconds);
        const accuracy = (correctCharacters / totalCharacters) * 100;

        userInputElement.disabled = true;
        feedbackElement.textContent = `Sentence completed! Your WPM: ${wordsPerMinute.toFixed(2)}, Accuracy: ${accuracy.toFixed(2)}%`;
    }
}

function calculateWPM(totalTimeInSeconds) {
    const words = sentence.split(" ");
    const typedWords = userInput.split(" ");
    wordCount = typedWords.length;
    const minutes = totalTimeInSeconds / 60;
    const wpm = wordCount / minutes;
    return wpm;
}

function generateRandomSentence() {
    const randomIndex = Math.floor(Math.random() * sentences.length);
    sentence = sentences[randomIndex];
    updateSentenceDisplay();
}

function updateSentenceDisplay() {
    let displayText = '';

    for (let i = 0; i < sentence.length; i++) {
        if (i < userInput.length) {
            if (userInput[i] === sentence[i]) {
                displayText += `<span class="typed-correct">${userInput[i]}</span>`;
            } else {
                displayText += `<span class="typed-incorrect">${sentence[i]}</span>`;
            }
        } else {
            if (i === userInput.length) {
                displayText += `<span class="typed-cursor" style="letter-spacing: -0.27em;">|</span>`;
            }
            displayText += `<span class="typed-grey">${sentence[i]}</span>`;
        }
    }

    sentenceElement.innerHTML = displayText;
}


userInputElement.focus();
