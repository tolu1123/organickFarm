
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


export {rtlElement, resizeRTL}