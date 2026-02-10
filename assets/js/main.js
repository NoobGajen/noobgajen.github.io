(() => {
    document.addEventListener('DOMContentLoaded', function () {
        const sidebar = document.querySelector('.sidebar');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileSidebarCloseBtn = document.querySelector('.mobile-close-btn');

        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });

        mobileSidebarCloseBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });

        const tableOfContent = document.getElementById('post-content');
        const postSingle = document.querySelector('.post-single');

        if (postSingle) {
            tableOfContent.style.display = 'block';
        }

        const btn = document.getElementById('scrollToTop');
        if (!btn) return;

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                btn.classList.add('show');
            } else {
                btn.classList.remove('show');
            }
        });

        btn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        const postContent = document.querySelector('.post-single .post-content');
        if (!postContent) return;

        // Create overlay and zoomed image container
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = 0;
        overlay.style.left = 0;
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        overlay.style.display = 'flex';
        overlay.style.justifyContent = 'center';
        overlay.style.alignItems = 'center';
        overlay.style.cursor = 'zoom-out';
        overlay.style.zIndex = '9999';
        overlay.style.transition = 'opacity 0.25s ease';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';

        const zoomedImg = document.createElement('img');
        zoomedImg.style.maxWidth = '90%';
        zoomedImg.style.maxHeight = '90%';
        zoomedImg.style.borderRadius = '8px';
        zoomedImg.style.boxShadow = '0 4px 20px rgba(0,0,0,0.5)';
        zoomedImg.style.transition = 'transform 0.3s ease';
        overlay.appendChild(zoomedImg);

        document.body.appendChild(overlay);

        let isZoomed = false;

        // When clicking an image inside post
        postContent.querySelectorAll('img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => {
                zoomedImg.src = img.src;
                overlay.style.opacity = '1';
                overlay.style.pointerEvents = 'auto';
                isZoomed = true;
            });
        });

        // Close zoom when clicking overlay
        overlay.addEventListener('click', () => {
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            isZoomed = false;
        });

        // Close on ESC key
        document.addEventListener('keydown', e => {
            if (isZoomed && e.key === 'Escape') {
                overlay.style.opacity = '0';
                overlay.style.pointerEvents = 'none';
                isZoomed = false;
            }
        });
    });

    const mobileSearchBtn = document.querySelector('.mobile-search-btn');
    const mobileCancelBtn = document.querySelector('.cancel-btn');

    mobileSearchBtn.addEventListener('click', () => {
        const mobileSearchLayout = document.querySelector('.mobile-search-layout');
        mobileSearchLayout.classList.toggle('show');
    });

    mobileCancelBtn.addEventListener('click', () => {
        const mobileSearchLayout = document.querySelector('.mobile-search-layout');
        mobileSearchLayout.classList.toggle('show');
    });

    async function initSearch() {
        const res = await fetch('/index.json');
        const data = await res.json();
        const appWidth = window.innerWidth;

        const fuse = new Fuse(data, {
            keys: ['title', 'tags', 'description'],
            threshold: 0.3,
        });

        const inputs = ['search-input', 'mobile-search-input'];

        inputs.forEach(id => {
            const input = document.getElementById(id);
            if (!input) return;

            const resultsWrapper = document.querySelector('.search-results-wrapper');
            const resultsList = document.querySelector(
                id === 'mobile-search-input' ? '.mobile-search-results-list' : '.search-results-list' // This might still be tricky if wrappers are shared or distinct. 
                // Wait, desktop uses .search-results-wrapper > .search-results-list. 
                // Mobile uses .mobile-search-layout > .mobile-search-results-list. 
                // Let's refine the selector logic inside the loop.
            );

            // Recalculating resultsList based on input ID
            const targetList = id === 'mobile-search-input'
                ? document.querySelector('.mobile-search-results-list')
                : document.querySelector('.search-results-list');

            const targetWrapper = id === 'mobile-search-input'
                ? document.querySelector('.mobile-search-layout') // Mobile doesn't use the wrapper class the same way? 
                // line 101: mobileSearchLayout.classList.toggle('show');
                // line 133: resultsWrapper.classList.remove('has-results'); 
                // The original code used `resultsWrapper` for both but changed `resultsList`?
                // Original: const resultsWrapper = document.querySelector('.search-results-wrapper'); 
                // This wrapper seems desktop specific (line 100 in baseof.html).
                // Mobile has `mobile-search-layout` (line 114) which contains input and results list. 

                : document.querySelector('.search-results-wrapper');


            input.addEventListener('input', () => {
                const query = input.value.trim();
                targetList.innerHTML = '';

                // wrapper logic
                if (id === 'mobile-search-input') {
                    // For mobile, maybe we don't need to toggle a wrapper visibility specifically for no-results?
                    // The layout is already "shown" via the button.
                } else {
                    if (!query) {
                        targetWrapper.classList.remove('has-results');
                        targetWrapper.classList.add('hidden');
                        return;
                    }
                }

                if (!query) return; // For mobile too

                const results = fuse.search(query);

                if (results.length > 0) {
                    if (id !== 'mobile-search-input') {
                        targetWrapper.classList.remove('hidden');
                        targetWrapper.classList.add('has-results');
                    }

                    results.forEach(({ item }) => {
                        const article = document.createElement('article');
                        article.className = 'search-result-item';

                        article.innerHTML = `
                        <a href="${item.permalink}">
                            <h2>${item.title}</h2>
                        </a>
                        <div class="post-meta">
                            <i class="fa-regular fa-calendar"></i> ${item.date} <div>•</div> 
            <i class="fa-regular fa-clock"></i> ${item.readingTime} <div>•</div> 
            <i class="fa-solid fa-tags"></i> ${item.tags.join(', ')}
                        </div>
                        <p>${item.description || ''}</p>
                    `;

                        targetList.appendChild(article);
                    });
                } else {
                    if (id !== 'mobile-search-input') {
                        targetWrapper.classList.remove('hidden');
                        targetWrapper.classList.add('has-results');
                    }
                    targetList.innerHTML = `
                    <div class="not-found">
                        <p>Oops. No results found.</p>
                    </div>
                `;
                }
            });
        });
    }

    initSearch();
})();
