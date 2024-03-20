// Import statements
import { onlineStatus } from '../modules/onlineStatus.js';
import {hamburger, closeDropDown, handleOutsideClick} from './../modules/hamburger.js' 
import {newsArr, displayNews} from "./../modules/news.js"
import {rtlElement, resizeRTL} from "./../modules/resizeRtl.js"
import { cartCount } from "../modules/cartCounter.js";


// Update the counter view
cartCount();

// Fetch the news items and display it
let data;
// the newsContainer
let newsContainer = document.querySelector('.newsContainer');
async function displayUI() {
    try {
        data = await fetch('./../json/newsArticles.json');
        let newsItems = await data.json();

        displayNews(newsItems, 0, 6, newsContainer, false);

        
        let newsText = document.querySelectorAll('.newsText');

        newsText.forEach(newsItem => {
            observer.observe(newsItem);
        })

    
    } catch (error) {
        console.log('Error:',error)
    }
}

displayUI();



// The intersection observer to add our transitions
let options = {
    root: null,
    rootMargin: "0px",
    threshold: [0 , 0.1, 0.25, 0.5, 0.75, 1.0],
};

let observer = new IntersectionObserver(entries=> (
    entries.forEach(entry => {

        // We are observing the newsItems text
        if(entry.target.classList.contains('newsText')) {
            if(entry.isIntersecting && entry.intersectionRatio > 0.1) {
            entry.target.classList.add('-translate-y-36', 'sm:-translate-y-0', 'sm:-translate-x-16', 'lg:-translate-x-0', 'lg:-translate-y-36', 'opacity-100');
            entry.target.classList.remove('newsText');
            }
        }
    })
), options)




// Code to apply the rtl direction attribute to one of the elements of the footer
resizeRTL();
window.addEventListener('resize', () => {
  resizeRTL();
});