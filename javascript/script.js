let currentVideoIndex = 0;

// Function to fetch and display a specific YouTube video
function fetchYouTubeVideo(videoIndex) {
    const apiKey = 'AIzaSyAzuAVUpgUc6tRubt88MY18cRMZb77M3qo'; // Replace with your YouTube Data API key
    const channelId = 'UCgYpekHvMJ9w4BH3nxXxf3Q'; // Replace with your desired channel ID
    const videoContainer = document.getElementById('youtube-video-container');

    // Construct the API URL to fetch videos in reverse chronological order
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=10`;

    // Fetch the video data
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const videos = data.items;
            const totalVideos = videos.length;

            if (videoIndex < 0) {
                videoIndex = 0; // Ensure we don't go below the first video
            } else if (videoIndex >= totalVideos) {
                videoIndex = totalVideos - 1; // Ensure we don't go beyond the last video
            }

            const video = videos[videoIndex];
            const videoTitle = video.snippet.title;
            const videoDescription = video.snippet.description;
            const videoId = video.id.videoId;

            const videoElement = document.createElement('div');
            videoElement.classList.add('video');
            videoElement.innerHTML = `
                <h3>${videoTitle}</h3>
                <p>${videoDescription}</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
            `;

            // Clear the existing video and add the new video
            videoContainer.innerHTML = '';
            videoContainer.appendChild(videoElement);

            // Update the current video index
            currentVideoIndex = videoIndex;
        })
        .catch(error => console.error('Error fetching YouTube video:', error));
}

// Function to handle the "Previous Video" button click
document.getElementById('prev-video').addEventListener('click', () => {
    fetchYouTubeVideo(currentVideoIndex - 1);
});

// Function to handle the "Next Video" button click
document.getElementById('next-video').addEventListener('click', () => {
    fetchYouTubeVideo(currentVideoIndex + 1);
});

// Call the fetchRecentYouTubeVideo function when the page loads
window.addEventListener('load', () => {
    fetchYouTubeVideo(currentVideoIndex);
});
