// Array to store the card values
const cardValues = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];

// Shuffle function to randomize the cards
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Initialize the game
function initGame() {
    const gameBoard = document.getElementById('game-board');
    shuffle(cardValues);
    cardValues.forEach(value => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = value;
        card.innerText = '?';
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Variables to keep track of the game state
let flippedCards = [];
let matchedCards = [];

// Function to handle card flipping
function flipCard() {
    if (flippedCards.length === 2) return;

    this.classList.add('flipped');
    this.innerText = this.dataset.value;
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        setTimeout(checkForMatch, 1000);
    }
}

// Function to check if two flipped cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.value === card2.dataset.value) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedCards.push(card1, card2);
    } else {
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1.innerText = '?';
        card2.innerText = '?';
    }

    flippedCards = [];

    // Check if all cards have been matched
    if (matchedCards.length === cardValues.length) {
        setTimeout(() => alert('Congratulations! You matched all the cards!'), 500);
    }
}

// Start the game when the page loads
window.onload = initGame;
