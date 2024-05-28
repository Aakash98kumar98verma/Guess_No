let randomNumber = parseInt(Math.random() * 10 + 1);

const submit = document.querySelector('#submit');
const userInput = document.querySelector('#guessField');
const lastGuess = document.querySelector('.lastGuess');
const remaining = document.querySelector('.RemGuess');
const lowOrHigh = document.querySelector('.lowHigh');
const startAgain = document.querySelector('.resultParas');

let arrGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
    submit.addEventListener('click', function (event) {
        event.preventDefault();
        const guess = parseInt(userInput.value);
        validGuess(guess);
    })
}

function validGuess(guess) {  //this function will check weather no.provided bu user is valid or not and send to diffrent function for further process 
    if (isNaN(guess)) {
        alert("Please Enter Valid No.")
    } else if (guess < 1 || guess > 10) {
        alert("Please Enter No. between 1 to 10")
    } else {
        arrGuess.push(guess);
        if (numGuess === 3) {
            cleanGuess(guess); //if number of guess will be more then 10 then "displayGuess(guess)" function will be called
            displayMessage(`Game Over, The Winning Number was ${randomNumber}`); // and  "displayMessage" function called and inside it that will be printed
            endGame(); //and function "endGame()" will also be called
        } else {
            cleanGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) { //this function will check wether the no. match with random no. or not and send to other functions
    if (guess === randomNumber) {
        displayMessage(`Your number is correct..!`); //if number of guess will be right then "displayGuess(guess)" function will be called
        endGame();//and function "endGame()" will also be called
    } else if (guess < randomNumber) {
        displayMessage(`Number is low`)
    } else {
        displayMessage(`Number is high`)
    }
}

function cleanGuess(guess) { //"cleanGuess" function will clean again user input to take new userinput, increase and decrease no. of guess remining
    userInput.value = '';
    lastGuess.innerHTML = lastGuess.innerHTML + `${guess}, ` //display the last number in inner html "lastGuess" var.
    numGuess++;
    remaining.innerHTML = `${4 - numGuess}`
}

function displayMessage(message) { //this function display the message in inner HTML in variable name lowHigh
    lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

const btn = document.createElement('div'); //created a div and provide it variable "btn"

function endGame() {
    userInput.value = ''; //empty the userinput
    userInput.setAttribute('disabled', '');  //made userinput disable
    btn.classList.add('button'); //inside variable "btn" or div we have added button
    btn.innerHTML = `<button id="newGame">Start new Game</button>`; //inside button we have added id and text using innerHTML
    startAgain.appendChild(btn); //and we have append the button to made div or btn
    playGame = false; //we have made playgame = fasse to not play game when game is over
    newGame(); //after end game we called new game function
}

function newGame() {  //function of newgame and conditions
    const newGameButton = document.querySelector('#newGame'); //to be visiable of new bame button
    newGameButton.addEventListener('click', function (event) { //adding addEventListener "click" to restart game when we click it.
        randomNumber = parseInt(Math.random() * 10 + 1);
        arrGuess = [];
        numGuess = 1;
        lastGuess.innerHTML = '';
        remaining.innerHTML = `${4 - numGuess} `;
        userInput.removeAttribute('disabled');
        startAgain.removeChild(btn);
        playGame = true;
    });
}

