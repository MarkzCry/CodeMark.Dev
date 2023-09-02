// JavaScript
const videoSlides = document.querySelectorAll(".video-slide");
const prevArrow = document.querySelector(".arrow.prev");
const nextArrow = document.querySelector(".arrow.next");

let currentSlide = 0;

function showSlide(slideIndex) {
    videoSlides.forEach((video, index) => {
        if (index === slideIndex) {
            video.classList.add("active");
        } else {
            video.classList.remove("active");
        }
    });
}

function changeSlide(step) {
    currentSlide += step;
    if (currentSlide < 0) {
        currentSlide = videoSlides.length - 1; // Wrap to the last slide when going back from the first slide
    } else if (currentSlide >= videoSlides.length) {
        currentSlide = 0; // Wrap to the first slide when reaching the end
    }
    showSlide(currentSlide);
}

// Play the first video initially
showSlide(currentSlide);

// Arrow button click events
prevArrow.addEventListener("click", () => {
    changeSlide(-1); // Go to the previous slide
});

nextArrow.addEventListener("click", () => {
    changeSlide(1); // Go to the next slide
});
