let cantidad = document.getElementById("cantidad");
let boton = document.getElementById("generar");
let campoTexto = document.getElementById("contrasena");
let seguridadMensaje = document.getElementById("seguridadMensaje");
let copiarBoton = document.getElementById("copiarBoton");
let historial = document.getElementById("historial");
let limpiarBoton = document.getElementById("limpiarCampo");

const cadenaDeCaracteres =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789!@#$%^&*()";

function generar() {
  let numeroDigitado = parseInt(cantidad.value);

  if (numeroDigitado > 5) {
    alert(`Se ha generado una contraseña de ${cantidad.value} dígitos.`);
  } else {
    alert("Debe ser mayor a 5");
    return;
  }

  let password = "";

  for (let i = 0; i < numeroDigitado; i++) {
    let caracterAleatorio =
      cadenaDeCaracteres[Math.floor(Math.random() * cadenaDeCaracteres.length)];

    password += caracterAleatorio;
  }

  campoTexto.value = password;

  let seguridad = verificarSeguridad(password);
  seguridadMensaje.textContent = seguridad.mensaje;
  seguridadMensaje.classList.remove("green", "orange", "red");
  seguridadMensaje.classList.add(seguridad.color);
  seguridadMensaje.style.display = "block";

  agregarAlHistorial(password, seguridad.mensaje, seguridad.color);
}

function verificarSeguridad(password) {
  let tieneMayuscula = /[A-Z]/.test(password);
  let tieneMinuscula = /[a-z]/.test(password);
  let tieneNumero = /\d/.test(password);
  let tieneSimbolo = /[!@#$%^&*()]/.test(password);

  if (tieneMayuscula && tieneMinuscula && tieneNumero && tieneSimbolo) {
    return {
      mensaje: "Contraseña segura",
      color: "green",
    };
  } else if (tieneMayuscula && tieneMinuscula && tieneNumero) {
    return {
      mensaje: "Contraseña menos segura, falta un símbolo",
      color: "orange",
    };
  } else if (tieneMayuscula && tieneMinuscula) {
    return {
      mensaje: "Contraseña poco segura, falta número y símbolo",
      color: "red",
    };
  } else {
    return {
      mensaje: "Contraseña muy débil",
      color: "red",
    };
  }
}

limpiarBoton.addEventListener("click", function () {
  campoTexto.value = "";
  seguridadMensaje.style.display = "none";
});

copiarBoton.addEventListener("click", copiarTexto);

function copiarTexto() {
  navigator.clipboard.writeText(campoTexto.value);
}

copiarBoton.addEventListener("click", copiarTexto);

function copiarTexto() {
  navigator.clipboard.writeText(campoTexto.value);
}

function agregarAlHistorial(password, mensaje, color) {
  let historialItem = document.createElement("div");
  historialItem.classList.add("historial-item", color);
  historialItem.innerHTML = `<strong>${password}</strong> - ${mensaje}`;
  historial.appendChild(historialItem);
}
