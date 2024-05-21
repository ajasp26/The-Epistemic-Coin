// Initialize the total number of flips and counts for heads and tails
let totalFlips = 0;
let headsCount = 0;
let tailsCount = 0;

// Determine if the coin is weighted and set the bias accordingly
let isWeighted = Math.random() < 0.5;
let bias = isWeighted ? (Math.random() < 0.5 ? 0.8 : 0.2) : 0.5;

// Simulate a single coin flip
function flipCoin() {
    return Math.random() < bias;
}

// Function to flip the coin multiple times
function flipCoins() {
    // Get the number of flips from the input field and validate it
    const numFlips = parseInt(document.getElementById('flipInput').value.replace(/,/g, ''));
    if (isNaN(numFlips) || numFlips < 1 || numFlips > 100000) {
        alert("Please enter a valid number between 1 and 100000.");
        return;
    }
    
    // Begin coin flip animation
    const coin = document.getElementById('coin');
    coin.style.animation = 'flip 2s';
    
    // Perform the flips and update statistics after the aniation concludes :)
    setTimeout(() => {
        coin.style.animation = 'none';
        for (let i = 0; i < numFlips; i++) {
            flipCoin() ? headsCount++ : tailsCount++;
        }
        totalFlips += numFlips;
        updateStats();

        // Check if the total flips exceed or reach 100000 and show final decision if so
        if (totalFlips >= 100000) {
            showFinalDecision();
        } else {
            // Show buttons to continue or conclude the game
            document.getElementById('continueButton').style.display = 'inline-block';
            document.getElementById('concludeButton').style.display = 'inline-block';
        }
    }, 2000);
}

// Update the displayed statistics
function updateStats() {
    const headPercentage = (headsCount / totalFlips * 100).toFixed(3);
    const tailPercentage = (tailsCount / totalFlips * 100).toFixed(3);
    document.getElementById('stats').textContent = `Current stats: Heads % = ${headPercentage}, Tails % = ${tailPercentage}`;
    document.getElementById('totalFlips').textContent = `Total flips: ${totalFlips}`;
}

// Hide continue and conclude buttons
function askContinue() {
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('concludeButton').style.display = 'none';
}

// Prepare for final decision making
function prepareFinalDecision() {
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('concludeButton').style.display = 'none';
    document.getElementById('final-decision').style.display = 'block';
}

// Show the final decision UI
function showFinalDecision() {
    document.getElementById('action-buttons').style.display = 'none';
    document.getElementById('final-decision').style.display = 'block';
}

// Handle the final guess and provide feedback
function finalGuess(isWeightedGuess) {
    const guessedCorrectly = (isWeightedGuess && isWeighted) || (!isWeightedGuess && !isWeighted);
    alert(`You guessed: ${isWeightedGuess ? "weighted" : "not weighted"}. That is ${guessedCorrectly ? "correct" : "incorrect"}!`);
    document.getElementById('restart-section').style.display = 'block';
}

// Restart the game with animation
function restartGame() {
    const coin = document.getElementById('coin');
    coin.style.animation = 'coin-leave 1s forwards';
    setTimeout(() => {
        resetGame();
        coin.style.animation = 'coin-enter 1s forwards';
    }, 1000);
}

// Reset game variables and UI elements
function resetGame() {
    totalFlips = 0;
    headsCount = 0;
    tailsCount = 0;
    isWeighted = Math.random() < 0.5;
    bias = isWeighted ? (Math.random() < 0.5 ? 0.8 : 0.2) : 0.5;

    document.getElementById('stats').textContent = '';
    document.getElementById('totalFlips').textContent = '';
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('concludeButton').style.display = 'none';
    document.getElementById('final-decision').style.display = 'none';
    document.getElementById('restart-section').style.display = 'none';
    document.getElementById('action-buttons').style.display = 'flex';
}

// Hide unnecessary buttons and sections initially
document.getElementById('continueButton').style.display = 'none';
document.getElementById('concludeButton').style.display = 'none';
document.getElementById('final-decision').style.display = 'none';
document.getElementById('restart-section').style.display = 'none';

// Enter key functionality
document.getElementById('flipInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        flipCoins();
    }
});
