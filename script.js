'use strict';

//SELECTING ELEMENTS
let player0El = document.querySelector('.player--0');
let player1El = document.querySelector('.player--1');
let score0El = document.querySelector('#score--0');
let score1El = document.querySelector('#score--1');
let current0El = document.getElementById('current--0');
let current1El = document.getElementById('current--1');

let diceEl = document.querySelector('.dice');
let btnNew = document.querySelector('.btn--new');
let btnHold = document.querySelector('.btn--hold');
let btnRoll = document.querySelector('.btn--roll');

//STARTING CONDITIONS
let scores, currentScore, activePlayer, playing;
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();
function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//ROLLING DICE FUNCTIONALITY
btnRoll.addEventListener('click', function () {
  //GENERATING A RANDOM DICE ROLL
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);

    //DISPLAY DICE
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //CHECK FOR ROLLED 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //SWITCH TO NEXT PLAYER
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //ADD CURRENT SCORE TO ACTIVE PLAYER'S SCORE
    scores[activePlayer] += currentScore;
    //score[1]=score[1]+currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //CHECK IF PLAYER'S SCORE IS >=100
    if (scores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      playing = false;
      //FINISH THE GAME
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    }
    //SWITCH TO THE NEXT PLAYER
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
