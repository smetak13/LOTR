
function getRandomNumber(start, range) {
    return Math.round((Math.random() * (range-start)) + start);
}

const GameManager = {

    chooseCharacter(character) {
        activeCharacter = character;
        player.innerHTML = '<h2> ' + activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + activeCharacter.attack + '</li><li><b>Health:</b> ' + activeCharacter.health + '</li><li><b>Agility:</b> ' + activeCharacter.agility + '</li><li> <b>' + activeCharacter.skills.skill1.name + ':</b> ' + activeCharacter.skills.skill1.description + '</li><li> <b>' + activeCharacter.skills.skill2.name + ':</b> ' + activeCharacter.skills.skill2.description + '</li></ul></div>';
        basicHealth = activeCharacter.health;
        this.selectContent(difficulty);
    },

    chooseDifficulty(difficulty) {
        chosenDifficulty = difficulty;
        this.chooseEnemy()
    },

    chooseEnemy() {
        if (chosenDifficulty === 'easy') {
            activeEnemy = easyEnemies[getRandomNumber(0, easyEnemies.length)];
        }
        if (chosenDifficulty === 'medium') {
            activeEnemy = mediumEnemies[getRandomNumber(0, mediumEnemies.length)];
        }
        if (chosenDifficulty === 'hard') {
            activeEnemy = hardEnemies[getRandomNumber(0, hardEnemies.length)];
        }

        opponent.innerHTML = '<h2> ' + activeEnemy.name + ' </h2><div class="stats-arena"><img src="./enemies/' + activeEnemy.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + activeEnemy.attack + '</li><li><b>Health:</b> ' + activeEnemy.health + '</li><li><b>Agility:</b> ' + activeEnemy.agility + '</li><li><b>Vulnerability:</b> ' + activeEnemy.vulnerability + '</li></ul></div>';


        this.selectContent(arena);
    },

    selectContent(page) {
        menu.style.display = 'none';
        difficulty.style.display = 'none';
        arena.style.display = 'none';
        result.style.display = 'none';
        page.style.display = 'block';
    },
}