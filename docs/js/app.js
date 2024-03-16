let textAreaSalida = document.createElement("textarea");
let mensaje = "";

function validarMinusculas(mensaje) {
    if (mensaje.length != 0) {
        //Separa el mensaje y lo guarda en un arreglo, esto es para eliminar los espacios
        let mensajeSeparado = mensaje.split(" ");        
        
        //Valida que solo ingresen minúsculas sin caracteres especiales
        let caracteresInvalidos = /[A-Z0-9\W]/;        
        for (let i = 0; i < mensajeSeparado.length; i++) { 
            if (mensajeSeparado[i].match(caracteresInvalidos)) {
                alert("El mensaje no debe contener mayúsculas ni caracteres especiales");
                return false;
            }                  
        }
    return true;
    }
    alert("Ingrese un mensaje");
}

function validarCadena_aDesencriptar(mensaje) {
    let mensajeSeparado = mensaje.split(" ");

    for (let i = 0; i < mensajeSeparado.length; i++) {
        let palabra = mensajeSeparado[i];
        for (let j = 0; j < palabra.length; j++) {
            switch(palabra[j]) {
                case 'a':
                    if (palabra[j+1] != 'i') 
                        return false;
                    j++
                    break;
                case 'e':
                    if (palabra[j+1] != 'n' || palabra[j+2] != 't' || palabra[j+3] != 'e' || palabra[j+4] != 'r') 
                        return false;
                    j += 4;
                    break;
                case 'i':
                    if (palabra[j+1] != 'm' || palabra[j+2] != 'e' || palabra[j+3] != 's') 
                        return false;
                    j += 3;
                    break;
                case 'o':
                    if (palabra[j+1] != 'b' || palabra[j+2] != 'e' || palabra[j+3] != 'r') 
                        return false;
                    j += 3;
                    break;
                case 'u':
                    if (palabra[j+1] != 'f' || palabra[j+2] != 'a' || palabra[j+3] != 't') 
                        return false;
                    j += 3;
                    break;
                default:
                    break;
            }
        }        
    }
    return true;
}

function encriptar() {
    let mensajeEntrada = document.getElementById("mensaje-entrada").value;
    if (validarMinusculas(mensajeEntrada)) {
        eliminarElementosSalida();    
        
        textAreaSalida.value = mensajeEntrada
            .replace(/e/g, "enter")
            .replace(/i/g, "imes")
            .replace(/a/g, "ai")
            .replace(/o/g, "ober")
            .replace(/u/g, "ufat");
    }
}

function desencriptar() {
    let mensajeEntrada = document.getElementById("mensaje-entrada").value;
    if (validarMinusculas(mensajeEntrada)) {
        if (validarCadena_aDesencriptar(mensajeEntrada)) { 
        eliminarElementosSalida();

            mensajeEntrada = mensajeEntrada.replace(/ai/g, 'a');
            mensajeEntrada = mensajeEntrada.replace(/enter/g, 'e');
            mensajeEntrada = mensajeEntrada.replace(/imes/g, 'i');
            mensajeEntrada = mensajeEntrada.replace(/ober/g, 'o');
            mensajeEntrada = mensajeEntrada.replace(/ufat/g, 'u');

            textAreaSalida.value = mensajeEntrada;
        }
        else 
            alert("El mensaje ingresado no tiene una encriptación válida, por tanto no se puede desencriptar");
    }
}

//Reemplaza muñeco y el mensaje inicial por un textarea que mostrará el mensaje de salida
function eliminarElementosSalida() {
    const elementosEliminar = document.querySelector(".resultado-contenido");
    elementosEliminar.replaceChildren(textAreaSalida);
    textAreaSalida.classList.add("texto-principal");
    textAreaSalida.readOnly = true;
}

async function botonCopiar() {
    let mensaje_copiar = textAreaSalida.value;
    try {
        await navigator.clipboard.writeText(mensaje_copiar);
        console.log("Texto copiado en portapapeles");
        alert("Texto copiado en el portapapeles");
    } catch (err) {
        console.error("Ocurrió un error al copiar: ", err);
    }
}