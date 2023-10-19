// Función para mostrar u ocultar el menú de navegación en pantallas pequeñas
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
        document.getElementById('navMenu').style.display = 'none';
    } else {
        document.getElementById('navMenu').style.display = 'flex';
        document.getElementById('hamburger').style.display = 'none';
    }
};

// Comprueba el tamaño de la pantalla al hacer zoom o redimensionar
window.onresize = function() {
    if (window.innerWidth <= 768) {
        document.getElementById('hamburger').style.display = 'block';
        document.getElementById('navMenu').style.display = 'none';
    } else {
        document.getElementById('navMenu').style.display = 'flex';
        document.getElementById('hamburger').style.display = 'none';
    }
};
const apiKey = 'CG-ppVMkBz4YJS9ckeA6L2qZsre';

// Almacena los precios anteriores
const previousPrices = {
    "bitcoin": 0,
    "ethereum": 0,
    "binancecoin": 0
};

// Función para obtener el precio de una criptomoneda
function getCoinPrice(coinSymbol, displayElement) {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinSymbol}&vs_currencies=usd`;
    
    $.ajax({
        url: url,
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
        success: function(data) {
            const currentPrice = data[coinSymbol].usd;
            const priceElement = $(displayElement);
            
            // Compara con el precio anterior
            if (previousPrices[coinSymbol] < currentPrice) {
                priceElement.css("color", "green"); // Precio subió (verde)
            } else if (previousPrices[coinSymbol] > currentPrice) {
                priceElement.css("color", "red"); // Precio bajó (rojo)
            } else {
                priceElement.css("color", "black"); // Precio sin cambios
            }
            
            // Almacena el precio actual como precio anterior
            previousPrices[coinSymbol] = currentPrice;
        },
        error: function() {
            $(displayElement).text("Error al obtener el precio.");
        }
    });
}

$(document).ready(function() {
    // Actualizar precios en tiempo real al cargar la página
    getCoinPrice("bitcoin", "#btc-price");
    getCoinPrice("ethereum", "#eth-price");
    getCoinPrice("binancecoin", "#bnb-price");

    // Actualizar precios cada 60 segundos (puedes ajustar el intervalo)
    setInterval(function() {
        getCoinPrice("bitcoin", "#btc-price");
        getCoinPrice("ethereum", "#eth-price");
        getCoinPrice("binancecoin", "#bnb-price");
    }, 60000); // Actualiza cada 60 segundos
});
