let form = document.querySelector('form');
let label = document.querySelector('label');
let detailsInput = document.querySelector('#details');
let invalidEmail = document.querySelector('.invalidEmail');
let correctSuggestion = document.querySelector('.correctSuggestion')
const correctSuggParent = document.querySelector('.correctSuggParent');

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

form.addEventListener('submit', (e) => {    
    e.preventDefault();

    if(detailsInput.value !== '') {
        displayError();
    }
})

// Display our error message
let errorMessage = document.querySelector('.errorMessage');
function displayError() {
    if(errorMessage.classList.contains('hidden')) {
        errorMessage.classList.remove('hidden');
    }
    setTimeout(() => {

        setTimeout(() => {
            // Add an opacity to feature a fading effect
            errorMessage.classList.add('opacity');
        }, 9200);

        // Add the hidden class to the error message after 8 seconds
        errorMessage.classList.add('hidden');
        // Remove the opacity class from the error message
        errorMessage.classList.remove('opacity');
    }, 10000);
}

// Creating a function that checks the first two character of the inputs
// so as to detect whether the user is trying to input a number or an email
// and then change the type of the input accordingly
function checkInput() {
    let inputValue = detailsInput.value;
    let firstTwoCharacters = inputValue.slice(0, 2);
    removeVisuals();

    if((firstTwoCharacters[0] === '+' && !isNaN(firstTwoCharacters[1])) || !isNaN(firstTwoCharacters) ) {
        detailsInput.setAttribute('type', 'tel');
    } else {
        throttle(checkEmailValidity, 1200);
    }
}
detailsInput.addEventListener('input', checkInput);


// Function to check what has been entered is valid and actually exists 
function checkEmailValidity() {

    let api = 'https://emailvalidation.abstractapi.com/v1/?api_key=dca45c65b6434f1fa23a7dd8fdda4af6&email=';

    //Trim the input values
    let inputValue = detailsInput.value.trim();
    
    let url = api + inputValue;
    let options = {method: 'GET'};

    async function checkEmail() {
        try {
            let response = await fetch(url, options);
            // check the status of the response
            if(response.status !== 200) {
                throw new Error('The response status is not 200');
            }
            let result = await response.json();
            console.log(result);
            if(result.is_valid_format.value === true && result.is_smtp_valid.value === true) {
                removeVisuals();
                // the email is correct, hence we can proceed
                displayError();

            }else if(result.autocorrect !== '') {
                // The email may not exist but has a similar value 
                correctSuggestion.textContent = `${result.autocorrect}`;
                correctSuggParent.classlist.remove('hidden');
            } else if (result.is_smtp_valid.value === false) {
                // if the smtp check fails-Meaning the email does not exist
                invalidEmail.classList.remove('hidden');
                // Add the border-errorRed class to the input
                detailsInput.classList.add('border-errorRed');
                // Add the text errorRed class to the label
                label.classList.add('peer-focus:text-errorRed', 'peer-valid:text-errorRed');
                // Add the focus stylings and remove the lightGreen focus styling
                detailsInput.classList.add('focus:outline-errorRed');
                detailsInput.classList.remove('focus:outline-lightGreen');

            }
        } catch (error) {
            console.log('Error:', error);
        }
    }
    checkEmail();
}

// Function to remove the unneeded visuals
function removeVisuals() {
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
}

// Function to check if the number provided is valid and exists
async function checkPhoneNo() {
    try {
        
    } catch (error) {
        
    }
}


//Let us fetch the countries and their codes and their flags
async function fetchCountries() {
    try {
        let countryAndDetailsJson = await fetch("./../json/countries.json");
        let countryAndDetails = await countryAndDetailsJson.json();
        document.querySelector('.flag').innerHTML = `<img
        src="https://flagcdn.com/16x12/${countryAndDetails[0].flag}.png"
        srcset="https://flagcdn.com/32x24/ua.png 2x,
          https://flagcdn.com/48x36/ua.png 3x"
        width="16"
        height="12"
        alt="${countryAndDetails[0].code}">`;

        countryAndDetails.forEach(country => {
            let option = document.createElement('option');
            option.value = country.code;
            option.textContent = country.name;
            document.querySelector('#country').appendChild(option);
        })
    } catch (error) {
        throw new Error(error);
    }
}
fetchCountries();   