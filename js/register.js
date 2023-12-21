document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.querySelector('.formulario form');

    formulario.addEventListener('submit', function (event) {
      // Validaciones antes de enviar el formulario
      if (!validarNombre() || !validarEmail() || !validarPassword()) {
        // Si alguna validación falla, evitamos el envío del formulario
        event.preventDefault();
      }
    });

    function validarNombre() {
      var nombre = document.getElementById('nombre').value.trim();
      var errorNombre = document.getElementById('errorNombre');
      if (nombre === '') {
        errorNombre.textContent = 'Por favor, ingresa tu nombre.';
        return false;
      } else {
        errorNombre.textContent = '';
        return true;
      }
    }

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