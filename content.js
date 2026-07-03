// Função principal de sincronização
function sincronizarLive(event) {
  const video = event.target;
  
  // Procura o botão de Ao Vivo do YouTube
  const liveButton = document.querySelector('.ytp-live-badge');

  // Só age se for uma live ativa E se o usuário não tiver pausado o vídeo voluntariamente
  if (liveButton && !liveButton.hasAttribute('disabled') && !video.paused) {
    
    if (video.seekable && video.seekable.length > 0) {
      const tempoReal = video.seekable.end(video.seekable.length - 1);
      const tempoAtual = video.currentTime;
      const atraso = tempoReal - tempoAtual;

      // CRÍTICO: Se o atraso for bizarro (maior que 10s), dá um pulo direto
      if (atraso > 10) {
        video.currentTime = tempoReal;
        video.playbackRate = 1.0;
        console.log(`[Anti-Delay] Atraso crítico de ${atraso.toFixed(1)}s! Pulando para o tempo real.`);
      } 
      // SUAVE: Se o atraso for pequeno (entre 2s e 10s), acelera o vídeo de leve
      else if (atraso > 2) {
        if (video.playbackRate !== 1.15) {
          video.playbackRate = 1.15; // Acelera 15% (imperceptível ao ouvido)
          console.log(`[Anti-Delay] Atraso de ${atraso.toFixed(1)}s detetado. Acelerando a transmissão...`);
        }
      } 
      // No tempo certo: volta a velocidade ao normal
      else if (atraso <= 1.0 && video.playbackRate !== 1.0) {
        video.playbackRate = 1.0;
        console.log("[Anti-Delay] Sincronizado com sucesso! Velocidade normalizada.");
      }
    }
  }
}

// Observador para injetar o evento sempre que um novo vídeo aparecer na tela
const observer = new MutationObserver(() => {
  const video = document.querySelector('video');
  if (video && !video.dataset.antidelayAtivo) {
    video.dataset.antidelayAtivo = "true";
    
    // O evento 'timeupdate' roda nativamente enquanto o vídeo toca
    video.addEventListener('timeupdate', sincronizarLive);
    console.log("[Anti-Delay] Monitoramento inteligente ativado no player!");
  }
});

// Inicia o observador na página do YouTube
observer.observe(document.body, { childList: true, subtree: true });