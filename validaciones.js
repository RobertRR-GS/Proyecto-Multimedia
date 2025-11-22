// Validación de búsqueda
function configurarBusqueda() {
    const searchInput = document.getElementById('search-recipes');
    const feedback = document.getElementById('search-feedback');
    
    if (searchInput && feedback) {
        searchInput.addEventListener('input', function(e) {
            const valor = e.target.value.trim();
            
            if (valor.length === 0) {
                mostrarFeedback(feedback, 'Escribe algo para buscar recetas', 'info');
                searchInput.classList.remove('input-error', 'input-success');
            } else if (valor.length < 3) {
                mostrarFeedback(feedback, 'Mínimo 3 caracteres para buscar', 'error');
                searchInput.classList.add('input-error');
                searchInput.classList.remove('input-success');
            } else {
                mostrarFeedback(feedback, `Buscando: "${valor}"`, 'success');
                searchInput.classList.add('input-success');
                searchInput.classList.remove('input-error');
                // Simular búsqueda
                simularBusqueda(valor);
            }
        });
    }
}

// Validación de calculadora
function configurarCalculadora() {
    const gramsInput = document.getElementById('grams-input');
    const cupsOutput = document.getElementById('cups-output');
    const convertBtn = document.getElementById('convert-btn');
    const feedback = document.getElementById('grams-feedback');
    
    if (gramsInput && convertBtn) {
        // Validación en tiempo real
        gramsInput.addEventListener('input', function() {
            validarNumero(gramsInput, feedback);
        });
        
        // Conversión al hacer clic
        convertBtn.addEventListener('click', function() {
            if (validarNumero(gramsInput, feedback)) {
                convertirGramosATazas(gramsInput.value, cupsOutput);
            }
        });
        
        // Conversión al presionar Enter
        gramsInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (validarNumero(gramsInput, feedback)) {
                    convertirGramosATazas(gramsInput.value, cupsOutput);
                }
            }
        });
    }
}

// Validación de formulario de contacto
function configurarFormularioContacto() {
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const formFeedback = document.getElementById('form-feedback');
    
    if (contactForm) {
        // Validación en tiempo real
        nameInput.addEventListener('input', () => validarNombre(nameInput));
        emailInput.addEventListener('input', () => validarEmail(emailInput));
        messageInput.addEventListener('input', () => validarMensaje(messageInput));
        
        // Validación al enviar
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nombreValido = validarNombre(nameInput);
            const emailValido = validarEmail(emailInput);
            const mensajeValido = validarMensaje(messageInput);
            
            if (nombreValido && emailValido && mensajeValido) {
                mostrarFeedback(formFeedback, '¡Mensaje enviado correctamente!', 'success');
                contactForm.reset();
                limpiarValidaciones([nameInput, emailInput, messageInput]);
            } else {
                mostrarFeedback(formFeedback, 'Por favor, corrige los errores del formulario', 'error');
            }
        });
    }
}

// Funciones de validación específicas
function validarNumero(input, feedback) {
    const valor = input.value.trim();
    
    if (valor === '') {
        mostrarFeedback(feedback, 'Ingresa una cantidad', 'error');
        input.classList.add('input-error');
        input.classList.remove('input-success');
        return false;
    }
    
    const numero = parseFloat(valor);
    
    if (isNaN(numero) || numero <= 0) {
        mostrarFeedback(feedback, 'Ingresa un número válido mayor a 0', 'error');
        input.classList.add('input-error');
        input.classList.remove('input-success');
        return false;
    }
    
    if (numero > 10000) {
        mostrarFeedback(feedback, 'La cantidad parece muy grande', 'info');
        input.classList.add('input-success');
        input.classList.remove('input-error');
        return true;
    }
    
    mostrarFeedback(feedback, 'Cantidad válida', 'success');
    input.classList.add('input-success');
    input.classList.remove('input-error');
    return true;
}

function validarNombre(input) {
    const feedback = document.getElementById('name-feedback');
    const valor = input.value.trim();
    
    if (valor.length === 0) {
        mostrarFeedback(feedback, 'El nombre es obligatorio', 'error');
        input.classList.add('input-error');
        return false;
    }
    
    if (valor.length < 2) {
        mostrarFeedback(feedback, 'El nombre debe tener al menos 2 caracteres', 'error');
        input.classList.add('input-error');
        return false;
    }
    
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(valor)) {
        mostrarFeedback(feedback, 'El nombre solo puede contener letras', 'error');
        input.classList.add('input-error');
        return false;
    }
    
    mostrarFeedback(feedback, 'Nombre válido', 'success');
    input.classList.add('input-success');
    input.classList.remove('input-error');
    return true;
}

function validarEmail(input) {
    const feedback = document.getElementById('email-feedback');
    const valor = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (valor.length === 0) {
        mostrarFeedback(feedback, 'El email es obligatorio', 'error');
        input.classList.add('input-error');
        return false;
    }
    
    if (!emailRegex.test(valor)) {
        mostrarFeedback(feedback, 'Ingresa un email válido', 'error');
        input.classList.add('input-error');
        return false;
    }
    
    mostrarFeedback(feedback, 'Email válido', 'success');
    input.classList.add('input-success');
    input.classList.remove('input-error');
    return true;
}

function validarMensaje(input) {
    const feedback = document.getElementById('message-feedback');
    const valor = input.value.trim();
    
    if (valor.length === 0) {
        mostrarFeedback(feedback, 'El mensaje es obligatorio', 'error');
        input.classList.add('input-error');
        return false;
    }
    
    if (valor.length < 10) {
        mostrarFeedback(feedback, 'El mensaje debe tener al menos 10 caracteres', 'error');
        input.classList.add('input-error');
        return false;
    }
    
    if (valor.length > 500) {
        mostrarFeedback(feedback, 'El mensaje no puede exceder 500 caracteres', 'error');
        input.classList.add('input-error');
        return false;
    }
    
    mostrarFeedback(feedback, 'Mensaje válido', 'success');
    input.classList.add('input-success');
    input.classList.remove('input-error');
    return true;
}

// Funciones auxiliares
function mostrarFeedback(elemento, mensaje, tipo) {
    if (elemento) {
        elemento.textContent = mensaje;
        elemento.className = 'feedback-message';
        elemento.classList.add(`feedback-${tipo}`);
    }
}

function limpiarValidaciones(inputs) {
    inputs.forEach(input => {
        input.classList.remove('input-error', 'input-success');
        const feedback = document.getElementById(`${input.id}-feedback`);
        if (feedback) {
            feedback.textContent = '';
            feedback.className = 'feedback-message';
        }
    });
}

function convertirGramosATazas(gramos, outputElement) {
    const conversionRate = 0.00422675; // 1 gramo = 0.00422675 tazas (aprox.)
    const tazas = (parseFloat(gramos) * conversionRate).toFixed(2);
    outputElement.value = `${tazas} tazas`;
}

function simularBusqueda(termino) {
    console.log(`Buscando recetas con: ${termino}`);
    // Aquí iría la lógica real de búsqueda
}

// Inicializar todas las validaciones
document.addEventListener('DOMContentLoaded', function() {
    configurarBusqueda();
    configurarCalculadora();
    configurarFormularioContacto();
});