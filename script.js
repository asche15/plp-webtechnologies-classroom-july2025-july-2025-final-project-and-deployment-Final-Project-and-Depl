  // Theme Management
        let isDarkTheme = false;

        function toggleTheme() {
            isDarkTheme = !isDarkTheme;
            const body = document.body;
            const themeToggle = document.querySelector('.theme-toggle');
            
            if (isDarkTheme) {
                body.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '☀️';
                themeToggle.title = 'Switch to Light Theme';
            } else {
                body.removeAttribute('data-theme');
                themeToggle.textContent = '🌙';
                themeToggle.title = 'Switch to Dark Theme';
            }
            
            // Save theme preference
            localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
        }

        // Load saved theme
        function loadTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                isDarkTheme = true;
                toggleTheme();
            }
        }

        // Search Functionality
        function searchPosts(query) {
            const posts = document.querySelectorAll('.post');
            const noResults = document.getElementById('no-results');
            let visibleCount = 0;
            
            query = query.toLowerCase().trim();
            
            posts.forEach(post => {
                const title = post.querySelector('h3').textContent.toLowerCase();
                const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
                const tags = post.getAttribute('data-tags').toLowerCase();
                
                if (query === '' || title.includes(query) || excerpt.includes(query) || tags.includes(query)) {
                    post.classList.remove('hidden');
                    visibleCount++;
                } else {
                    post.classList.add('hidden');
                }
            });
            
            // Update post count
            document.getElementById('post-count').textContent = `(${visibleCount})`;
            
            // Show/hide no results message
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }

        // Filter by tag
        function filterByTag(tag) {
            const searchBar = document.querySelector('.search-bar');
            searchBar.value = tag;
            searchPosts(tag);
            
            // Highlight the search bar briefly
            searchBar.style.boxShadow = '0 0 20px rgba(102, 126, 234, 0.5)';
            setTimeout(() => {
                searchBar.style.boxShadow = '';
            }, 1000);
        }

        // Filter by category
        function filterByCategory(category) {
            filterByTag(category);
        }

        // Navigation
        function showSection(section) {
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Hide all sections
            document.querySelectorAll('.section').forEach(sec => {
                sec.classList.remove('active');
            });
            
            // Show selected section with animation
            const targetSection = document.getElementById(`${section}-section`);
            if (targetSection) {
                setTimeout(() => {
                    targetSection.classList.add('active');
                }, 50);
            }
            
            // Update search bar visibility (only show on home and blog)
            const searchContainer = document.querySelector('.search-container');
            if (section === 'home' || section === 'blog') {
                searchContainer.style.display = 'block';
            } else {
                searchContainer.style.display = 'none';
            }
            
            console.log(`Navigated to ${section} section`);
        }

        // Archive filtering for blog section
        function filterArchive(filter) {
            // Update active filter button
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            event.target.classList.add('active');
            
            // Filter posts
            const posts = document.querySelectorAll('.archive-post');
            posts.forEach(post => {
                if (filter === 'all') {
                    post.style.display = 'block';
                } else if (filter === '2024') {
                    post.style.display = post.getAttribute('data-year') === '2024' ? 'block' : 'none';
                } else {
                    post.style.display = post.getAttribute('data-category') === filter ? 'block' : 'none';
                }
            });
        }

        // Contact form submission
        function sendMessage(event) {
            event.preventDefault();
            
            const form = event.target;
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simulate form submission
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert(`Thank you, ${name}! Your message has been sent successfully.\n\nSubject: ${subject}\n\nIn a real application, this would be sent to the server.`);
                form.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }

        // Post interactions
        function openPost(postId) {
            console.log(`Opening post: ${postId}`);
            alert(`Opening post: ${postId}\n\nIn a real blog, this would navigate to the full post page.`);
        }

        function loadPost(postId) {
            console.log(`Loading recent post: ${postId}`);
            showLoading();
            setTimeout(() => {
                hideLoading();
            }, 1000);
        }

        // Profile animation
        function animateProfile() {
            const profile = document.querySelector('.profile-img');
            profile.style.transform = 'scale(1.2) rotate(360deg)';
            setTimeout(() => {
                profile.style.transform = '';
            }, 600);
        }

        // Social media links
        function openSocial(platform) {
            const urls = {
                twitter: 'https://twitter.com',
                github: 'https://github.com',
                linkedin: 'https://linkedin.com',
                email: 'mailto:alex@example.com'
            };
            
            if (urls[platform]) {
                if (platform === 'email') {
                    window.location.href = urls[platform];
                } else {
                    window.open(urls[platform], '_blank', 'noopener,noreferrer');
                }
            }
        }

        // Auto-save search queries
        function saveSearchHistory(query) {
            if (query.trim()) {
                let history = JSON.parse(localStorage.getItem('searchHistory') || '[]');
                if (!history.includes(query)) {
                    history.unshift(query);
                    history = history.slice(0, 5); // Keep only last 5 searches
                    localStorage.setItem('searchHistory', JSON.stringify(history));
                }
            }
        }

        // Initialize on page load
        document.addEventListener('DOMContentLoaded', function() {
            loadTheme();
            
            // Add search history functionality
            const searchBar = document.querySelector('.search-bar');
            searchBar.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') {
                    saveSearchHistory(this.value);
                }
            });
            
            // Add smooth scrolling for internal links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });
            
            console.log('Blog initialized with interactive features!');
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            // Ctrl/Cmd + K to focus search
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                document.querySelector('.search-bar').focus();
            }
            
            // Ctrl/Cmd + D to toggle theme
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                toggleTheme();
            }
        });