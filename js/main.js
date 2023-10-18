function toggleMenu() {
    var menu = document.getElementById('navMenu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

// Comprueba el tamaño de la pantalla al cargar la página
window.onload = function() {
    if (window.innerWidth <= 768) {
        document.getElementById('hamburger').style.display = 'block';
    } else {
        document.getElementById('navMenu').style.display = 'flex';
    }
};

// Comprueba el tamaño de la pantalla al hacer zoom
window.onresize = function() {
    if (window.innerWidth <= 768) {
        document.getElementById('hamburger').style.display = 'block';
        document.getElementById('navMenu').style.display = 'none';
    } else {
        document.getElementById('navMenu').style.display = 'flex';
        document.getElementById('hamburger').style.display = 'none';
    }
};
