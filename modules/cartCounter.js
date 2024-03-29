// Counter to count all our cart objects
// Function to render our view of the counter
function cartCount() {
    const cartElement = document.querySelectorAll('.cartCounter');
    cartElement.forEach(ele => updateCounter(ele));
}

// Function to count all our items at run time
function updateCounter(cartElement) {
    // Initialize the cartCounter
    cartCounter(cartElement);
}

// Function to update the cart counter
function cartCounter(cartElement) {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if(cart?.length > 0) {
        cartElement.classList.contains('hidden')? cartElement.classList.remove('hidden'): null;
    } else {
        cartElement.classList.contains('sm')? null :cartElement.classList.add('hidden');
    }
    let noOfItems = cart === null || cart.length < 0 ? 0 : cart.reduce((acc, currentElement) => {
        return parseInt(acc + currentElement.qty);
    }, 0);
    cartElement.textContent = noOfItems;
}
window.addEventListener('storage', ()=> {
    cartCount()
})

export {updateCounter, cartCounter, cartCount}