function escapeHTML(str) {
    if (!str) return '';
    return String(str).replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
}

// Modal de Upload
const uploadModal = document.getElementById('uploadModal');
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnPublish = document.getElementById('btnPublish');
const fileInput = document.getElementById('panelImage');
const previewWrap = document.getElementById('previewWrap');
const previewImg = document.getElementById('previewImg');
const dropText = document.getElementById('dropText');
const postsGrid = document.getElementById('postsGrid');

btnOpenModal.addEventListener('click', () => uploadModal.classList.add('show'));
btnCloseModal.addEventListener('click', () => {
  uploadModal.classList.remove('show');
  resetUploadForm();
});

// Preview de Imagem no Upload
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewWrap.style.display = 'block';
  dropText.style.display = 'none';
});

function resetUploadForm() {
  document.getElementById('uploadManga').value = '';
  document.getElementById('uploadCap').value = '';
  document.getElementById('uploadDesc').value = '';
  fileInput.value = '';
  previewWrap.style.display = 'none';
  dropText.style.display = 'block';
}

// Ação de publicar e criar card
btnPublish.addEventListener('click', () => {
  const manga = escapeHTML(document.getElementById('uploadManga').value.trim());
  const cap = escapeHTML(document.getElementById('uploadCap').value.trim());
  const nota = document.getElementById('uploadNota').value;
  const desc = escapeHTML(document.getElementById('uploadDesc').value.trim());
  const file = fileInput.files[0];

  if (!manga || !file) {
    alert('A foto e o nome do mangá são obrigatórios.');
    return;
  }

  const imgURL = URL.createObjectURL(file);

  const card = document.createElement('article');
  card.className = 'card';
  // O onclick chama a função de abrir o painel interativo passando os dados
  card.onclick = () => openPost(manga, imgURL, 0);
  
  card.innerHTML = `
    <div class="real-panel">
      <img src="${imgURL}" alt="${manga}">
      <div class="cover-label">${manga}</div>
    </div>
    <div class="card-body">
      <div class="meta">
        <span>${manga} · <strong>${cap || 'S/N'}</strong></span>
        <span class="rating">${nota},0 ★</span>
      </div>
      <p>"${desc || 'Cena incrível!'}"</p>
      <div class="card-foot"><span>❤ 0</span><span>💬 0</span></div>
    </div>
  `;

  postsGrid.prepend(card);
  uploadModal.classList.remove('show');
  resetUploadForm();
});

// Modal Interativo de Post
const postModal = document.getElementById('postModal');
const closePostModal = document.getElementById('closePostModal');
const postModalImg = document.getElementById('postModalImg');
const postModalTitle = document.getElementById('postModalTitle');
const postModalLikes = document.getElementById('postModalLikes');
const btnLike = document.getElementById('btnLike');
const commentsList = document.getElementById('commentsList');
const newCommentInput = document.getElementById('newCommentInput');
const btnSendComment = document.getElementById('btnSendComment');

let currentLikes = 0;
let isLiked = false;

// Função chamada ao clicar no card
function openPost(title, imageSrc, likes) {
  postModalTitle.textContent = title;
  postModalImg.src = imageSrc;
  
  currentLikes = likes;
  isLiked = false;
  btnLike.classList.remove('liked');
  postModalLikes.textContent = currentLikes;

  newCommentInput.value = '';
  postModal.classList.add('show');
}

closePostModal.addEventListener('click', () => postModal.classList.remove('show'));
postModal.addEventListener('click', (e) => {
  if(e.target === postModal) postModal.classList.remove('show');
});

// Sistema de Curtida
btnLike.addEventListener('click', () => {
  isLiked = !isLiked;
  if (isLiked) {
    currentLikes++;
    btnLike.classList.add('liked');
  } else {
    currentLikes--;
    btnLike.classList.remove('liked');
  }
  postModalLikes.textContent = currentLikes;
});

// Adicionar Comentário
btnSendComment.addEventListener('click', () => {
  const text = newCommentInput.value.trim();
  if (text) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.innerHTML = `
      <span class="user">@voce</span>
      <p>${escapeHTML(text)}</p>
    `;
    commentsList.appendChild(commentDiv);
    newCommentInput.value = '';
    commentsList.scrollTop = commentsList.scrollHeight;
  }
});

newCommentInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') btnSendComment.click();
});