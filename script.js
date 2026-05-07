// Canvas and Scroll Animation
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');
const heroContainer = document.getElementById('hero-container');
const loadingScreen = document.getElementById('loading-screen');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Frame configuration
const frameCount = 75;
const images = [];
let imagesLoaded = 0;

// Load all frames
function loadImages() {
    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        const frameId = i.toString().padStart(4, '0');
        img.src = `images/sequence/${frameId}.png`;
        
        img.onload = () => {
            images[i] = img;
            imagesLoaded++;
            
            // Hide loading screen when all images are loaded
            if (imagesLoaded === frameCount) {
                loadingScreen.classList.add('hidden');
                renderFrame(0);
            }
        };
        
        // If image fails to load, use placeholder
        img.onerror = () => {
            imagesLoaded++;
            if (imagesLoaded === frameCount) {
                loadingScreen.classList.add('hidden');
                drawPlaceholder();
            }
        };
    }
}

// Draw placeholder if images don't load
function drawPlaceholder() {
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Create a gradient background
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#1a1a2e');
    gradient.addColorStop(0.5, '#16213e');
    gradient.addColorStop(1, '#0f3460');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Render specific frame
function renderFrame(index) {
    if (!images[index]) {
        drawPlaceholder();
        return;
    }
    
    const img = images[index];
    
    // Calculate aspect ratio for cover effect
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (imgRatio > canvasRatio) {
        drawHeight = canvas.height;
        drawWidth = img.width * (canvas.height / img.height);
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    } else {
        drawWidth = canvas.width;
        drawHeight = img.height * (canvas.width / img.width);
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    }
    
    // Clear and draw
    ctx.fillStyle = '#121212';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

// Scroll animation
let ticking = false;

function updateOnScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const maxScroll = heroContainer.offsetHeight - window.innerHeight;
    const scrollFraction = Math.min(scrollTop / maxScroll, 1);
    
    // Update canvas frame
    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );
    renderFrame(frameIndex);
    
    // Update overlay sections
    updateOverlaySections(scrollFraction);
    
    ticking = false;
}

function onScroll() {
    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}

// Overlay section animations
function updateOverlaySections(progress) {
    const section1 = document.getElementById('section-1');
    const section2 = document.getElementById('section-2');
    const section3 = document.getElementById('section-3');
    
    // Section 1: 0.05 - 0.2
    if (progress >= 0.05 && progress <= 0.2) {
        section1.classList.add('active');
    } else {
        section1.classList.remove('active');
    }
    
    // Section 2: 0.3 - 0.45
    if (progress >= 0.3 && progress <= 0.45) {
        section2.classList.add('active');
    } else {
        section2.classList.remove('active');
    }
    
    // Section 3: 0.6 - 0.75
    if (progress >= 0.6 && progress <= 0.75) {
        section3.classList.add('active');
    } else {
        section3.classList.remove('active');
    }
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Observe project cards
document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Initialize
window.addEventListener('scroll', onScroll);
loadImages();

// Handle resize
window.addEventListener('resize', () => {
    resizeCanvas();
    updateOnScroll();
});

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
