import "./styles.css";

console.log("Carousel: Ready to add interactivity! 🎠");

// Get references to the elements we need
const carouselContainer = document.getElementById("middle-carousel");
const carouselNextButton = document.getElementById("middle-next");
const carouselPrevButton = document.getElementById("middle-prev");
const carouselDots = document.getElementById("middle-dots");

// Track which slide we're on (start at 0 = first slide)
let currentSlide = 0;
const totalSlides = 3; // We have 3 slides

// Timer Management
let autoAdvanceTimer = null; // Will store the timer ID for auto-advancing

// Function to start auto-advancing (only if not at last slide)
function startAutoAdvance() {
    // Don't start if already at last slide
    if (currentSlide >= totalSlides - 1) {
        console.log("At last slide - auto-advance not started");
        return;
    }

    // Clear any existing timer first (prevent multiple timers)
    stopAutoAdvance();

    // Start new timer: advance every 2 seconds (2000ms)
    autoAdvanceTimer = setInterval(() => {
        console.log("Auto-advancing...");

        // Move to next slide
        if (currentSlide < totalSlides - 1) {
            goToSlide(currentSlide + 1);
        } else {
            // Reached last slide - stop auto-advance
            stopAutoAdvance();
            console.log("Reached last slide - auto-advance stopped");
        }
    }, 2000); // 2000ms = 2 seconds

    console.log("Auto-advance started!");
}

// Function to stop auto-advancing
function stopAutoAdvance() {
    if (autoAdvanceTimer) {
        clearInterval(autoAdvanceTimer);
        autoAdvanceTimer = null;
        console.log("Auto-advance stopped!");
    }
}

// Function to reset the timer (stop and start again)
function resetAutoAdvance() {
    stopAutoAdvance();
    startAutoAdvance(); // Will only start if not at last slide
    console.log("Auto-advance reset!");
}

// Function to move to a specific slide
function goToSlide(slideIndex) {
    // Calculate how far to move (each slide is 100% width)
    const moveAmount = slideIndex * -100; // -100%, -200%, etc.

    // Apply the transform to move the container
    carouselContainer.style.transform = `translateX(${moveAmount}%)`;

    // Update our current slide tracker
    currentSlide = slideIndex;

    // Update the dots to show active state
    updateDots();

    // Log for debugging
    console.log(`Moved to slide ${currentSlide + 1}, position: ${moveAmount}%`);
}

// Next button - move to next slide
carouselNextButton.addEventListener("click", () => {
    console.log("Next button clicked!");

    // Move to next slide (but don't go past the last slide)
    if (currentSlide < totalSlides - 1) {
        goToSlide(currentSlide + 1);
    } else {
        // Optional: wrap around to first slide
        goToSlide(0);
    }

    // Reset the auto-advance timer (will only start if not at last slide)
    resetAutoAdvance();
});

// Previous button - move to previous slide
carouselPrevButton.addEventListener("click", () => {
    console.log("Previous button clicked!");

    // Move to previous slide (but don't go before first slide)
    if (currentSlide > 0) {
        goToSlide(currentSlide - 1);
    } else {
        // Optional: wrap around to last slide
        goToSlide(totalSlides - 1);
    }

    // Reset the auto-advance timer (will only start if not at first slide)
    resetAutoAdvance();
});

// Function to create navigation dots
function createDots() {
    // Clear any existing dots
    carouselDots.innerHTML = "";

    // Create one dot for each slide
    for (let i = 0; i < totalSlides; i += 1) {
        const dot = document.createElement("button");
        dot.classList.add("h-3", "w-3", "rounded-full", "border", "border-gray-900", "bg-white", "hover:bg-gray-900");
        carouselDots.appendChild(dot);

        // Add click event listener to each dot
        dot.addEventListener("click", () => {
            goToSlide(i);
            resetAutoAdvance();
        });

        console.log(`Created dot for slide ${i + 1}`);
    }
}

function updateDots() {
    // Get all dot buttons
    const dots = carouselDots.querySelectorAll("button");

    // Loop thorugh all dots
    dots.forEach((dot, index) => {
        // Remove active state from all dots
        dot.classList.remove("bg-gray-900");

        // Add active state to the current dot
        if (index === currentSlide) {
            dot.classList.add("bg-gray-900");
        }
    });

    console.log(`Dot ${currentSlide + 1} is now active`);
}

// Initialize auto-advance when page loads
startAutoAdvance();
// Initialize createDots function
createDots();
updateDots();
