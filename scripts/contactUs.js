// Import statements
import {hamburger, closeDropDown, handleOutsideClick} from './../modules/hamburger.js' 
import {rtlElement, resizeRTL} from "./../modules/resizeRtl.js"
import { cartCount } from "../modules/cartCounter.js";


//We will update the counter view
cartCount()


// The intersection observer to apply transitions
let options = {
    root: null,
    rootMargin: "0px",
    threshold: [0 , 0.1, 0.25, 0.5, 0.75, 1.0],
};

let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // We are observing the children of the about us section
        if(entry.target.classList.contains('fruitImage') || entry.target.classList.contains('infoAboutUs')) {
            if(entry.isIntersecting && entry.intersectionRatio >= 0.1) {
                entry.target.classList.add('aboutVisible');
            } 
        }
    });
},options)

let fruitImage = document.querySelector('.fruitImage');
let infoAboutUs = document.querySelector('.infoAboutUs');

observer.observe(fruitImage);
observer.observe(infoAboutUs)





// Code to apply the rtl direction attribute to one of the elements of the footer
resizeRTL();
window.addEventListener('resize', () => {
  resizeRTL();
});