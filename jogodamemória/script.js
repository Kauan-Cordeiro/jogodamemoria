let cardValues = [];
let cards = [];
let flippedCards = [];
let errorCount = 0;
let timerInterval;
let seconds = 0;

const startGame = (difficulty) => {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    errorCount = 0;
    seconds = 0;
    document.getElementById('errorCount').innerText = 'Erros: ' + errorCount;
    document.getElementById('time').innerText = 'Tempo: ' + seconds + 's';

    // Definindo valores das cartas com base na dificuldade
    const numPairs = difficulty === 'easy' ? 4 : difficulty === 'medium' ? 6 : 8;
    cardValues = Array.from({ length: numPairs }, (_, i) => i + 1).flatMap(n => [n, n]);
    cards = cardValues.sort(() => Math.random() - 0.5);

    cards.forEach((value, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.dataset.index = index;
        card.innerText = '?';
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });

    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
};

const flipCard = (card) => {
    if (flippedCards.length < 2 && !card.classList.contains('flipped')) {
        card.classList.add('flipped');
        card.innerText = card.dataset.value;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            checkMatch();
        }
    }
};

const checkMatch = () => {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.dataset.value === secondCard.dataset.value) {
        flippedCards = [];
        if (document.querySelectorAll('.flipped').length === cards.length) {
            clearInterval(timerInterval);
            alert(`Você venceu! Erros: ${errorCount}, Tempo: ${seconds}s`);
        }
    } else {
        errorCount++;
        document.getElementById('errorCount').innerText = 'Erros: ' + errorCount;
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            firstCard.innerText = '?';
            secondCard.classList.remove('flipped');
            secondCard.innerText = '?';
            flippedCards = [];
        }, 1000);
    }
};

const updateTimer = () => {
    seconds++;
    document.getElementById('time').innerText = 'Tempo: ' + seconds + 's';
};

document.getElementById('restartButton').addEventListener('click', startGame);