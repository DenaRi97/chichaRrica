document.addEventListener('DOMContentLoaded', function () {
    var formulario = document.querySelector('.formulario form');

    formulario.addEventListener('submit', function (event) {
        // Validaciones antes de enviar el formulario
        if (!validarEmail() || !validarPassword() || !validarName()) {
            // Si alguna validación falla, evitamos el envío del formulario
            event.preventDefault();
        } else {
            // Si las validaciones son exitosas, mostramos la ventana modal
            mostrarModal();
            // Evitamos el envío del formulario
            event.preventDefault();
        }
    });

    function validarEmail() {
        var email = document.getElementById('correo').value.trim();
        if (email === '') {
            alert('Ingresa un correo electrónico válido.');
            return false;
        }

        // Validar el formato del correo electrónico
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Correo electrónico no válido.');
            return false;
        }

        return true;
    }

    function validarPassword() {
        var password = document.getElementById('password').value.trim();
        if (password === '') {
            alert('Por favor, ingresa tu contraseña.');
            return false;
        }

        // Validar la fortaleza de la contraseña (puedes personalizar estos criterios)
        var strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
        if (!strongPasswordRegex.test(password)) {
            alert('La contraseña debe contener al menos 8 caracteres, una letra minúscula, una letra mayúscula y un número.');
            return false;
        }

        return true;
    }

    function validarName() {
        var nombre = document.getElementById('nombre').value.trim();
        if (nombre === '') {
            alert('Por favor, ingresa tu nombre.');
            return false;
        }

        return true;
    }

    //Modal
    function mostrarModal() {
        var modal = document.getElementById('modal__gracias');
        modal.style.display = 'block';
    }

    function cerrarModal() {
        var modal = document.getElementById('modal__gracias');
        modal.style.display = 'none';
    }

    function galeria() {
        window.location.href = "../templates/gallery.html";
    }
});
