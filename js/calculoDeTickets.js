const precioTicket = 200; /* podemos cambiar el precio del ticket desde aquí */

const descuentos = [80, 50, 15]; /* en orden: descuentos para estudiantes, trainee, y Junior */

const inputsDeTicket = document.querySelectorAll("input[placeholder], select")

/* http://emailregex.com/ */
const patternEmails = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

categoria = document.getElementById('inputCategoria')
cantidad = document.getElementById('cantidad')
email = document.getElementById('correo')

function calcularPrecio() {
    let tagsFaltantes = []

    inputsDeTicket.forEach( input => {
        if( input.value == "" ) {
            tagsFaltantes.push(input.getAttribute('info'))
            input.classList.add("entrada-invalida");
        }
        else 
        {
            if( input == cantidad && input.value <= 0 ){  //  cantidad invalida
                alert('Cantidad invalida');
                input.classList.add("entrada-invalida");
            }
            else if( input == email && (!patternEmails.test(input.value)) ){ // email con formato inválido
                alert('Email con formato inválido');
                input.classList.add("entrada-invalida");
            }
        }
    });
    
    if( tagsFaltantes.length > 0 || Array.from(inputsDeTicket).some( elem => elem.classList.contains("entrada-invalida") ) ) // falta algun tag o algo es invalido?
    {
        if( tagsFaltantes.length == 0 )
            return

        let mensaje = "Te falta completar/seleccionar: " + tagsFaltantes.join(',')
        alert(mensaje);
        return
    }

    // hasta acá, se ejecutó todo y está todo OK
    return asignarPrecio(cantidad.value, generarDescuento(precioTicket, descuentos[categoria.value]))
}

function limpiarCompra() {
    inputsDeTicket.forEach( input => {
        input.setAttribute('value', '');
        input.value = '';
    });
    asignarPrecio("", "");
}

function asignarPrecio(cantidad, precio) {
    document.getElementById('totalPago').innerHTML = (cantidad && precio) ? cantidad * precio : "";
}

function generarDescuento(precio_completo, descuento) {
    /* precio_completo = valor de ticket
    descuento a aplicar = el descuento (80, 50 o 15)*/
    return (precio_completo - (precio_completo * (descuento/100)))
}

inputsDeTicket.forEach( input => {
    input.addEventListener("change", function() { /*si escribe, le sacamos el valor invalido */
        input.classList.remove("entrada-invalida");
    });
})

document.getElementById('precioDelTicket').innerHTML = "$" + precioTicket // 1 ticket por el precio del ticket
