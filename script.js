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

function scanFolder(folderName) {
    let imageNumber = 1;
    function tryLoadNextImage() {
        const imagePath = `images/${folderName}/${imageNumber}.jpg`;
        const imgTest = new Image();
        imgTest.onload = function() {
            portfolioData[folderName].push(imagePath);
            imageNumber++;
            tryLoadNextImage();
        };
        imgTest.onerror = function() {
            foldersFinished++;
            if (foldersFinished === foldersToScan.length) {
                renderGallery('work');
            }
        };
        imgTest.src = imagePath;
    }
    tryLoadNextImage();
}

foldersToScan.forEach(folder => scanFolder(folder));

function shuffleArray(array) {
    let shuffled = array.slice();
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

function renderGallery(targetCategory) {
    aboutSection.classList.add('hidden');
    contactSection.classList.add('hidden');
    grid.classList.remove('hidden');
    grid.innerHTML = ''; 

    let imagesToRender = [];
    if (targetCategory === 'work') {
        imagesToRender = [
            ...portfolioData.graphicdesign,
            ...portfolioData.digitalart,
            ...portfolioData.traditionalart
        ];
        imagesToRender = shuffleArray(imagesToRender);
    } else if (portfolioData[targetCategory]) {
        imagesToRender = portfolioData[targetCategory];
    }

    imagesToRender.forEach(src => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.innerHTML = `<img src="${src}" alt="Portfolio Art">`;
        grid.appendChild(div);
    });
}

navButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-target');
        if (target === 'about') {
            grid.classList.add('hidden');
            contactSection.classList.add('hidden');
            aboutSection.classList.remove('hidden');
        } else if (target === 'contact') {
            grid.classList.add('hidden');
            aboutSection.classList.add('hidden');
            contactSection.classList.remove('hidden');
        } else {
            renderGallery(target);
        }
    });
});