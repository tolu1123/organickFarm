//   The import statement
import { onlineStatus } from '../modules/onlineStatus.js';
import {hamburger, closeDropDown, handleOutsideClick} from './../modules/hamburger.js' 
import {loadProducts, productTemplate, pathLocator, updateShopPage} from "./../modules/products.js"
import { cartCount } from "../modules/cartCounter.js";
 

// Update the counter view
cartCount()


// the container in which products will be appended to
let productItemContainer = document.querySelector('.productItemContainer');
// the loadMoreBtn
let loadMoreBtn = document.querySelector('.loadMoreProducts');

// Variables
let products;
let undisplayedProducts
let displayedProducts = [];

// populate the products section
async function populateProductSection() {
    try {
        let data = await fetch('./../json/products.json');
        products = await data.json();

        undisplayedProducts = [...products];

        loadProducts(undisplayedProducts, displayedProducts, 0, 20, productItemContainer, false, true, loadMoreBtn,true, updateShopPage,observeCatProducts,watchResizeObserver);

        // The code to observe the products in the related section
        observeCatProducts();

        // The variable that depends on the creation of the template from the loadProducts function
        // -and then the watchResizeObserver() function depend on it to work properly
        productXCoordSm()
        productXCoordLg()
        setTemplateWidth()
        setInnerTemplateWidth()


        // The function to observe the resizing of the element
        watchResizeObserver();

        let templatesFirstChild = document.querySelectorAll('.productFirstElem');
        templatesFirstChild.forEach(eachChild => {
        eachChild.style.width = `${innerTemplateWidth}px`
        })


        // Get all the .productSecondElem
        let templateSecondChild = document.querySelectorAll('.productSecondElem')
        templateSecondChild.forEach(eachChild => {
        eachChild.style.width = '0px';
        })

        let templateThirdChild = document.querySelectorAll('.imageAesthetics');
        templateThirdChild.forEach(eachChild => {
        eachChild.style.width = '0px';
        })
    } catch (error) {
        console.log('Error:', error)
    }
}

populateProductSection()


// The intersection observer
// Adding the Intersection Observer to observe elements
let options = {
    root: null,
    rootMargin: "0px",
    threshold: [0 , 0.1, 0.25, 0.5, 0.75, 1.0],
};

let observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        // if the found entry target element contains product in its class 
        // then 
        if(entry.target.classList.contains('product')) {
          // we will check if it intersects before adding the class visibleProduct
          if(entry.isIntersecting && entry.intersectionRatio > 0.2) {
              entry.target.classList.add('visibleProduct');
          }else {
            entry.target.classList.remove('visibleProduct');
          }
        }
    });
},options)

function observeCatProducts() {
    let categoryProducts = document.querySelectorAll('.product');
    categoryProducts.forEach(product => {
      observer.observe(product);
    })
}






//  creating the resize script to watch for one of the footer items and add directions in specific screen width
let rtlElement = document.querySelector('.rtl');

function resizeRTL() {
  // on the resize we check if the window width is greater than 1024px then we do something; if not we revoke the stuff we did
  if(window.innerWidth >= 1024) {
    rtlElement.setAttribute('dir', 'rtl');
  } else if (window.innerWidth <= 1023 && rtlElement.getAttribute('dir')) {
    // if the window is less than 1024px and has the dir attribute on it; remove the dir attribute
    rtlElement.removeAttribute('dir');
  }
}

resizeRTL();
window.addEventListener('resize', () => {
  resizeRTL();
});
  