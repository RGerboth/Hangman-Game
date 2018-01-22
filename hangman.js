// Hangman game js

    var wins = 0;
    var lettersHit = 0;
    var guessesLeft = 12;
    var lettersGuessedSoFar = [];
    var currentWord = "text";
    var displayWord = ["_ "];
    var placeHolder = "_ "
    var alphabet = "abcdefghijklmnopqrstuvwxyz"
    var playerChoice = "text";
    var outcome = true;
    var lastWinningWord = "text";
    var currentWordIndex = 0;
    var newGame = true;

    // array of all of the challenge options 
    var words = [
        "klingon",
        "romulan",
        "sulu",
        "spock", 
        "uhura",
        "kirk", 
        "mccoy", 
        "scotty",
        "chekhov",
        "enterprise",
        "starfleet",
        "shuttle",
        "transporter",
        "warp",
        "torpedo",
        "phaser", 
        "tricorder"
        ];

    // randommly chooses a word from the options array and loads into 
    // currentWord and intializes displayWord with the correct number of spaces. 
    function newWord() {
        guessesLeft = 12;
        currentWord = "";
        displayWord = ["_ "];
        lettersGuessedSoFar = [];
        lettersHit = 0;

        //select random word from the array of available words
        currentWordIndex = [Math.floor(Math.random() * words.length)];
        console.log("currentWordIndex: " + currentWordIndex + ", word: " + words[currentWordIndex]);
        currentWord = words[currentWordIndex];
        console.log("currentWord" + currentWord);

        //fill in the display word with placeholder for each letter 
        for (i = 1; i < currentWord.length; i++) {
            displayWord.push(placeHolder);
            }
        document.getElementById("guessesLeft").innerHTML = guessesLeft;
    }

    // display win/loss message, set up new game
    function gameOver(outcome) {
        newGame = true;
        if (outcome) {
            wins++;
            lastWinningWord = currentWord.toUpperCase();
            console.log("last winning word: " + lastWinningWord);
            document.getElementById("statusMessage").innerHTML = "Saurian brandy, anyone?";
            document.getElementById("message").innerHTML = "Press any key to play again";
            document.getElementById("winsCounter").innerHTML = wins;
            document.getElementById("lastWinningWord").innerHTML = lastWinningWord;
            document.getElementById("picture").src = "images/CaptainKirkApproves.jpg";
            console.log("word index: " + currentWordIndex)

            // removes the winning word from the list of available challenge words
            words.splice(currentWordIndex, 1);

        } else {
            document.getElementById("statusMessage").innerHTML = "I'm not a magician, Spock...";
            document.getElementById("message").innerHTML = "Press any key to play again";
            document.getElementById("picture").src = "images/HesDeadJim.jpg";
        }
        newWord();

    }

    // Initial welcome message 
    document.getElementById("statusMessage").innerHTML = "New Game";
    document.getElementById("message").innerHTML = "Press any key to start";

    // set up first game/word
    newWord();
    document.getElementById("displayWord").innerHTML = displayWord.join(" ");

    // // This function runs every time the player presses a key.
    document.onkeyup = function(event) {

        // reset the picture
        if (newGame) {
            newGame = false;
            document.getElementById("picture").src = "images/StarshipEnterprise.jpg";
            document.getElementById("message").innerHTML = "Press any key to start";
        }

        document.getElementById("statusMessage").innerHTML = "Good Luck!";

        // Determines which key was pressed, forced to lower case.
        var playerChoice = event.key.toLowerCase();

        // make sure the player chose a letter a-z, if true continue
        if ((alphabet.indexOf(playerChoice)) > -1) {
            // check to see if this letter guessed before, add to list if new
            // and decrement the guessess counter. 
            if (lettersGuessedSoFar.indexOf(playerChoice) === -1) {
                console.log ("new letter not guessed before")
                lettersGuessedSoFar.push(playerChoice);
                guessesLeft--;
                //check if this letter is in the current word, match to 
                //individual placeholder letters if so
                if (currentWord.indexOf(playerChoice) > -1) {
                    console.log("letter found " + playerChoice)
                    console.log(currentWord.charAt(0))
                    // displayWord.replaceAt(i, playerChoice);
                    for (i = 0; i < currentWord.length; i++) {
                        if (playerChoice == currentWord.charAt(i)) {
                            console.log("Index: " + i + currentWord.charAt(i));
                            lettersHit++;
                            displayWord[i] = playerChoice.toUpperCase();
                        }
                    }

                } else {
                    console.log("letter not found " + playerChoice)
                }

            } else {
                console.log("letter guessed before, try again")
            }
        }
        // if all letters are matched, winner
        if (lettersHit == currentWord.length) {
            outcome = true;
            gameOver(outcome);
        }
        // if player runs out of guesses, loser
        if (guessesLeft === 0) {
            outcome = false;
            gameOver(outcome);
        }
        document.getElementById("displayWord").innerHTML = displayWord.join(" ");
        document.getElementById("guessesLeft").innerHTML = guessesLeft;

        console.log(currentWord);
        console.log(displayWord.join(" "));
        console.log("Letters hit: " + lettersHit)
        console.log("Players Word length: " + currentWord.length)
        console.log("Players last choice: " + playerChoice);
        console.log("Letters so far: " + lettersGuessedSoFar);

    };