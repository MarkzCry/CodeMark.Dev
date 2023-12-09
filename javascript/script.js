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

    try {
        const response = await fetch('https://codemarkserver1.codemarkapp.repl.co/getShouts');
        const data = await response.json();

        console.log('Fetched data:', data);
        const shoutContainer = document.querySelector('.shout-container');

        if (data && data.shouts && data.shouts.length > 0) {
            const latestShout = data.shouts[data.shouts.length - 1];
            const formattedTime = formatDate(latestShout.time);
            const shoutItem = document.createElement('div');
            shoutItem.classList.add('shout-item');

            const textWithLineBreaks = latestShout.text ? latestShout.text.replace(/\n/g, '<br>') : 'No text available';

            shoutItem.innerHTML = `
                <p class="shout-time"><strong>${formattedTime}</strong></p>
                <p class="shout-text"><strong>${textWithLineBreaks}</strong></p>
                <p class="shout-link">${latestShout.link ? `<a href="${latestShout.link}" target="_blank">${latestShout.link}</a>` : ''}</p>
                ${latestShout.imageLink ? `<img class="shout-image" src="${latestShout.imageLink}" alt="Shout Image">` : ''}
            `;
            shoutContainer.innerHTML = '';
            shoutContainer.appendChild(shoutItem);
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
