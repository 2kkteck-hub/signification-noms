// ==========================================
// Application Signification des Noms et Prénoms
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // Éléments DOM
    const searchInput = document.getElementById('searchInput');
    const searchForm = document.getElementById('searchForm');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const quickSearch = document.getElementById('quickSearch');
    const quickResults = document.getElementById('quickResults');
    const discoveryInput = document.getElementById('discoveryInput');
    const discoveryBtn = document.getElementById('discoveryBtn');
    const randomBtn = document.getElementById('randomBtn');
    const popularGrid = document.getElementById('popularGrid');
    const favoritesGrid = document.getElementById('favoritesGrid');
    const historyGrid = document.getElementById('historyGrid');
    const modal = document.getElementById('nameModal');
    const modalClose = document.getElementById('modalClose');
    const modalFavBtn = document.getElementById('modalFavBtn');
    const modalShareBtn = document.getElementById('modalShareBtn');

    // État de l'application
    let currentNom = null;
    let favorites = JSON.parse(localStorage.getItem('noms_favoris')) || [];
    let history = JSON.parse(localStorage.getItem('noms_historique')) || [];

    // Mettre à jour le compteur de noms
    document.getElementById('statCount').textContent = NOMS_DONNEES.length.toLocaleString() + '+';

    // ==========================================
    // Fonctions utilitaires
    // ==========================================

    // Rechercher un nom par ID
    function findNomById(id) {
        return NOMS_DONNEES.find(n => n.id === id);
    }

    // Rechercher des noms par texte (nom, origine, signification)
    function searchNoms(query) {
        if (!query) return [];
        const q = query.toLowerCase().trim();
        return NOMS_DONNEES.filter(n =>
            n.nom.toLowerCase().includes(q) ||
            n.origine.toLowerCase().includes(q) ||
            n.signification.toLowerCase().includes(q)
        ).slice(0, 10);
    }

    // Ajouter à l'historique
    function addToHistory(nom) {
        history = history.filter(h => h.id !== nom.id);
        history.unshift(nom);
        if (history.length > 20) history.pop();
        localStorage.setItem('noms_historique', JSON.stringify(history));
        renderHistory();
    }

    // Vérifier si un nom est en favori
    function isFavorite(id) {
        return favorites.some(f => f.id === id);
    }

    // Basculer favori
    function toggleFavorite(nom) {
        if (isFavorite(nom.id)) {
            favorites = favorites.filter(f => f.id !== nom.id);
            modalFavBtn.textContent = '⭐ Ajouter aux favoris';
            modalFavBtn.classList.remove('active');
        } else {
            favorites.push(nom);
            localStorage.setItem('noms_favoris', JSON.stringify(favorites));
            modalFavBtn.textContent = '✅ Retirer des favoris';
            modalFavBtn.classList.add('active');
        }
        renderFavorites();
        renderPopular(); // pour mettre à jour les cœurs sur les cartes
    }
    // ==========================================
    // Rendu des sections
    // ==========================================

    // Afficher les noms populaires dans la grille
    function renderPopular() {
        popularGrid.innerHTML = NOMS_DONNEES.slice(0, 12).map(nom => `
            <div class="name-card" onclick="openNomDetail(${nom.id})">
                <h3>${nom.nom}</h3>
                <span class="name-origin">${nom.origine}</span>
                <p class="name-meaning">${nom.signification}</p>
                <div class="name-actions">
                    <button class="btn-detail">Voir le détail</button>
                    <button class="btn-fav ${isFavorite(nom.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavoriteUI(${nom.id})">⭐</button>
                </div>
            </div>
        `).join('');
    }

    // Rendu des favoris
    function renderFavorites() {
        const section = document.getElementById('favoritesSection');
        if (favorites.length === 0) {
            section.style.display = 'none';
            return;
        }
        section.style.display = 'block';
        favoritesGrid.innerHTML = favorites.map(nom => `
            <div class="name-card" onclick="openNomDetail(${nom.id})">
                <h3>${nom.nom}</h3>
                <span class="name-origin">${nom.origine}</span>
                <p class="name-meaning">${nom.signification}</p>
                <div class="name-actions">
                    <button class="btn-detail">Voir le détail</button>
                    <button class="btn-fav active" onclick="event.stopPropagation(); toggleFavoriteUI(${nom.id})">⭐</button>
                </div>
            </div>
        `).join('');
    }

    // Rendu de l'historique
    function renderHistory() {
        const section = document.getElementById('historySection');
        if (history.length === 0) {
            section.style.display = 'none';
            return;
        }
        section.style.display = 'block';
        historyGrid.innerHTML = history.map(nom => `
            <div class="name-card" onclick="openNomDetail(${nom.id})">
                <h3>${nom.nom}</h3>
                <span class="name-origin">${nom.origine}</span>
                <p class="name-meaning">${nom.signification}</p>
                <div class="name-actions">
                    <button class="btn-detail">Voir le détail</button>
                    <button class="btn-fav ${isFavorite(nom.id) ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavoriteUI(${nom.id})">⭐</button>
                </div>
            </div>
        `).join('');
    }
    // ==========================================
    // Modal / Détail du nom
    // ==========================================

    window.openNomDetail = function(id) {
        const nom = findNomById(id);
        if (!nom) return;

        currentNom = nom;
        addToHistory(nom);

        // Remplir le modal
        document.getElementById('modalName').textContent = nom.nom;
        document.getElementById('modalSignification').textContent = nom.signification;
        document.getElementById('modalOrigine').textContent = nom.origine;
        document.getElementById('modalGenre').textContent = nom.genre.charAt(0).toUpperCase() + nom.genre.slice(1);
        document.getElementById('modalPopularite').textContent = nom.popularite;
        document.getElementById('modalFete').textContent = nom.fete;
        document.getElementById('modalVariantes').textContent = nom.variantes;
        document.getElementById('modalCelebres').textContent = nom.celebres;
        document.getElementById('modalEtymologie').textContent = nom.etymologie;

        // Badge genre
        const genreBadge = document.getElementById('modalGender');
        genreBadge.textContent = nom.genre.charAt(0).toUpperCase() + nom.genre.slice(1);
        genreBadge.className = 'gender-badge ' + nom.genre;

        // Bouton favori
        if (isFavorite(nom.id)) {
            modalFavBtn.textContent = '✅ Retirer des favoris';
            modalFavBtn.classList.add('active');
        } else {
            modalFavBtn.textContent = '⭐ Ajouter aux favoris';
            modalFavBtn.classList.remove('active');
        }

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    modalClose.addEventListener('click', () => {
        modal.classList.remove('open');
        document.body.style.overflow = 'auto';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('open');
            document.body.style.overflow = 'auto';
        }
    });

    modalFavBtn.addEventListener('click', () => {
        if (currentNom) {
            toggleFavorite(currentNom);
        }
    });
    modalShareBtn.addEventListener('click', () => {
        if (currentNom) {
            const text = `Découvre la signification du prénom "${currentNom.nom}" : ${currentNom.signification} (Origine : ${currentNom.origine})`;
            if (navigator.share) {
                navigator.share({
                    title: `Signification de ${currentNom.nom}`,
                    text: text,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(text).then(() => {
                    alert('Texte copié dans le presse-papiers !');
                });
            }
        }
    });

    // ==========================================
    // Recherche avec suggestions
    // ==========================================

    function showSuggestions(container, results, callback) {
        if (results.length === 0) {
            container.style.display = 'none';
            return;
        }
        container.innerHTML = results.map(nom => `
            <div class="suggestion-item" onclick="${callback}(${nom.id})">
                <strong>${nom.nom}</strong><br>
                <small style="color:#6b7280;">${nom.origine}</small>
            </div>
        `).join('');
        container.style.display = 'block';
    }

    // Barre de navigation
    searchInput.addEventListener('input', (e) => {
        const results = searchNoms(e.target.value);
        showSuggestions(searchSuggestions, results, 'openNomDetail');
    });

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const results = searchNoms(searchInput.value);
        if (results.length > 0) {
            openNomDetail(results[0].id);
            searchSuggestions.style.display = 'none';
            searchInput.value = '';
        } else {
            alert('Aucun nom trouvé avec ce terme. Essayez un autre nom !');
        }
    });

    // Cliquer en dehors des suggestions
    document.addEventListener('click', (e) => {
        if (!searchForm.contains(e.target)) {
            searchSuggestions.style.display = 'none';
        }
        if (!quickSearch.contains(e.target) && !quickResults.contains(e.target)) {
            quickResults.style.display = 'none';
        }
    });

    // Recherche rapide (hero)
    quickSearch.addEventListener('input', (e) => {
        const results = searchNoms(e.target.value);
        showSuggestions(quickResults, results, 'openNomDetail');
    });

    // ==========================================
    // Bouton aléatoire
    // ==========================================

    randomBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * NOMS_DONNEES.length);
        openNomDetail(NOMS_DONNEES[randomIndex].id);
    });

    discoveryBtn.addEventListener('click', () => {
        const value = discoveryInput.value.trim();
        if (!value) {
            alert('Veuillez entrer un nom ou prénom !');
            return;
        }
        const results = searchNoms(value);
        if (results.length > 0) {
            openNomDetail(results[0].id);
            discoveryInput.value = '';
        } else {
            alert(`Je n'ai pas trouvé "${value}" dans ma base de données. Essayez un autre nom !`);
        }
    });

    discoveryInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') discoveryBtn.click();
    });

    // ==========================================
    // Vider favoris et historique
    // ==========================================

    document.getElementById('clearFavorites').addEventListener('click', () => {
        if (confirm('Vider tous vos favoris ?')) {
            favorites = [];
            localStorage.removeItem('noms_favoris');
            renderFavorites();
            renderPopular();
        }
    });

    document.getElementById('clearHistory').addEventListener('click', () => {
        if (confirm('Effacer votre historique ?')) {
            history = [];
            localStorage.removeItem('noms_historique');
            renderHistory();
        }
    });

    // ==========================================
    // Initialisation
    // ==========================================

    renderPopular();
    renderFavorites();
    renderHistory();

    // Exposer toggleFavoriteUI globalement pour les boutons inline
    window.toggleFavoriteUI = function(id) {
        const nom = findNomById(id);
        if (nom) toggleFavorite(nom);
    };
});