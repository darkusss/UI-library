const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

const prevButton = document.querySelector('#prevButton');
const nextButton = document.querySelector('#nextButton');

const imgWidth = carouselImages[0].naturalWidth;

let counter = 0;

nextButton.addEventListener('click', () => {
    if (counter < carouselImages.length - 1) {
        prevButton.style.pointerEvents = 'all';
        prevButton.style.color = 'white';
        carouselSlide.style.transition = `transform .5s ease-out`;
        counter++;
        carouselSlide.style.transform = `translateX(${-imgWidth * counter}px)`;
    }
    if (counter === carouselImages.length - 1) {
        nextButton.style.pointerEvents = 'none';
        nextButton.style.color = 'gray';
    }
});

prevButton.addEventListener('click', () => {
    if (counter > 0) {
        nextButton.style.pointerEvents = 'all';
        nextButton.style.color = 'white';
        carouselSlide.style.transition = `transform .5s ease-out`;
        counter--;
        carouselSlide.style.transform = `translateX(${-imgWidth * counter}px)`;
    }
    if (counter === 0){
        prevButton.style.pointerEvents = 'none';
        prevButton.style.color = 'gray';
    }
});
