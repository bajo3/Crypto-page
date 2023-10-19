// Función para mostrar u ocultar el menú de navegación en pantallas pequeñas
function toggleMenu() {
    var menu = document.getElementById('navMenu');
    if (menu.style.display === 'flex') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'flex';
    }
}

// Función para cerrar el menú cuando se hace clic en un enlace
function closeMenu() {
    var menu = document.getElementById('navMenu');
    menu.style.display = 'none';
}

window.onload = function() {
    // Ocultar el loader después de 0.5 segundos
    var loader = document.getElementById('loader');
    loader.style.opacity = '0';
    setTimeout(function() {
        loader.style.display = 'none';
    }, 500);

    // Mostrar el contenido principal
    var content = document.getElementsByTagName('main')[0];
    content.style.display = 'block';

    // Comprueba el tamaño de la pantalla al cargar la página
    function checkScreenSize() {
        if (window.innerWidth <= 768) {
            document.getElementById('hamburger').style.display = 'block';
            document.getElementById('navMenu').style.display = 'none';
        } else {
            document.getElementById('navMenu').style.display = 'flex';
            document.getElementById('hamburger').style.display = 'none';
        }
    }

    // Llama a la función para comprobar el tamaño de la pantalla al cargar y redimensionar
    window.onload = function() {
        checkScreenSize();
    };
    window.onresize = function() {
        checkScreenSize();
    };

    // Almacena los precios anteriores
    const previousPrices = {
        "bitcoin": 0,
        "ethereum": 0,
        "binancecoin": 0
    };

    // Función para obtener el precio de una criptomoneda en dólares (USD)
    function getCoinPrice(coinSymbol, displayElement) {
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinSymbol}&vs_currencies=usd`;

        $.ajax({
            url: url,
            method: "GET",
            headers: {
                'Content-Type': 'application.json',
            },
            success: function(data) {
                const currentPrice = data[coinSymbol].usd;
                const priceElement = $(displayElement);

                if (previousPrices[coinSymbol] < currentPrice) {
                    priceElement.css("color", "green"); // Precio subió, color verde
                } else if (previousPrices[coinSymbol] > currentPrice) {
                    priceElement.css("color", "red"); // Precio bajó, color rojo
                }

                priceElement.text(`$${currentPrice} USD`);
                previousPrices[coinSymbol] = currentPrice;
            },
            error: function() {
                $(displayElement).text("Error al obtener el precio.");
            }
        });
    }

    // Cuando la página se carga, obtener y mostrar los precios en dólares (USD)
    $(document).ready(function() {
        // Llama a la función para obtener el precio de Bitcoin en dólares (USD)
        getCoinPrice("bitcoin", "#btc-price");

        // Llama a la función para obtener el precio de Ethereum en dólares (USD)
        getCoinPrice("ethereum", "#eth-price");

        // Llama a la función para obtener el precio de Binance Coin en dólares (USD)
        getCoinPrice("binancecoin", "#bnb-price");
    });
};
