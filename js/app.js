//  PRIMERO SE ENLAZAN LAS CLASES (MOLDES LIMPIOS)
class ValidadorEmail {
    // Se eliminó por completó el constructor vacío para simplificar el molde

    // FUNCIÓN FLECHA: Lógica matemática de posiciones muy fácil de entender sin RegEx
    comprobarCorreo = (cadena) => {
        const email = cadena.trim(); // Limpiamos espacios externos accidentales

        // 1. Buscamos el índice posicional del arroba y del último punto
        const posicionArroba = email.indexOf("@");
        const posicionPunto = email.lastIndexOf(".");

        // 2. Evaluamos las 3 condiciones básicas del estándar:
        const tieneArroba = email.includes("@");
        const elArrobaNoEstaAlPrincipio = posicionArroba > 0;
        const elPuntoEstaDespuesDelArroba = posicionPunto > posicionArroba + 1;

        // Devuelve verdadero (true) si pasa los 3 filtros lógicos de texto
        return tieneArroba && elArrobaNoEstaAlPrincipio && elPuntoEstaDespuesDelArroba;
    };
}

// Objeto global vacío para resguardar las referencias con nombre de las funciones flecha de escucha
const accionesValidador = {};

const activarEcosistemaValidador = (validador) => {
    const formulario = document.getElementById("validador-form");
    const inputEmail = document.getElementById("input-email");
    const boxResultado = document.getElementById("resultado-validacion");
    const txtResultado = document.getElementById("texto-validacion");

    if (!formulario || !inputEmail || !boxResultado || !txtResultado) return;

    // A. ESCUCHADOR NATIVO 'input': Limpia y oculta el panel de alertas en tiempo real al escribir en el móvil
    inputEmail.addEventListener("input", () => {
        boxResultado.className = "hidden";
        txtResultado.textContent = "";
    });

    // B. FUNCIÓN FLECHA CON NOMBRE: Procesa la validación al enviar el formulario
    accionesValidador.ejecutarVerificacion = (evento) => {
        // Frenar el reinicio automático del navegador en pantallas de teléfonos móviles
        evento.preventDefault();

        const textoIngresado = inputEmail.value;

        // Validación UX inmediata si el usuario presiona el botón vacío
        if (textoIngresado.trim() === "") {
            txtResultado.textContent = "⚠️ Por favor, introduce un correo electrónico para verificar.";
            boxResultado.className = "mt-6 p-4 rounded-xl border-4 bg-amber-50 border-amber-200 block animate-fade-in max-w-full";
            txtResultado.className = "text-base sm:text-lg font-black text-center text-amber-800";
            return;
        }

        // Ejecutar el método simplificado de la clase pasando el texto original
        const esEmailValido = validador.comprobarCorreo(textoIngresado);

        // C. RENDERIZADO DE ALTO CONTRASTE PANORÁMICO (Verde = verdadero, Rojo = falso)
        if (esEmailValido) {
            txtResultado.textContent = `verdadero | "${textoIngresado}" es un email válido.`;
            boxResultado.className = "mt-6 p-4 rounded-xl border-4 bg-emerald-50 border-emerald-200 block animate-fade-in max-w-full";
            txtResultado.className = "text-base sm:text-xl font-black text-center text-emerald-800 break-all";
        } else {
            txtResultado.textContent = `falso | "${textoIngresado}" no es un correo válido (debe incluir @ y un punto final).`;
            boxResultado.className = "mt-6 p-4 rounded-xl border-4 bg-red-50 border-red-200 block animate-fade-in max-w-full";
            txtResultado.className = "text-base sm:text-xl font-black text-center text-red-800 break-all";
        }
    };

    // D. ESCUCHADOR NATIVO 'submit': Captura de forma independiente el envío del formulario
    formulario.addEventListener("submit", accionesValidador.ejecutarVerificacion);
};

// DISPARADOR GLOBAL (ARRANQUE)
document.addEventListener("DOMContentLoaded", () => {
    // Fabricamos la instancia real del objeto usando el Molde limpio del Bloque 1
    const miValidadorEmail = new ValidadorEmail();

    // Lanzar las operaciones de escucha inyectando el objeto creado
    activarEcosistemaValidador(miValidadorEmail);
});
