// We are going to check our online status before we make requests
export let onlineStatus;

let errorMessage = document.querySelector('.connectionError');

if (window.navigator.onLine){
    onlineStatus = true;
} else {
    onlineStatus = false;
    if(errorMessage?.classList.contains('hidden')) {
        errorMessage?.classList.remove('hidden');
        errorMessage?.classList.add('z-[1500]')
    }
    applyTransError(errorMessage);
}

window.addEventListener("offline", (e) => {
    onlineStatus = false;
    if(errorMessage?.classList.contains('hidden')) {
        errorMessage?.classList.remove('hidden');
        errorMessage?.classList.add('z-[1500]')
    }
    applyTransError(errorMessage);
});
  

window.addEventListener("online", (e) => {
    onlineStatus = true;
    // We will remove the error message
    errorMessage?.classList.add('hidden');
});

let errorMessageClose = document.querySelector('.connectionError .closeBtn');
errorMessageClose?.addEventListener('click', () => {
    errorMessage?.classList.add('hidden');
})

function applyTransError(errorMessage) {

    // function to apply transition the error message
    setTimeout(() => {

        setTimeout(() => {
            // Add an opacity to feature a fading effect
            errorMessage?.classList.add('opacity');
        }, 2000);

        // Add the hidden class to the error message after 8 seconds
        errorMessage?.classList.add('hidden');
        // Remove the opacity class from the error message
        errorMessage?.classList.remove('opacity');
        // Remove the z-index
        errorMessage?.classList.remove('z-[1500]')
    }, 8000);
}

