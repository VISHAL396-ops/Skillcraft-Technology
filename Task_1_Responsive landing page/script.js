// JavaScript to handle the scroll effect
window.addEventListener('scroll', function() {
    // Get the navigation bar element
    const navbar = document.getElementById('main-nav');
    
    // Check the vertical scroll position.
    // window.scrollY > 50 means the user has scrolled more thann 50 pixels from the top.
    if (window.scrollY > 50) {
        // If scrolled add the 'scrolled' class
        navbar.classList.add('scrolled');
    } else {
        // If at the top, remove the 'scrolled' class
        navbar.classList.remove('scrolled');
    }
});