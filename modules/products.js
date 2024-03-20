import { onlineStatus } from "./onlineStatus.js";

const tracker = [];
let containers = [];
let hiddenElement;
// The initial data that will be loaded
function loadProducts(unUsedArray,usedArr,startNo,number,container, root, loadMoreBoolean, loadMoreProducts, redirectBoolean, updateShopPage,observerFun,watchResizeObserver) {
    // there are 4 parameters to take in
    // unUsedArray => products that have not been displayed 
    // usedArr => products that have been displayed
    // startNo => the number to start splicing from
    // number => the number of items to take
    // container => the container to append the templates created
    // root => the boolean tells us if we are in the root of the file or not(to prevent issues when getting our assets most importantly our image)
    // loadMoreBoolean => the boolean that will signal whether we want to use the loadMore functionality
    // loadMoreProducts => the loadMore button that will be displayed and hidden
    // redirectBoolean => the boolean which will indicate whether to redirect or not  
    // updateShopPage => the function that updates the page with an object that has been stored in the localStorage
    // observerFun => the function to register the observer for opacity depending on the ratio of the element shown on the viewport
    // watchObserverFun => the function that watches for any HOVER and LEAVE MOUSE CHANGES and takes action to improve aesthetics 

    // We are going to wrap the function in a conditional statement to check if the user is online or not
    if(onlineStatus) {
        // Adding container to the containers array if it has not been added yet(we are going to be using a flag.)
        if(!tracker.includes(container)) {
            containers.push({unUsedArray,usedArr,startNo,number,container, root, loadMoreBoolean, loadMoreProducts, redirectBoolean, updateShopPage,observerFun,watchResizeObserver});
            tracker.push(container)
        }

        if(unUsedArray.length !== 0) {
            // get the data with splice method
            let items = unUsedArray.splice(startNo, number);
            //create the templates for the loaded products   
            items.forEach(product => {
                let eachProduct =  productTemplate(product, root, redirectBoolean, updateShopPage, container);
                // append the created template
                container.appendChild(eachProduct);

                // push the products into the displayedProducts array
                usedArr.push(product);
            })
        } 
        if(unUsedArray.length === 0 && loadMoreBoolean)  {
            loadMoreProducts.remove()
        }
    }
}

// Adding a resize observer to the parent of the product element for display consistency issues
    // CONTAINER is the parent of the product element 

    const removeNoneStyling = (container) => {
        // This is a dependency of the resize event listener below
        // it is to display all the prodyucts that has been set to display:none
        Array.from(container.children).forEach(child => child.style.display = 'flex');
    }

window.addEventListener('resize', () => {
    containers.forEach(({unUsedArray,usedArr,startNo,number,container, root, loadMoreBoolean, loadMoreProducts, redirectBoolean, updateShopPage,observerFun,watchResizeObserver}) => {
        if(window.innerWidth >= 640 && window.innerWidth < 1024) {
            let noOfChildren = container.children.length;
            let element = noOfChildren % 3;

            for(let i = 0; i < element; i++) {
                container.children[noOfChildren-(i + 1)].style.display = 'none';    
            }

        } else if(window.innerWidth >= 1024) {
            // Display all hidden items
            removeNoneStyling(container)
            // if the products we have in the container is not up to multiples of 4, we fetch some more products to fill it and complete it to make it a multiple of 4
            if(container.children.length % 4 !== 0) {
                loadProducts(unUsedArray,usedArr,startNo,(4 - (container.children.length % 4)),container, root, loadMoreBoolean, loadMoreProducts, redirectBoolean, updateShopPage,observerFun,watchResizeObserver);
            }
            // Then we observe the new products we brought in to make sure they are all displayed properly
            observerFun()
            watchResizeObserver()
        }
    })
})


//The path locating function
function pathLocator(path, root) {
    let presentString = './';
    let moveOutString = '../';

    return root? presentString + path: moveOutString + path;
}
  
  
//the productTemplate function that creates the template of each product
function productTemplate(product, root, redirectBoolean, updateShopPage, container) {
    // Create an element under a variable called template
    let template = document.createElement('div');
    template.setAttribute('class', `group sm:explicitWidthSM product transitions brocolli bg-white shadow-sm shadow-[#f9f8f8] rounded-3xl p-5 sm:hover:w-[500px] z-[9] sm:hover:z-[10] flex flex-row widthTransition overflow-hidden sm:hover:shadow-2xl`);

    template.innerHTML = `
                    
                    <div class="productFirstElem w-full inline-flex flex-col transitions sm:group-hover:w-[170px] sm:pr-[10px]">
                        <!-- the tag -->
                        <div class="p-1 bg-[#274C5B] text-[#fff] w-min text-sm rounded-[4px]">
                            <h6>${product.productTag}</h6>
                        </div>

                        <!-- The image container -->
                        <div class="image w-auto flex justify-center items-center sm:group-hover:translate-y-5">
                            <img class="h-[170px] object-center object-scale-down aspect-square" src=${pathLocator(product.productImage, root)} alt="">
                        </div>

                        <!-- The text info about the product item -->
                        <div class="text-deepGreen2 dataCard opacity-100 translate-y-0 transitions sm:group-hover:-translate-y-2 sm:group-hover:opacity-0">
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
                        </div>

                        <button class="-translate-y-6 -mb-6 sm:translate-y-2 transitions opacity-0 sm:group-hover:opacity-100  sm:group-hover:z-[1015] bg-deepGreen p-1 rounded-md text-white text-sm">Go to Shop</button>
                    </div>
                    <!--The div element that will only get displayed is when the template is hovered on when the width of the viewport is greater than 640px-->
                    <div class="productSecondElem hidden opacity-0 sm:group-hover:flex sm:group-hover:items-end sm:group-hover:opacity-100 overflow-hidden transitions  sm:group-hover:z-[1005]">

                        <div class="text-deepGreen2 transitions h-[200px]">
                            <h5 class="font-bold text-xl">${product.productName}</h5>
                            <!--<hr class="bg-[#B8B8B8] mt-1 mb-1">-->
                            <div class="flex flex-row justify-between">
                                <div class="flex flex-row items-center gap-2">
                                    <h6 class="text-[13px] leading-none line-through text-[#B8B8B8] decoration-[#B8B8B8]">$<span>${product.fPrice}</span></h6>
                                    <h5 class="text-[15px] leading-none">$<span>${product.rPrice}</span></h5>
                                </div>

                                
                                <div class="flex flex-row text-[#FFA858] text-[11px] my-[10px]">
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                    <i class="fa-sharp fa-solid fa-star"></i>
                                </div>
                            </div>
                            <div class="rounded-lg p-5 bg-[#EBEBEB]">
                                <div class="clippedText">${product.aboutProduct}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--<div>hidden sm:group-hover:block</div>-->
                    <div class="startTransition imageAesthetics opacity-0 absolute sm:group-hover:opacity-50 sm:group-hover:-right-1/2 sm:group-hover:-translate-y-1/2 sm:group-hover:-z-[1]">
                        <img class="" src=${pathLocator(product.productImage, root)}>
                    </div>`

    // The event listener for the template
    template.addEventListener('click', ()=> {

        let data = JSON.stringify(product);
        // store data in localStorage
        localStorage.setItem('shoppingBasket', data);

        // Redirect function
        function redirect(boolean) {
            if(boolean) {
                //This will redirect to the home page and the page wuil automatically rerender all the assets it needs
                // by the scripts it already has.
                window.location = pathLocator('pages/shopSingle.html', root)
            } else {
                // This will scroll upwards
                window.scrollTo({
                    top: 0,
                    left: 0,
                    behavior: "smooth",
                })
            }
            
        }
        // if redirectBoolean is true we will redirect and push to shoppingBasket Object
        if(redirectBoolean) {
            // we will redirect to the shopSingle.html page
            redirect(true);
        } else {
            // we will update the page instantly by saving the new data and then 
            // run the REDIRECT function to scroll upward
            let retrieveShopBasket = localStorage.getItem('shoppingBasket');
            let shopObj = JSON.parse(retrieveShopBasket);

            //Call the update function to update the shopSingle.html page
            updateShopPage(shopObj);

            // Scroll to the top of the page so the user can see the item in the cart
            redirect(false);
        }
    })
    return template;
}

// The updateShopPage function 
function updateShopPage(shopObj) {
    tag.textContent = shopObj.productTag;
    productImage.src = pathLocator(shopObj.productImage, false);
    productName.textContent = shopObj.productName;
    fPrice.textContent = shopObj.fPrice;
    rPrice.textContent = shopObj.rPrice;
    aboutProduct.textContent = shopObj.aboutProduct;
    productDescription.textContent = shopObj.description;
    additionalInfo.textContent = shopObj.additionalInfo;
    quantityInput.value = shopObj.qty;

}




//   The export statement
export {loadProducts, productTemplate, pathLocator, updateShopPage}