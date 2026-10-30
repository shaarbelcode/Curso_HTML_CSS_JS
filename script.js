// Pegar os elementos da página
const buracos = document.querySelectorAll('.buraco');
const botao = document.getElementById('iniciar');
const textoPontos = document.getElementById('pontos');
const textoTempo = document.getElementById('tempo');
const mensagem = document.getElementById('mensagem');
const martelo = document.getElementById('martelo');

// Variáveis do jogo
let pontos = 0;
let tempo = 30;
let buracoAtual = buracos[0];
let pulo;
let relogio;

// O martelo segue o mouse
document.addEventListener('mousemove', function (evento) {
  martelo.style.left = evento.clientX + 'px';
  martelo.style.top = evento.clientY + 'px';
});

// Apertou o botão do mouse: martelo desce
document.addEventListener('mousedown', function () {
  martelo.classList.add('batendo');
});

// Soltou o botão do mouse: martelo sobe
document.addEventListener('mouseup', function () {
  martelo.classList.remove('batendo');
});

// Tira o bug do buraco atual e coloca num buraco sorteado
function mostrarBug() {
  buracoAtual.textContent = '';
  const sorteio = Math.floor(Math.random() * 9);
  buracoAtual = buracos[sorteio];
  buracoAtual.textContent = '🐛';
}

// Tira 1 segundo. Quando chega a 0, acaba o jogo
function contarTempo() {
  tempo = tempo - 1;
  textoTempo.textContent = tempo;

  if (tempo === 0) {
    clearInterval(pulo);
    clearInterval(relogio);
    buracoAtual.textContent = '';
    mensagem.textContent = 'Fim de jogo! Você fez ' + pontos + ' pontos.';
    botao.disabled = false;
  }
}

// Zera tudo e liga os dois relógios
function iniciar() {
  pontos = 0;
  tempo = 30;
  textoPontos.textContent = pontos;
  textoTempo.textContent = tempo;
  mensagem.textContent = '';
  botao.disabled = true;

  mostrarBug();
  pulo = setInterval(mostrarBug, 800);
  relogio = setInterval(contarTempo, 1000);
}

botao.addEventListener('click', iniciar);

// Martelada em cada buraco: se tem bug, ganha ponto
buracos.forEach(function (buraco) {
  buraco.addEventListener('mousedown', function () {
    if (buraco.textContent === '🐛') {
      buraco.textContent = '💥';
      pontos = pontos + 1;
      textoPontos.textContent = pontos;
    }
  });
});
