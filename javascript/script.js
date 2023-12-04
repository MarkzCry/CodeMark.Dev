async function fetchAndDisplayLatestShout() {
    try {
        const response = await fetch('https://codemarkserver1.codemarkapp.repl.co/getShouts');
        const data = await response.json();

        console.log('Fetched data:', data);

        const shoutContainer = document.querySelector('.shout-container');

        if (data && data.shouts && data.shouts.length > 0) {
            const latestShout = data.shouts[data.shouts.length - 1];
            const shoutItem = document.createElement('div');
            shoutItem.classList.add('shout-item');

            const textWithLineBreaks = latestShout.text ? latestShout.text.replace(/\n/g, '<br>') : 'No text available';

            shoutItem.innerHTML = `
                <p class="shout-text"><strong>${textWithLineBreaks}</strong></p>
                <p class="shout-link">${latestShout.link ? `<a href="${latestShout.link}" target="_blank">${latestShout.link}</a>` : ''}</p>
                ${latestShout.imageLink ? `<img class="shout-image" src="${latestShout.imageLink}" alt="Shout Image">` : ''}
            `;
            shoutContainer.innerHTML = '';
            shoutContainer.appendChild(shoutItem);
        } else {
            shoutContainer.innerHTML = '<p>No shouts available.</p>';
        }
    } catch (error) {
        console.error('Error fetching shouts:', error);
    }
}

window.addEventListener('DOMContentLoaded', fetchAndDisplayLatestShout);
