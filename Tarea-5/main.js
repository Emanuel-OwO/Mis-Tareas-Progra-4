"use strict";

/* ========== EJEMPLOS DE JAVASCRIPT ========== */

const ejemplos = [

    // ---------- CONTROL DE FLUJO ----------

    {
        seccion: "control",
        titulo: "if...else",
        descripcion: "Determina si una nota permite aprobar.",
        ejecutar: function () {
            const nota = 85;

            if (nota >= 70) {
                return `Nota: ${nota}. Resultado: aprobado.`;
            } else {
                return `Nota: ${nota}. Resultado: reprobado.`;
            }
        }
    },

    {
        seccion: "control",
        titulo: "switch",
        descripcion: "Selecciona una acción según una opción.",
        ejecutar: function () {
            const opcion = 2;
            let mensaje;

            switch (opcion) {
                case 1:
                    mensaje = "Registrar cliente";
                    break;

                case 2:
                    mensaje = "Consultar clientes";
                    break;

                case 3:
                    mensaje = "Salir";
                    break;

                default:
                    mensaje = "Opción incorrecta";
            }

            return `Opción ${opcion}: ${mensaje}`;
        }
    },

    {
        seccion: "control",
        titulo: "try / catch / throw",
        descripcion: "Detecta y maneja una cantidad incorrecta.",
        ejecutar: function () {
            const cantidad = -3;

            try {
                if (cantidad < 0) {
                    throw new Error(
                        "La cantidad no puede ser negativa."
                    );
                }

                return "Cantidad aceptada.";
            } catch (error) {
                return `Error controlado: ${error.message}`;
            }
        }
    },

    {
        seccion: "control",
        titulo: "Objetos Error",
        descripcion: "Consulta el nombre y el mensaje de un error.",
        ejecutar: function () {
            const error = new Error("No se encontró el producto.");

            return `Nombre: ${error.name}\nMensaje: ${error.message}`;
        }
    },

    // ---------- BUCLES ----------

    {
        seccion: "bucles",
        titulo: "for",
        descripcion: "Recorre los números del 1 al 5.",
        ejecutar: function () {
            const numeros = [];

            for (let i = 1; i <= 5; i++) {
                numeros.push(i);
            }

            return numeros.join(" - ");
        }
    },

    {
        seccion: "bucles",
        titulo: "while",
        descripcion: "Repite mientras el contador sea menor o igual a 3.",
        ejecutar: function () {
            let contador = 1;
            const mensajes = [];

            while (contador <= 3) {
                mensajes.push(`Repetición ${contador}`);
                contador++;
            }

            return mensajes.join("\n");
        }
    },

    {
        seccion: "bucles",
        titulo: "do...while",
        descripcion: "Ejecuta el bloque al menos una vez.",
        ejecutar: function () {
            let numero = 5;
            const mensajes = [];

            do {
                mensajes.push(`Número: ${numero}`);
                numero++;
            } while (numero <= 3);

            return mensajes.join("\n");
        }
    },

    // ---------- FUNCIONES ----------

    {
        seccion: "funciones",
        titulo: "Definir funciones",
        descripcion: "Define una función con parámetros y retorno.",
        ejecutar: function () {
            function sumar(a, b) {
                return a + b;
            }

            return `sumar(8, 4) devuelve ${sumar(8, 4)}`;
        }
    },

    {
        seccion: "funciones",
        titulo: "Llamar funciones",
        descripcion: "Ejecuta una función enviando un argumento.",
        ejecutar: function () {
            function saludar(nombre) {
                return `Hola, ${nombre}.`;
            }

            const saludo = saludar("Emanuel");

            return saludo;
        }
    },

    // ---------- OPERADORES ----------

    {
        seccion: "operadores",
        titulo: "Asignación y comparación",
        descripcion: "Asigna valores y compara con == y ===.",
        ejecutar: function () {
            let puntos = 10;
            puntos += 5;

            return [
                `Puntos después de += 5: ${puntos}`,
                `5 == "5": ${5 == "5"}`,
                `5 === "5": ${5 === "5"}`,
                `Puntos >= 10: ${puntos >= 10}`
            ].join("\n");
        }
    },

    {
        seccion: "operadores",
        titulo: "Operadores aritméticos",
        descripcion: "Realiza operaciones con dos números.",
        ejecutar: function () {
            const a = 10;
            const b = 3;
            let contador = 1;
            contador++;

            return [
                `Suma: ${a + b}`,
                `Resta: ${a - b}`,
                `Multiplicación: ${a * b}`,
                `División: ${(a / b).toFixed(2)}`,
                `Residuo: ${a % b}`,
                `Potencia: ${a ** b}`,
                `Contador después de ++: ${contador}`
            ].join("\n");
        }
    },

    {
        seccion: "operadores",
        titulo: "Operadores lógicos",
        descripcion: "Combina condiciones con &&, || y !.",
        ejecutar: function () {
            const esMayor = true;
            const tieneEntrada = false;

            return [
                `Mayor Y con entrada: ${esMayor && tieneEntrada}`,
                `Mayor O con entrada: ${esMayor || tieneEntrada}`,
                `NO tiene entrada: ${!tieneEntrada}`
            ].join("\n");
        }
    },

    // ---------- NÚMEROS Y FECHAS ----------

    {
        seccion: "objetos",
        titulo: "Objeto Number",
        descripcion: "Convierte texto a número y verifica su tipo.",
        ejecutar: function () {
            const texto = "2500";
            const precio = Number(texto);

            return [
                `Texto original: "${texto}"`,
                `Precio + 500: ${precio + 500}`,
                `¿Es entero?: ${Number.isInteger(precio)}`,
                `¿"abc" produce NaN?: ${Number.isNaN(Number("abc"))}`
            ].join("\n");
        }
    },

    {
        seccion: "objetos",
        titulo: "Objeto Math",
        descripcion: "Utiliza métodos matemáticos y un número aleatorio.",
        ejecutar: function () {
            const dado = Math.floor(Math.random() * 6) + 1;

            return [
                `Redondear 4.6: ${Math.round(4.6)}`,
                `Raíz de 25: ${Math.sqrt(25)}`,
                `Máximo entre 8 y 15: ${Math.max(8, 15)}`,
                `Valor de PI: ${Math.PI.toFixed(4)}`,
                `Dado aleatorio: ${dado}`
            ].join("\n");
        }
    },

    {
        seccion: "objetos",
        titulo: "Objeto Date",
        descripcion: "Muestra la fecha y hora actuales en Costa Rica.",
        ejecutar: function () {
            const ahora = new Date();

            const fecha = ahora.toLocaleDateString("es-CR", {
                timeZone: "America/Costa_Rica"
            });

            const hora = ahora.toLocaleTimeString("es-CR", {
                timeZone: "America/Costa_Rica"
            });

            return `Fecha: ${fecha}\nHora: ${hora}`;
        }
    },

    // ---------- TEXTO ----------

    {
        seccion: "texto",
        titulo: "Cadenas literales",
        descripcion: "Crea texto e inserta variables en una plantilla.",
        ejecutar: function () {
            const nombre = "Emanuel";
            const curso = 'Diseño de Aplicaciones Web';

            return `Hola, ${nombre}. Bienvenido a ${curso}.`;
        }
    },

    {
        seccion: "texto",
        titulo: "Objeto String",
        descripcion: "Consulta y transforma una cadena de texto.",
        ejecutar: function () {
            const texto = "  JavaScript  ";
            const limpio = texto.trim();

            return [
                `Sin espacios externos: ${limpio}`,
                `Longitud: ${limpio.length}`,
                `Mayúsculas: ${limpio.toUpperCase()}`,
                `Minúsculas: ${limpio.toLowerCase()}`,
                `¿Incluye Script?: ${limpio.includes("Script")}`,
                `Reemplazo: ${limpio.replace("Java", "Type")}`
            ].join("\n");
        }
    },

    // ---------- COLECCIONES ----------

    {
        seccion: "colecciones",
        titulo: "Arreglos",
        descripcion: "Consulta, agrega y recorre productos.",
        ejecutar: function () {
            const productos = ["Teclado", "Mouse", "Monitor"];
            productos.push("Impresora");

            return [
                `Primer producto: ${productos[0]}`,
                `Cantidad: ${productos.length}`,
                `Lista: ${productos.join(", ")}`
            ].join("\n");
        }
    },

    {
        seccion: "colecciones",
        titulo: "Arreglos tipados",
        descripcion: "Almacena enteros sin signo de 8 bits.",
        ejecutar: function () {
            const datos = new Uint8Array([10, 20, 30]);

            return [
                `Valores: ${datos.join(", ")}`,
                `Primer valor: ${datos[0]}`,
                `Cantidad: ${datos.length}`,
                `Bytes por elemento: ${datos.BYTES_PER_ELEMENT}`
            ].join("\n");
        }
    },

    // ---------- DOM ----------

    {
        seccion: "dom",
        titulo: "Encontrar por ID",
        descripcion: "Selecciona y cambia el título de la zona de prueba.",
        ejecutar: function () {
            const titulo = document.getElementById("titulo-demo");

            titulo.textContent = "Título modificado con JavaScript";

            return `Nuevo texto: ${titulo.textContent}`;
        }
    },

    {
        seccion: "dom",
        titulo: "Encontrar por etiqueta",
        descripcion: "Busca los párrafos dentro de la zona de prueba.",
        ejecutar: function () {
            const zona = document.getElementById("zona-dom");
            const parrafos = zona.getElementsByTagName("p");

            return `Párrafos encontrados: ${parrafos.length}`;
        }
    },

    {
        seccion: "dom",
        titulo: "Encontrar por clase",
        descripcion: "Selecciona los productos y resalta su texto.",
        ejecutar: function () {
            const productos =
                document.getElementsByClassName("producto-demo");

            for (let i = 0; i < productos.length; i++) {
                productos[i].classList.add("resaltado");
            }

            return `Productos resaltados: ${productos.length}`;
        }
    },

    {
        seccion: "dom",
        titulo: "Encontrar mediante selectores CSS",
        descripcion: "Selecciona el primer producto y todos los productos.",
        ejecutar: function () {
            const primero =
                document.querySelector("#zona-dom .producto-demo");

            const todos =
                document.querySelectorAll("#zona-dom .producto-demo");

            return [
                `Primer producto: ${primero.textContent}`,
                `Total de coincidencias: ${todos.length}`
            ].join("\n");
        }
    },

    {
        seccion: "dom",
        titulo: "Colecciones de objetos HTML",
        descripcion: "Accede a un formulario y lee el nombre escrito.",
        ejecutar: function () {
            const formulario =
                document.forms.namedItem("formulario-demo");

            const campo =
                formulario.elements.namedItem("nombre");

            return `Nombre del formulario: ${campo.value}`;
        }
    }
];

/* ========== CREACIÓN DE LAS TARJETAS ========== */

// Construye una tarjeta para cada ejemplo.
// Se utiliza textContent para mostrar texto y código de forma segura.

ejemplos.forEach(function (ejemplo, indice) {
    const contenedor = document.querySelector(
        `#${ejemplo.seccion} .ejemplos`
    );

    const columna = document.createElement("div");
    columna.className = "col-12 col-lg-6";

    const tarjeta = document.createElement("article");
    tarjeta.className = "card tarjeta-ejemplo h-100";

    const cuerpo = document.createElement("div");
    cuerpo.className = "card-body";

    const titulo = document.createElement("h3");
    titulo.className = "card-title";
    titulo.textContent = ejemplo.titulo;

    const descripcion = document.createElement("p");
    descripcion.className = "descripcion";
    descripcion.textContent = ejemplo.descripcion;

    const detalles = document.createElement("details");

    const resumen = document.createElement("summary");
    resumen.textContent = "Ver código";

    const bloqueCodigo = document.createElement("pre");
    const codigo = document.createElement("code");

    // Muestra el cuerpo de la función que se ejecutará.
    const funcionTexto = ejemplo.ejecutar.toString();
    const inicio = funcionTexto.indexOf("{") + 1;
    const fin = funcionTexto.lastIndexOf("}");

    codigo.textContent = funcionTexto
        .slice(inicio, fin)
        .replace(/^ {12}/gm, "")
        .trim();

    bloqueCodigo.append(codigo);
    detalles.append(resumen, bloqueCodigo);

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "btn btn-primary";
    boton.textContent = "Ejecutar ejemplo";

    const resultado = document.createElement("pre");
    resultado.id = `resultado-${indice}`;
    resultado.className = "resultado";
    resultado.setAttribute("role", "status");
    resultado.setAttribute("aria-live", "polite");
    resultado.textContent = "El resultado aparecerá aquí.";

    boton.setAttribute("aria-controls", resultado.id);

    boton.addEventListener("click", function () {
        try {
            resultado.textContent = ejemplo.ejecutar();
        } catch (error) {
            resultado.textContent = `Error: ${error.message}`;
        }
    });

    cuerpo.append(
        titulo,
        descripcion,
        detalles,
        boton,
        resultado
    );

    tarjeta.append(cuerpo);
    columna.append(tarjeta);
    contenedor.append(columna);
});

/* ========== FORMULARIO DE PRUEBA ========== */

// Evita que Enter recargue la página al escribir en el formulario.

document.getElementById("formulario-demo")
    .addEventListener("submit", function (evento) {
        evento.preventDefault();
    });