const inputText = document.getElementById('izqu-ingr-text');
const munheco = document.getElementById('muneco');
const der_info = document.getElementById('output-encriptado');
const div_derecha = document.getElementById('derecha');
const btn_copy = document.getElementById('btn-copy');
const titulo_mensaje = document.getElementById('titulo-mensaje');
const terminos_info = document.getElementById('izqu-term-info');
const mensaje_info_terminos = 'Solo letras minúsculas y sin acentos';
const llaves = {
    a: 'ai',
    e: 'enter',
    i: 'imes',
    o: 'ober',
    u: 'ufat'
};
function ajustar_mensajefinal(newValue){
    titulo_mensaje.textContent = newValue;
    munheco.style.display = 'none';
    der_info.style.display = 'none';
    btn_copy.style.display = 'block';
    div_derecha.classList.add('ajustar');
    titulo_mensaje.classList.add('ajustar');
    inputText.value = ''; // vaciar el input
    return;
}
function ajustar_pantallainicial(){
    der_info.style.display = 'block';
    btn_copy.style.display = 'none';
    titulo_mensaje.textContent = '';
    div_derecha.classList.remove('ajustar');
    titulo_mensaje.classList.remove('ajustar');
    inputText.focus(); // focus en ingresar el texto
    return;
}
function alertaTextoVacio(){
    terminos_info.style.backgroundColor = "#0A3871"
    terminos_info.textContent = "No hay Texto!!!. Por favor ingrese un texto.";
    terminos_info.style.color = "white";
    terminos_info.style.transition = "background-color 0.5s ease-in-out";
    terminos_info.style.fontWeight = "700"
    terminos_info.style.fontSize = "16px";
    inputText.focus(); // focus en ingresar el texto
    ajustar_pantallainicial();

    setTimeout(() => {
        terminos_info.removeAttribute('style');
    }, 1500);
    return;
}
function encriptar() {
    if (inputText.value == '') {
        alertaTextoVacio();
        return;
    } else {
        const texto = inputText.value.toLowerCase();
        const regex = new RegExp(Object.keys(llaves).join('|'), 'g');
        const encriptado = texto.replace(regex, letra => llaves[letra] || letra);
        terminos_info.textContent = mensaje_info_terminos;
        ajustar_mensajefinal(encriptado);
        return;
    }
}
function desencriptar() {
    if (inputText.value == '') {
        alertaTextoVacio();
        return;
    } else {
        const texto = inputText.value.toLowerCase();
        // Invertir el arreglo para la desencriptacion
        const inverso = {};
        for (const key in llaves) {
            inverso[llaves[key]] = key;
        }
        const regex = new RegExp(Object.values(llaves).join('|'), 'g');
        const desencriptado = texto.replace(regex, letra => inverso[letra] || letra);
        terminos_info.textContent = mensaje_info_terminos;
        ajustar_mensajefinal(desencriptado);
        return;
    }
}
function copiar() {
    const textarea = titulo_mensaje
    textarea.select(); // Selecciona todo el texto
    document.execCommand('copy');// Copiar al portapapeles
    inputText.value = ''; // limpia el textarea de ingraso de texto
    ajustar_pantallainicial(); // ajusta a la pantalla de inicio
    inputText.focus(); // focus en ingresar el texto
}