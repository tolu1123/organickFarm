// Getting width and x-coordinate values of some specific template element(Not all of them)
// NOTE!!!- When i say template elements, i mean they are elements with the class .product 
let templateWidth;
let innerTemplateWidth;
let productElemXCoordSm2;
let productElemXCoordSm3;
let productElemXCoordLg3;
let productElemXCoordLg4;

// Get the width of the parent element of the element which has the product class set on it
let productParentWidth;


//detect the width of the productParentWidth
function productContainerWidth() {
  productParentWidth = document.querySelector('.productItemContainer').getBoundingClientRect().width;
}
productContainerWidth()

// Find the x coordinate when the viewport size is in tailwind breakpoint SM
function productXCoordSm() {
  if(window.innerWidth >= 640 && window.innerWidth < 1024) {
    productElemXCoordSm2 = document.querySelector('.product:nth-child(2)').offsetLeft;
    productElemXCoordSm3 = document.querySelector('.product:nth-child(3)').offsetLeft;

  }
}

// Find the x coordinate when the viewport size is in tailwind breakpoint SM
function productXCoordLg() {
  if(window.innerWidth >= 1024) {
    productElemXCoordLg3 = document.querySelector('.product:nth-child(3)').offsetLeft;
    productElemXCoordLg4 = document.querySelector('.product:nth-child(4)').offsetLeft;
  }
}

// The function to set the template width
function setTemplateWidth() {
  templateWidth = document.querySelector('.product').getBoundingClientRect().width;
}

// The function to set inner template width
function setInnerTemplateWidth () {
  innerTemplateWidth = document.querySelector('.product').getBoundingClientRect().width - 40;
}
 
// When we resize the window we will check our viewport dependent variables and keep resizing it
window.addEventListener('resize', () => {
  // These functions are all changing variables when the viewport is resized
  setTemplateWidth()
  productXCoordSm()
  productContainerWidth()
  productXCoordLg()
  setInnerTemplateWidth()
});

// Create a resize observer that checks for the width of an element
const resizeObserver = new ResizeObserver(entries => {
  entries.forEach(entry => {
    const {contentRect, target} = entry;
    // get index of the element in the parentElement
    let targetIndex = Array.from(target.parentNode.children).indexOf(target);
    
    // if we are in the tailwind breakpoint MD that is to say in this particular project, sm is saying a min-width greater than 640px but less than 1024px
    if(window.innerWidth >= 768 && window.innerWidth < 1024) {
      //This is our way of detecting the 2nd and 3rd element when we are in breakpoint SM
      let no2Element = (targetIndex + 1) % 3 === 2;
      let no3Element = (targetIndex + 1) % 3 === 0;

      if(window.innerWidth >= 640 && window.innerWidth < 1024 && no2Element && target.classList.contains('hover')) {
        let rightPush = 768 - (productParentWidth - productElemXCoordSm2);
        target.style.transform = `translateX(-${rightPush}px)`;
      }

      if (window.innerWidth >= 768 && window.innerWidth < 1024 && no3Element && target.classList.contains('hover')) {
        let rightPush = 768 - templateWidth;
        target.style.transform = `translateX(-${rightPush}px)`
      }
    }

    // if we are in the tailwind breakpoint LG that is to say in this particular project, LG is saying a min-width greater than 1024px
    if (window.innerWidth >= 1024) {
      // We only need to observe the third and fourth element on each grid and apply our translateX property
      let no3Element = (targetIndex + 1) % 4 === 3;
      let no4Elememnt = (targetIndex + 1) % 4 === 0;

      if(no3Element && target.classList.contains('hover')) {
        let rightPush = 500 - (productParentWidth - productElemXCoordLg3);
        target.style.transform = `translateX(-${rightPush}px)`;
      }

      if(no4Elememnt && target.classList.contains('hover')) {
        let rightPush = 500 - templateWidth;
        target.style.transform = `translateX(-${rightPush}px)`;
      }
    }

    //Find the template Element
    if(target.classList.contains('productSecondElem', 'hovered')) {

    } 
      
  })
})

function watchResizeObserver() {
  if (window.innerWidth > 640) {
    let allProductsElem = document.querySelectorAll('.product');
    allProductsElem.forEach((product, index) => {
      product.style.zIndex = 999 - index;
      resizeObserver.observe(product);
      product.addEventListener('mouseenter', () => {
        if(window.innerWidth > 639) {
          product.classList.add('hover');


          console.log("hovered upon")


          product.style.zIndex = '999';

          //Clear the width of the template's first child on THE EVENT "mouseenter"
          product.children[0].style.width = '';

          // Set the width of the template's second child also on the EVENT "mouseenter"
          product.children[1].style.width = '280px';
          product.children[1].classList.remove('hidden');

          // Set the width of the template's third child
          product.children[2].style.width = '500px'
 
          setTimeout(() => {
            product.children[0].children[2].style.display = 'none';
            product.children[0].children[3].style.display = 'block';
          }, 100)
        }
      })
      product.addEventListener('mouseleave', () => {
        if(window.innerWidth > 639) {
          product.classList.remove('hover');
          product.style.transform = '';
          product.style.zIndex = `${999 - index}`;

          //Set the width of the template's first child on THE EVENT MOUSE LEAVE
          product.children[0].style.width = `${innerTemplateWidth}px`;

          product.children[1].style.width = '0';
          product.children[2].style.width = '0';

          // document.querySelectorAll('.product .dataCard').forEach(ele => ele.style.display = '');
          document.querySelectorAll('.product button').forEach(ele => ele.style.display = 'none');


  
          setTimeout(() => {
            product.children[2].classList.remove('startTransition');
          }, 175);

          setTimeout(() => {
            product.children[2].classList.add('startTransition');
          },300);
       }
      })
    })
  }
}

window.addEventListener('resize', () => {

  if (window.innerWidth < 640) {
    let productTemplate = document.querySelectorAll('.product > div:first-child');

    productTemplate.forEach(item => {
      item.style.width = '100%';
    })
  } else {
    // Observe the resizing of the element
    watchResizeObserver()

    let templatesFirstChild = document.querySelectorAll('.productFirstElem');
    templatesFirstChild.forEach(eachChild => {
      eachChild.style.width = `${innerTemplateWidth}px`;
    })

    // Get all the .productSecondElem
    let templateSecondChild = document.querySelectorAll('.productSecondElem')
    templateSecondChild.forEach(eachChild => {
      eachChild.style.width = '0px';
    })
  }
});
