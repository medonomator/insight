const BASE_URL = window.location.origin;
// class
const preloader = document.querySelector('.lds-ring');
const hamburger = document.querySelector('.hamburger');
const mainMenu = document.querySelector('.main-menu');
const topArrow = document.querySelector('.top-arrow');
const aphorismsContainer = document.querySelector('.aphorisms-container');
const moreButtonAphorism = document.querySelector('.more-button-aphorism');
// Ids
const filterByTopic = document.getElementById('filter-by-topic');
const filterByCategories = document.getElementById('filter-by-categories');
const filterByAuthor = document.getElementById('filter-by-author');
// helpers
const preloaderNone = () => (preloader.style.display = 'none');

// // const faClone = document.querySelectorAll('.fa-clone');
// // const faShare = document.querySelectorAll('.fa-share-alt');
// // const shuffleButton = document.querySelector('.shuffle-button');
// // const subscribeButton = document.querySelector('.subscribe-button');

// // faClone.forEach(item => {
// //   item.addEventListener('click', e => alert('В разработке...'));
// // });
// // faShare.forEach(item => {
// //   item.addEventListener('click', e => alert('В разработке...'));
// // });

// shuffleButton.addEventListener('click', e => alert('Подставить функцию перемешки.'));
// subscribeButton.addEventListener('click', e => alert('Вы подписались на новости.'));
