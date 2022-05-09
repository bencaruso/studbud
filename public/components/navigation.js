const navSlide = () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const nav = document.querySelector('.nav__links');
    

    const navLinks = document.querySelectorAll('.nav__links li');
    
    // Toggle nav
    burgerMenu.addEventListener('click', () => {
        nav.classList.toggle('nav-active');

        // Animate nav links
        navLinks.forEach((link, index) => {
            if(link.style.animation) {
                link.style.animation = ''
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger animation
        burgerMenu.classList.toggle('toggleBurgerMenu');

    }); 

}

navSlide();