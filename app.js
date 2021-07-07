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
            displayStatus('Please Enter valid number!');

        } else {
            if (guessedNumber == correctNumber) {
                //Set isWinner to true.
                isWinner = true;
                //Check chances left.
                chanceLeft -= 1;
                //Display correct ans.
                displayResult('correct', 'correct-text', `Yes! Your answer is correct. You won with ${chanceLeft} chances left.`);
            } else {
                //Check chances left.
                chanceLeft -= 1;

                if (chanceLeft == 0) {
                    //Set chanceleft to -1
                    chanceLeft = -1;
                    //Display wrong answer.
                    displayResult('wrong', 'wrong-text', `Wrong! Correct answer was ${correctNumber}.`);
                } else {
                    //Display chances left msg.
                    displayStatus(`Wrong! you still have ${chanceLeft} chances left.`);
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

function displayResult(inputClass, resultClass, msg) {
    //Disable input feild  & change border color.
    guessedInput.setAttribute('disabled', 'disabled');
    guessedInput.classList.add(inputClass);
    //Display msg
    resultMsg.style.display = 'block';
    resultMsg.className = resultClass;
    resultMsg.innerText = msg;
    //Change submit button text
    playBtn.value = 'PLAY AGAIN'
}

function displayStatus(msg) {
    //Display chances left msg.
    resultMsg.style.display = 'block';
    resultMsg.className = 'wrong-text';
    resultMsg.innerText = msg;
}