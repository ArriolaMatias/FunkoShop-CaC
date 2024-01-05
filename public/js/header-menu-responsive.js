document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navbarMenu = document.querySelector('.navbar__menu');
    const mainContent = document.querySelector('.main-container');
    const submenu = document.querySelector('.submenu');

    const item_which_has_submenu = document.querySelector('.width-submenu')

    hamburgerMenu.addEventListener('click', function () {
        navbarMenu.classList.toggle('show');

        if (navbarMenu.classList.contains('show')) {
            mainContent.style.marginTop = navbarMenu.offsetHeight - 67 + 'px'; //Corrigo bien el offset
        } else {
            mainContent.style.marginTop = 0;
        }
    });

    
    item_which_has_submenu.addEventListener('mouseover', function (event){

        if(window.getComputedStyle(submenu).getPropertyValue('display') === 'block' && window.innerWidth < 768){
            mainContent.style.marginTop = navbarMenu.offsetHeight - 67 + 'px';
        }
    })

    item_which_has_submenu.addEventListener('mouseleave', function (event){

        if(window.getComputedStyle(submenu).getPropertyValue('display') === 'none' && window.innerWidth < 768){
            mainContent.style.marginTop = 0;
            mainContent.style.marginTop = navbarMenu.offsetHeight - 67 + 'px';
        }
    })


    //Si el menu queda abierto, y se cambia el tamaño del navegador a una resolución mas grande, se ocupa de ocultarlo
    // y modificar los margenes

function handleMediaQueryChange(mediaQuery) {
    if (mediaQuery.matches) {
      navbarMenu.classList.remove('show');
      mainContent.style.marginTop = 0;
        }
    }
    
    // Obtener el objeto MediaQueryList para la media query
    var mediaQuery = window.matchMedia("(min-width: 768px)");
    
    // Añadir un listener para los cambios en la media query
    mediaQuery.addListener(handleMediaQueryChange);
    
    // Llamar a la función inicialmente para manejar el estado inicial
    handleMediaQueryChange(mediaQuery);
  
});