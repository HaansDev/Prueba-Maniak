const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

const clickSearch = (event) => {
    if (event.target === searchBar || event.target === searchInput || event.target === searchBtn) {
        searchBar.classList.add('expanded');
        searchInput.placeholder = 'Texto de búsqueda';
    } else {
        searchBar.classList.remove('expanded');
        searchInput.placeholder = 'Pincha para buscar';
    }
};

export default clickSearch;