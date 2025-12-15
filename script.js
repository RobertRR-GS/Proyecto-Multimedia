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
        const modalesAbiertos = document.querySelectorAll('.recipe-full.active');
        if (modalesAbiertos.length === 0) {
            document.body.classList.remove('modal-open');
        }
    }
}

function expandVideo(videoUrl) {
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

// Función reutilizable que acepta los IDs como parámetros
function configurarVideo(idVideo, idBotonPlay, idBotonPause) {
    const video = document.getElementById(idVideo);
    const btnPlay = document.getElementById(idBotonPlay);
    const btnPause = document.getElementById(idBotonPause);
    if (video && btnPlay && btnPause) {
        
        btnPlay.addEventListener('click', function() {
            video.play();
        });

        btnPause.addEventListener('click', function() {
            video.pause();
        });
        
        console.log(`Video configurado: ${idVideo}`);
    }
}

// Inicializar TODOS los videos
document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Chocolate
    configurarVideo('video-chocolate', 'btn-play-choco', 'btn-pause-choco');
    
    // 2. Vainilla (Cupcakes)
    configurarVideo('video-vainilla', 'btn-play-vainilla', 'btn-pause-vainilla');
    
    // 3. Galletas
    configurarVideo('video-galletas', 'btn-play-galletas', 'btn-pause-galletas');
    
    // 4. Torta de Vainilla Esponjosa 
    
    configurarVideo('video-vainilla-esponjosa', 'btn-play-esponjosa', 'btn-pause-esponjosa');
    
    // 5. Tres Leches 
    configurarVideo('video-tresleches', 'btn-play-tresleches', 'btn-pause-tresleches');
    
    // 6. Negra Navideña 
    configurarVideo('video-torta-negra', 'btn-play-negra', 'btn-pause-negra');
});

// Lógica de Pantalla de Carga ---

window.addEventListener('load', function() {
    const loader = document.getElementById('loader');
    
    setTimeout(function() {
        if (loader) {
            loader.classList.add('loader-hidden');
            setTimeout(() => {
                loader.remove();
            }, 500);
        }
    }, 2000); 
});