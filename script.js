// Selecionando os elementos
const input = document.getElementById('search');
const cardsContainer = document.getElementById('cards');
const empty = document.getElementById('empty');
const modal = document.getElementById('uploadModal');
const fileInput = document.getElementById('panelImage');
const previewWrap = document.getElementById('previewWrap');
const previewImg = document.getElementById('previewImg');

// Função de Segurança: Impede que códigos maliciosos sejam executados
function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
    }[tag] || tag));
}

// Lógica de Busca
input.addEventListener('input', () => {
    const q = input.value.toLowerCase().trim();
    let visible = 0;
    const allCards = document.querySelectorAll('.card');
    
    allCards.forEach(c => {
        const ok = c.dataset.search.includes(q);
        c.style.display = ok ? 'block' : 'none';
        if (ok) visible++;
    });
    empty.style.display = visible ? 'none' : 'block';
});

// Lógica do Modal
function showModal() {
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    // Limpa o formulário ao fechar
    document.getElementById('mangaName').value = '';
    document.getElementById('description').value = '';
    fileInput.value = '';
    previewWrap.style.display = 'none';
}

document.getElementById('openUpload')?.addEventListener('click', showModal);
document.getElementById('closeUpload').addEventListener('click', hideModal);
document.getElementById('cancelUpload').addEventListener('click', hideModal);
modal.addEventListener('click', e => { if (e.target === modal) hideModal() });

// Preview da Imagem
fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewWrap.style.display = 'block';
});

// Função para criar o HTML do Card de forma segura
function criarCard(dados) {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.search = `${dados.manga} ${dados.character} ${dados.chapter}`.toLowerCase();
    
    // Usando escapeHTML para segurança
    const mangaSeguro = escapeHTML(dados.manga);
    const volSeguro = escapeHTML(dados.vol) || '?';
    const paginaSegura = escapeHTML(dados.page) || '?';
    const charSeguro = escapeHTML(dados.character);
    const capSeguro = escapeHTML(dados.chapter);
    const descSegura = escapeHTML(dados.desc) || 'Painel publicado pela comunidade.';

    card.innerHTML = `
        <div class="cover real-panel">
            <img src="${dados.imgURL}" alt="Painel enviado">
            <div class="cover-label">${mangaSeguro}</div>
        </div>
        <div class="card-body">
            <div class="meta">
                <span>${mangaSeguro} · <strong>Vol. ${volSeguro} · Pág. ${paginaSegura}</strong></span>
                <span class="rating">${dados.rating},0 ★</span>
            </div>
            <div class="panel-info">
                <span class="info-pill">Volume ${volSeguro}</span>
                <span class="info-pill">Página ${paginaSegura}</span>
                ${charSeguro ? `<span class="info-pill">${charSeguro}</span>` : ''}
                ${capSeguro ? `<span class="info-pill">${capSeguro}</span>` : ''}
            </div>
            <p>${descSegura}</p>
            <div class="card-foot">
                <span>❤ 0</span>
                <span>💬 0</span>
            </div>
        </div>
    `;
    return card;
}

// Publicar Painel
document.getElementById('publishPanel').addEventListener('click', () => {
    const manga = document.getElementById('mangaName').value.trim();
    const vol = document.getElementById('volume').value.trim();
    const page = document.getElementById('page').value.trim();
    const chapter = document.getElementById('chapter').value.trim();
    const character = document.getElementById('character').value.trim();
    const rating = document.getElementById('rating').value;
    const desc = document.getElementById('description').value.trim();
    const file = fileInput.files[0];

    if (!manga || !file) {
        alert('Por favor, adicione a foto do painel e o nome do mangá.');
        return;
    }

    // Criar um objeto com os dados
    const dadosCard = {
        manga, vol, page, chapter, character, rating, desc,
        imgURL: URL.createObjectURL(file) 
    };

    // Gera o card e joga no topo do site
    const novoCard = criarCard(dadosCard);
    cardsContainer.prepend(novoCard);

    hideModal();
    
    // Alerta nativo para avisar que deu certo no lugar do aviso escondido
    setTimeout(() => {
        alert('✓ Painel publicado com sucesso!');
    }, 300);
});