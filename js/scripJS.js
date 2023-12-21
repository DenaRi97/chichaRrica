document.addEventListener('DOMContentLoaded', function () {
  const menuBtn = document.getElementById('menu__btn');
  const menuIcon = document.querySelector('.menu__icon i');
  const navUl = document.querySelector('header nav ul');
  const sliderLateral = document.getElementById('sliderLateralContainer');
  const accesoLink = document.getElementById('sliderRojo');
  const logoPrincipal = document.getElementById('logoPrincipal');

  menuBtn.addEventListener('change', () => {
      if (menuBtn.checked) {
          navUl.classList.add('show');
          menuIcon.classList.remove('fa-bars');
          menuIcon.classList.add('fa-times');
          // Cambia el ícono a "x"
      } else {
          navUl.classList.remove('show');
          menuIcon.classList.remove('fa-times');
          menuIcon.classList.add('fa-bars');
          // Restaura el ícono de hamburguesa
      }
  });

  // Cierra el menú cuando se hace clic en un enlace
  navUl.addEventListener('click', () => {
      menuBtn.checked = false;
      navUl.classList.remove('show');
  });

  // Mostrar el slider lateral y ocultar el logo al hacer clic en el enlace "ACCESO"
  accesoLink.addEventListener('click', (event) => {
      event.preventDefault();
      sliderLateral.classList.toggle('show-slider');
      if (logoPrincipal.style.opacity === '' || logoPrincipal.style.opacity === '1') {
          logoPrincipal.style.opacity = '0';
      } else {
          logoPrincipal.style.opacity = '1';
      }
  });

  // Oculta el slider lateral cuando se hace clic en el enlace con la clase "navicon"
  const naviconLink = document.querySelector('.navicon');
  naviconLink.addEventListener('click', () => {
      sliderLateral.classList.remove('show-slider');
      logoPrincipal.style.opacity = '1';
  });
});

// Validacion de formulario index

function validarFormulario() {
    var nombre = document.getElementById("nombre");
    var email = document.getElementById("email");
    var mensaje = document.getElementById("mensaje");
    var alertDiv = document.getElementById("formulario__alert");

    // Resetear estilos y contenido del div
    nombre.classList.remove("invalid");
    email.classList.remove("invalid");
    mensaje.classList.remove("invalid");
    alertDiv.innerHTML = '';

    // Validación del nombre (puede personalizarse según tus necesidades)
    if (nombre.value === '') {
      alertDiv.innerHTML = 'Por favor, ingresa tu nombre.';
      nombre.classList.add("invalid");
      return;
    }

    // Validación del correo electrónico
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
      alertDiv.innerHTML = 'Por favor, ingresa un correo electrónico válido.';
      email.classList.add("invalid");
      return;
    }

    // Validación del mensaje
    if (mensaje.value === '') {
      alertDiv.innerHTML = 'Por favor, ingresa tu mensaje.';
      mensaje.classList.add("invalid");
      return;
    }

    // Si llegamos aquí, todos los campos son válidos
    alertDiv.innerHTML = 'Formulario enviado correctamente!';
    // Cerrar la ventana lateral solo si la validación es exitosa
    cerrarVentana();
  }

  function cerrarVentana() {
      // Limpiar campos del formulario
    document.getElementById("nombre").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mensaje").value = "";
    // Oculta la clase 'show-slider' en lugar de establecer 'display: none'
    document.getElementById("sliderLateralContainer").classList.remove('show-slider');
    // También puedes restaurar la opacidad del logo si es necesario
    document.getElementById("logoPrincipal").style.opacity = '1';
      // Limpiar el contenido del mensaje de alerta
    document.getElementById("formulario__alert").innerHTML = '';
  }
  