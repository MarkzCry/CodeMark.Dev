const convertButton = document.querySelector('.button-convert');
const inputURL = document.querySelector('.input-url');
const format = document.getElementById('format');
const quality = document.getElementById('quality');

const serverURL = 'https://server.codemark.app';

const placeholders = [
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
];

let currentPlaceholderIndex = 0;
let currentCharacterIndex = 0;
const placeholderSpeed = 65;

function animatePlaceholders() {
    const inputFields = document.querySelectorAll('.input-url');

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

convertButton.addEventListener('click', () => {
    const selectedFormat = format[format.selectedIndex].value;
    const selectedQuality = quality[quality.selectedIndex].value;
    if (inputURL.value.trim().length > 0) {
        sendButton(inputURL.value, selectedFormat, selectedQuality);
    }
});

const sendButton = (videoURL, format, quality) => {
    fetch(`${serverURL}/check-download-youtube?URL=${videoURL}`)
        .then(response => response.json())
        .then(resData => {
            const data = JSON.parse(JSON.stringify(resData));
            if (data.status === true) {
                document.getElementById(
                    'downloading',
                ).innerHTML = `Starting the download of ${data.title} by ${
                    data.author
                    }...`;
                window.location.href = `${serverURL}/download-youtube?URL=${videoURL}&downloadFormat=${format}&quality=${quality}&title=${
                    data.title
                    }`;
            }
        });
};
