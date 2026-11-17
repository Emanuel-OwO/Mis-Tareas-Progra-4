
/* ===== Tarea 6 - Calculadora de crédito hipotecario ===== */

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('formCredito');

    const campos = [
        'correo',
        'nombre',
        'fechaNacimiento',
        'salario',
        'valorVivienda',
        'montoSolicitado',
        'tasaInteres',
        'plazo'
    ];

    const input = (id) => document.getElementById(id);

    const formato = new Intl.NumberFormat('es-CR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    let creditoActual = null;


    /* ===== Actualizar plazo ===== */

    function actualizarPlazo() {
        input('valorPlazo').textContent = input('plazo').value;
    }


    /* ===== Calcular monto máximo ===== */

    function actualizarMaximo() {

        const valor = Number(input('valorVivienda').value);

        input('maximoCredito').textContent = valor > 0
            ? 'Monto máximo permitido: ₡' + formato.format(valor * 0.8)
            : 'Ingrese el valor de la vivienda para conocer el máximo.';

        input('montoSolicitado').max = valor > 0
            ? String(valor * 0.8)
            : '';
    }


    /* ===== Calcular edad ===== */

    function calcularEdad(fechaTexto) {

        const fecha = new Date(fechaTexto + 'T12:00:00');
        const hoy = new Date();

        let edad = hoy.getFullYear() - fecha.getFullYear();

        if (
            hoy.getMonth() < fecha.getMonth() ||
            (
                hoy.getMonth() === fecha.getMonth() &&
                hoy.getDate() < fecha.getDate()
            )
        ) {
            edad--;
        }

        return edad;
    }


    /* ===== Calcular cuota mensual ===== */

    function cuotaFija(monto, tasaAnual, meses) {

        const tasaMensual = tasaAnual / 100 / 12;

        if (tasaMensual === 0) {
            return monto / meses;
        }

        const potencia = Math.pow(1 + tasaMensual, meses);

        return monto * tasaMensual * potencia / (potencia - 1);
    }


    /* ===== Limpiar resultados ===== */

    function limpiarResultados() {

        creditoActual = null;

        input('cuotaMensual').value = '';
        input('salarioRequerido').value = '';

        input('porcentajeFinanciar').textContent = '';
        input('estadoSalario').textContent = '';
        input('estadoEdad').textContent = '';
        input('mensajeError').textContent = '';

        input('mostrarProyeccion').disabled = true;
        input('imprimirProyeccion').disabled = true;

        input('seccionProyeccion').hidden = true;
        input('cuerpoProyeccion').replaceChildren();
    }


    /* ===== Detectar cambios del formulario ===== */

    form.addEventListener('input', function (evento) {

        if (evento.target.id === 'plazo') {
            actualizarPlazo();
        }

        if (evento.target.id === 'valorVivienda') {
            actualizarMaximo();
        }

        limpiarResultados();
    });


    /* ===== Calcular crédito ===== */

    form.addEventListener('submit', function (evento) {

        evento.preventDefault();
        limpiarResultados();

        if (!form.reportValidity()) {
            return;
        }

        const salario = Number(input('salario').value);
        const vivienda = Number(input('valorVivienda').value);
        const monto = Number(input('montoSolicitado').value);
        const tasaAnual = Number(input('tasaInteres').value);
        const meses = Number(input('plazo').value) * 12;

        const edad = calcularEdad(input('fechaNacimiento').value);


        /* ===== Validar datos ===== */

        if (
            !Number.isFinite(salario) ||
            !Number.isFinite(vivienda) ||
            !Number.isFinite(monto) ||
            !Number.isFinite(tasaAnual) ||
            vivienda <= 0 ||
            monto <= 0 ||
            salario < 0 ||
            tasaAnual < 0 ||
            monto > vivienda * 0.8 + 0.001 ||
            edad < 0 ||
            meses <= 0
        ) {
            input('mensajeError').textContent =
                'Revise los datos: el crédito no puede superar el 80% del valor de la vivienda.';

            return;
        }


        /* ===== Resultados del crédito ===== */

        const cuota = cuotaFija(monto, tasaAnual, meses);

        const salarioMinimo = cuota / 0.40;

        const porcentaje = monto / vivienda * 100;

        if (!Number.isFinite(cuota)) {

            input('mensajeError').textContent =
                'No fue posible calcular la cuota. Revise los datos.';

            return;
        }

        input('cuotaMensual').value = formato.format(cuota);

        input('salarioRequerido').value = formato.format(salarioMinimo);

        input('porcentajeFinanciar').textContent =
            'Porcentaje a financiar: ' + formato.format(porcentaje) + '%';


        /* ===== Validar salario ===== */

        const suficiente = salario >= salarioMinimo;

        input('estadoSalario').textContent = suficiente
            ? 'Monto de salario suficiente para el crédito'
            : 'Monto de salario insuficiente';

        input('estadoSalario').className =
            'mb-1 fw-bold ' + (suficiente ? 'text-success' : 'text-danger');


        /* ===== Validar edad ===== */

        const edadValida = edad > 22 && edad < 55;

        input('estadoEdad').textContent = edadValida
            ? 'Cliente con edad suficiente para crédito'
            : 'Cliente no califica para crédito por edad';

        input('estadoEdad').className =
            'mb-1 fw-bold ' + (edadValida ? 'text-success' : 'text-danger');


        /* ===== Guardar crédito calculado ===== */

        creditoActual = {
            monto,
            tasaAnual,
            meses,
            cuota
        };

        input('mostrarProyeccion').disabled = false;
        input('imprimirProyeccion').disabled = false;


        /* ===== Guardar datos en LocalStorage ===== */

        const datos = Object.fromEntries(
            campos.map(id => [id, input(id).value])
        );

        try {

            localStorage.setItem(
                'estateAgencyCredito',
                JSON.stringify(datos)
            );

        } catch (error) {

            input('mensajeError').textContent =
                'El cálculo está listo, pero el navegador no permitió guardar los datos.';
        }

    });


    /* ===== Mostrar proyección del crédito ===== */

    input('mostrarProyeccion').addEventListener('click', function () {

        if (!creditoActual) {
            return;
        }

        const { monto, tasaAnual, meses, cuota } = creditoActual;

        const tasaMensual = tasaAnual / 100 / 12;

        const cuerpo = input('cuerpoProyeccion');

        const fragmento = document.createDocumentFragment();

        let saldo = monto;


        /* ===== Tabla de amortización ===== */

        for (let mes = 1; mes <= meses; mes++) {

            const interes = saldo * tasaMensual;

            let amortizacion = cuota - interes;

            if (mes === meses || amortizacion > saldo) {
                amortizacion = saldo;
            }

            const pago = interes + amortizacion;

            saldo = Math.max(0, saldo - amortizacion);

            const fila = document.createElement('tr');

            [
                mes,
                formato.format(pago),
                formato.format(interes),
                formato.format(amortizacion),
                formato.format(saldo)
            ].forEach(valor => {

                const celda = document.createElement('td');

                celda.textContent = valor;

                fila.appendChild(celda);
            });

            fragmento.appendChild(fila);
        }

        cuerpo.replaceChildren(fragmento);

        input('seccionProyeccion').hidden = false;

        input('seccionProyeccion').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    });


    /* ===== Imprimir proyección ===== */

    input('imprimirProyeccion').addEventListener('click', function () {

        if (!creditoActual) {
            return;
        }

        if (input('seccionProyeccion').hidden) {
            input('mostrarProyeccion').click();
        }

        window.print();
    });


    /* ===== Recuperar datos guardados ===== */

    try {

        const guardados = JSON.parse(
            localStorage.getItem('estateAgencyCredito') || 'null'
        );

        if (guardados && typeof guardados === 'object') {

            campos.forEach(id => {

                if (
                    Object.prototype.hasOwnProperty.call(guardados, id)
                ) {
                    input(id).value = guardados[id];
                }

            });
        }

    } catch (error) {
        // Si LocalStorage no funciona, el formulario sigue trabajando.
    }

    actualizarPlazo();
    actualizarMaximo();

});
