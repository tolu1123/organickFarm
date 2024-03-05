//   The import statement
import {loadProducts, productTemplate, pathLocator, updateShopPage} from "./../modules/products.js"
import {rtlElement, resizeRTL} from "./../modules/resizeRtl.js"
import { cartCount } from "../modules/cartCounter.js";


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

// Update the view on the cartCounter element 
cartCount();



let products;
let unOfferedProducts;
// THE CODE TO CREATE THE PRODUCTS IN THE OFFER MENU
let offerMenu = document.querySelector('.productItemContainer');

// NOTE 
//unOfferedProducts is in the async function fetchProducts()
// let unOfferedProducts = [...products];
let offeredProducts = [];

let loadMoreBtn = document.createElement('button');


async function populateSections() {
    try {
        let data = await fetch('./../json/products.json');
        products = await data.json();

        unOfferedProducts = [...products];

        loadProducts(unOfferedProducts, offeredProducts, 0, 4, offerMenu, false, false, loadMoreBtn, true, updateShopPage);

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

populateSections()

// The intersection observer
// Adding the Intersection Observer to observe elements
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

        // if the entry's class contains product we will observe it(we are observing to add animations)
        if(entry.target.classList.contains('product')) {
            // we will check if it is intersecting and if its intersectionRatio is equals to or greater than 0.2
            if(entry.isIntersecting && entry.intersectionRatio >=0.2) {
                entry.target.classList.add('visibleProduct');
            }

        }
    })
}, options)

function observeCatProducts() { 
    // Select all elements with the class product
    let categoryProducts = document.querySelectorAll('.product');
    categoryProducts.forEach(product => {
      observer.observe(product);
    })
}


let fruitImage = document.querySelector('.fruitImage');
let infoAboutUs = document.querySelector('.infoAboutUs');

observer.observe(fruitImage);
observer.observe(infoAboutUs)


// Code to apply the rtl direction attribute to one of the elements of the footer
resizeRTL();
window.addEventListener('resize', () => {
  resizeRTL();
});