// Modal de Upload
const uploadModal = document.getElementById('uploadModal');
const btnOpenModal = document.getElementById('btnOpenModal');
const btnCloseModal = document.getElementById('btnCloseModal');
const btnPublish = document.getElementById('btnPublish');

btnOpenModal.addEventListener('click', () => uploadModal.classList.add('show'));
btnCloseModal.addEventListener('click', () => uploadModal.classList.remove('show'));
btnPublish.addEventListener('click', () => {
  uploadModal.classList.remove('show');
  alert('Publicado!');
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

  // Limpa campo de texto
  newCommentInput.value = '';
  
  postModal.classList.add('show');
}

closePostModal.addEventListener('click', () => {
  postModal.classList.remove('show');
});

// Fechar clicando fora
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
      <p>${text}</p>
    `;
    commentsList.appendChild(commentDiv);
    newCommentInput.value = '';
    
    // Rola para o final da lista de comentários
    commentsList.scrollTop = commentsList.scrollHeight;
  }
});

// Permitir enviar comentário com a tecla Enter
newCommentInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    btnSendComment.click();
  }
});