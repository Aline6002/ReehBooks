const allBooks = [
    {
        title: "Saga After (6 Livros)",
        author: "Anna Todd",
        coverUrl: "img/aftersaga.jpg",
        description: "Série completa (6 volumes) que narra o intenso e tumultuado relacionamento 'New Adult' entre a metódica Tessa Young e o misterioso Hardin Scott.",
        genre: "New Adult / Romance",
        linkPastaPDF: "https://drive.google.com/drive/folders/1t_wd3cwH1P_nvxkq3agzz1qB9QUBfskn?usp=drive_link"
    },
    {
        title: "Heartstopper (Série de Quadrinhos)",
        author: "Alice Oseman",
        coverUrl: "img/heartstopper.pNg",
        description: "Série de webcomics e graphic novels (5 volumes) que acompanha o desenvolvimento do doce relacionamento entre Charlie Spring e Nick Nelson.",
        genre: "Young Adult / Romance / LGBTQIA+",
        linkPastaPDF: "https://drive.google.com/drive/folders/1CRP-VjMslWlD4hqfPf9iSAtu0Dv6zvgA?usp=drive_link"
    },
    {
        title: "Com Amor, Simon",
        author: "Becky Albertalli",
        coverUrl: "img/simon.jpg",
        description: "Simon Spier é um adolescente gay que troca e-mails secretos com um garoto anônimo. Quando é chantageado, precisa lutar para manter seu segredo.",
        genre: "Young Adult / Romance / LGBTQIA+",
        linkPastaPDF: "https://drive.google.com/file/d/1wEWFMnB6NZ7QflGrleCfe2OzvlDgxXiZ/view?usp=drive_link"
    },
    {
        title: "Dom Quixote",
        author: "Miguel de Cervantes",
        coverUrl: "img/dom-quixote.jpg",
        description: "A aventura de um cavaleiro sonhador que enlouquece lendo romances de cavalaria e parte em uma jornada cômica com seu fiel escudeiro Sancho Pança.",
        genre: "Clássico",
        linkPastaPDF: "https://drive.google.com/file/d/16X7bWR3EO__aTLz4w5O_gfhI3MFXB-yi/view?usp=drive_link"
    },
    {
        title: "Vermelho, Branco e Sangue Azul",
        author: "Casey McQuiston",
        coverUrl: "img/vermelho-branco-sangue-azul.jpg",
        description: "A história foca no relacionamento secreto entre Alex, o Primeiro Filho dos EUA, e o Príncipe Henry da Grã-Bretanha.",
        genre: "New Adult / Romance / LGBTQIA+",
        linkPastaPDF: "https://drive.google.com/file/d/1_kV8QxdL-yu-otnJ10HKlLGxLqecSAYl/view?usp=drive_link"
    },
    {
        title: "It: A Coisa",
        author: "Stephen King",
        coverUrl: "img/it-a-coisa.webp",
        description: "Em Derry, o mal assume a forma de Pennywise. Sete amigos enfrentam seus piores pesadelos na infância e retornam adultos para destruir a entidade.",
        genre: "Terror",
        linkPastaPDF: "https://drive.google.com/file/d/11dUggFhqm66seqJIX1-iRv_BfeNkrxky/view?usp=drive_link"
    },
    {
        title: "Diário de um Banana: A Saga Completa",
        author: "Jeff Kinney",
        coverUrl: "img/sagaDiarioDeUmBanana.jpg",
        description: "As hilárias aventuras de Greg Heffley em seus 19 livros. A saga aborda a escola, a família e a luta para ser popular.",
        genre: "Infantojuvenil",
        linkPastaPDF: "https://drive.google.com/drive/folders/1JncDgVMR1FcR22hE2L5jdgiO_dfslD8T?usp=drive_link"
    },
    {
        title: "Trilogia Culpados",
        author: "Mercedes Ron",
        coverUrl: "img/CULPABLES.jpg",
        description: "Série que narra a intensa e proibida história de amor entre Noah e seu novo meio-irmão Nick em Los Angeles.",
        genre: "New Adult / Romance",
        linkPastaPDF: "https://drive.google.com/drive/folders/1KG1Ge9zs1TjJiUY_8RBwxTlZKxVc3COo?usp=drive_link"
    },
    {
        title: "Saga Bridgerton (9 Livros)",
        author: "Julia Quinn",
        coverUrl: "img/bridgerton9.webp",
        description: "Coleção de romances focados nos irmãos Bridgerton, explorando o mercado matrimonial da alta sociedade londrina.",
        genre: "Romance de Época",
        linkPastaPDF: "https://drive.google.com/drive/folders/1fhZOfZfRLvzZ8lqq5TwyhTydOol9tQPE?usp=drive_link"
    },
    {
        // CORRIGIDO AQUI: Padronizado para os nomes em Inglês para o script funcionar
        title: "O Diário de Anne Frank",
        author: "Anne Frank",
        genre: "História",
        description: "O relato íntimo de uma jovem escondida durante a Segunda Guerra Mundial. Um testemunho poderoso sobre esperança e resiliência.",
        coverUrl: "img/anneFrank.jpeg",
        linkPastaPDF: "https://drive.google.com/file/d/1_Oi1GUiaSRV8CQ5hMuZGvtcSxDHi74Er/view?usp=drive_link"
    }
];

// --- O RESTANTE DO SEU CÓDIGO (DOM, DISPLAY, FILTERS) CONTINUA EXATAMENTE IGUAL ---

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
        link.textContent = book.linkPastaPDF.includes('/folders/') ? 'Acessar PDFs da Saga' : 'Acessar PDF';
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

    prevPageBtn.disabled = currentPage === 0;
    nextPageBtn.disabled = (currentPage + 1) >= totalPages;
    
    // Lógica para o botão "Voltar ao início"
    if (nextPageBtn.disabled && totalPages > 1) {
        nextPageBtn.textContent = "Voltar ao Início";
        nextPageBtn.disabled = false;
    } else {
        nextPageBtn.textContent = "Próxima Página";
    }
}

function loadPrevPage() { if (currentPage > 0) { currentPage--; displayBooksPage(currentBooks); } }
function loadNextPage() {
    if ((currentPage + 1) * booksPerPage >= currentBooks.length) { currentPage = 0; } 
    else { currentPage++; }
    displayBooksPage(currentBooks);
}

function searchBooks() {
    const term = searchInput.value.toLowerCase();
    if (!term.trim()) { filterBooksByGenre(); return; }

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
            item.innerHTML = `<img src="${book.coverUrl}"><div><h3>${book.title}</h3><p>${book.author}</p></div>`;
            resultsContainer.appendChild(item);
        });
    } else {
        resultsContainer.innerHTML = '<p>Nada encontrado.</p>';
    }
}

function filterBooksByGenre() {
    const selected = genreSelect.value;
    currentBooks = selected === 'Todos' ? [...allBooks] : allBooks.filter(b => b.genre.includes(selected));
    
    bookDisplay.classList.remove('hidden');
    prevPageBtn.classList.remove('hidden');
    nextPageBtn.classList.remove('hidden');
    resultsContainer.innerHTML = '';
    currentPage = 0;
    displayBooksPage(currentBooks);
}

prevPageBtn.addEventListener('click', loadPrevPage);
nextPageBtn.addEventListener('click', loadNextPage);
searchBtn.addEventListener('click', searchBooks);
genreSelect.addEventListener('change', filterBooksByGenre);

document.addEventListener('DOMContentLoaded', () => {
    let allUniqueGenres = [];
    allBooks.forEach(book => {
        const genresArray = book.genre.split('/').map(g => g.trim());
        allUniqueGenres.push(...genresArray);
    });

    const genres = ['Todos', ...new Set(allUniqueGenres)];
    genres.forEach(genre => {
        if (genre) {
            const opt = document.createElement('option');
            opt.value = genre; opt.textContent = genre;
            genreSelect.appendChild(opt);
        }
    });

    filterBooksByGenre();
});