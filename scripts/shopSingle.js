//   The import statement
import {loadProducts, productTemplate, pathLocator} from "./../modules/products.js"

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


// initialize the page
// we will update the page instantly
let cartString = localStorage.getItem('singleCart');
let cartObj = JSON.parse(cartString);


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

// The updateShopPage function 
function updateShopPage(cartObj) {
    tag.textContent = cartObj.productTag;
    productImage.src = pathLocator(cartObj.productImage, false);
    productName.textContent = cartObj.productName;
    fPrice.textContent = cartObj.fPrice;
    rPrice.textContent = cartObj.rPrice;
    aboutProduct.textContent = cartObj.aboutProduct;
    productDescription.textContent = cartObj.description;
    additionalInfo.textContent = cartObj.additionalInfo;
    quantityInput.value = cartObj.qty;
}

//Call the update function to update the shopSingle.html page
updateShopPage(cartObj);

// The Decrementor and the incrementor 
let incrementor = document.querySelector('.incrementor');
let decrementor = document.querySelector('.decrementor');

incrementor.addEventListener('click', () => {
    let presentValue = parseInt(quantityInput.value);
    quantityInput.value = presentValue + 1;
})

decrementor.addEventListener('click', () => {
    if(!(quantityInput.value <= 1)) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
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
        console.log(undisplayedProducts);

        loadProducts(undisplayedProducts , displayedProducts , 0 , 14, productItemContainer, false, true, loadMoreProductsBtn, false, updateShopPage);
 
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
    loadProducts(undisplayedProducts, displayedProducts,0 ,4, productItemContainer, false, true, loadMoreProductsBtn, false, updateShopPage);

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
  