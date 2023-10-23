// Substitua 'YOUR_CLIENT_ID' pelo seu Client ID do Spotify
const CLIENT_ID = 'YOUR_CLIENT_ID';
const REDIRECT_URI = 'http://localhost:3000/callback.html';

document.getElementById('login-button').addEventListener('click', () => {
    // Redirecione o usuário para a página de autenticação do Spotify
    window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=token`;
});

// A seguir, você precisará implementar a lógica para obter os dados da API do Spotify e controlar o player.
