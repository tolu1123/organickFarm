const rootElem = document.querySelector(':root');
//Setting the hamburger display
// Setting the modal
const hamburger = document.querySelector('.hamburger');
const dropDown = document.querySelector('.dropDown');
let state = false;

// function to close dropdown
function closeDropDown() {
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

  rootElem.removeEventListener('click', () => {
    const mobileNav = document.querySelector('.mobileNav');
    if((!mobileNav.contains(e.target) && !hamburger.contains(e.target)) && state) {
      closeDropDown()
    }
  }, true)
}

// Adding the event listener
hamburger.addEventListener('click', () => {
    if(state) {
      // if state is true (meaning that the drop down is opened) we will close it
      closeDropDown()  
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
        handleOutsideClick()
    }
})


// The event listener to close the dropdown if any other part of the document aside from 
// the dropdown is clicked and the 
function handleOutsideClick() {
  rootElem.addEventListener('click', (e) => {
    const mobileNav = document.querySelector('.mobileNav');
    if((!mobileNav.contains(e.target) && !hamburger.contains(e.target)) && state) {
      closeDropDown()
    }
  }, true)
}

export { hamburger, closeDropDown, handleOutsideClick}

