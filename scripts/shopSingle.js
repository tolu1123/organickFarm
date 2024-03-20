//   The import statement
import { onlineStatus } from '../modules/onlineStatus.js';
import {hamburger, closeDropDown, handleOutsideClick} from './../modules/hamburger.js' 
import {loadProducts, productTemplate, pathLocator} from "./../modules/products.js"
import {updateCounter,cartCounter,cartCount} from "./../modules/cartCounter.js"


// Updating the cart counter
cartCount();


// initialize the page
// we will update the page instantly
let shopObj = localStorage.getItem('shoppingBasket');
let shoppingBasket = JSON.parse(shopObj);


//variables 
let tag = document.querySelector('.tag');
let productImage = document.querySelector('.productImage');
let productName = document.querySelector('.productName');
let fPrice = document.querySelector('.fPrice');
let rPrice = document.querySelector('.rPrice');
let aboutProduct = document.querySelector('.aboutProduct');

//Respective container for the product description and additionalInfo button
let productDescription = document.querySelector('.productDescription');
let additionalInfo = document.querySelector('.additionalInfo');

//  The Quantity input box
let quantityInput = document.querySelector('.quantity');

// Adding event listener to validate that it is only numbers that will be entered into the field
quantityInput.addEventListener('keydown', (e) => {
    if(e.key === 'e' || e.key === 'E'){
        e.preventDefault();
    }
})


// The Decrementor and the incrementor 
let incrementor = document.querySelector('.incrementor');
let decrementor = document.querySelector('.decrementor');
function addBtnOpacity() {
    if (quantityInput.value == 1) {
        decrementor.style.opacity = '0.8';
    }
}
addBtnOpacity()

incrementor.addEventListener('click', () => {
    let presentValue = parseInt(quantityInput.value);
    quantityInput.value = presentValue + 1;

    //Remove the opacity of the decrementor button
    decrementor.style.opacity = '1';
})

decrementor.addEventListener('click', () => {
    if((quantityInput.value > 1)) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
    addBtnOpacity();
})

// The updateShopPage function 
function updateShopPage(shoppingBasket) {
    tag.textContent = shoppingBasket.productTag;
    productImage.src = pathLocator(shoppingBasket.productImage, false);
    productName.textContent = shoppingBasket.productName;
    fPrice.textContent = shoppingBasket.fPrice;
    rPrice.textContent = shoppingBasket.rPrice;
    aboutProduct.textContent = shoppingBasket.aboutProduct;
    productDescription.textContent = shoppingBasket.description;
    additionalInfo.textContent = shoppingBasket.additionalInfo;
    quantityInput.value = shoppingBasket.qty;
    addBtnOpacity()
}

//Call the update function to update the shopSingle.html page
updateShopPage(shoppingBasket);


// Creating the add to cart functionality
const addToCartBtn = document.querySelector('.addToCart');

// Creating the eventListener for addToCartBtn

addToCartBtn.addEventListener('click', () => { 
    // Get the item to add to cart
    let item = localStorage.getItem('shoppingBasket');
    let itemObj = JSON.parse(item);
    


    // Check if cart is empty or if we already have our item in the cart
    if(localStorage.getItem('cart') == null) {
        // if the cart is empty, we will create a new cart Array, add our item to the array 
        // and then store the array in the localStorage
        // Create an array to store the items in the cart
        let cartArray = [];
        // I will check and update the no of items in the shoppingBasket before i save it
        itemObj.qty = parseInt(quantityInput.value);
        cartArray.push(itemObj);
        // Store the array in the localStorage
        localStorage.setItem('cart', JSON.stringify(cartArray));    
    } else {
        // if we have the item is in the array already, we wiil update the 
        // quantity of the item in our cart, if not we will add the item to the cart
        const cart = JSON.parse(localStorage.getItem('cart'));

        // Check if the item is in the cart
        const searchData = JSON.parse(localStorage.getItem('shoppingBasket')).productName;
        function finder(element) {
            return element.productName === searchData;
        }

        if(cart.find(finder)) {
            // if the item is in the cart, we will update the quantity of item in the cart
            // Get the index of the item in the cart
            let itemIndex = cart.findIndex((element, index) => element.productName === searchData)
            // Update the quantity of the item in the cart
            cart[itemIndex].qty = parseInt(cart[itemIndex].qty) + parseInt(quantityInput.value);
            // Store the updated cart in the localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            // I will check and update the no of items in the shoppingBasket before i save it
            itemObj.qty = parseInt(quantityInput.value);
            // if the item is not in the cart, we will add the item to the cart
            cart.push(itemObj);
            // Store the updated cart in the localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    } 

    // Update Counter function
    cartCount()
})





// The toggle for the product description and additionalInfo button
let descriptionBtn = document.querySelector('.descriptionBtn');
let addInfoBtn = document.querySelector('.addInfoBtn');


descriptionBtn.addEventListener('click', ()=> {
    // Display the productDescription element
    productDescription.style.display = 'block';
    //  Indicate the descriptionBtn by styling
    descriptionBtn.classList.add('p-3', 'bg-deepGreen', 'text-[#fff]', 'rounded-md')
    // Hide the additionalInfo element
    additionalInfo.style.display = 'none';
    // Unstyle the addInfoBtn
    addInfoBtn.classList.remove('p-3', 'bg-deepGreen', 'text-[#fff]', 'rounded-md');
})

addInfoBtn.addEventListener('click', ()=> {
    // Display the additionalInfo element
    additionalInfo.style.display = 'block';
    // Indicate the addInfoBtn by styling
    addInfoBtn.classList.add('p-3', 'bg-deepGreen', 'text-[#fff]', 'rounded-md')
    // Hide the productDescription element
    productDescription.style.display = 'none';
    // Unstyle the descriptionBtn
    descriptionBtn.classList.remove('p-3', 'bg-deepGreen', 'text-[#fff]', 'rounded-md');
})

//POPULATING THE RELATED SECTION 
let productItemContainer = document.querySelector('.productItemContainer');
// Variables
let products;
let undisplayedProducts
let displayedProducts = [];

async function populateRelatedSection() {
    try {
        let productData = await fetch('./../json/products.json');
        products = await productData.json();

        // let undisplayed products be equals to the content of products
        undisplayedProducts = [...products];

        loadProducts(undisplayedProducts , displayedProducts , 0 , 14, productItemContainer, false, true, loadMoreProductsBtn, false, updateShopPage,observeCatProducts,watchResizeObserver);
 
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

populateRelatedSection()

// The load more functionality in the products section of the homepage
//THE load more button functionality
let loadMoreProductsBtn = document.querySelector('.loadMoreProducts');
loadMoreProductsBtn.addEventListener('click', () => {


    // The loadMore button handles the display of product items to avoid inconsistencies and large whitespace 
  // depending on the width of the viewport.
  if(window.innerWidth >= 640 && window.innerWidth < 1024) {
    //if the buttton is clicked and the screen is about 640px and 1024 px i want to display all hidden produucts if there is any of those product that is hidden
    // then depending on the number of PRODUCT ITEMS displayed, it will no how many items to fetch back to fill empty spaces if there are emoty spaces 
    // and then if there are no empty spaces it will get three products.
    document.querySelectorAll('.product').forEach(child => child.style='flex');
    loadProducts(undisplayedProducts, displayedProducts,0 ,(3 - (productItemContainer.children.length % 3)), productItemContainer, false, true, loadMoreProductsBtn, false, updateShopPage,observeCatProducts,watchResizeObserver);
  }else{
    loadProducts(undisplayedProducts, displayedProducts,0 ,4, productItemContainer, false, true, loadMoreProductsBtn, false, updateShopPage,observeCatProducts,watchResizeObserver);
  }
    // loadProducts(undisplayedProducts, displayedProducts,0 ,4, productItemContainer, false, true, loadMoreProductsBtn, false, updateShopPage);

    //Continue the observer
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

// The intersection observer
// Adding the Intersection Observer to observe elements
let options = {
    root: null,
    rootMargin: "0px",
    threshold: [0 , 0.1, 0.25, 0.5, 0.75, 1.0],
};

// Create the observer that will check for entries
let observer = new IntersectionObserver(entries=> {
    // based on the entries found
    entries.forEach(entry => {
        // if the found entry target element contains product in its class 
        // then 
        if(entry.target.classList.contains('product')) {
            // we will check if it intersects before adding the class visibleProduct
            if(entry.isIntersecting && entry.intersectionRatio > 0.2) {
                entry.target.classList.add('visibleProduct');
            }
        }
    }
    )
}, options);


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
  