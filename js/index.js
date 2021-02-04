const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav__link');
const themeToggle = document.querySelector(".theme-toggle");
const topButton = document.querySelector('.to-top');

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
themeToggle.addEventListener('click', () => {
	document.body.classList.toggle('dark-theme');
});