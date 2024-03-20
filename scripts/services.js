// Import statements
import {hamburger, closeDropDown, handleOutsideClick} from './../modules/hamburger.js' 
import {rtlElement, resizeRTL} from "./../modules/resizeRtl.js"
import { cartCount } from "../modules/cartCounter.js";

 

// Update the view on the counter
cartCount()

// The modal that displays the video
let playBtn = document.querySelector('.playBtn');
let closeModalBtn = document.querySelector('.closeModalBtn');
let videoModal = document.querySelector('.videoModal');
let iframe = document.querySelector('iframe');

// The addEvent Listener for the playBtn such that when clicked it opens the modal
playBtn.addEventListener('click', () => {
    videoModal.style.display = 'block';
    // ADD .removableHTMLStyle to the root element
    document.querySelector('html').setAttribute('class', 'removableHTMLStyle');
})

closeModalBtn.addEventListener('click', () => {
    videoModal.style.display = 'none';
    iframe.src = 'https://youtube.com/embed/ZzjqgEw9HxI?si=js3lx_uR5_YUAWLT';
    // REMOVE .removableHTMLStyle to the root element
    document.querySelector('html').removeAttribute('class', 'removableHTMLStyle');
})

// Code to apply the rtl direction attribute to one of the elements of the footer
resizeRTL();
window.addEventListener('resize', () => {
  resizeRTL();
});