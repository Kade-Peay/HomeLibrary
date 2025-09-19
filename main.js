// Book class definition
class Book {
    constructor(title, author, genre, pages) {
        this.title = title;
        this.author = author;
        this.genre = genre;
        this.pages = pages;
    }

    getInfo() {
        return `${this.title} by ${this.author}, ${this.genre}, ${this.pages} pages`;
    }
}

// Main application
document.addEventListener('DOMContentLoaded', function () {
    const bookList = document.getElementById('bookList');
    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');

    let books = [];

    // Fetch books from JSON file
    fetch('bookList.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            books = data.map(bookData =>
                new Book(bookData.title, bookData.author, bookData.genre, bookData.pages)
            );

            loadingElement.style.display = 'none';

            if (books.length > 0) {
                displayBooks(books);
                setupFiltering(books);
            } else {
                bookList.innerHTML = '<div class="error">No books found in the library.</div>';
            }
        })
        .catch(error => {
            loadingElement.style.display = 'none';
            errorElement.style.display = 'block';
            errorElement.textContent = `Error loading books: ${error.message}`;
            console.error('Error fetching JSON:', error);
        });

    // Display all books
    function displayBooks(booksToDisplay) {
        bookList.innerHTML = '';

        if (booksToDisplay.length === 0) {
            bookList.innerHTML = '<div class="error">No books match your filters.</div>';
            return;
        }

        booksToDisplay.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';

            bookCard.innerHTML = `
                <div class="book-cover">
                    ${book.title.substring(0, 20)}
                </div>
                <div class="book-details">
                    <h2 class="book-title">${book.title}</h2>
                    <div class="book-info">
                        <p><span class="book-label">Author:</span> ${book.author}</p>
                        <p><span class="book-label">Genre:</span> ${book.genre}</p>
                        <p><span class="book-label">Pages:</span> ${book.pages}</p>
                    </div>
                </div>
            `;

            bookList.appendChild(bookCard);
        });
    }

    // Display statistics
    function displayStats(books) {
        const totalBooks = books.length;
        const totalPages = books.reduce((sum, book) => sum + parseInt(book.pages), 0);
        const avgPages = Math.round(totalPages / totalBooks);

        // Count genres
        const genreCount = {};
        books.forEach(book => {
            genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
        });
        const mostCommonGenre = Object.keys(genreCount).reduce((a, b) =>
            genreCount[a] > genreCount[b] ? a : b, null);

        statsBar.innerHTML = `
            <div class="stat">
                <div class="stat-value">${totalBooks}</div>
                <div class="stat-label">Total Books</div>
            </div>
            <div class="stat">
                <div class="stat-value">${totalPages}</div>
                <div class="stat-label">Total Pages</div>
            </div>
            <div class="stat">
                <div class="stat-value">${avgPages}</div>
                <div class="stat-label">Avg. Pages/Book</div>
            </div>
            <div class="stat">
                <div class="stat-value">${mostCommonGenre}</div>
                <div class="stat-label">Most Common Genre</div>
            </div>
        `;
    }

    // Setup filtering functionality
    function setupFiltering(books) {
        // Create filter bar
        const filterBar = document.createElement('div');
        filterBar.className = 'filter-bar';
        filterBar.innerHTML = `
            <div class="filter-group">
                <label for="searchInput">Search</label>
                <input type="text" id="searchInput" placeholder="Title or author...">
            </div>
            <div class="filter-group">
                <label for="genreFilter">Genre</label>
                <select id="genreFilter">
                    <option value="">All Genres</option>
                </select>
            </div>
            <div class="filter-group">
                <label for="pageFilter">Max Pages</label>
                <input type="number" id="pageFilter" placeholder="No limit" min="1">
            </div>
            <button class="btn" id="applyFilters">Apply Filters</button>
        `;

        // Insert filter bar before book list
        bookList.parentNode.insertBefore(filterBar, bookList);

        // Populate genre filter
        const genres = [...new Set(books.map(book => book.genre))];
        const genreFilter = document.getElementById('genreFilter');
        genres.sort().forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreFilter.appendChild(option);
        });

        // Apply filters when button is clicked
        document.getElementById('applyFilters').addEventListener('click', function () {
            applyFilters(books);
        });

        // Also apply filters when Enter is pressed in input fields
        document.getElementById('searchInput').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') applyFilters(books);
        });

        document.getElementById('pageFilter').addEventListener('keypress', function (e) {
            if (e.key === 'Enter') applyFilters(books);
        });
    }

    // Apply filters to book list
    function applyFilters(books) {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const selectedGenre = document.getElementById('genreFilter').value;
        const maxPages = document.getElementById('pageFilter').value;

        const filteredBooks = books.filter(book => {
            // Search filter
            const matchesSearch = searchTerm === '' ||
                book.title.toLowerCase().includes(searchTerm) ||
                book.author.toLowerCase().includes(searchTerm);

            // Genre filter
            const matchesGenre = selectedGenre === '' || book.genre === selectedGenre;

            // Page count filter
            const matchesPageCount = maxPages === '' || parseInt(book.pages) <= parseInt(maxPages);

            return matchesSearch && matchesGenre && matchesPageCount;
        });

        displayBooks(filteredBooks);
    }
});