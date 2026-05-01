// Data store for all your images
const portfolioData = {
    graphicdesign: [],
    digitalart: [],
    traditionalart: []
};

const foldersToScan = ['graphicdesign', 'digitalart', 'traditionalart'];
let foldersFinished = 0;

const grid = document.getElementById('portfolio-grid');
const aboutSection = document.getElementById('about-section');
const contactSection = document.getElementById('contact-section');
const navButtons = document.querySelectorAll('.nav-btn');

// --- 1. THE FOLDER SCANNER ---
// This invisible function runs immediately to count and store your images
function scanFolder(folderName) {
    let imageNumber = 1;

    function tryLoadNextImage() {
        const imagePath = `images/${folderName}/${imageNumber}.jpg`;
        const imgTest = new Image();

        imgTest.onload = function() {
            // Image exists! Save it to our data store and try the next number
            portfolioData[folderName].push(imagePath);
            imageNumber++;
            tryLoadNextImage();
        };

        imgTest.onerror = function() {
            // Reached the end of this folder's images
            foldersFinished++;
            
            // If all folders are done scanning, render the default "Work" tab
            if (foldersFinished === foldersToScan.length) {
                renderGallery('work');
            }
        };

        imgTest.src = imagePath;
    }

    tryLoadNextImage(); // Start the loop for this folder
}

// Start scanning all three folders at the same time
foldersToScan.forEach(folder => scanFolder(folder));


// --- 2. RANDOMIZER FUNCTION ---
// The Fisher-Yates algorithm to randomly shuffle an array
function shuffleArray(array) {
    let shuffled = array.slice(); // Copy the array
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}


// --- 3. THE RENDER FUNCTION ---
// Clears the screen and draws the requested category
function renderGallery(targetCategory) {
    // Hide text sections, show grid
    aboutSection.classList.add('hidden');
    contactSection.classList.add('hidden');
    grid.classList.remove('hidden');
    grid.innerHTML = ''; 

    let imagesToRender = [];

    if (targetCategory === 'work') {
        // Grab ALL images from ALL folders, combine them, and shuffle them randomly
        imagesToRender = [
            ...portfolioData.graphicdesign,
            ...portfolioData.digitalart,
            ...portfolioData.traditionalart
        ];
        imagesToRender = shuffleArray(imagesToRender);

    } else if (portfolioData[targetCategory]) {
        // Just grab the specific folder requested
        imagesToRender = portfolioData[targetCategory];
    }

    // Draw the images to the screen
    imagesToRender.forEach(src => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.innerHTML = `<img src="${src}" alt="Portfolio Art">`;
        grid.appendChild(div);
    });
}


// --- 4. NAVIGATION CLICKS ---
// Handles what happens when you click the buttons at the top
navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // Stop page from jumping

        // Update active purple underline
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Figure out which button was clicked
        const target = btn.getAttribute('data-target');

        // Logic for About Me / Contact Me
        if (target === 'about') {
            grid.classList.add('hidden');
            contactSection.classList.add('hidden');
            aboutSection.classList.remove('hidden');
        } 
        else if (target === 'contact') {
            grid.classList.add('hidden');
            aboutSection.classList.add('hidden');
            contactSection.classList.remove('hidden');
        } 
        // Logic for the Gallery Tabs
        else {
            renderGallery(target);
        }
    });
});