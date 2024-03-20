import { onlineStatus } from "../modules/onlineStatus.js";

const form = document.querySelector('form');
//The inputContainer contains the input and the label
const inputContainer = document.querySelector('.inputContainer');
const label = document.querySelector('label');
//We hold the label in a reference incase of the label being removed
let labelHolder;
// the tel-input plugin 
let phoneInput;
//The presentValue that will be stored when initializing the tel-input
let presentVal
// the option for the tel-input plugin
let option;
// the dropdown for dynamic styling
let dropDown;
let telFlag = false;
// the ipAddress
let ipAddress
function getIp(callback) {
    if(onlineStatus){
        const token = '20e1289ef3b902';
        fetch(`https://ipinfo.io/json?token=${token}`, { headers: { 'Accept': 'application/json' }})
        .then((resp) => resp.json())
        .catch(() => {
            return {
            country: 'us',
            };
        })
        .then((resp) => {
            localStorage.setItem('country',resp.country)
        });
    }
}
getIp()

const detailsInput = document.querySelector('#details');
const invalidEmail = document.querySelector('.invalidEmail');
const correctSuggestion = document.querySelector('.correctSuggestion')
const correctSuggParent = document.querySelector('.correctSuggParent');
const phoneError = document.querySelector(".invalidPhoneError");

// Preload the intl-Tel-Input utils.js file
const preloadLink = document.createElement("link");
preloadLink.href = "../scripts/utils.js";
preloadLink.rel = "preload";
preloadLink.as = "script";
document.head.appendChild(preloadLink);


// Throttle function
let throttleFlag;
function throttle(callback, delay) {
    // If the throttleFlag is true, then the function will not run
    // inotherwords we are tryying to prevent the function from running
    // if it has been set to the run in a record time
    if(throttleFlag) return;
    // Set the throttleFlag to true
    throttleFlag = true;
    // create the setTimeout function to call the callback function and then set the throttleFlag to false
    setTimeout(() => {
        callback();
        throttleFlag = false;
    }, delay);
}


// Display our error message
let errorMessage = document.querySelector('.errorMessage');
function applyTransError(errorMessage) {

    // function to apply transition the error message
    setTimeout(() => {

        setTimeout(() => {
            // Add an opacity to feature a fading effect
            errorMessage.classList.add('opacity');
        }, 9200);

        // Add the hidden class to the error message after 8 seconds
        errorMessage.classList.add('hidden');
        // Remove the opacity class from the error message
        errorMessage.classList.remove('opacity');
        errorMessage.classList.remove('z-10')
    }, 2000);
}
function displayFalseError(errorMessage) {
    if(errorMessage.classList.contains('hidden')) {
        errorMessage.classList.remove('hidden');
        errorMessage.classList.add('z-10')
    }
    applyTransError(errorMessage);
}




// Function to initialize the tel-input plugin
async function initTelPlugin() {
    
    const datum = 'MN1T2UYNP8GHVBM1638SF7AH'

    // We are going to use the preloaded scripts
    if(!(document.querySelector('#preloadedScript'))){
        const preloadedScript = document.createElement("script");
        preloadedScript.setAttribute('id', 'preloadedScript')
        preloadedScript.src = "../scripts/utils.js";
        document.body.appendChild(preloadedScript);
    }

    option = {
        initialCountry: "us",
        utilsScript:
        "../scripts/utils.js",
        preferredCountries: ['us', 'ng', 'uk'],
        formatAsYouType: true,
        containerClass: 'dropDownContainer',
    }

    const phoneInputField = document.querySelector("#details");
    // we initialize the phoneInput plugin
    phoneInput = window.intlTelInput(phoneInputField, option);
    // We are setting the value of the input to the present value after the plugin has been initialized
    await phoneInput.promise.then(() => {
        phoneInput.setNumber(presentVal + detailsInput.value);
        detailsInput.focus();
        telFlag = true;
        localStorage.getItem('country') ? phoneInput.setCountry(localStorage.getItem('country')):null;
        focusedDropDown()
    })
    const phoneError = document.querySelector(".invalidPhoneError");

    let process = () => {
        phoneError.classList.add('hidden')

        if (phoneInput.isValidNumber(true)) {
        displayFalseError(errorMessage)
        } else {
            phoneError.classList.remove('hidden');
            errorDropDown()
        }

    }
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        if(telFlag) {
            process()
        }
    })

}
function focusedDropDown() {
    //The function that add styles to the dropDown when the input is focused
    if(telFlag) {
        refreshDisplay()
        dropDown = document.querySelector('.dropDownContainer > div');
        dropDown.classList.remove('border-right-n');
        dropDown.classList.add('border-right-t', 'border-solid', 'z-10', 'border-lightGreen');
    }
}
function bluredDropDown() {
    //The function that add styles to the dropdown of the tel-input when the input is blurred
    if(telFlag) {
        dropDown.classList.remove('border-lightGreen', 'border-right-t');
        dropDown.classList.add('border-right-n');
    }
}
function errorDropDown() {
    // the function that adds styles based on when there is an error with the inputed value
    if(telFlag) {
        dropDown.classList.remove('border-lightGreen', 'border-right-t');
        dropDown.classList.add('border-right-n', 'border-errorRed');
        invalidInput()
    }

}
function removeErrorDropDown() {
    // function to remove dropdown error
    if(telFlag && dropDown?.classList.contains('border-errorRed')) {
        dropDown?.classList.remove('border-errorRed');
    }
}
detailsInput.addEventListener('focus', () => {
    focusedDropDown()
})
detailsInput.addEventListener('blur', () => {  
    // once the input is blured, we will add styling for the dropdown's margin
    // to express an unfocused input
    bluredDropDown()
})
detailsInput.addEventListener("countrychange", function() {
    // We remove the error styling for the dropdown margins
    removeErrorDropDown()
    focusedDropDown()
    // We are going to remove all sort of error and messages
    // And present a fresh display
    refreshDisplay()
});
// Creating a function that checks the first two character of the inputs
// so as to detect whether the user is trying to input a number or an email
// and then change the type of the input accordingly
function checkInput() {
    let inputValue = detailsInput.value;
    // We are going to refresh our display
    refreshDisplay();
    // Our regex for matching our phone number before validation
    let regex = /[^-()\s\x\d]/g;

    // Check if all the inputValue starting from the first character matches our regex pattern
    // AND
    // We check if the inputValue has a length greater than 5 
    // AND
    // We finally check if either
    // the first character is a plus sign and the rest of the inputValue matches the regex pattern
        //   OR
        // the whole inputValue matches the whole regex pattern
    if(!(regex.test(inputValue.slice(1))) && inputValue.length > 5 &&  ((inputValue[0] === '+' && !(regex.test(inputValue.slice(1)))) || !(regex.test(inputValue)))) {
        focusedDropDown()
        if(inputContainer.contains(label)) {
            // reset the input to type of telephone
            detailsInput.setAttribute('type', 'tel');
            // hold the presentValue of the input before we initialize our plugin
            presentVal = inputValue;
            // Set the value of the input to the present value
            detailsInput.value = '';
            // remove the label to prevent display issues
            labelHolder = inputContainer.removeChild(label);

            // Reinitialize the intlTelInput plugin
            initTelPlugin();
        }

    } else if(isNaN(Number(detailsInput.value))) {
        // We set the telflag to false to signify that the input is not a telephone number
        // and sections of the code will be notified of changes
        telFlag = false;
        
        // Add the label if it does not exist
        if(!inputContainer.contains(label)) {
            // Append the label to the container
            inputContainer.appendChild(labelHolder);
            // We are going to remove the margin applied to the dropdown
            dropDown.classList.remove('border-right-t', 'border-solid', 'z-10', 'border-lightGreen');
            // We are going to remove the formatting before destroying the instance of the plugin
            option.formatAsYouType = false;
            //The intl-tel-input instance will be destroyed
            phoneInput.destroy();
            phoneInput = '';
            // Remove the placeholder on the details-input
            detailsInput.setAttribute('placeholder', '');
            // We are focus on the input to allow the user to continue typing
            detailsInput.focus();
        }

        // We are going to throttle the checkEmailValidity function to prevent it from running too many times
        // But only after we are sure that the length of the input is longer than 6
        if(inputValue.length > 6) throttle(checkEmailValidity, 1200);
        form.addEventListener('submit', (e)=> {
            e.preventDefault()
            if(telFlag === false) {
                checkEmailValidity()
            }
        })
    }

    // We are going to reset the input to text if the input is empty
    // and we are going to append the label to the inputContainer if it has been removed
    if(inputValue === '') {
        detailsInput.setAttribute('type', 'text');
        // Add the label if it does not exist
        if(!inputContainer.contains(label)) {
            // Append the label to the container
            inputContainer.appendChild(labelHolder);
            //The intl-tel-input instance will be destroyed
            phoneInput.destroy();
            phoneInput = '';
            // Remove the placeholder on the details-input
            detailsInput.setAttribute('placeholder', '');
            // We are focus on the input to allow the user to continue typing
            detailsInput.focus();
        }
    }
    
}
detailsInput.addEventListener('input', checkInput);

let abstractKey = 'dca45c65b6434f1fa23a7dd8fdda4af6';
let secondKey = '764379c565894cee8207ed6f1a64117e'
// Function to check what has been entered is valid and actually exists 
function checkEmailValidity() {

    let api = `https://emailvalidation.abstractapi.com/v1/?api_key=${abstractKey}&email=`;

    //Trim the input values
    let inputValue = detailsInput.value.trim();
    
    let url = api + inputValue;
    let options = {method: 'GET'};

    async function checkEmail() {
        try {
            let response = await fetch(url, options);
            // check the status of the response
            if(response.status === 422) {
                // if i have consumed my credits
                // i will switch keys
                // and then try again!
                abstractKey = secondKey;
                checkEmail()
            } else if(response.status !== 200) {
                throw new Error('The response status is not 200');
            }
            let result = await response.json();
            if(result.is_valid_format.value === true && result.is_smtp_valid.value === true) {
                refreshDisplay();
                // the email is correct, hence we can proceed
                displayFalseError(errorMessage);

            }else if(result.autocorrect !== '') {
                // The email may not exist but has a similar value 
                correctSuggestion.textContent = `${result.autocorrect}`;
                correctSuggParent.classlist.remove('hidden');
            } else if (result.is_smtp_valid.value === false) {
                // if the smtp check fails-Meaning the email does not exist
                invalidEmail.classList.remove('hidden');
                // The function to dynamic style the input on an error
                invalidInput()
                // Add the text errorRed class to the label
                label.classList.add('peer-focus:text-errorRed', 'peer-valid:text-errorRed');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    }
    checkEmail();
}

// The error dynamic styling for invalidInput
function invalidInput() {
    // Add the border-errorRed class to the input
    detailsInput.classList.add('border-errorRed');
    // Add the focus stylings and remove the lightGreen focus styling
    detailsInput.classList.add('focus:outline-errorRed');
    detailsInput.classList.remove('focus:outline-lightGreen');
}

// Function to remove the unneeded visuals
function refreshDisplay() {
    correctSuggestion.textContent = '';
    correctSuggParent.classList.add('hidden');
    invalidEmail.classList.add('hidden');
    // Remove the text errorRed class from the label
    label.classList.remove('peer-focus:text-errorRed', 'peer-valid:text-errorRed');
    // Remove the border-errorRed class from the input
    detailsInput.classList.remove('border-errorRed');
    // Remove the focus stylings and add the lightGreen focus styling
    detailsInput.classList.remove('focus:outline-errorRed');
    detailsInput.classList.add('focus:outline-lightGreen');
    // The phoneError will be hidden
    phoneError.classList.add('hidden');
    //Remove the error that will be shown on the dropdown
    removeErrorDropDown()
}