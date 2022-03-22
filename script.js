/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

'use strict';

var scores, roundScore, activePlayer, btnRoll, btnHold, gamePlaying;

init();


//document.querySelector('#current--' + activePlayer).textContent = dice;
//document.querySelector('#current--' + activePlayer).innerHTML = '<em>' + dice + '</em>';



document.querySelector('.dice').style.display = 'none';

document.querySelector('.btn--roll').addEventListener('click', function() {
	if(gamePlaying) {
			// 1. Random number
			var dice = Math.floor(Math.random() * 6) + 1; 

			// 2. Display the result.
			var diceDOM = document.querySelector('.dice');
			diceDOM.style.display = 'block';	
			diceDOM.src = 'dice-' + dice + '.png';
			
			//3. Update the round score IF the rolled number was NOT a 1.
			if(dice !== 1) {
				// Add score.
				roundScore = roundScore + dice;
				document.querySelector('#current--'+ activePlayer).textContent = roundScore;
			}else {
				// Return the next player.
				nextPlayer();
			}
	}
	
});

document.querySelector('.btn--hold').addEventListener('click', function() {
	if(gamePlaying) {
		// Add current score to Global score.
		scores[activePlayer] = scores[activePlayer] + roundScore;

		//Update th UI
		document.querySelector('#score--'+ activePlayer).textContent = scores[activePlayer];
		

		//Check if player won the game.
		if(scores[activePlayer] >= 50) {
			document.querySelector('#name--'+ activePlayer).textContent = 'Winner!';
			document.querySelector('.dice').style.display = 'none';
			document.querySelector('.player--'+ activePlayer).classList.remove('player--active');
			document.querySelector('.player--'+ activePlayer).classList.add('player--winner');
			document.querySelector('#current--'+ activePlayer).textContent = '0';
			gamePlaying = false;

			// Disable Holl and Roll buttons. 
			disableButton(btnRoll, btnHold);

		}else {
			nextPlayer();
		}
	}


});


function nextPlayer() {
// Return the next player.
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current--0').textContent = '0';
	document.getElementById('current--1').textContent = '0';

	document.querySelector('.player--0').classList.toggle('player--active');
	document.querySelector('.player--1').classList.toggle('player--active');

	// document.querySelector('.player--0').classList.remove('player--active');
	// document.querySelector('.player--1').classList.add('player--active');

	document.querySelector('.dice').style.display = 'none';
}

document.querySelector('.btn--new').addEventListener('click', function() {
		init();
		gamePlaying = true;
		enableButton(btnRoll, btnHold);
});

function init() {
	scores = [0,0];
	roundScore = 0;
	activePlayer = 0;
	gamePlaying = true;

	document.getElementById('score--0').textContent = '0';
	document.getElementById('current--0').textContent = '0';
	document.getElementById('score--1').textContent = '0';
	document.getElementById('current--1').textContent = '0';
	document.getElementById('name--0').textContent = 'Player 1';
	document.getElementById('name--1').textContent = 'Player 2';
	document.querySelector('.player--0').classList.remove('player--winner');
	document.querySelector('.player--1').classList.remove('player--winner');
	document.querySelector('.player--0').classList.remove('player--active');
	document.querySelector('.player--1').classList.remove('player--active');
	document.querySelector('.player--0').classList.add('player--active');
	//document.getElementsByClassName('.player').;

	btnRoll = document.querySelector('.btn--roll');
	btnHold = document.querySelector('.btn--hold');
		

}

function disableButton(btnRoll, btnHold) {
	btnRoll.disabled = true;
	btnRoll.style.cursor = 'not-allowed';

	btnHold.disabled = true;
	btnHold.style.cursor = 'not-allowed';
}

function enableButton(btnRoll, btnHold) {
	btnRoll.disabled = false;
	btnRoll.style.cursor = 'pointer';

	btnHold.disabled = false;
	btnHold.style.cursor = 'pointer';
}