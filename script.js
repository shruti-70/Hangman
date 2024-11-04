let letters;
let wordLoaded = false; 
let attempts = 6; // Number of incorrect attempts allowed
let guessedLetters = []; 
let correctLetters = []; 

$(document).ready(function() {
    getWord();
   
    $(".button").click(function() {
        var value = $(this).val();
        console.log(value);
        fill(letters, value);
        
        $(this).prop("disabled", true);
        $(this).addClass("disable");
    });
});

function getWord() {
    if (!wordLoaded) {
        return fetch('https://random-word-api.herokuapp.com/word', {
            method: 'GET',
        })
        .then(response => response.json())
        .then(data => {
            const word = data[0];
            console.log('Random word:', word);
            letters = word.split('');   
            console.log(letters);
            wordLoaded = true; 
            dashes(letters);
            return letters; 
        })
        .catch(error => console.error('Error fetching random word:', error));
    } else {
        console.log('Word already loaded:', letters); 
        return Promise.resolve(letters); 
    }
}

function dashes(letters) {
    let dashedWord = '';
    for (let i = 0; i < letters.length; i++) {
        dashedWord += "<span class='dash'>-</span>";
    }
    document.getElementById("container").innerHTML = dashedWord;
    updateAttempts();
}

function fill(letters, value) {
    value = value.toLowerCase();
    if (guessedLetters.includes(value)) {
        console.log("Already guessed: " + value);
        return; 
    }
    guessedLetters.push(value);
    let correctGuess = false;

    let dashedWord = '';
    for (let i = 0; i < letters.length; i++) {
        if (letters[i].toLowerCase() === value) {
            dashedWord += "<span class='dash'>" + value + "</span>";
            correctGuess = true; // Found a correct guess
            correctLetters[i] = value; // Store the correct letter
        } else {
            dashedWord += "<span class='dash'>" + (correctLetters[i] || '-') + "</span>";
        }
    }
    
    document.getElementById("container").innerHTML = dashedWord;

    if (!correctGuess) {
        attempts--; // Decrease attempts if guess was wrong
        updateAttempts();
    }
    
    checkGameStatus();
}

function updateAttempts() {
    document.getElementById("attempts").innerText = "Attempts left: " + attempts;
}

function checkGameStatus() {
    if (attempts <= 0) {
        alert("Game Over! The word was: " + letters.join(''));
        resetGame();
    } else if (correctLetters.length && correctLetters.length === letters.length && !correctLetters.includes(undefined)) {
        alert("Congratulations! You've guessed the word: " + letters.join(''));
        resetGame();
    }
}

function resetGame() {
    letters = null;
    wordLoaded = false;
    attempts = 6;
    guessedLetters = [];
    correctLetters = [];
    $(".button").prop("disabled", false).removeClass("disable");
    getWord();
}
