const score = JSON.parse(localStorage.getItem('score')) ||  {
    wins: 0,
    losses: 0,
    ties: 0
};

scoreUpdate();

/*if(!score){
score = {
    wins: 0,
    losses: 0,
    ties: 0
};
}*/

let isAutoPlay = false;
let intervalID;

document.querySelector('.js-auto-play-button').addEventListener('click',() => autoPlay());

function autoPlay(){
if(!isAutoPlay){
    intervalID = setInterval(() =>{
        const playerMove = pickComputerMove();
        playGame(playerMove);
    }   ,1000)
    isAutoPlay = true;
    document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
}else{
    clearInterval(intervalID);
    isAutoPlay = false;
    document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
}
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
playGame('rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
playGame('paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
playGame('scissor');
});

document.body.addEventListener('keydown',(event) => {
if(event.key === 'r'){
    playGame('rock');
} else if(event.key === 'p'){
    playGame('paper');
} else if(event.key === 's'){
    playGame('scissor');
} else if(event.key === 'a'){
    autoPlay();
} else if(event.key === 'Backspace'){
    resetScore();
}
});

function playGame(playerMove){
const computerMove = pickComputerMove();

let result='';

if(playerMove === 'scissor'){
    if(computerMove === 'scissor'){
    result='Tie';
    } else if(computerMove === 'rock'){
        result='You Lose';
    } else if(computerMove === 'paper'){
        result='You Win';
    }
}else if(playerMove === 'paper'){
    if(computerMove === 'paper'){
        result='Tie';
    } else if(computerMove === 'scissor'){
        result='You Lose';
    } else if(computerMove === 'rock'){
        result='You Win';
    }
}else if(playerMove === 'rock'){
    if(computerMove === 'rock'){
        result='Tie';
    } else if(computerMove === 'paper'){
        result='You Lose';
    } else if(computerMove === 'scissor'){
        result='You Win';
    }
}

const resultColor = document.querySelector('.result');

if(result === 'You Win'){
    score.wins += 1;
    resultColor.classList.remove('result-lose');
    resultColor.classList.add('result-win');
} else if(result === 'You Lose'){
    score.losses += 1;
    resultColor.classList.remove('result-win');
    resultColor.classList.add('result-lose');
} else if(result === 'Tie'){
    score.ties += 1;
    resultColor.classList.remove('result-win');
    resultColor.classList.remove('result-lose');
}

localStorage.setItem('score', JSON.stringify(score));

scoreUpdate();

document.querySelector('.js-result').innerHTML = result;

document.querySelector('.js-moves').innerHTML = `You picked <img src="images/${playerMove}-emoji.png" class="move">. Computer picked <img src="images/${computerMove}-emoji.png" class="move">`;
}

function pickComputerMove(){
const randomNum=Math.random();

let computerMove='';

if(randomNum >= 0 && randomNum < 1/3){
    computerMove='rock';
} else if(randomNum >= 1/3 && randomNum < 2/3){
    computerMove='paper';
} else {
    computerMove='scissor';
}

return computerMove;
}

function scoreUpdate(){
document.querySelector('.js-score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

const resetScore = () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    scoreUpdate();
}

document.querySelector('.js-reset-button').addEventListener('click',() => {
    document.querySelector('.js-confirmation-message').innerHTML = 'Are you sure yout want to reset the score?<button class = "js-yes-button yes-button">Yes</button><button class = "js-no-button no-button">No</button>';
    document.querySelector('.js-yes-button').addEventListener('click',() => {
        document.querySelector('.js-confirmation-message').innerHTML = '';
        resetScore();
    });

    document.querySelector('.js-no-button').addEventListener('click',() => document.querySelector('.js-confirmation-message').innerHTML = '');
});
