let currentIndex = 0;
const images = document.querySelectorAll('.landing-page img');
const totalImages = images.length;

// Function to show the next image
function showNextImage() {
    images[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % totalImages;
    images[currentIndex].classList.add('active');
}

// Display the first image immediately
images[currentIndex].classList.add('active');

// Start the slideshow after a brief delay
setTimeout(() => {
    setInterval(showNextImage, 3000); // Change image every 3 seconds
}, 100); // Delay to ensure the first image is shown before starting the interval

// Offer phone slideshow
let currentPhoneIndex = 0;
const phoneImages = document.querySelectorAll('.offer .phone img');
const totalPhoneImages = phoneImages.length;

function showNextPhoneImage() {
    phoneImages[currentPhoneIndex].classList.remove('active');
    currentPhoneIndex = (currentPhoneIndex + 1) % totalPhoneImages;
    phoneImages[currentPhoneIndex].classList.add('active');
}

// Display the first phone image immediately
phoneImages[currentPhoneIndex].classList.add('active');

// Start the phone slideshow after a brief delay
setTimeout(() => {
    setInterval(showNextPhoneImage, 3000); // Change image every 3 seconds
}, 100); // Delay to ensure the first image is shown before starting the interval

 // Scroll event for car animation
 const carElement = document.querySelector('.offer .car img');
 window.addEventListener('scroll', () => {
     const carPosition = carElement.getBoundingClientRect().top;
     const screenPosition = window.innerHeight / 1.5;

     if (carPosition < screenPosition) {
         carElement.style.transform = 'scale(1.5)'; // Increase scale as it comes into view
     } else {
         carElement.style.transform = 'scale(1)'; // Reset scale if scrolled past
     }
 });

 document.addEventListener('DOMContentLoaded', function() {
    const readMoreButton = document.querySelector('.read-more');
    const offerContainer = document.querySelector('.offer .container');
    const firstPage = document.querySelector('.first-page');
    const secondPage = document.querySelector('.second-page');

    readMoreButton.addEventListener('click', function() {
        secondPage.style.display = 'block'; // Display the second page
        setTimeout(() => {
            offerContainer.classList.add('show-second-page');
        }, 50); // Delay to ensure display change is processed
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const readMoreButton = document.querySelector('.read-more');
    const backButton = document.querySelector('.back-button');
    const offerContainer = document.querySelector('.offer .container');
    const firstPage = document.querySelector('.first-page');
    const secondPage = document.querySelector('.second-page');

    readMoreButton.addEventListener('click', function() {
        secondPage.style.display = 'block'; // Display the second page
        setTimeout(() => {
            offerContainer.classList.add('show-second-page');
        }, 50); // Delay to ensure display change is processed
    });

    backButton.addEventListener('click', function() {
        offerContainer.classList.remove('show-second-page');
        setTimeout(() => {
            secondPage.style.display = 'none'; // Hide the second page after transition
        }, 1000); // Match this delay with the transition duration
    });
});

//step 1: get DOM
let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel-package");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.querySelector('.carousel-package');
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');
    const exit = document.getElementById('exit');

    // Show full-screen image when a carousel image is clicked
    carousel.addEventListener('click', function (event) {
        if (event.target.tagName === 'IMG') {
            overlay.style.display = 'flex';
            overlayImg.src = event.target.src;
        }
    });

    // Exit full-screen mode
    exit.addEventListener('click', function () {
        overlay.style.display = 'none';
    });

    // Hide overlay when clicking outside the image
    overlay.addEventListener('click', function (event) {
        if (event.target === overlay) {
            overlay.style.display = 'none';
        }
    });
});

setInterval(autoSlide, 3000); // Change slide every 3 seconds

    // Smooth scroll to package section
    document.querySelector('nav a[href="#packages"]').addEventListener('click', function (event) {
        event.preventDefault();
        packageSection.scrollIntoView({ behavior: 'smooth' });
    });


    document.addEventListener('DOMContentLoaded', function() {
        const carContainers = document.querySelectorAll('.car-container div');
        const backgrounds = document.querySelectorAll('.cars-background > div');
    
        function showBackground(carType) {
            // Hide all backgrounds
            backgrounds.forEach(bg => bg.classList.remove('active-bg'));
            
            // Show the corresponding background
            const targetBg = document.querySelector(`.${carType}-bg`);
            if (targetBg) {
                targetBg.classList.add('active-bg');
            }
        }
    
        carContainers.forEach(container => {
            container.addEventListener('click', function() {
                // Get the class of the clicked car container
                const carType = this.className.split(' ')[0];
                
                // Show the corresponding background
                showBackground(carType);
    
                // Remove active class from all car containers
                carContainers.forEach(car => car.classList.remove('active'));
    
                // Add active class to the clicked car container
                this.classList.add('active');
            });
        });
    
        // Show the initial background for the first car type (Innova)
        showBackground('Innova');
    });

// script.js
document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menu-icon');
    const navBar = document.getElementById('nav-bar');

    menuIcon.addEventListener('click', function () {
        if (navBar.style.display === 'block') {
            navBar.style.display = 'none';
        } else {
            navBar.style.display = 'block';
        }
    });
});


