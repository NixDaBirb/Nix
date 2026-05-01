// --- YOUR PORTFOLIO DATA ---
// To add a new image, simply copy one of the blocks below, paste it at the top, 
// and change the title, category, and image URL.
const portfolioData = [
    {
        title: "Neon City Concept",
        category: "ui",
        // Using placeholder images with random heights to show the "Tetris" effect
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80" 
    },
    {
        title: "Dark Mode Dashboard",
        category: "dev",
        image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?auto=format&fit=crop&w=600&h=800&q=80" 
    },
    {
        title: "RPG Asset Pack",
        category: "game",
        image: "https://images.unsplash.com/photo-1558244661-d248897f7bc4?auto=format&fit=crop&w=600&h=400&q=80"
    },
    {
        title: "Mobile App Wireframe",
        category: "ui",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&h=900&q=80"
    },
    {
        title: "Server Script Manager",
        category: "dev",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&h=500&q=80"
    },
    {
        title: "Character Sprites",
        category: "game",
        image: "https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&w=600&h=700&q=80"
    }
];

// --- LOGIC ---
const grid = document.getElementById('portfolio-grid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Function to generate the HTML for the images
function renderPortfolio(filterCategory) {
    // Clear the grid first
    grid.innerHTML = '';

    // Filter the data based on the button clicked
    const filteredData = filterCategory === 'all' 
        ? portfolioData 
        : portfolioData.filter(item => item.category === filterCategory);

    // Build the HTML for each item and inject it
    filteredData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.title}" loading="lazy">
        `;
        grid.appendChild(div);
    });
}

// Set up the click events for the category buttons
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add 'active' class to the clicked button
        btn.classList.add('active');
        
        // Re-render the grid with the new filter
        const category = btn.getAttribute('data-filter');
        renderPortfolio(category);
    });
});

// Initial render when the page loads
renderPortfolio('all');