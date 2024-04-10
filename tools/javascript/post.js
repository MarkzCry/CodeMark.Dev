const placeholders = [
    "Super secret password",
    "Random shout message",
    "https://codemark.app"
];

let currentPlaceholderIndex = 0;
let currentCharacterIndex = 0;
const placeholderSpeed = 65;

function animatePlaceholders() {
    const inputFields = document.querySelectorAll('#shoutForm input, #shoutForm textarea');

    if (currentCharacterIndex <= placeholders[currentPlaceholderIndex].length) {
        inputFields[currentPlaceholderIndex].setAttribute('placeholder', placeholders[currentPlaceholderIndex].slice(0, currentCharacterIndex));
        currentCharacterIndex++;
    } else {
        currentCharacterIndex = 0;
        currentPlaceholderIndex = (currentPlaceholderIndex + 1) % placeholders.length;
    }

    setTimeout(animatePlaceholders, placeholderSpeed);
}
window.onload = function () {
    animatePlaceholders();
};

const textArea = document.getElementById('text');
const characterCount = document.getElementById('characterCount');

textArea.addEventListener('input', function () {
    const maxLength = parseInt(textArea.getAttribute('maxlength'));
    const currentLength = textArea.value.length;
    const remaining = maxLength - currentLength;

    characterCount.textContent = remaining + '/' + maxLength;

    if (remaining < 0) {
        characterCount.style.color = 'red';
    } else {
        characterCount.style.color = '#888';
    }
});
textArea.addEventListener('input', function () {
    if (this.value.length > 550) {
        this.value = this.value.slice(0, 550);
    }
});
function displayPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'block';

        setTimeout(() => {
            popup.style.display = 'none';
        }, 2000);
    }
}
document.getElementById('shoutForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    formData.append('password', document.getElementById('password').value);
    formData.append('text', document.getElementById('text').value);
    formData.append('link', document.getElementById('link').value);
    formData.append('imageFile', document.getElementById('imageFile').files[0]);
    formData.append('timezone', timezone)

    try {
        const response = await fetch('https://server.codemark.app/postShout', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            displayPopup('popupSuccess');
        } else {
            throw new Error('Failed to post shout');
        }
    } catch (error) {
        console.error('Error posting shout:', error);
        displayPopup('popupUnauthorized');
    }
});
