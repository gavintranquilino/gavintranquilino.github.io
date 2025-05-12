const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");
const themeToggle = document.querySelector(".theme-toggle");
const topButton = document.querySelector(".to-top");

document.addEventListener("DOMContentLoaded", function () {
  function insertComponent(componentName, placeholderId) {
    const placeholder = document.getElementById(placeholderId);

    fetch(`placeholders/${componentName}.html`)
      .then((response) => response.text())
      .then((html) => {
        placeholder.innerHTML = html;
      });
  }

  insertComponent("footer", "footer-placeholder");
});

topButton.style.display = "none"; // remove back to top button by default

// navigation screen toggle
navToggle.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    document.body.classList.remove("nav-open");
  });
});

// Back to top Button
var pixelScroll = 500;

window.onscroll = function () {
  scrollFunction();
};
function scrollFunction() {
  if (
    document.body.scrollTop > pixelScroll ||
    document.documentElement.scrollTop > pixelScroll
  ) {
    topButton.style.display = "block";
  } else {
    topButton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Theme changer
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-theme");
});

// Slideshow STUFF
// Query all unique slideshow classes
let slideContainers = document.querySelectorAll(".slideshow-container");
let slideIndex = Array(slideContainers.length).fill(1); // Initialize the slide index for each slideshow dynamically
let slideId = [];

slideContainers.forEach((container, index) => {
  // Find slides within each container and add their class to the slideId array
  let slides = container.querySelectorAll('[class^="slides"]');
  if (slides.length > 0) {
    slideId.push(slides[0].classList[0]); // Assuming all slides in a container share the same class
  }
});

// Initialize all slideshows
for (let i = 0; i < slideId.length; i++) {
  showSlides(1, i);
}

showSlides(1, 2);

// Arrow controls
function plusSlides(n, no) {
  showSlides((slideIndex[no] += n), no);
}

// Dots controls
function currentSlide(n, no) {
  showSlides((slideIndex[no] += n), no);
}

function showSlides(n, no) {
  let i;
  let x = document.getElementsByClassName(slideId[no]);
  if (n > x.length) {
    slideIndex[no] = 1;
  }
  if (n < 1) {
    slideIndex[no] = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  x[slideIndex[no] - 1].style.display = "block";
}
