const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letters and spaces, up to 40 characters
	password: /^.{4,12}$/, // Any character, 4 to 12 characters
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Email format
  };
  
  const campos = {
	nombre: false,
	password: false,
	correo: false,
  };
  
  const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
	  document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
	  document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
	  document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
	  document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
	  document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
	  campos[campo] = true;
	} else {
	  document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
	  document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
	  document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
	  document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
	  document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
	  campos[campo] = false;
	}
  };
  
  const validarFormulario = (event) => {
	// Validate each field on keyup or blur
	validarCampo(expresiones.nombre, document.getElementById('nombre'), 'nombre');
	validarCampo(expresiones.password, document.getElementById('password'), 'password');
	validarCampo(expresiones.correo, document.getElementById('correo'), 'correo');
  
	// Handle form submission
	const terminos = document.getElementById('terminos');
	if (!(campos.nombre && campos.password && campos.correo && terminos.checked)) {
	  event.preventDefault(); // Prevent form submission if validation fails
	  document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}
  };
  
  const formulario = document.querySelector('.formulario form');
  formulario.addEventListener('submit', validarFormulario);
  
  
const terminos = document.getElementById('terminos');
if (campos.nombre && campos.password && campos.correo && terminos.checked) {
	formulario.reset();

	document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
	setTimeout(() => {
	document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
	}, 5000);

	document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
	icono.classList.remove('formulario__grupo-correcto');
	});
} else {
	document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
};
  
  document.addEventListener('DOMContentLoaded', function () {
	var formulario = document.querySelector('.formulario form');
  
	formulario.addEventListener('submit', function (event) {
	  // Validaciones antes de enviar el formulario
	  if (!validarCampo(expresiones.nombre, document.getElementById('nombre'), 'nombre') ||
		  !validarCampo(expresiones.password, document.getElementById('password'), 'password') ||
		  !validarCampo(expresiones.correo, document.getElementById('correo'), 'correo')) {
		// Si alguna validación falla, evitamos el envío del formulario
		event.preventDefault();
	  }
	});
  });
  

// const validarCampo = (expresion, input, campo) => {
// 	if(expresion.test(input.value)){
// 		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
// 		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
// 		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
// 		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
// 		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
// 		campos[campo] = true;
// 	} else {
// 		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
// 		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
// 		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
// 		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
// 		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
// 		campos[campo] = false;
// 	}
// }

// inputs.forEach((input) => {
// 	input.addEventListener('keyup', validarFormulario);
// 	input.addEventListener('blur', validarFormulario);
// });

// formulario.addEventListener('submit', (e) => {
// 	e.preventDefault();

// 	const terminos = document.getElementById('terminos');
// 	if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
// 		formulario.reset();

// 		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
// 		setTimeout(() => {
// 			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
// 		}, 5000);

// 		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
// 			icono.classList.remove('formulario__grupo-correcto');
// 		});
// 	} else {
// 		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
// 	}
// });

// document.addEventListener('DOMContentLoaded', function () {
//     var formulario = document.querySelector('.formulario form');

//     formulario.addEventListener('submit', function (event) {
//       // Validaciones antes de enviar el formulario
//       if (!validarNombre() || !validarEmail() || !validarPassword()) {
//         // Si alguna validación falla, evitamos el envío del formulario
//         event.preventDefault();
//       }
//     });
// });

// function validarNombre() {
//   var nombre = document.getElementById('nombre').value.trim();
//   var errorNombre = document.getElementById('errorNombre');
//   if (nombre === '') {
//     errorNombre.textContent = 'Por favor, ingresa tu nombre.';
//     return false;
//   } else {
//     errorNombre.textContent = '';
//     return true;
//   }
// }

// function validarEmail() {
//   var email = document.getElementById('email').value.trim();
//   var errorEmail = document.getElementById('errorEmail');
//   if (email === '') {
//     errorEmail.textContent = 'Por favor, ingresa tu correo electrónico.';
//     return false;
//   } else {
//     errorEmail.textContent = '';
//     return true;
//   }
// }

// function validarPassword() {
//   var password = document.getElementById('password').value.trim();
//   var errorPassword = document.getElementById('errorPassword');
//   if (password === '') {
//     errorPassword.textContent = 'Por favor, ingresa tu contraseña.';
//     return false;
//   } else {
//     errorPassword.textContent = '';
//     return true;
//   }
// }