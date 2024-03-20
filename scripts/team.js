// Import statements
import {hamburger, closeDropDown, handleOutsideClick} from './../modules/hamburger.js' 
import {rtlElement, resizeRTL} from "./../modules/resizeRtl.js"
import { cartCount } from "../modules/cartCounter.js";


// Update the counter view
cartCount()


// Code to apply the rtl direction attribute to one of the elements of the footer
resizeRTL();
window.addEventListener('resize', () => {
  resizeRTL();
});