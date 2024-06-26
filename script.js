// import the onlineStatus function from module onlineStatus.js
import { onlineStatus } from "./modules/onlineStatus.js";
//import the necessary function from the module hamburger.js
import { hamburger, closeDropDown, handleOutsideClick} from "./modules/hamburger.js";

// import the necessary functions from the module products.js
import {loadProducts, productTemplate, pathLocator, updateShopPage} from "./modules/products.js"
// import the necessary functions and objects from the module news.js
import { newsArr, displayNews} from "./modules/news.js";
import { cartCount } from "./modules/cartCounter.js";
// update the view on the cartCounter element on loading
cartCount();
 

let products;
let undisplayedProducts
let displayedProducts = [];

let unOfferedProducts;
// NOTE 
//unOfferedProducts is in the async function fetchProducts()
// let unOfferedProducts = [...products];
let offeredProducts = []


// THE CODE TO CREATE THE PRODUCTS IN THE OFFER MENU
let offerMenu = document.querySelector('.offerMenu');

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

    //We are going to create a random number to mimick dynamic feed for the {offerMenu}
    const randomNumber = Math.ceil(Math.random() * 13) 

    // A conditional for the user's screen width to prevent broken images
    if(window.innerWidth >= 640 && window.innerWidth < 1024) {
      loadProducts(undisplayedProducts, displayedProducts,0 ,3, productItemContainer, true, true, loadMoreProductsBtn, true, updateShopPage,observeCatProducts,watchResizeObserver);
      loadProducts(unOfferedProducts , offeredProducts , randomNumber, 3, offerMenu, true, false, loadMoreProductsBtn, true, updateShopPage,observeCatProducts,watchResizeObserver);
    } else {

      loadProducts(undisplayedProducts, displayedProducts,0 ,4, productItemContainer, true, true, loadMoreProductsBtn, true, updateShopPage,observeCatProducts,watchResizeObserver);
      loadProducts(unOfferedProducts , offeredProducts , randomNumber , 4, offerMenu, true, false, loadMoreProductsBtn, true, updateShopPage,observeCatProducts,watchResizeObserver);
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
  threshold: [0 , 0.02,0.05, 0.1, 0.15, 0.2, 0.25, 0.5, 0.75, 0.9,1.0],
};

// Flags for our countup counters observer
let countNo1 = 0;
let countNo2 = 0;
let countNo3 = 0;
let countNo4 = 0;

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

    // The intersection to monitor the gallery element at a specific intersection ratio of 0.15
    if(entry.target.classList.contains('gallery')) {
      if(entry.isIntersecting && entry.intersectionRatio > 0.15) {
        entry.target.classList.add('visibleProduct');
      }
    }


    // The intersection observer to monitor the count elements when it is fully visible
    if(entry.target.classList.contains('count1')) {
      if(entry.isIntersecting && entry.intersectionRatio >= 0.6 && countNo1 === 0) {
        counter(0, 100, count1, 50, '%');
        countNo1++;
      }
    }

    if(entry.target.classList.contains('count2')) {
      if(entry.isIntersecting && entry.intersectionRatio >= 0.6 && countNo2 === 0) {
        counter(0, 285, count2, 9, null);
        countNo2++
      }
    }

    if(entry.target.classList.contains('count3')) {
      if(entry.isIntersecting && entry.intersectionRatio >= 0.25 && countNo3 === 0) {
        counter(0, 350, count3, 8, '+');
        countNo3++;
      }
    }

    if(entry.target.classList.contains('count4')) {
      if(entry.isIntersecting && entry.intersectionRatio >= 0.25 && countNo4 === 0) {
        counter(0, 25, count4, 80, '+');
        countNo4++;
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


// This are the variables that will hold the references to all instance of the count up
const count1 = document.querySelector('.count1')
const count2 = document.querySelector('.count2')
const count3 = document.querySelector('.count3')
const count4 = document.querySelector('.count4')

// We will then observe it.
heroObserver.observe(count1);
heroObserver.observe(count2);
heroObserver.observe(count3);
heroObserver.observe(count4);

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

// The counter(..args) function handles the countup functionality of the testimonial section
function counter(start, end, parentElement, timeRate, symbol) {
  // ACCEPTS 5 PARAMETERS
  // start => this should be the start up count
  // end => This is the end of the count by which the count up will be ended
  // parentElement => this is the DOM elememnt where the count up will be displayed
  // timeRate => This is the timeRate variable that changes the rate of the count up function
  // symbol => This is the provided variable (if not null) that will be added after the countup is done.

  function recursiveRunner() {

    let timer = setTimeout(() => {
      parentElement.textContent = start;
      start++;

      // Calculate the progress ratio
      const progress = start / end;

      // Adjust time rate based on progress
      timeRate += (1 - progress) * 0.2;

      recursiveRunner()

    }, timeRate);

    if (start > end) {
      // Concatenate the symbol to the final count once we are done with the count
      symbol !== null ? parentElement.textContent = `${parentElement.textContent + symbol}`: null;

      // We will clear the timeout once we are also done
      clearTimeout(timer);
    }
  }

  recursiveRunner()
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
