/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save
the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of
100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure
this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1.
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

var score, 
    scoreRound, 
    activePlayer, 
    gamePlayeng, 
    previousDice, 
    previousSecondDice, 
    maxScore, 
    modifiedMaxScore;
function displayNone() {
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.second-dice').style.display = 'none';
}

function remoutGame() {
    //   Remout game
    score = [0, 0];
    scoreRound = 0;
    activePlayer = 0;
    gamePlayeng = true;
    previousDice = 0;
    maxScore = 20;
    modifiedMaxScore = 0;
    
    displayNone();
    
    document.querySelector('.max-score').value = '';
    
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.querySelector('.player-0-panel').classList.add('active');
}

//   Remout game

remoutGame();

function nextPlayer() {
    //    Next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    scoreRound = 0;

    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    displayNone();
}

document.querySelector('.btn-max-score').addEventListener('click', function() {
    modifiedMaxScore = document.querySelector('.max-score').value;
    if(-modifiedMaxScore) {
        maxScore = +modifiedMaxScore;
        document.querySelector('.max-score').value = '';
    }
    document.querySelector('.max-score').value = '';
});

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlayeng) {
        //   1. Random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var secondDice = Math.floor(Math.random() * 6) + 1;
        //   2. Display the result
        var diceDOM = document.querySelector('.dice');
        var secondDiceDOM = document.querySelector('.second-dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';
        secondDiceDOM.style.display = 'block';
        secondDiceDOM.src = 'dice-' + secondDice + '.png';

        //   3. Update the round score if the rolled number was not a 1. If it drops twice 6 then reset global score

        if(previousDice === 6 && dice === 6 || previousSecondDice === 6 && secondDice === 6 ) {
            //    Next player and defolt global score
            score[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];
            nextPlayer();
        } else if(dice === 1 || secondDice === 1) {
            //    Next player
            nextPlayer();
        } else {
            //    Add score
            scoreRound += dice + secondDice;
            document.querySelector('#current-' + activePlayer).textContent = scoreRound;
        }
        
        previousDice = dice;
        previousSecondDice = secondDice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlayeng) {
        //   Add current score to global score
        score[activePlayer] += scoreRound;
        document.querySelector('#score-' + activePlayer).textContent = score[activePlayer];

        //   click if player won the game
        if(score[activePlayer] >= maxScore) {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            displayNone();
            gamePlayeng = false;
        } else {
            //   Next player
            nextPlayer()
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', function() {
    //   Remout game
    remoutGame();
});
