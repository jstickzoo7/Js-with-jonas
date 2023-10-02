'use strict';
// console.log(document.querySelector('.message').textContent);

// document.querySelector('.message').textContent = 'Correct Number !';

let number = Math.round(Math.random() * 19 + 1);
let score = 20;
let highscore = 0;

const displayMessage = function(message){
  document.querySelector('.message').textContent = message
}
console.log(number);
document.querySelector('.check').addEventListener('click', function () {
  const guess = document.querySelector('.guess').value;
  // console.log(typeof guess)
  // console.warn(typeof Number(guess))

  // checks for input
  if (!guess) {
    displayMessage('No  Number !!!!');
  } else if (Number(guess) !== number) {
    if (score > 1) {
      displayMessage( guess > number ? 'Too high !!!' : 'Too low !!!')
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.score').textContent = 0;
      displayMessage('You lost the game !!!!');
    }
  } else if (Number(guess) === number) {
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('body').style.backgroundColor = '#60b347';
    displayMessage('correct Number!!!!');
    document.querySelector('.number').textContent = number;

    if (score > highscore) {
      highscore = score;
      document.querySelector('.highscore').textContent = highscore;
    }
  }
});

document.querySelector('.again').addEventListener('click', function () {
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('body').style.backgroundColor = '#222';
  displayMessage('start guessing !!!!');
  document.querySelector('.number').textContent = '?';
  document.querySelector('.guess').value = '';
  console.log(score);
  score = 20;
  document.querySelector('.score').textContent = score;
  number = Math.round(Math.random() * 19 + 1);
});
