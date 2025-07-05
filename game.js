const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const result = document.getElementById('result');
const finalScore = document.getElementById('final-score');
const couponCode = document.getElementById('coupon-code');

let score = 0;
let timeLeft = 30;
let gameInterval;
let spawnInterval;

const goodSprites = ['🍒', '💎', '⭐', '🎁', '🔔'];
const badSprites = ['💣', '☠️', '🕷️', '👻', '🧨'];

function spawnObject() {
  const isGood = Math.random() > 0.5;
  const obj = document.createElement('div');
  obj.classList.add('object');
  obj.textContent = isGood
    ? goodSprites[Math.floor(Math.random() * goodSprites.length)]
    : badSprites[Math.floor(Math.random() * badSprites.length)];
  obj.dataset.type = isGood ? 'good' : 'bad';

  obj.style.left = Math.random() * (640 - 32) + 'px';
  obj.style.top = Math.random() * (480 - 32) + 'px';

  obj.addEventListener('click', () => {
    if (obj.dataset.type === 'good') score += 10;
    else score -= 5;
    scoreDisplay.textContent = `Punti: ${score}`;
    obj.remove();
  });

  gameContainer.appendChild(obj);

  setTimeout(() => obj.remove(), 2000);
}

function startGame() {
  score = 0;
  timeLeft = 30;
  scoreDisplay.textContent = `Punti: ${score}`;
  timerDisplay.textContent = `Tempo: ${timeLeft}`;
  result.classList.add('hidden');

  gameInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Tempo: ${timeLeft}`;
    if (timeLeft <= 0) endGame();
  }, 1000);

  spawnInterval = setInterval(spawnObject, 600);
}

function endGame() {
  clearInterval(gameInterval);
  clearInterval(spawnInterval);
  document.querySelectorAll('.object').forEach(o => o.remove());

  finalScore.textContent = `Punteggio finale: ${score}`;

  let coupon = '';
  if (score >= 100) coupon = 'SUPER10';
  else if (score >= 50) coupon = 'MID5';
  else coupon = 'TRYAGAIN';

  couponCode.textContent = `Codice sconto: ${coupon}`;
  result.classList.remove('hidden');
}

startGame();
