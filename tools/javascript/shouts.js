
let shoutsData;
let currentIndex = 0;
const shoutsPerPage = 3;
let currentShoutId = '';

function showDeleteConfirmation(shoutId) {
    currentShoutId = shoutId;

    const deleteForm = document.createElement('div');
    deleteForm.className = 'delete-form';
    deleteForm.innerHTML = `
                <form id="deleteForm" onsubmit="submitDeleteForm(event, '${shoutId}')">
                    <p>Are you sure you want to delete this shout?</p>
                    <input type="password" id="deletePassword" placeholder="Enter password" autocomplete="off">
                    <button type="submit">Confirm Delete</button>
                    <button type="button" onclick="hideModal()">Cancel</button>
                </form>
            `;

    document.getElementById('modal').innerHTML = '';
    document.getElementById('modal').appendChild(deleteForm);
    document.getElementById('modal').style.display = 'block';
}
async function submitDeleteForm(event, id) {
    event.preventDefault();
    const password = document.getElementById('deletePassword').value;

    if (!password) {
        console.log('Password required.');
        return;
    }

    hideModal();

    deleteShout(id, password);
}
function showEditForm(id) {
    currentShoutId = id;

    const editForm = document.createElement('div');
    editForm.className = 'edit-form';
    editForm.innerHTML = `
                <form id="editForm" onsubmit="submitEditForm(event, '${id}')">
                    <textarea id="editText" placeholder="Enter text" maxlength="550"></textarea>
                    <span id="characterCount">550/550</span>
<input type="text" id="editLink" placeholder="Enter link (optional)" autocomplete="off">
<input type="text" id="editImageLink" placeholder="Enter image link (optional)" autocomplete="off">
<input type="password" id="editPassword" placeholder="Enter password" autocomplete="off">

                    <button type="submit">Submit</button>
                    <button type="button" onclick="hideModal()">Cancel</button>
                </form>
            `;

    document.getElementById('modal').innerHTML = '';
    document.getElementById('modal').appendChild(editForm);
    document.getElementById('modal').style.display = 'block';
    const textArea = document.getElementById('editText');
    textArea.addEventListener('input', updateCharacterCount);
}
async function submitEditForm(event, id) {
    event.preventDefault();
    const password = document.getElementById('editPassword').value;
    const updatedText = document.getElementById('editText').value;
    const updatedLink = document.getElementById('editLink').value;
    const updatedImageLink = document.getElementById('editImageLink').value;

    if (!password) {
        console.log('Password required.');
        return;
    }

    hideModal();

    editShout(id, password, updatedText, updatedLink, updatedImageLink);
}

async function deleteShout(id, password) {
    try {
        const response = await fetch(`https://codemarkserver1.codemarkapp.repl.co/deleteShout`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password, id }),
        });

        const data = await response.json();
        console.log('Shout deleted:', data);
        fetchAndDisplayShouts();
    } catch (error) {
        console.error('Error deleting shout:', error);
    }
}

async function editShout(id, password, updatedText, updatedLink, updatedImageLink) {
    try {
        const response = await fetch(`https://codemarkserver1.codemarkapp.repl.co/editShout`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text: updatedText, link: updatedLink, imageLink: updatedImageLink, password, id }),
        });

        const data = await response.json();
        console.log('Shout updated:', data);
        fetchAndDisplayShouts();
    } catch (error) {
        console.error('Error editing shout:', error);
    }
}

function formatDate(timestamp) {
    const date = new Date(timestamp);
    const monthNames = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const suffix = (day === 1 || day === 21 || day === 31) ? 'st' :
        (day === 2 || day === 22) ? 'nd' :
            (day === 3 || day === 23) ? 'rd' : 'th';
    const formattedDay = `${day}${suffix}`;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;

    return `${month} ${formattedDay}, ${year} | (${formattedHours}:${minutes} ${ampm})`;
}

async function fetchAndDisplayShouts() {
    try {
        const response = await fetch('https://codemarkserver1.codemarkapp.repl.co/getShouts');
        const shoutsData = await response.json();

        if (shoutsData && shoutsData.shouts && shoutsData.shouts.length > 0) {
            const shoutList = document.getElementById('shoutList');
            shoutList.innerHTML = '';

            const reversedShouts = shoutsData.shouts.slice().reverse();
            const reversedSubset = reversedShouts.slice(currentIndex, currentIndex + shoutsPerPage);

            reversedSubset.forEach(shout => {
                const textWithLineBreaks = shout.text ? shout.text.replace(/\n/g, '<br>') : 'No text available';
                const formattedTime = formatDate(shout.time);
                const shoutItem = document.createElement('div');
                shoutItem.className = 'shout-item';
                shoutItem.innerHTML = `
                    <p class="fetchedText"><strong>${textWithLineBreaks}</strong></p>
                    <p class="fetchedLink">${shout.link ? `<a href="${shout.link}" target="_blank">${shout.link}</a>` : ''}</p>
                    <p class= "fetchedTime">${formattedTime}</p>
                    <p>${shout.imageLink ? `<img class="shout-image" src="${shout.imageLink}" alt="Shout Image">` : ''}</p>
                    <button class="buttonED edit-button">Edit</button>
                    <button class="buttonED delete-button">Delete</button>
                `;

                shoutItem.addEventListener('click', function (event) {
                    const targetElement = event.target;

                    if (targetElement.classList.contains('edit-button')) {
                        event.stopPropagation();
                        showModal(shout._id, 'edit');
                    } else if (targetElement.classList.contains('delete-button')) {
                        event.stopPropagation();
                        showModal(shout._id, 'delete');
                    } else {
                        openShoutModal(shoutItem);
                    }
                });

                shoutList.appendChild(shoutItem);
            });

            if (currentIndex > 0) {
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'button-container';
                const showPreviousButton = document.createElement('button');
                showPreviousButton.className = 'show-more-button';
                showPreviousButton.textContent = 'Show Previous';
                showPreviousButton.onclick = showPreviousShouts;
                buttonContainer.appendChild(showPreviousButton);
                shoutList.appendChild(buttonContainer);
            }

            if (currentIndex + shoutsPerPage < reversedShouts.length) {
                const buttonContainer = document.createElement('div');
                buttonContainer.className = 'button-container';
                const showNextButton = document.createElement('button');
                showNextButton.className = 'show-more-button';
                showNextButton.textContent = 'Show Next';
                showNextButton.onclick = showNextShouts;
                buttonContainer.appendChild(showNextButton);
                shoutList.appendChild(buttonContainer);
            }
        } else {
            document.getElementById('shoutList').innerHTML = '<p>No shouts available.</p>';
        }
    } catch (error) {
        console.error('Error fetching shouts:', error);
        alert('Failed to fetch shouts. Please try again.');
    }
}

function showPreviousShouts() {
    currentIndex -= shoutsPerPage;
    if (currentIndex < 0) {
        currentIndex = 0;
    }
    fetchAndDisplayShouts();
}

function showNextShouts() {
    currentIndex += shoutsPerPage;
    fetchAndDisplayShouts();
}
function updateCharacterCount() {
    const textArea = document.getElementById('editText');
    const characterCount = document.getElementById('characterCount');

    if (textArea && characterCount) {
        const maxLength = parseInt(textArea.getAttribute('maxlength'));
        const currentLength = textArea.value.length;
        const remaining = maxLength - currentLength;

        characterCount.textContent = remaining + '/' + maxLength;

        if (remaining < 0) {
            characterCount.style.color = 'red';
        } else {
            characterCount.style.color = 'white';
        }
    } else {
        console.error("Textarea or character count element not found.");
    }
}
function showModal(shoutId, action) {
    currentShoutId = shoutId;
    if (action === 'edit') {
        showEditForm(shoutId);
    } else if (action === 'delete') {
        showDeleteConfirmation(shoutId);
    }
}
function hideModal() {
    document.getElementById('modal').style.display = 'none';
}

function applyImageAspectRatios() {
    const images = document.querySelectorAll('.shout-image');
    images.forEach(img => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;

        if (aspectRatio > 1) {
            img.classList.add('landscape');
            img.classList.remove('portrait');
        } else {
            img.classList.add('portrait');
            img.classList.remove('landscape');
        }
    });
}
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayShouts();
    setInterval(() => {
        applyImageAspectRatios();
    }, 500)
});
