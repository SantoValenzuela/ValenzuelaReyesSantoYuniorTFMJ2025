// Configuración de documentos PDF
const documents = [
  {
    id: "arbol-dir",
    title: "Árbol de Directorios y Archivos",
    description: "Creación de árbol de directorios en Windows y comandos asociados.",
    src: "docs/SantoValenzuelaACArbolDiryarS7.pdf",
    pages: 10,          // ← pon el total real
    date: "2025-06-05"
  },
  {
    id: "control-lectura-ia",
    title: "Control de Lectura – IA (S5)",
    description: "Reflexión sobre Inteligencia Artificial e implicaciones éticas.",
    src: "docs/SantoValenzuelaACCoLeIAS5.pdf",
    pages: 8,
    date: "2025-06-10"
  },
  {
    id: "alu",
    title: "Función del ALU (S6)",
    description: "Operaciones aritmético‑lógicas, suma, resta, multiplicación y división.",
    src: "docs/SantoValenzuelaACFuALUS6.pdf",
    pages: 6,
    date: "2025-06-12"
  },
  {
    id: "iot-ia",
    title: "IoT y la IA (S3)",
    description: "Industria 4.0, fábricas inteligentes y desafíos éticos.",
    src: "docs/SantoValenzuelaACIAS3.pdf",
    pages: 7,
    date: "2025-05-28"
  },
  {
    id: "investigacion-entorno",
    title: "Investigación según Entorno / Necesidad",
    description: "Comparativa de procesadores, placas y PCs de alto rendimiento.",
    src: "docs/SantoValenzuelaACInSeEnNeS4.pdf",
    pages: 14,
    date: "2025-06-18"
  },
  {
    id: "memoria",
    title: "Jerarquía de Memoria (S5)",
    description: "Registros, caché, RAM y almacenamiento: niveles y tiempos de acceso.",
    src: "docs/SantoValenzuelaACMemoriaS5.pdf",
    pages: 12,
    date: "2025-06-20"
  },
  {
    id: "power-supply",
    title: "Power Supply (S6)",
    description: "Voltajes ATX, medición y tolerancias de una fuente de poder.",
    src: "docs/SantoValenzuelaACPoSupplyS6.pdf",
    pages: 9,
    date: "2025-06-22"
  },
  {
    id: "prueba-comandos",
    title: "Prueba de Comandos DOS (S8)",
    description: "Listado, explicación y evidencias de comandos CMD útiles.",
    src: "docs/SantoValenzuelaACPrComandosS8.pdf",
    pages: 11,
    date: "2025-07-01"
  },
  {
    id: "tarea-comandos",
    title: "Tarea – Comandos Windows (S7)",
    description: "Fecha de instalación, uptime, MAC y variables de entorno.",
    src: "docs/SantoValenzuelaACTaComandoS7.pdf",
    pages: 6,
    date: "2025-06-28"
  },
  {
    id: "video",
    title: "Proyecto de Video (S7)",
    description: "Enlace y explicación del video final de la asignatura.",
    src: "docs/SantoValenzuelaACVídeosS7.pdf",
    pages: 2,
    date: "2025-07-05"
  }
];


// Variables globales
let currentPages = {};
let animationIntervals = {};

// Función para generar página aleatoria
function getRandomPage(maxPages) {
    return Math.floor(Math.random() * maxPages) + 1;
}

// Función para crear una tarjeta de documento
function createDocumentCard(doc) {
    const currentPage = getRandomPage(doc.pages);
    currentPages[doc.id] = currentPage;
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return `
        <div class="document-card fade-in">
            <div class="document-preview">
                <iframe 
                    id="${doc.id}" 
                    class="document-iframe"
                    src="${doc.src}#page=${currentPage}" 
                    title="${doc.title}"
                    loading="lazy">
                </iframe>
                <div class="document-overlay"></div>
            </div>
            <div class="document-info">
                <h3 class="document-title">${doc.title}</h3>
                <p class="document-description">${doc.description}</p>
                <div class="document-meta">
                    <span class="document-date">${formatDate(doc.date)}</span>
                    <span class="page-indicator" id="page-${doc.id}">
                        Página ${currentPage} de ${doc.pages}
                    </span>
                </div>
            </div>
        </div>
    `;
}

// Función para actualizar la página de un documento
function updateDocumentPage(doc) {
    const iframe = document.getElementById(doc.id);
    const pageIndicator = document.getElementById(`page-${doc.id}`);
    
    if (iframe && pageIndicator) {
        const newPage = getRandomPage(doc.pages);
        currentPages[doc.id] = newPage;
        
        // Efecto de transición suave
        iframe.style.opacity = '0.7';
        iframe.style.transform = 'scale(0.98)';
        
        setTimeout(() => {
            iframe.src = `${doc.src}#page=${newPage}`;
            pageIndicator.textContent = `Página ${newPage} de ${doc.pages}`;
            
            setTimeout(() => {
                iframe.style.opacity = '1';
                iframe.style.transform = 'scale(1)';
            }, 300);
        }, 150);
    }
}

// Función para actualizar todas las páginas
function updateAllDocuments() {
    documents.forEach(doc => updateDocumentPage(doc));
}

// Función para inicializar la sección de documentos
function initializeDocuments() {
    const documentsGrid = document.getElementById('documentsGrid');
    
    if (documentsGrid) {
        // Generar todas las tarjetas
        documentsGrid.innerHTML = documents.map(doc => createDocumentCard(doc)).join('');
        
        // Iniciar la actualización automática cada 2 segundos
        setInterval(updateAllDocuments, 2000);
        
        // Agregar efecto de hover personalizado
        const documentCards = document.querySelectorAll('.document-card');
        documentCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Función para el menú hamburguesa
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
}

// Función para scroll suave y efectos de navegación
function initializeScrollEffects() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Efecto de navbar al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        }
    });

    // Destacar enlace activo basado en la sección visible
    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-50px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeLink = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
                
                navLinks.forEach(link => link.classList.remove('active'));
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
}

// Función para animaciones de entrada
function initializeAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(element => {
        animationObserver.observe(element);
    });
}

// Función para efectos de parallax suave
function initializeParallaxEffects() {
    const heroParticles = document.querySelector('.hero-particles');
    
    if (heroParticles) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroParticles.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }
}

// Función para efectos de typing en el título
// Efecto de máquina de escribir corregido
function initializeTypingEffect() {
    const gradientSpan = document.querySelector('.gradient-text');
    const subtitleSpan = document.querySelector('.hero-subtitle');

    if (!gradientSpan || !subtitleSpan || gradientSpan.classList.contains('typed')) return;

    // Texto original
    const nameText = gradientSpan.textContent.trim();
    const lastNameText = subtitleSpan.textContent.trim();

    // Limpiar los spans
    gradientSpan.textContent = '';
    subtitleSpan.textContent = '';
    gradientSpan.classList.add('typed');

    // Helpers
    const type = (el, text, i = 0, delay = 70, cb) => {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            setTimeout(() => type(el, text, i + 1, delay, cb), delay);
        } else if (cb) {
            setTimeout(cb, 400); // pequeña pausa entre líneas
        }
    };

    // Lanzar animación: primero nombre, luego apellido
    type(gradientSpan, nameText, 0, 60, () => type(subtitleSpan, lastNameText, 0, 60));
}


// Función para efectos de contador en números
function initializeCounterEffects() {
    const counters = document.querySelectorAll('.outcome-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent);
        counter.textContent = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let current = 0;
                    const increment = target / 20;
                    
                    const updateCounter = () => {
                        if (current < target) {
                            current += increment;
                            counter.textContent = Math.floor(current).toString().padStart(2, '0');
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target.toString().padStart(2, '0');
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

// Función para manejar errores de carga de PDFs
function handlePDFErrors() {
    const iframes = document.querySelectorAll('.document-iframe');
    
    iframes.forEach(iframe => {
        iframe.addEventListener('error', () => {
            const card = iframe.closest('.document-card');
            const preview = card.querySelector('.document-preview');
            
            preview.innerHTML = `
                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--text-muted); background: var(--bg-secondary);">
                    <i class="fas fa-file-pdf" style="font-size: 48px; margin-bottom: 20px; color: var(--primary-color);"></i>
                    <p style="text-align: center; margin: 0;">PDF no disponible</p>
                    <p style="text-align: center; margin: 5px 0 0 0; font-size: 0.9rem;">El documento se cargará cuando esté disponible</p>
                </div>
            `;
        });
    });
}

// Función para optimizar rendimiento
function optimizePerformance() {
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // Debounce para eventos de scroll
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Lógica de scroll optimizada
        }, 10);
    });
}

// Función principal de inicialización
function initialize() {
    // Verificar que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
        return;
    }

    // Inicializar todas las funcionalidades
    initializeDocuments();
    initializeNavigation();
    initializeScrollEffects();
    initializeAnimations();
    initializeParallaxEffects();
    initializeTypingEffect();
    initializeCounterEffects();
    handlePDFErrors();
    optimizePerformance();

    // Mostrar mensaje de carga completada
    console.log('🚀 Portafolio cargado exitosamente!');
    console.log('📄 Documentos configurados:', documents.length);
    console.log('🔄 Actualización automática cada 2 segundos');
}

// Función para limpiar recursos al salir de la página
window.addEventListener('beforeunload', () => {
    // Limpiar intervalos
    Object.values(animationIntervals).forEach(interval => {
        clearInterval(interval);
    });
});

// Inicializar la aplicación
initialize();

// Exportar funciones para uso en consola (desarrollo)
window.portfolioApp = {
    updateAllDocuments,
    documents,
    currentPages
};