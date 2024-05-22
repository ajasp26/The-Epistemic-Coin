let totalFlips = 0;
let headsCount = 0;
let tailsCount = 0;
let isWeighted = Math.random() < 0.5;
let bias = isWeighted ? (Math.random() < 0.5 ? 0.9 : 0.2) : 0.5;

function flipCoin() {
    return Math.random() < bias;
}

function flipCoins() {
    const numFlips = parseInt(document.getElementById('flipInput').value.replace(/,/g, ''));
    if (isNaN(numFlips) || numFlips < 1 || numFlips > 100000) {
        alert("Please enter a valid number between 1 and 100000.");
        return;
    }
    
    const coin = document.getElementById('coin');
    coin.style.animation = 'flip 2s linear infinite';  
    setTimeout(() => {
        coin.style.animation = 'none';
        for (let i = 0; i < numFlips; i++) {
            flipCoin() ? headsCount++ : tailsCount++;
        }
        totalFlips += numFlips;
        updateStats();
        if (totalFlips >= 100000) {
            showFinalDecision();
        } else {
            document.getElementById('continueButton').style.display = 'inline-block';
            document.getElementById('concludeButton').style.display = 'inline-block';
        }
    }, 2000);  
}

function updateStats() {
    const headPercentage = (headsCount / totalFlips * 100).toFixed(3);
    const tailPercentage = (tailsCount / totalFlips * 100).toFixed(3);
    document.getElementById('stats').textContent = `Current stats: Heads % = ${headPercentage}, Tails % = ${tailPercentage}`;
    document.getElementById('totalFlips').textContent = `Total flips: ${totalFlips}`;
}

function askContinue() {
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('concludeButton').style.display = 'none';
}

function prepareFinalDecision() {
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('concludeButton').style.display = 'none';
    document.getElementById('final-decision').style.display = 'block';
}

function showFinalDecision() {
    document.getElementById('action-buttons').style.display = 'none';
    document.getElementById('final-decision').style.display = 'block';
}

function finalGuess(isWeightedGuess) {
    const guessedCorrectly = (isWeightedGuess && isWeighted) || (!isWeightedGuess && !isWeighted);
    alert(`You guessed: ${isWeightedGuess ? "weighted" : "not weighted"}. That is ${guessedCorrectly ? "correct" : "incorrect"}!`);
    document.getElementById('restart-section').style.display = 'block';
}

function restartGame() {
    const coin = document.getElementById('coin');
    coin.style.animation = 'coin-leave 1s linear'; 
    setTimeout(() => {
        resetGame();
        coin.style.animation = 'coin-enter 1s linear';  
    }, 1000);  
}

function resetGame() {
    totalFlips = 0;
    headsCount = 0;
    tailsCount = 0;
    isWeighted = Math.random() < 0.5;
    bias = isWeighted ? (Math.random() < 0.5 ? 0.9 : 0.2) : 0.5;

    document.getElementById('stats').textContent = '';
    document.getElementById('totalFlips').textContent = '';
    document.getElementById('continueButton').style.display = 'none';
    document.getElementById('concludeButton').style.display = 'none';
    document.getElementById('final-decision').style.display = 'none';
    document.getElementById('restart-section').style.display = 'none';
    document.getElementById('action-buttons').style.display = 'flex';
}

document.getElementById('continueButton').style.display = 'none';
document.getElementById('concludeButton').style.display = 'none';
document.getElementById('final-decision').style.display = 'none';
document.getElementById('restart-section').style.display = 'none';

document.getElementById('flipInput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        flipCoins();
    }
});
