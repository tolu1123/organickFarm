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



// import the necessary functions and objects from the module news.js
import { newsArr, displayNews} from "./modules/news.js";

// creating the products array
let products = [
  {
    productName: "Calabrese Broccoli",
    productTag: "Vegetable",
    productImage: "./images/products/calabreseBroccoli.jpg",
    fPrice: 20.0,
    rPrice: 13.0,
    shortStory: "",
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Fresh Banana Fruits",
    productTag: "Fresh",
    productImage: "./images/products/freshBanana.jpg",
    fPrice: 20.0,
    rPrice: 14.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "White Nuts",
    productTag: "Millets",
    productImage: "./images/products/whiteNuts.jpg",
    fPrice: 20.0,
    rPrice: 15.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Vegan Red Tomato",
    productTag: "Vegetable",
    productImage: "./images/products/veganRedTomato.jpg",
    fPrice: 20.0,
    rPrice: 17.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Soy Beans",
    productTag: "Health",
    productImage: "./images/products/soyBeans.png",
    fPrice: 20.0,
    rPrice: 11.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Brown Hazel Nuts",
    productTag: "Nuts",
    productImage: "./images/products/brownHazelNuts.jpg",
    fPrice: 20.0,
    rPrice: 12.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Eggs",
    productTag: "Fresh",
    productImage: "./images/products/eggs.jpg",
    fPrice: 20.0,
    rPrice: 17.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Bread",
    productTag: "Fresh",
    productImage: "./images/products/bread.jpg",
    fPrice: 20.0,
    rPrice: 15.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Fresh Corn",
    productTag: "Fresh",
    productImage: "./images/products/freshCorn.jpg",
    fPrice: 21.23,
    rPrice: 18.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Organic Almonds",
    productTag: "VegetableFruits",
    productImage: "./images/products/organicAlmonds.jpg",
    fPrice: 21.0,
    rPrice: 18.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "White Beans",
    productTag: "Fresh",
    productImage: "./images/products/whiteBeans.jpg",
    fPrice: 61.0,
    rPrice: 48.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Apples",
    productTag: "Fresh",
    productImage: "./images/products/apple.jpg",
    fPrice: 18.0,
    rPrice: 12.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Onions",
    productTag: "Fresh",
    productImage: "./images/products/onions.jpg",
    fPrice: 15.0,
    rPrice: 8.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Oranges",
    productTag: "Fresh",
    productImage: "./images/products/orange.jpg",
    fPrice: 19.0,
    rPrice: 11.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Spices",
    productTag: "Herbs",
    productImage: "./images/products/spice.jpg",
    fPrice: 19.0,
    rPrice: 11.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
  {
    productName: "Watermelon",
    productTag: "Fresh",
    productImage: "./images/products/watermelon.jpg",
    fPrice: 61.0,
    rPrice: 48.0,
    description: "",
    addInfo: "",
    qty: 1,
  },
];

// The load more functionality in the products section of the homepage
let undisplayedProducts = [...products];
let displayedProducts = [];

let productItemContainer = document.querySelector('.productItemContainer');
let loadMoreProducts = document.querySelector('.loadMoreProducts');


// The initial data that will be loaded
function loadProducts(unUsedArray,usedArr,startNo,number,container) {
  // there are 4 parameters to take in
  // unUsedArray => products that have not been displayed 
  // usedArr => products that have been displayed
  // startNo => the number to start splicing from
  // number => the number of items to take
  // container => the container to append the templates created

  if(undisplayedProducts.length !== 0) {
  // get the data with splice method
  let items = unUsedArray.splice(startNo, number);
      //create the templates for the loaded products   
      items.forEach(product => {
          let eachProduct =  productTemplate(product);
          // append the created template
          container.appendChild(eachProduct);

          // push the products into the displayedProducts array
          usedArr.push(product);
      })
  } 
  if(unUsedArray.length === 0)  {
      loadMoreProducts.style.display = 'none';
  }
}

loadProducts(undisplayedProducts , displayedProducts , 0 , 4, productItemContainer);


//THE load more button functionality
loadMoreProducts.addEventListener('click', () => {
  loadProducts(undisplayedProducts, displayedProducts,0 ,4, productItemContainer);
})


//the productTemplate function that creates the template of each product
function productTemplate(product) {

    let template = document.createElement('div');
    template.setAttribute('class', 'product transitions brocolli bg-[#ffffff] shadow-sm shadow-[#f9f8f8] rounded-3xl p-5');
    template.innerHTML = `
                        <!-- the tag -->
                        <div class="p-1 bg-[#274C5B] text-[#fff] w-min text-sm rounded-[4px]">
                            <h6>${product.productTag}</h6>
                        </div>

                        <!-- The image container -->
                        <div class="image w-auto flex justify-center items-center">
                            <img class="h-[170px] object-center object-scale-down" src=${product.productImage} alt="">
                        </div>

                        <!-- The text info about the product item -->
                        <div class="text-[#336B5B]">
                            <h5 class="font-bold text-base">${product.productName}</h5>
                            <hr class="bg-[#B8B8B8] mt-1 mb-1">
                            <div class="flex flex-row justify-between">
                                <!-- The price tags -->
                                <div class="flex flex-row justify-between items-end gap-2">
                                    <h6 class="text-[13px] leading-none line-through text-[#B8B8B8] decoration-[#B8B8B8]">$<span>${product.fPrice}</span></h6>
                                    <h5 class="text-[15px] leading-none">$<span>${product.rPrice}</span></h5>
                                </div>

                                <!-- The ratings -->
                                <div class="text-[#FFA858] text-[11px]">
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                </div>
                            </div>
                        </div>`
    return template;
}


// THE CODE TO CREATE THE PRODUCTS IN THE OFFER MENU
let offerMenu = document.querySelector('.offerMenu');
let offerProducts = [...products];
let offeredProducts = []
loadProducts(offerProducts , offeredProducts , 12 , 4, offerMenu);


// THE PAGINATION STYLING FOR THE HOME PAGE
// initialize Swiper:
const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,
    autoplay: {
        delay: 10000,
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


// PULL DOWN TWO CURRENT NEWS AND DISPLAY IT IN THE U.I

let newsContainer = document.querySelector('.newsContainer');
let data = newsArr;


displayNews(data,0, 2, newsContainer);


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
  threshold: [0 , 0.1, 0.25, 0.5, 0.75, 1.0],
};

let heroObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    // // We are observing the extraHero children
    // if(entry.target.classList.contains('extraHeroOne') || entry.target.classList.contains('extraHeroTwo')) {
    //   if(entry.isIntersecting && entry.intersectionRatio > 0.2) {
    //     entry.target.classList.add('extraHeroVisible');
    //   }
    // }

    // We are observing the children of the about us section
    if(entry.target.classList.contains('fruitImage') || entry.target.classList.contains('infoAboutUs')) {
      if(entry.isIntersecting && entry.intersectionRatio >= 0.1) {
        entry.target.classList.add('aboutVisible');
      } 
    }

    // We are observing the product items of the categories and the offer section
    if(entry.target.classList.contains('product')) {
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
// let extraHeroOne = document.querySelector('.extraHeroOne');
// let extraHeroTwo = document.querySelector('.extraHeroTwo');

let fruitImage = document.querySelector('.fruitImage');
let infoAboutUs = document.querySelector('.infoAboutUs');

let ecoText = document.querySelector('.ecoText');
let newsText = document.querySelectorAll('.newsText');

// Observe the element
// heroObserver.observe(extraHeroOne);
// heroObserver.observe(extraHeroTwo);

heroObserver.observe(fruitImage);
heroObserver.observe(infoAboutUs);

function observeCatProducts() {
  let categoryProducts = document.querySelectorAll('.product');
  categoryProducts.forEach(product => {
    heroObserver.observe(product);
  })
}
observeCatProducts();

newsText.forEach(newsItem => {
  heroObserver.observe(newsItem);
})

//THE load more button functionality
loadMoreProducts.addEventListener('click', () => {
  // Observe the product items
  observeCatProducts(); 
})

heroObserver.observe(ecoText);



