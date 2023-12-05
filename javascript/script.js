window.addEventListener('DOMContentLoaded', async () => {
    const img = document.querySelector('.shout-image');
    img.addEventListener('load', () => {
        const aspectRatio = img.naturalWidth / img.naturalHeight;

        if (aspectRatio > 1) {
            img.classList.add('landscape');
        } else {
            img.classList.add('portrait');
        }
    });

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

            // Trigger 'load' event on the image after setting the 'src' attribute
            const newImg = shoutItem.querySelector('.shout-image');
            newImg.onload = () => {
                const newAspectRatio = newImg.naturalWidth / newImg.naturalHeight;

                if (newAspectRatio > 1) {
                    newImg.classList.add('landscape');
                } else {
                    newImg.classList.add('portrait');
                }
            };
        } else {
            shoutContainer.innerHTML = '<p>No shouts available.</p>';
        }
    } catch (error) {
        console.error('Error fetching shouts:', error);
    }
});
