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
playGame('Rock');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
playGame('Paper');
});

document.querySelector('.js-scissor-button').addEventListener('click', () => {
playGame('Scissor');
});

document.body.addEventListener('keydown',(event) => {
if(event.key === 'r'){
    playGame('Rock');
} else if(event.key === 'p'){
    playGame('Paper');
} else if(event.key === 's'){
    playGame('Scissor');
} else if(event.key === 'a'){
    autoPlay();
} else if(event.key === 'Backspace'){
    resetScore();
}
});

function playGame(playerMove){
const computerMove = pickComputerMove();

let result='';

if(playerMove === 'Scissor'){
    if(computerMove === 'Scissor'){
    result='Tie';
    } else if(computerMove === 'Rock'){
        result='You Lose';
    } else if(computerMove === 'Paper'){
        result='You Win';
    }
}else if(playerMove === 'Paper'){
    if(computerMove === 'Paper'){
        result='Tie';
    } else if(computerMove === 'Scissor'){
        result='You Lose';
    } else if(computerMove === 'Rock'){
        result='You Win';
    }
}else if(playerMove === 'Rock'){
    if(computerMove === 'Rock'){
        result='Tie';
    } else if(computerMove === 'Paper'){
        result='You Lose';
    } else if(computerMove === 'Scissor'){
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
    computerMove='Rock';
} else if(randomNum >= 1/3 && randomNum < 2/3){
    computerMove='Paper';
} else {
    computerMove='Scissor';
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