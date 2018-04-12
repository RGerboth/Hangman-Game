// Hangman game js

let wins = 0;
let guessesLeft = 12;
let lettersGuessedSoFar = [];
let currentWord = "";
let displayWord = ["_ "];
const placeHolder = "_ ";
const alphabet = "abcdefghijklmnopqrstuvwxyz";
let playerChoice = "";
let outcome = true;
let lastWinningWord = "";
let currentWordIndex = 0;
let newGame = true;

// randommly chooses a word from the options array, loads into 
// currentWord and intializes displayWord with the correct number of spaces. 
function newWord() {
  // check to see if any challenge words remain
  guessesLeft = 12;
  currentWord = "";
  displayWord = ["_ "];
  lettersGuessedSoFar = [];
  console.log("------- NEW WORD --------");
  document.getElementById("lettersGuessedSoFar").innerHTML = lettersGuessedSoFar.toString();
  //select random word from the array of available words
  currentWordIndex = [Math.floor(Math.random() * words.length)];
  currentWord = words[currentWordIndex];
  //fill in the display word with placeholder for each letter 
  for (let i = 1; i < currentWord.length; i++) {
    displayWord.push(placeHolder);
  }
  document.getElementById("guessesLeft").innerHTML = guessesLeft;
 }

// display win/loss message, set up new game
function gameOver(outcome) {
  newGame = true;
  if (outcome) {
    wins++;
    document.getElementById("winsCounter").innerHTML = wins;
    lastWinningWord = currentWord.toUpperCase();
    // removes the winning word from the list of available challenge words
    words.splice(currentWordIndex, 1);
    document.getElementById("lastWinningWord").innerHTML = lastWinningWord;
    document.getElementById("picture").src = "images/CaptainKirkApproves.jpg";
    // if there are no more challenge words, final message, else...
    if (!words.length) {
      document.getElementById("statusMessage").innerHTML = "You have gussed all the";
      document.getElementById("message").innerHTML = "words. Congratulations!";
      document.getElementById("displayWord").innerHTML = "";
    } else {
      document.getElementById("statusMessage").innerHTML = "Saurian brandy, anyone?";
      document.getElementById("message").innerHTML = "Press any key to play again";
    }

  } else {
    document.getElementById("statusMessage").innerHTML = "I'm not a magician, Spock...";
    document.getElementById("message").innerHTML = "Press any key to play again";
    document.getElementById("picture").src = "images/HesDeadJim.jpg";
  }

  newWord();

}

// Initial welcome message 
document.getElementById("statusMessage").innerHTML = "New Game";
document.getElementById("message").innerHTML = "Pick any letter to start";

// set up first game/word
newWord();
document.getElementById("displayWord").innerHTML = displayWord.join(" ");

// // This function runs every time the player presses a key.
document.onkeyup = function(event) {
  // reset the picture
  if (newGame) {
    newGame = false;
    document.getElementById("picture").src = "images/StarshipEnterprise.jpg";
    document.getElementById("message").innerHTML = "Pick any letter to start";
  }

  document.getElementById("statusMessage").innerHTML = "Good Luck!";

  // Determines which key was pressed, forced to lower case.
  let playerChoice = event.key.toLowerCase();

  // make sure the player chose a letter a-z, if true continue
  if ((alphabet.indexOf(playerChoice)) > -1) {
    // check to see if this letter guessed before, add to list if new
    // and decrement the guessess counter. 
    if (lettersGuessedSoFar.indexOf(playerChoice) === -1) {
      //check if this letter is in the current word, match to 
      //individual placeholder letters if so
      if (currentWord.indexOf(playerChoice) > -1) {
        document.getElementById("message").innerHTML = "Correct guess";
        for (let i = 0; i < currentWord.length; i++) {
          if (playerChoice == currentWord.charAt(i)) {
            console.log("Index: " + i + currentWord.charAt(i));
            displayWord[i] = playerChoice.toUpperCase();
          }
      }
      } else {
        lettersGuessedSoFar.push(playerChoice);
        guessesLeft--;
        document.getElementById("lettersGuessedSoFar").innerHTML = lettersGuessedSoFar.toString();
        document.getElementById("message").innerHTML = "Letter not found";
      }
    } else {
      document.getElementById("message").innerHTML = "Letter guessed before";
    }
  }

  // if all letters are matched, winner
  if (displayWord.indexOf("_ " ) == -1) {
    outcome = true;
    gameOver(outcome);
  }

  // if player runs out of guesses, loss
  if (guessesLeft === 0) {
    outcome = false;
    gameOver(outcome);
  }

  document.getElementById("displayWord").innerHTML = displayWord.join(" ");
  document.getElementById("guessesLeft").innerHTML = guessesLeft;

};