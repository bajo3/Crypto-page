const coin = document.querySelector('.coin');
const coinWidth = coin.clientWidth;
const coinHeight = coin.clientHeight;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const speedX = 2; // Velocidad horizontal
const speedY = 2; // Velocidad vertical

function toggleMenu() {
    var menu = document.getElementById('navMenu');
    if (menu.style.display === 'none') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
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
    } else {
        document.getElementById('navMenu').style.display = 'block';
        document.getElementById('hamburger').style.display = 'none';
    }
};

let positionX = 0;
let positionY = 0;
let directionX = 1;
let directionY = 1;

function moveCoin() {
    positionX += speedX * directionX;
    positionY += speedY * directionY;

    // Detectar colisión con los bordes horizontales
    if (positionX < 0 || positionX + coinWidth > screenWidth) {
        directionX *= -1; // Cambia la dirección en X
    }

    // Detectar colisión con los bordes verticales
    if (positionY < 0 || positionY + coinHeight > screenHeight) {
        directionY *= -1; // Cambia la dirección en Y
    }

    coin.style.left = positionX + 'px';
    coin.style.top = positionY + 'px';

    requestAnimationFrame(moveCoin);
}

moveCoin();


