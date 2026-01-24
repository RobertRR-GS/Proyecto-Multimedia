/* ESTRUCTURA MODULAR - FASE 4*/

const App = {
    // Inicialización principal
    init: function() {
        console.log("Iniciando aplicación...");
        
        try {
            // Iniciamos los módulos
            this.Loader.init();
            this.Navegacion.init();
            this.Modales.init();
            this.Multimedia.init();
            
            this.iniciarValidaciones();
            
        } catch (error) {
            console.error("⚠️ Error crítico al iniciar:", error.message);
        }
    },

    //Módulo de Pantalla de Carga
    Loader: {
        init: function() {
            const loader = document.getElementById('loader');
            if (loader) {

                setTimeout(() => {
                    loader.classList.add('loader-hidden');
                    setTimeout(() => {
                        if (loader.parentNode) {
                            loader.remove();
                        }
                    }, 500);
                }, 2000); 
            }
        }
    },

    // Módulo de Navegación
    Navegacion: {
        init: function() {
            this.configurarEnlaces();
            this.mostrarSeccion('inicio');
        },

        configurarEnlaces: function() {
            const enlaces = document.querySelectorAll('nav a');
            enlaces.forEach(enlace => {
                enlace.addEventListener('click', (e) => {
                    e.preventDefault();
                    const seccionId = enlace.getAttribute('data-section');
                    this.mostrarSeccion(seccionId);
                    
                    enlaces.forEach(l => l.classList.remove('active'));
                    enlace.classList.add('active');
                });
            });
        },

        mostrarSeccion: function(seccionId) {
            const secciones = document.querySelectorAll('.section');
            const seccionActiva = document.getElementById(seccionId);
            
            if (!seccionActiva) return;

            secciones.forEach(s => s.classList.remove('active'));
            seccionActiva.classList.add('active');
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            const header = document.querySelector('header');
            if(header) header.classList.remove('scrolled');
        }
    },

    // Módulo de Modales 
    Modales: {
        init: function() {
            this.configurarApertura();
            this.configurarCierre();
        },

        configurarApertura: function() {
            const botones = document.querySelectorAll('.toggle-btn');
            botones.forEach(boton => {
                boton.addEventListener('click', () => {
                    const targetId = boton.getAttribute('data-target');
                    this.abrir(targetId);
                });
            });
        },

        configurarCierre: function() {
            document.querySelectorAll('.close-modal-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const modalId = e.target.closest('.recipe-full').id;
                    this.cerrar(modalId);
                });
            });

            window.addEventListener('click', (e) => {
                if (e.target.classList.contains('recipe-full')) {
                    this.cerrar(e.target.id);
                }
            });
        },

        abrir: function(id) {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.add('active');
                document.body.classList.add('modal-open');
            }
        },

        cerrar: function(id) {
            const modal = document.getElementById(id);
            if (modal) {
                modal.classList.remove('active');
                const video = modal.querySelector('video');
                if(video) video.pause();
                
                if (document.querySelectorAll('.recipe-full.active').length === 0) {
                    document.body.classList.remove('modal-open');
                }
            }
        }
    },

    // Módulo Multimedia 
    Multimedia: {
        init: function() {
            const videosConfig = [
                { id: 'video-chocolate', playBtn: 'btn-play-choco', pauseBtn: 'btn-pause-choco' },
                { id: 'video-vainilla', playBtn: 'btn-play-vainilla', pauseBtn: 'btn-pause-vainilla' },
                { id: 'video-galletas', playBtn: 'btn-play-galletas', pauseBtn: 'btn-pause-galletas' },
                { id: 'video-vainilla-esponjosa', playBtn: 'btn-play-esponjosa', pauseBtn: 'btn-pause-esponjosa' },
                { id: 'video-tresleches', playBtn: 'btn-play-tresleches', pauseBtn: 'btn-pause-tresleches' },
                { id: 'video-torta-negra', playBtn: 'btn-play-negra', pauseBtn: 'btn-pause-negra' }
            ];

            videosConfig.forEach(config => {
                this.configurarVideo(config.id, config.playBtn, config.pauseBtn);
            });
            
            this.iniciarEfectosVisuales();
        },

        configurarVideo: function(idVideo, idPlay, idPause) {
            const video = document.getElementById(idVideo);
            const btnPlay = document.getElementById(idPlay);
            const btnPause = document.getElementById(idPause);

            if (video && btnPlay && btnPause) {
                btnPlay.addEventListener('click', () => video.play());
                btnPause.addEventListener('click', () => video.pause());
            }
        },
        
        iniciarEfectosVisuales: function() {
            window.addEventListener('scroll', () => {
                const header = document.querySelector('header');
                if (window.scrollY > 50) header.classList.add('scrolled');
                else header.classList.remove('scrolled');
            });

            setTimeout(() => {
                const toast = document.getElementById('promo-toast');
                if (toast) toast.classList.add('mostrar');
            }, 3000);
        }
    },
    
    iniciarValidaciones: function() {
        if (typeof configurarBusqueda === 'function') configurarBusqueda();
        if (typeof configurarCalculadora === 'function') configurarCalculadora();
        if (typeof configurarFormularioContacto === 'function') configurarFormularioContacto();
    }
};

// Iniciar App
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    
    window.cerrarPromo = function() {
        const toast = document.getElementById('promo-toast');
        if (toast) toast.classList.remove('mostrar');
    };
});