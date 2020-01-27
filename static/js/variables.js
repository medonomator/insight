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
// Subscribe
const subscribeInput = document.querySelector('.subscribe-input');
const subscribeButton = document.querySelector('.subscribe-button');
const errorElement = document.querySelector('.error-element');
const successSubscribeButton = document.querySelector('.success-subscribe-button');
const thanksForSubscription = document.querySelector('.thanks-for-subscription');
// helpers
const preloaderNone = () => (preloader.style.display = 'none');

const shuffleButton = document.querySelector('.shuffle-button');
