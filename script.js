let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        navbar.classList.add('hidden');
    } else {
        navbar.classList.remove('hidden');
    }
    lastScrollTop = scrollTop;
});

window.addEventListener('scroll', function() {
    const bannerImage = document.querySelector('.banner-image');
    const offset = window.pageYOffset;
    bannerImage.style.transform = `translateY(${offset * 0.5}px)`;
});

const posts = [
    { title: "Basic English Grammar", image: "img/grammar.jpg" },
    { title: "Conversational English", image: "img/conversation.jpg" },
    { title: "English Vocabulary", image: "img/vocab.jpg" },
    { title: "English Pronunciation", image: "img/pronunciation.jpg" },
    { title: "English Listening Skills", image: "img/listening.jpg" },
    { title: "Writting in English", image: "img/writting.jpg" },
    { title: "English for Business", image: "img/business.jpg" },
    { title: "English Idioms and Expressions", image: "img/idioms.jpg" },
    // Add more posts as needed
];

const postsPerPage = 8; // Set default posts per page
let currentPage = 1;

function generatePosts(page, postsPerPage, sortOrder) {
    const postsGrid = document.querySelector('.posts-grid');
    postsGrid.innerHTML = '';

    let sortedPosts = posts.slice();

    if (sortOrder === 'newest') {
        sortedPosts.reverse();
    }

    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = sortedPosts.slice(start, end);

    paginatedPosts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList.add('post-card');

        postCard.innerHTML = `
            <img src="${post.image}" alt="${post.title}" loading="lazy">
            <div class="content">
                <h3>${post.title}</h3>
            </div>
        `;

        postsGrid.appendChild(postCard);
    });

    generatePagination(sortedPosts.length, postsPerPage);
}

function generatePagination(totalPosts, postsPerPage) {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(totalPosts / postsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.classList.add('page-btn');
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            generatePosts(currentPage, postsPerPage, document.getElementById('sort').value);
        });
        pagination.appendChild(pageButton);
    }

    // Add next button
    if (currentPage < totalPages) {
        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.classList.add('page-btn');
        nextButton.addEventListener('click', () => {
            currentPage++;
            generatePosts(currentPage, postsPerPage, document.getElementById('sort').value);
        });
        pagination.appendChild(nextButton);
    }
}

document.getElementById('sort').addEventListener('change', function() {
    generatePosts(currentPage, postsPerPage, this.value);
});

document.getElementById('show-per-page').addEventListener('change', function() {
    generatePosts(currentPage, parseInt(this.value, 10), document.getElementById('sort').value);
});


generatePosts(currentPage, postsPerPage, 'newest');
