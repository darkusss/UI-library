const burger = document.getElementById('burger');
const nav = document.querySelector('.nav-menu');

burger.addEventListener('click', () => {
    if (burger.classList.contains('active')) {
        burger.classList.remove('active');
        nav.classList.remove('active');
    } else {
        burger.classList.add('active');
        nav.classList.add('active');
    }
})