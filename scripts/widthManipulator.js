// Please we are doing a little trick with this document
// We just want to explicitly set a width property of an element so we will be able to make transitions applied on it to work

// We will be getting width of one out of a lot of elements which is product
let productElementHeight;

function getProductElementHeight() {
    productElementHeight = document.querySelector('.product').getBoundingClientRect().height;
}

getProductElementHeight()

window.addEventListener('resize', () => {
    getProductElementHeight()
})

function setWidthExplicitly() {
    let allProductElement = document.querySelectorAll('.product');

    // Loop through all the productElement
    allProductElement.forEach(productElement => {
        let right = productElement.getBoundingClientRect().right;
        let top = productElement.getBoundingClientRect().top;

        productElement.style.left = right;
        productElement.style.top = top;
    })
}

setWidthExplicitly();

// Please we are doing a little trick with this document
// We just want to explicitly set  of an element the x and y coordinates so we will be able to make transitions applied on it to work

 
function setCoordExplicitly() {
    let allProductElement = document.querySelectorAll('.product');

    // Loop through all the productElement
    allProductElement.forEach(productElement => {
        let right = productElement.getBoundingClientRect().right;
        let top = productElement.getBoundingClientRect().top;

        productElement.style.left = right;
        productElement.style.top = top;
    })
}

setCoordExplicitly();

window.addEventListener('click', () => {
    setCoordExplicitly()
})