// Al cargar la página, muestra un alert sobre las cookies
window.onload = function () {
  let cookiesHabilitadas = navigator.cookieEnabled ? "tiene" : "no tiene";
  alert("Bienvenido a FastBites, le recordamos que el navegador " + cookiesHabilitadas + " activadas las cookies");
};

// Valida que las contraseñas sean iguales y cumplan los requisitos de seguridad
function validarContrasena() {
  let contrasena1 = document.getElementById("password1").value;
  let contrasena2 = document.getElementById("password2").value;
  let errorContrasena = document.getElementById("errorPassword");
  let expresionRegular = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{7,}$/;

  if (contrasena1 !== contrasena2) {
      errorContrasena.textContent = "Las contraseñas no coinciden.";
  } else if (!expresionRegular.test(contrasena1)) {
      errorContrasena.textContent = "Debe tener al menos 7 caracteres, una mayúscula, una minúscula y un número.";
  } else {
      errorContrasena.textContent = "";
  }
}

// Valida que el correo tenga el formato correcto
function validarCorreo() {
  let correo = document.getElementById("email").value;
  let errorCorreo = document.getElementById("errorEmail");
  let expresionRegular = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!expresionRegular.test(correo)) {
      errorCorreo.textContent = "El correo no tiene un formato válido.";
  } else {
      errorCorreo.textContent = "";
  }
}

// Muestra la provincia correspondiente al código postal seleccionado
function mostrarProvincia() {
  let seleccion = document.getElementById("codigoPostal");
  let provincia = document.getElementById("provincia");
  let opciones = {
      "28001": "Madrid",
      "41001": "Sevilla",
      "08001": "Barcelona",
      "50001": "Zaragoza",
      "46001": "Valencia"
  };
  provincia.textContent = "Provincia: " + opciones[seleccion.value];
}

// Activa el checkbox de aceptar solo cuando el usuario ha leído los términos
function activarCheckbox() {
  document.getElementById("terminos").disabled = !document.getElementById("terminos").checked;
  document.getElementById("aceptar").disabled = !document.getElementById("terminos").checked;
}

// Valida el formulario antes de enviarlo
function validarFormulario(evento) {
  let interesesSeleccionados = document.querySelectorAll("input[name='intereses']:checked");
  let recibirCorreos = document.querySelector("input[name='correos']:checked").value;
  let nombre = document.querySelector("input[name='nombre']").value;
  let apellidos = document.querySelector("input[name='apellidos']").value;
  let usuario = document.querySelector("input[name='usuario']").value;
  let contrasena1 = document.querySelector("input[name='password1']").value;
  let contrasena2 = document.querySelector("input[name='password2']").value;
  let correo = document.querySelector("input[name='email']").value;
  let direccion = document.querySelector("input[name='direccion']").value;
  let codigoPostal = document.querySelector("select[name='codigoPostal']").value;

  // Verifica que todos los campos obligatorios estén llenos
  if (!nombre || !apellidos || !usuario || !contrasena1 || !contrasena2 || !correo || !direccion || !codigoPostal) {
      alert("Por favor, complete todos los campos obligatorios.");
      evento.preventDefault();
      return;
  }

  // Verifica que el usuario seleccione entre 2 y 6 intereses
  if (interesesSeleccionados.length < 2 || interesesSeleccionados.length > 6) {
      alert("Debe seleccionar entre 2 y 6 intereses.");
      evento.preventDefault();
      return;
  }

  // Si el usuario no quiere recibir correos, pide confirmación
  if (recibirCorreos === "no") {
      if (!confirm("¿Está seguro de que no quiere recibir correos electrónicos?")) {
          evento.preventDefault();
          return;
      }
  }

  // Valida que las contraseñas coincidan y tengan los requisitos de seguridad
  let errorContrasena = document.getElementById("errorPassword").textContent;
  if (errorContrasena) {
      alert("Las contraseñas no son válidas. Corríjalas.");
      evento.preventDefault();
      return;
  }

  // Valida el formato del correo
  let errorCorreo = document.getElementById("errorEmail").textContent;
  if (errorCorreo) {
      alert("El correo no tiene un formato válido.");
      evento.preventDefault();
      return;
  }

  alert("Formulario correcto. Se enviarán los datos al servidor.");
}