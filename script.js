document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('restart-game').addEventListener('click', returnToStart);

let correctScore = 0;
let wrongScore = 0;
let timeLeft = 0;
let timer;
let tableNumbers = [];

function startGame() {
    const tableNumbersInput = document.getElementById('table-number').value;
    const gameTime = document.getElementById('game-time').value;
    
    if (!tableNumbersInput || !gameTime) {
        alert('Please enter table numbers and game time.');
        return;
    }

    // Parse input table numbers separated by commas
    tableNumbers = tableNumbersInput.split(',').map(num => parseInt(num.trim(), 10));

    correctScore = 0;
    wrongScore = 0;
    timeLeft = gameTime * 60;
    document.getElementById('correct-score').innerText = 'Correct Answers: ' + correctScore;
    document.getElementById('wrong-score').innerText = 'Wrong Answers: ' + wrongScore;

    document.querySelector('.config').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');

    generateQuestion();

    clearInterval(timer);
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        } else {
            timeLeft--;
            updateDigitalClock(timeLeft);
        }
    }, 1000);
}

function generateQuestion() {
    const tableNumber = tableNumbers[Math.floor(Math.random() * tableNumbers.length)];
    const num = Math.floor(Math.random() * 10) + 1;
    const correctAnswer = num * tableNumber;

    const options = [correctAnswer];
    while (options.length < 4) {
        const option = Math.floor(Math.random() * tableNumber * 10) + 1;
        if (!options.includes(option)) {
            options.push(option);
        }
    }

    shuffleArray(options);

    document.getElementById('question').innerText = `What is ${tableNumber} x ${num}?`;
    const optionsDiv = document.getElementById('options');
    optionsDiv.innerHTML = '';

    options.forEach(option => {
        const button = document.createElement('button');
        button.innerText = option;
        button.addEventListener('click', () => checkAnswer(option, correctAnswer, tableNumber));
        optionsDiv.appendChild(button);
    });
}

function checkAnswer(selected, correct, tableNumber) {
    // Check if the selected table number is among the chosen ones
    if (tableNumbers.includes(tableNumber)) {
        if (selected === correct) {
            correctScore++;
        } else {
            wrongScore++;
        }
        document.getElementById('correct-score').innerText = 'Correct Answers: ' + correctScore;
        document.getElementById('wrong-score').innerText = 'Wrong Answers: ' + wrongScore;
    }
    generateQuestion();
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateDigitalClock(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    document.getElementById('digital-clock').innerText = `${formattedMinutes}:${formattedSeconds}`;
}

function endGame() {
    document.getElementById('final-score').innerText = `Correct: ${correctScore}, Wrong: ${wrongScore}`;
    document.getElementById('end-screen').classList.remove('hidden');
}

function returnToStart() {
    document.querySelector('.config').classList.remove('hidden');
    document.getElementById('game').classList.add('hidden');
    document.getElementById('end-screen').classList.add('hidden');
}
