let currentImageIndex = 0;
const images = [
    "image1.jpg",
    "image2.jpg",
    "image3.jpg",
    "image4.jpg",
    "image5.jpg",
    "image6.jpg",
    "image7.jpg",
    "image8.jpg",
    "image9.jpg",
];

// Function to open the image in full screen
function openFullScreen(img) {
    const modal = document.getElementById("fullScreenModal");
    const modalImg = document.getElementById("fullScreenImage");
    modal.style.display = "flex";
    modalImg.src = img.src;
    modalImg.style.transform = "scale(1) translate(0, 0)"; // Reset zoom and pan
    currentImageIndex = Array.from(img.parentElement.parentElement.children).indexOf(img.parentElement);
}

// Function to close the full screen modal
function closeFullScreen() {
    const modal = document.getElementById("fullScreenModal");
    modal.style.display = "none";
}

// Function to zoom in
function zoomIn() {
    const modalImg = document.getElementById("fullScreenImage");
    let currentScale = parseFloat(modalImg.style.transform.replace("scale(", "").split(")")[0]) || 1;
    modalImg.style.transform = `scale(${currentScale + 0.1}) translate(0, 0)`;
}

// Function to zoom out
function zoomOut() {
    const modalImg = document.getElementById("fullScreenImage");
    let currentScale = parseFloat(modalImg.style.transform.replace("scale(", "").split(")")[0]) || 1;
    if (currentScale > 0.2) {
        modalImg.style.transform = `scale(${currentScale - 0.1}) translate(0, 0)`;
    }
}

// Function to show the previous image
function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
    } else {
        currentImageIndex = images.length - 1; // Loop to the last image
    }
    updateModalImage();
}

// Function to show the next image
function nextImage() {
    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
    } else {
        currentImageIndex = 0; // Loop to the first image
    }
    updateModalImage();
}

// Function to update the modal image
function updateModalImage() {
    const modalImg = document.getElementById("fullScreenImage");
    modalImg.src = images[currentImageIndex];
    modalImg.style.transform = "scale(1) translate(0, 0)"; // Reset zoom and pan
}

// Panning Functionality
let isDragging = false;
let startX, startY, translateX = 0, translateY = 0;

document.getElementById("fullScreenImage").addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX - translateX;
    startY = e.clientY - translateY;
});

document.addEventListener("mousemove", (e) => {
    if (isDragging) {
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        const modalImg = document.getElementById("fullScreenImage");
        modalImg.style.transform = `scale(${parseFloat(modalImg.style.transform.replace("scale(", "").split(")")[0]) || 1}) translate(${translateX}px, ${translateY}px)`;
    }
});

document.addEventListener("mouseup", () => {
    isDragging = false;
});
