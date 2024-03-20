// import the onlineStatus function from module onlineStatus.js
import { onlineStatus } from "./modules/onlineStatus.js";
//import the necessary function from the module hamburger.js
import { hamburger, closeDropDown, handleOutsideClick} from "./modules/hamburger.js";

// import the necessary functions from the module products.js
import {loadProducts, productTemplate, pathLocator, updateShopPage} from "./modules/products.js"
// import the necessary functions and objects from the module news.js
import { newsArr, displayNews} from "./modules/news.js";
import { cartCount } from "./modules/cartCounter.js";
// update the view on the cartCounter element
cartCount();
 

let products;
let undisplayedProducts
let displayedProducts = [];

let unOfferedProducts;
// THE CODE TO CREATE THE PRODUCTS IN THE OFFER MENU
let offerMenu = document.querySelector('.offerMenu');

// NOTE 
//unOfferedProducts is in the async function fetchProducts()
// let unOfferedProducts = [...products];
let offeredProducts = []



let productItemContainer = document.querySelector('.productItemContainer');
let loadMoreProductsBtn = document.querySelector('.loadMoreProducts');
 


async function fetchProducts(){
  try {
    //fetch the data in json format
    let productsData = await fetch('./json/products.json');
    products = await productsData.json();
    
    // let undisplayed products be equals to the content of products
    undisplayedProducts = [...products];

    unOfferedProducts = [...products];

    if(window.innerWidth >= 640 && window.innerWidth < 1024) {
      loadProducts(undisplayedProducts, displayedProducts,0 ,3, productItemContainer, true, true, loadMoreProductsBtn, true, updateShopPage,observeCatProducts,watchResizeObserver);
      loadProducts(unOfferedProducts , offeredProducts , 0 , 3, offerMenu, true, false, loadMoreProductsBtn, true, updateShopPage,observeCatProducts,watchResizeObserver);
    } else {
      loadProducts(undisplayedProducts, displayedProducts,0 ,4, productItemContainer, true, true, loadMoreProductsBtn, true, updateShopPage,observeCatProducts,watchResizeObserver);
      loadProducts(unOfferedProducts , offeredProducts , 12 , 4, offerMenu, true, false, loadMoreProductsBtn, true, updateShopPage,observeCatProducts,watchResizeObserver);
    }

    // The code to observe the products in the categories and offer section
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
    console.log('Error:',error)
  } 
  
}
fetchProducts()
// The load more functionality in the products section of the homepage
//THE load more button functionality
loadMoreProductsBtn.addEventListener('click', () => {

  // The loadMore button handles the display of product items to avoid inconsistencies and large whitespace 
  // depending on the width of the viewport.
  if(window.innerWidth >= 640 && window.innerWidth < 1024) {
    //if the buttton is clicked and the screen is about 640px and 1024 px i want to display all hidden produucts if there is any of those product that is hidden
    // then depending on the number of PRODUCT ITEMS displayed, it will no how many items to fetch back to fill empty spaces if there are emoty spaces 
    // and then if there are no empty spaces it will get three products.
    document.querySelectorAll('.product').forEach(child => child.style='flex');
    loadProducts(undisplayedProducts, displayedProducts,0 ,(3 - (productItemContainer.children.length % 3)), productItemContainer, true, true, loadMoreProductsBtn, true, updateShopPage,observeCatProducts,watchResizeObserver);
  } else {
    loadProducts(undisplayedProducts, displayedProducts,0 ,4, productItemContainer, true, true, loadMoreProductsBtn, true, updateShopPage,observeCatProducts,watchResizeObserver);
  }
})

// THE PAGINATION STYLING FOR THE HOME PAGE
// initialize Swiper:
const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    autoplay: {
        delay: 10000,
        disableOnInteraction: false,
    },
    spaceBetween: 30,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    }
);


// Fetch the news items and display it
let data;
// the newsContainer
let newsContainer = document.querySelector('.newsContainer');
async function displayArticles() {
  try {
      data = await fetch('./../json/newsArticles.json');
      let newsItems = await data.json();

      displayNews(newsItems, 0, 2, newsContainer, true);

      
      let newsText = document.querySelectorAll('.newsText');
      newsText.forEach(newsItem => {
          heroObserver.observe(newsItem);
      })

    
    } catch (error) {
        console.log('Error:',error)
    }
}

displayArticles();


// creating the resize script to watch for one of the footer items and add directions in specific screen width
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



// Adding the Intersection Observer to observe elements
let options = {
  root: null,
  rootMargin: "0px",
  threshold: [0 , 0.02,0.05, 0.1, 0.25, 0.5, 0.75, 1.0],
};

let heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // We are observing the extraHero children
    if(entry.target.classList.contains('extraHeroOne') || entry.target.classList.contains('extraHeroTwo')) {
      if(entry.isIntersecting && entry.intersectionRatio > 0.05) {
        entry.target.classList.add('extraHeroVisible');
      }
    }

    // We are observing the children of the about us section
    if(entry.target.classList.contains('fruitImage') || entry.target.classList.contains('infoAboutUs')) {
      if(entry.isIntersecting && entry.intersectionRatio >= 0.2) {
        entry.target.classList.add('aboutVisible');
      } 
    }

    // We are observing the product items of the categories and the offer section
    if(entry.target.classList.contains('product')) {
      if(entry.isIntersecting && entry.intersectionRatio > 0.2) {
        entry.target.classList.add('visibleProduct');
      }else {
        entry.target.classList.remove('visibleProduct');
      }
    }

    if(entry.target.classList.contains('gallery')) {
      if(entry.isIntersecting && entry.intersectionRatio > 0.2) {
        entry.target.classList.add('visibleProduct');
      }
    }

    // We are observing the ecoFriendly text
    if(entry.target.classList.contains('ecoText')) {
      if(entry.isIntersecting && entry.intersectionRatio > 0.2) {
        entry.target.classList.add('sm:-translate-x-[48px]');
        entry.target.classList.remove('sm:translate-x-12');
        entry.target.classList.add('opacity-100');
        entry.target.classList.remove('opacity-0');
      } 
    }

    // We are observing the newsItems text
    if(entry.target.classList.contains('newsText')) {
      if(entry.isIntersecting && entry.intersectionRatio > 0.1) {
        entry.target.classList.add('-translate-y-36', 'sm:-translate-y-0', 'sm:-translate-x-16', 'lg:-translate-x-0', 'lg:-translate-y-36', 'opacity-100');
        entry.target.classList.remove('newsText');
      }
    }
  })
 
}, options);

// The element to observe
let extraHeroOne = document.querySelector('.extraHeroOne');
let extraHeroTwo = document.querySelector('.extraHeroTwo');

let fruitImage = document.querySelector('.fruitImage');
let infoAboutUs = document.querySelector('.infoAboutUs');

let ecoText = document.querySelector('.ecoText');

let gallery = document.querySelectorAll('.gallery');
gallery.forEach(eachGalleryItem => {
  heroObserver.observe(eachGalleryItem);
})

// Observe the element
heroObserver.observe(extraHeroOne);
heroObserver.observe(extraHeroTwo);

heroObserver.observe(fruitImage);
heroObserver.observe(infoAboutUs);

function observeCatProducts() {
  let categoryProducts = document.querySelectorAll('.product');
  categoryProducts.forEach(product => {
    heroObserver.observe(product);
  })
}


//THE load more button functionality
loadMoreProductsBtn.addEventListener('click', () => {
  // Observe the product items
  observeCatProducts(); 
  // Observe the resizing of the element
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

})

heroObserver.observe(ecoText);
