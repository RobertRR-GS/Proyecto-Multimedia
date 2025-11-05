// Navegación SPA
document.addEventListener('DOMContentLoaded', function() {
    // Mostrar sección inicial
    mostrarSeccion('inicio');
    
    // Configurar navegación
    configurarNavegacion();
    
    // Configurar botones de toggle
    configurarBotonesToggle();
});

function configurarNavegacion() {
    const enlaces = document.querySelectorAll('nav a');
    
    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            
            const seccion = this.getAttribute('data-section');
            mostrarSeccion(seccion);
            
            // Actualizar clase activa en navegación
            enlaces.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

function mostrarSeccion(seccionId) {
    // Ocultar todas las secciones
    const secciones = document.querySelectorAll('.section');
    secciones.forEach(seccion => {
        seccion.classList.remove('active');
    });
    
    // Mostrar sección seleccionada
    const seccionActiva = document.getElementById(seccionId);
    if (seccionActiva) {
        seccionActiva.classList.add('active');
        
        // Scroll suave al inicio de la sección
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

function configurarBotonesToggle() {
    const botones = document.querySelectorAll('.toggle-btn');

    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const elemento = document.getElementById(targetId);

            if (elemento) {
                // Mostrar modal y añadir clase al body
                elemento.classList.add('active');
                document.body.classList.add('modal-open');
            }
        });
    });
}

function closeRecipeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        // Remover clase del body solo si no hay otros modales abiertos
        const modalesAbiertos = document.querySelectorAll('.recipe-full.active');
        if (modalesAbiertos.length === 0) {
            document.body.classList.remove('modal-open');
        }
    }
}

function expandVideo(videoUrl) {
    // Crear modal de video
    const videoModal = document.createElement('div');
    videoModal.className = 'video-modal';
    videoModal.innerHTML = `
        <div class="video-container">
            <iframe src="${videoUrl}" allowfullscreen></iframe>
        </div>
        <button class="close-btn" onclick="closeVideoModal()">×</button>
    `;
    document.body.appendChild(videoModal);
    videoModal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeVideoModal() {
    const videoModal = document.querySelector('.video-modal');
    if (videoModal) {
        videoModal.remove();
        // Remover clase del body
        document.body.classList.remove('modal-open');
    }
}

// Cerrar modal al hacer clic fuera del contenido
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('recipe-full')) {
        const modalId = e.target.id;
        closeRecipeModal(modalId);
    }
});

// Función auxiliar para simular carga de contenido
function cargarContenidoDinamico(seccion, contenido) {
    const elemento = document.getElementById(seccion);
    if (elemento) {
        elemento.innerHTML = contenido;
    }
}