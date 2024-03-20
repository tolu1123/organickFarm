import { onlineStatus } from '../modules/onlineStatus.js';
import {hamburger, closeDropDown, handleOutsideClick} from './../modules/hamburger.js' 
import { updateCounter, cartCounter,cartCount} from "../modules/cartCounter.js";
import { pathLocator } from "../modules/products.js";
 
// Updating the cart counter
cartCount();

const cartData = document.querySelector('.cartData');
const defaultCounterCard = document.querySelector('.defaultCounterCard');
const defaultCartData = document.querySelector('.defaultCartData');
const cartDisplay = document.querySelector('.cartDisplay');



let root = false;
function displayCartData(outputElement) {
    outputElement.innerHTML = '';
    // Get the cart data from localStorage
    let cart = JSON.parse(localStorage.getItem('cart'));
    
    cart.forEach((item, index) => { 
        // create the template
        let template = document.createElement('div');
        template.setAttribute('class', 'w-full grid grid-cols-3 py-3');
        // Set the contents of the template
        template.innerHTML = `<div class="image col-span-1 flex items-center">
            <img src="${pathLocator(item.productImage, root)}" alt="" />
        </div>
        <div class="col-span-2 self-center">
            <div class="name font-bold text-lg md:pb-0.8">${item.productName}</div>
            <div class="productTag font-normal md:pb-0.6">
            ${item.productTag} <i class="fa-sharp fa-light fa-tags"></i>
            </div>
            <div class="ratings text-xs md:pb-0.6">
                <span class="text-[#FFA858] text-[11px]"
                    ><!-- The ratings -->
                    <i class="fa-sharp fa-solid fa-star"></i>
                    <i class="fa-sharp fa-solid fa-star"></i>
                    <i class="fa-sharp fa-solid fa-star"></i>
                    <i class="fa-sharp fa-solid fa-star"></i>
                    <i class="fa-sharp fa-solid fa-star"></i>
                </span>
                <span>(<b>${Math.trunc(Math.random() * 100000).toLocaleString()}</b> ratings)</span>
            </div>
            <div class="price font-medium md:pb-0.8">$${item.rPrice.toString().padEnd(item.rPrice.toString().length + 3, '.00')}</div>

            <!-- The Div element to display the remove item from cart btn the div to display the subtotal and the div to increment or decrement the no of the specific item to be bought -->
            <div class="flex items-end justify-between">
            <!-- The remove from cart btn -->
            <div class="removeFromCartBtn">
                <button
                class="group p-3 w-[35px] h-[35px] flex items-center justify-center transitions bg-deepGreen hover:bg-white border border-solid border-lightGreen text-[#fff] rounded-md font-semibold"
                >
                <span class="group-hover:text-deepGreen"
                    ><i class="fa-solid fa-trash-can"></i
                ></span>
                </button>
            </div>

            <!-- The meta div -->
            <div class=" ">
                <div class="flex flex-row items-end">
                <div class="">
                    <!-- the subtotal div -->
                    <div class="mb-4">
                    <h6 class="text-sm text-[#5CA581] font-bold">
                        Subtotal<i
                        class="fa-sharp fa-solid fa-colon text-xs"
                        ></i>
                    </h6>
                    <span class="text-[20px] font-bold"
                        >$<span class="subTotal"></span></span
                    >
                    </div>

                    <!-- The decrementor button, input element to dispaly the no of items and incrementor button-->
                    <div class="flex flex-row gap-x-1">
                    <button
                        class="bg-[#274C5B] w-[35px] h-[35px] text-white rounded-md py-1 px-2 decrementor"
                    >
                        -
                    </button>
                    <input
                        class="inline-block w-[35px] h-[35px] text-center border border-deepGreen border-solid rounded quantity"
                        type="number"
                        value="${item.qty}"
                        name=""
                        id=""
                    />
                    <button
                        class="bg-[#274C5B] w-[35px] h-[35px] text-white rounded-md py-1 px-2 incrementor"
                    >
                        +
                    </button>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>`;

        // Add event listeners to the removeFromCartBtn, decrementor and incrementor
        let removeFromCartBtn = template.querySelector('.removeFromCartBtn button');
        removeFromCartBtn.addEventListener('click', () => {
            removeFromCart();
        })
        function removeFromCart() { 
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            // Clear the contents of the template
            outputElement.innerHTML = '';
            // Update the cart state
            cartState();
            // update the cart counter
            cartCount();
            pos();
        }

        const decrementor = template.querySelector('.decrementor');
        const incrementor = template.querySelector('.incrementor');
        const quantityInput = template.querySelector('.quantity[type="number"]');
        const subTotal = template.querySelector('.subTotal');
        //Function to calulate the subTotal of the item
        function calculateSubTotal() {
            const subTotalAmount = (item.qty * item.rPrice).toString()
            return subTotalAmount.padEnd(subTotalAmount.length + 3, '.00');
        }
        subTotal.textContent = calculateSubTotal();

        //The event listeners for the decrementor
        decrementor.addEventListener('click', () => {
            if (item.qty > 1) {
                item.qty--;
                quantityInput.value = item.qty;
                // Recalaclate the subTotal
                subTotal.textContent = calculateSubTotal();
                localStorage.setItem('cart', JSON.stringify(cart));
                //update the cart counter
                cartCount();
                pos();
            } else {
                removeFromCart();
            }
        })

        // The event listener for the incrementor
        incrementor.addEventListener('click', () => {
            item.qty++;
            quantityInput.value = item.qty;
            // Recalaclate the subTotal
            subTotal.textContent = calculateSubTotal();
            localStorage.setItem('cart', JSON.stringify(cart));
            //update the cart counter
            cartCount();
            pos();
        });

        //The quantity input event listener
        quantityInput.addEventListener('input', () => {
            if (quantityInput.value < 1) {
                removeFromCart();
            } else {
                item.qty = parseInt(quantityInput.value);
                // Recalaclate the subTotal
                subTotal.textContent = calculateSubTotal();
                localStorage.setItem('cart', JSON.stringify(cart));
                //update the cart counter
                cartCount();
                pos();
            }
        }) 
        // Append the created template into the outputElement
        outputElement.appendChild(template);
    })
}

//IF OUR STORAGE DOES NOT CONTAIN ANY ITEM, WE WILL UPDATE THE VIEW OF OUR PAGE
function cartState() {
    if (localStorage.getItem('cart') === null || localStorage.getItem('cart') === '[]') {
        // Hide the cart
        cartData.classList.add('hidden')

        // Display the default counter card
        defaultCounterCard.classList.remove('hidden');

        // Show the empty cart
        defaultCartData.style.display = 'block';
    } else {
        // Show the cart
        cartData.classList.remove('hidden');

        // Hide the default counter card
        defaultCounterCard.classList.add('hidden');

        // Hide the empty cart
        defaultCartData.classList.add('hidden');

        //display the cart data
        displayCartData(cartDisplay);
    }
}
cartState();
window.addEventListener('storage', cartState)

// OUR POS MACHINE
let posMachineValue

function pos() {
    posMachineValue = JSON.parse(localStorage.getItem('cart')) !== null || JSON.parse(localStorage.getItem('cart')).length > 0 ? JSON.parse(localStorage.getItem('cart')).reduce((accumulator, currentElement) => {
        return accumulator + (currentElement.qty * currentElement.rPrice);
    }, 0): 0;
    // set or update the pos value
    document.querySelector('.totalAmount').textContent = posMachineValue.toString().padEnd(posMachineValue.toString().length + 3, '.00');
}
pos();