// Function to return a RandomNumber
function setRandomNumber() {
    return (Math.floor(Math.random() * 10) + 1);
}

// Set a correct Number for each play.
let correctNumber = setRandomNumber();
// Set a count of chances for each play.
let chanceLeft = 3;
//Set a winner flag for each play.
let isWinner = false;

//UI Vars
let guessedInput = document.getElementById('guess');
let playBtn = document.getElementById('btn');
let resultMsg = document.getElementById('resultMsg');

playBtn.addEventListener('click', checkAns);

function checkAns() {
    if (isWinner || chanceLeft == -1) {
        //Reset all play variables such as correctNumber, chanceLeft, isWinner.
        resetPlay();
    } else {
        let guessedNumber = guessedInput.value;
        if (guessedNumber === '') {
            // Display error msg
            resultMsg.style.display = 'block';
            resultMsg.innerText = 'Please Enter valid number!';
            resultMsg.className = 'wrong-text';
        } else {
            if (guessedNumber == correctNumber) {
                //Set isWinner to true.
                isWinner = true;
                //Check chances left.
                if ((chanceLeft - 1) >= 0) {
                    chanceLeft -= 1;
                } else {
                    chanceLeft = -1;
                }
                //Display correct ans.
                correctAns(chanceLeft);
            } else {
                //Check chances left.
                if ((chanceLeft - 1) == 0) {
                    //Set chanceleft to -1
                    chanceLeft = -1;
                    //Display wrong answer.
                    wrongAns(correctNumber);
                } else {
                    chanceLeft -= 1;
                    //Display chances left msg.
                    resultMsg.style.display = 'block';
                    resultMsg.className = 'wrong-text';
                    resultMsg.innerText = `Wrong! you still have ${chanceLeft} chances left.`;
                }
            }
        }

    }
}

function resetPlay() {
    // Set a correct Number for each play.
    correctNumber = setRandomNumber();
    // Set a count of chances for each play.
    chanceLeft = 3;
    //Set a winner flag for each play.
    isWinner = false;
    //Set input filed to normal & Reset value.
    guessedInput.removeAttribute('disabled');
    guessedInput.classList.remove('wrong');
    guessedInput.classList.remove('correct');
    guessedInput.value = '';
    resultMsg.style.display = 'none';
    //Set play button text to to Submit.
    playBtn.value = 'SUBMIT';

}

function correctAns(chances) {
    //Disable input feild  & change border color.
    guessedInput.setAttribute('disabled', 'disabled');
    guessedInput.classList.add('correct');
    //Display msg
    resultMsg.style.display = 'block';
    resultMsg.className = 'correct-text';
    resultMsg.innerText = `Yes! Your guess is correct, you won with ${chances} chances left.`;
    //Change submit button text
    playBtn.value = 'PLAY AGAIN'
}

function wrongAns(correctNum) {
    //Disable input feild  & change border color.
    guessedInput.setAttribute('disabled', 'disabled');
    guessedInput.classList.add('wrong');
    //Display msg
    resultMsg.style.display = 'block';
    resultMsg.className = 'wrong-text';
    resultMsg.innerText = `Wrong! Correct answer was  ${correctNum}.`;
    //Change submit button text
    playBtn.value = 'PLAY AGAIN';
}