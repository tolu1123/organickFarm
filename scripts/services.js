// Import statements
import {rtlElement, resizeRTL} from "./../modules/resizeRtl.js"

//Setting the hamburger display
// Setting the modal
let hamburger = document.querySelector('.hamburger');
let dropDown = document.querySelector('.dropDown');
let state = false;

// Adding the event listener
hamburger.addEventListener('click', () => {
    if(state) {
        // if state is true (meaning that the drop down is opened) we will close it
        hamburger.innerHTML = '<i class="fa-sharp fa-solid fa-bars"></i>';
        if(window.innerWidth <= 639) {
          dropDown.classList.add('transTop');
          dropDown.classList.remove('transTopNormal');
        }

        if(window.innerWidth >= 640) {
          dropDown.classList.add('transRight');
          dropDown.classList.remove('transNormal');
        }

        // change the state of the drop down
        state = !state;
    } else {
        // If state is false(meaning that the drop down is closed)
        hamburger.innerHTML = '<i class="fa-sharp fa-solid fa-xmark"></i>';

        // if the dropdown is closed
        // make it dropdown 
        if(window.innerWidth <= 639) {
          dropDown.classList.add('transTopNormal');
          dropDown.classList.remove('transTop');
          dropDown.classList.add('right-0');
        } 

        if(window.innerWidth >= 640) {
          dropDown.classList.remove('transRight');
          dropDown.classList.add('transNormal');
          dropDown.classList.add('right-0');
        }

        // change the state of the dropDown
        state = !state;
    }
})

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