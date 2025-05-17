const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const themeToggle = document.querySelector(".theme-toggle");
const topButton = document.querySelector('.to-top');

document.addEventListener("DOMContentLoaded", function() {
    function insertComponent(componentName, placeholderId) {
        const placeholder = document.getElementById(placeholderId);

        fetch(`placeholders/${componentName}.html`)
            .then(response => response.text())
            .then(html => {
                placeholder.innerHTML = html;
            });
    }

    insertComponent("footer", "footer-placeholder");
});

topButton.style.display = "none"; // remove back to top button by default

// navigation screen toggle
navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    })
})

// Back to top Button
var pixelScroll = 500;

window.onscroll = function() {scrollFunction()};
function scrollFunction() {
	if (document.body.scrollTop > pixelScroll || document.documentElement.scrollTop > pixelScroll) {
		topButton.style.display = 'block';
	} else {
		topButton.style.display = 'none';
	}
}

function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

// Theme changer
themeToggle.addEventListener("click", () => {
	document.body.classList.toggle("dark-theme");
	
	// Toggle icon
	const icon = themeToggle.querySelector(".sun-moon i");
	if (document.body.classList.contains("dark-theme")) {
		icon.classList.remove("fa-cloud-sun");
		icon.classList.add("fa-moon");
	} else {
		icon.classList.remove("fa-moon");
		icon.classList.add("fa-cloud-sun");
	}
});

// -------- SLIDESHOW LOGIC --------
document.addEventListener('DOMContentLoaded', () => {
    const slideshowContainers = document.querySelectorAll('.slideshow-container');
    slideshowContainers.forEach((container) => {
        initializeSlideshow(container);
    });
});

function initializeSlideshow(container) {
    const slidesWrapper = container.querySelector('.slides-wrapper');
    const slides = slidesWrapper.querySelectorAll('.slide-item');
    const dotsContainer = container.querySelector('.dots-container');
    const prevButton = container.querySelector('.prev');
    const nextButton = container.querySelector('.next');
    let slideIndex = 1;

    if (!slides.length) return; // Don't initialize if no slides

    // Create dots
    slides.forEach((_, i) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dot.onclick = () => currentSlide(i + 1);
        dotsContainer.appendChild(dot);
    });
    const dots = dotsContainer.querySelectorAll('.dot');

    function showSlides(n) {
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        slides.forEach(slide => slide.style.display = "none");
        dots.forEach(dot => dot.classList.remove("active"));

        slides[slideIndex - 1].style.display = "block";
        
        // Add or update numbertext dynamically
        let numberTextDiv = slides[slideIndex - 1].querySelector('.numbertext.dynamic-numbertext');
        if (!numberTextDiv) {
            numberTextDiv = document.createElement('div');
            numberTextDiv.classList.add('numbertext', 'dynamic-numbertext');
            // Insert after the img or at a specific place if structure is fixed
            const imgElement = slides[slideIndex - 1].querySelector('img');
            if (imgElement && imgElement.parentNode === slides[slideIndex - 1]) {
                 slides[slideIndex - 1].insertBefore(numberTextDiv, imgElement);
            } else {
                 slides[slideIndex - 1].insertBefore(numberTextDiv, slides[slideIndex - 1].firstChild);
            }
        }
        numberTextDiv.textContent = `${slideIndex} / ${slides.length}`;
        if (dots.length > 0) {
             dots[slideIndex - 1].classList.add("active");
        }
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    if (prevButton) prevButton.onclick = () => plusSlides(-1);
    if (nextButton) nextButton.onclick = () => plusSlides(1);

    showSlides(slideIndex); // Initialize the first slide
}
// -------- END SLIDESHOW LOGIC --------


