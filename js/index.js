const bookDisplay = document.getElementById('book-display');
const prevPageBtn = document.getElementById('prev-page-btn');
const nextPageBtn = document.getElementById('next-page-btn');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const resultsContainer = document.getElementById('results-container');
const genreSelect = document.getElementById('genre-select');

let currentBooks = [...allBooks];
let currentPage = 0;
const booksPerPage = 4;

// --- FUNÇÕES DE INTERFACE ---

function createBookItem(book) {
    const item = document.createElement('div');
    item.className = 'book-item';

    const coverImg = document.createElement('img');
    coverImg.src = book.coverUrl;
    coverImg.alt = `Capa do Livro: ${book.title}`;

    const infoDiv = document.createElement('div');
    infoDiv.className = 'book-info-compact';

    const title = document.createElement('h3');
    title.textContent = book.title;

    const author = document.createElement('span');
    author.className = 'author';
    author.textContent = book.author;

    const genre = document.createElement('p');
    genre.className = 'genre-tag';
    genre.textContent = book.genre;

    const description = document.createElement('p');
    description.className = 'book-description-short';
    description.textContent = book.description;

    infoDiv.appendChild(title);
    infoDiv.appendChild(author);
    infoDiv.appendChild(genre);
    infoDiv.appendChild(description);

    if (book.linkPastaPDF) {
        const link = document.createElement('a');
        link.href = book.linkPastaPDF;
        link.target = '_blank';
        link.className = 'pdf-link';
        // Ajuste inteligente para o texto do link
        link.textContent = (book.title.includes('Trilogia') || book.title.includes('Série')) 
            ? 'Acessar Coleção' 
            : 'Acessar PDF';
        infoDiv.appendChild(link);
    }

    item.appendChild(coverImg);
    item.appendChild(infoDiv);
    return item;
}

function displayBooksPage(books) {
    bookDisplay.innerHTML = '';
    const start = currentPage * booksPerPage;
    const end = start + booksPerPage;
    const booksToShow = books.slice(start, end);
    const totalPages = Math.ceil(books.length / booksPerPage);

    if (booksToShow.length === 0) {
        bookDisplay.innerHTML = '<p>Nenhum livro encontrado.</p>';
        return;
    }

    booksToShow.forEach(book => bookDisplay.appendChild(createBookItem(book)));

    // Controle de Paginação
    prevPageBtn.disabled = currentPage === 0;
    
    if (currentPage + 1 >= totalPages && totalPages > 1) {
        nextPageBtn.textContent = "Voltar ao Início";
        nextPageBtn.disabled = false;
    } else {
        nextPageBtn.textContent = "Próxima Página";
        nextPageBtn.disabled = totalPages <= 1;
    }
}

// --- LÓGICA DE NAVEGAÇÃO E FILTRO ---

function loadPrevPage() { 
    if (currentPage > 0) { 
        currentPage--; 
        displayBooksPage(currentBooks); 
    } 
}

function loadNextPage() {
    const totalPages = Math.ceil(currentBooks.length / booksPerPage);
    if (currentPage + 1 >= totalPages) { 
        currentPage = 0; 
    } else { 
        currentPage++; 
    }
    displayBooksPage(currentBooks);
}

function searchBooks() {
    const term = searchInput.value.toLowerCase().trim();
    if (!term) { 
        filterBooksByGenre(); 
        return; 
    }

    bookDisplay.classList.add('hidden');
    prevPageBtn.classList.add('hidden');
    nextPageBtn.classList.add('hidden');
    resultsContainer.innerHTML = '';

    const filtered = allBooks.filter(b => 
        b.title.toLowerCase().includes(term) || b.author.toLowerCase().includes(term)
    );

    if (filtered.length > 0) {
        filtered.forEach(book => {
            const item = document.createElement('div');
            item.className = 'result-item';
            item.innerHTML = `
                <img src="${book.coverUrl}">
                <div>
                    <h3>${book.title}</h3>
                    <p>${book.author}</p>
                </div>
            `;
            item.onclick = () => window.open(book.linkPastaPDF, '_blank');
            resultsContainer.appendChild(item);
        });
    } else {
        resultsContainer.innerHTML = '<p>Nada encontrado para esta busca.</p>';
    }
}

function filterBooksByGenre() {
    const selected = genreSelect.value;
    
    // Filtra considerando que o gênero pode ser uma string composta (ex: "Romance / Drama")
    currentBooks = selected === 'Todos' 
        ? [...allBooks] 
        : allBooks.filter(b => b.genre.split('/').map(g => g.trim()).includes(selected));
    
    bookDisplay.classList.remove('hidden');
    prevPageBtn.classList.remove('hidden');
    nextPageBtn.classList.remove('hidden');
    resultsContainer.innerHTML = '';
    currentPage = 0;
    displayBooksPage(currentBooks);
}

// --- INICIALIZAÇÃO E EVENTOS ---

prevPageBtn.addEventListener('click', loadPrevPage);
nextPageBtn.addEventListener('click', loadNextPage);
searchBtn.addEventListener('click', searchBooks);
genreSelect.addEventListener('change', filterBooksByGenre);

// Adiciona busca ao apertar "Enter"
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchBooks();
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mapear gêneros e contar ocorrências
    const genreCounts = {};
    allBooks.forEach(book => {
        const genresArray = book.genre.split('/').map(g => g.trim());
        genresArray.forEach(g => {
            if (g) genreCounts[g] = (genreCounts[g] || 0) + 1;
        });
    });

    // 2. Criar lista ordenada alfabeticamente
    const sortedGenres = Object.keys(genreCounts).sort((a, b) => a.localeCompare(b));

    // 3. Limpar e Popular o Select
    genreSelect.innerHTML = '';
    
    // Opção "Todos" com o total geral
    const optTodos = document.createElement('option');
    optTodos.value = 'Todos';
    optTodos.textContent = `Todos os Livros (${allBooks.length})`;
    genreSelect.appendChild(optTodos);

    // Outras opções
    sortedGenres.forEach(genre => {
        const opt = document.createElement('option');
        opt.value = genre; 
        opt.textContent = `${genre} (${genreCounts[genre]})`;
        genreSelect.appendChild(opt);
    });

    filterBooksByGenre();
});