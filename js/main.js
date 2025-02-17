// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Hero Slider
const slides = [
    {
        image: "images/slider/organic-rice.jpg"
    },
    {
        image: "images/slider/mixed-lentils.jpg"
    },
    {
        image: "images/slider/quinoa-grains.jpg"
    },
    {
        image: "images/slider/fresh-beans.jpg"
    }
];

let currentSlide = 0;
const slider = document.querySelector('.slider');
const prevArrow = document.querySelector('.prev-arrow');
const nextArrow = document.querySelector('.next-arrow');

// Clear existing slides
slider.innerHTML = '';

// Create slides
slides.forEach((slide, index) => {
    const slideDiv = document.createElement('div');
    slideDiv.className = `slide ${index === 0 ? 'active' : ''}`;
    
    const img = document.createElement('img');
    img.src = slide.image;
    img.alt = 'Healthy Grains Product';
    
    // Debug image loading
    img.addEventListener('load', function() {
        console.log(`Image loaded successfully: ${slide.image}`);
        slideDiv.classList.add('image-loaded');
    });
    
    img.addEventListener('error', function(e) {
        console.error(`Error loading image: ${slide.image}`);
        console.error(e);
        slideDiv.classList.add('image-error');
        // Fallback background color
        slideDiv.style.backgroundColor = '#f0f0f0';
    });
    
    slideDiv.appendChild(img);
    slider.appendChild(slideDiv);
});

// Create dots
const dotsContainer = document.querySelector('.slider-dots');
dotsContainer.innerHTML = ''; // Clear existing dots
slides.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.className = `dot ${index === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    const allSlides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Remove all classes first
    allSlides.forEach(slide => {
        slide.classList.remove('active', 'prev');
    });
    
    // Remove active class from current dot
    dots[currentSlide].classList.remove('active');
    
    // Add classes for animation
    if (index > currentSlide) {
        // Moving forward
        allSlides[currentSlide].classList.add('prev');
    } else {
        // Moving backward
        allSlides[index].style.transform = 'translateX(-100%)';
        setTimeout(() => {
            allSlides[index].style.transform = '';
        }, 50);
    }
    
    currentSlide = index;
    
    // Add active class to new current slide and dot
    allSlides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

// Add click events for arrows
prevArrow.addEventListener('click', prevSlide);
nextArrow.addEventListener('click', nextSlide);

// Auto advance slides
let slideInterval = setInterval(nextSlide, 5000);

// Pause auto-sliding when hovering over slider
slider.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

slider.addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 5000);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Newsletter form submission
const subscribeForm = document.getElementById('subscribe-form');
subscribeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    alert('Thank you for subscribing! You will receive our newsletter at ' + email);
    e.target.reset();
});