
document.addEventListener('DOMContentLoaded', () => {
    let page = 1;
    const reel = document.querySelector('.reel');

    // Function to load more products
    const loadMoreProducts = () => {
        page++;
        // Simulate an API call to get more products
        setTimeout(() => {
            for (let i = 0; i < 6; i++) {
                const reelItem = document.createElement('div');
                reelItem.classList.add('reel-item');

                const img = document.createElement('img');
                img.src = `https://via.placeholder.com/300x200?text=Product+${page * i}`;
                img.alt = `Product ${page * i}`;

                const desc = document.createElement('div');
                desc.classList.add('description');
                desc.textContent = `Product ${page * i} Description`;

                reelItem.appendChild(img);
                reelItem.appendChild(desc);
                reel.appendChild(reelItem);
            }
        }, 1000);
    };

    // Infinite scroll logic
    window.addEventListener('scroll', () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            loadMoreProducts();
        }
    });

    // Initial load of products
    loadMoreProducts();

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});