
// Variables globales para almacenar las coordenadas
let latitud;
let longitud;

// API Key de OpenWeatherMap
const API_KEY = "b11e74a79b328324f584389f9d8401ad";

$(document).ready(function () {

    // Obtener la ubicación del navegador
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function (posicion) {

                // Guardar las coordenadas obtenidas
                latitud = posicion.coords.latitude;
                longitud = posicion.coords.longitude;

                
                $("#tblw").trigger("click");
            },

            function (error) {

                console.error("Error al obtener la ubicación:", error.message);

            }

        );

    } else {

        console.error("El navegador no soporta geolocalización.");

    }

    // Detectar el clic en cualquier parte de la tabla
    $("#tblw").on("click", function () {

console.log("Se hizo clic en la tabla");

    console.log("Latitud:", latitud);
    console.log("Longitud:", longitud);
        // Comprobar que ya tenemos las coordenadas
        if (latitud === undefined || longitud === undefined) {

            alert("Primero debemos obtener tu ubicación.");

            return;
        }

        // Consultar el API de OpenWeatherMap
        $.ajax({

            url: "https://api.openweathermap.org/data/2.5/weather",

            type: "GET",

            dataType: "json",

            data: {
                lat: latitud,
                lon: longitud,
                appid: API_KEY,
                units: "metric",
                lang: "es"
            },

            success: function (respuesta) {

                console.log("Datos del clima:", respuesta);

                // Mostrar el nombre del lugar
                $("#lug").text(respuesta.name);

                // Mostrar la temperatura en Celsius
                $("#tem").text(respuesta.main.temp + " °C");

                // Mostrar la humedad
                $("#hum").text(respuesta.main.humidity + " %");

                // Mostrar la velocidad del viento
                $("#vie").text(respuesta.wind.speed + " m/s");

                // Obtener el icono del clima
                let icono = respuesta.weather[0].icon;

                // Colocar la imagen del clima
                $("#tiempoIcon").attr(
                    "src",
                    "https://openweathermap.org/img/wn/" + icono + "@2x.png"
                );

                $("#tiempoIcon").attr(
                    "alt",
                    respuesta.weather[0].description
                );

            },

            error: function (error) {

                console.error("Error al consultar el clima:", error.responseJSON);

                alert("No se pudo obtener la información del clima. Revisá tu API Key.");

            }

        });

    });

});
