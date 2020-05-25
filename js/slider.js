const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide .carousel-img');

const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');

let counter = 1;

const imgWidth = 267;

nextButton.addEventListener('click', () => {
    if (counter < carouselImages.length - 1) {
        counter++;
        carouselSlide.style.transform = `translateX(${-imgWidth * counter}px)`;
    }

})

prevButton.addEventListener('click', () => {
    if (counter > 0) {
        counter--;
        carouselSlide.style.transform = `translateX(${-imgWidth * counter}px)`;
    }
})