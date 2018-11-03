
class Enemy {
    constructor(name, difficulty, vulnerability, attack, health, agility) {
        this.name = name;
        this.difficulty = difficulty;
        this.vulnerability = vulnerability;
        this.attack = attack;
        this.health = health;
        this.agility = agility;
    }

}


function enemyAttack() {

    let basicDamage = gameManager.activeEnemy.attack;

    let offsetDamage = getRandomNumber(20, 120);

    basicDamage += offsetDamage;

    if (gameManager.activeCharacter.skills.skill2.name==='You Shall Not Pass') {
        if (gameManager.activeEnemy.name==='Balrog') {
            if (getRandomNumber(1, 10) <= 6) {
                basicDamage = 170;
            }
        } else {
            if (getRandomNumber(1, 10) <= 5) {
                basicDamage = 170;
            }
        }
    };

    gameManager.activeCharacter.health -= basicDamage;

    gameManager.opponentInfoAttack.innerHTML = '<p>Enemy caused you ' + basicDamage + ' damage.</p>';

    gameManager.player.innerHTML = '<h2> ' + gameManager.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + gameManager.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + gameManager.activeCharacter.attack + '</li><li><b>Health:</b> ' + gameManager.activeCharacter.health + '</li><li><b>Agility:</b> ' + gameManager.activeCharacter.agility + '</li><li> <b>' + gameManager.activeCharacter.skills.skill1.name + ':</b> ' + gameManager.activeCharacter.skills.skill1.description + '</li><li> <b>' + gameManager.activeCharacter.skills.skill2.name + ':</b> ' + gameManager.activeCharacter.skills.skill2.description + '</li></ul></div>';
    
    if (gameManager.activeCharacter.health <= 0) {
        if (gameManager.activeCharacter.skills.skill2.name==='Mithril shirt') {
            if (getRandomNumber(1, 10) <= 5) {
                gameManager.activeCharacter.health = 700;
                gameManager.player.innerHTML = '<h2> ' + gameManager.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + gameManager.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + gameManager.activeCharacter.attack + '</li><li><b>Health:</b> ' + gameManager.activeCharacter.health + '</li><li><b>Agility:</b> ' + gameManager.activeCharacter.agility + '</li><li> <b>' + gameManager.activeCharacter.skills.skill1.name + ':</b> ' + gameManager.activeCharacter.skills.skill1.description + '</li><li> <b>' + gameManager.activeCharacter.skills.skill2.name + ':</b> ' + gameManager.activeCharacter.skills.skill2.description + '</li></ul></div>';
                gameManager.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + gameManager.activeCharacter.health + ' health.</p>';
                return;
            }
        }
        if (gameManager.activeCharacter.skills.skill2.name==='Deal with the Dead') {
            if (gameManager.activeEnemy.name==='King of the Dead') {
                if (getRandomNumber(1, 10) <= 6) {
                    gameManager.activeCharacter.health = 850;
                    gameManager.player.innerHTML = '<h2> ' + gameManager.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + gameManager.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + gameManager.activeCharacter.attack + '</li><li><b>Health:</b> ' + gameManager.activeCharacter.health + '</li><li><b>Agility:</b> ' + gameManager.activeCharacter.agility + '</li><li> <b>' + gameManager.activeCharacter.skills.skill1.name + ':</b> ' + gameManager.activeCharacter.skills.skill1.description + '</li><li> <b>' + gameManager.activeCharacter.skills.skill2.name + ':</b> ' + gameManager.activeCharacter.skills.skill2.description + '</li></ul></div>';
                    gameManager.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + gameManager.activeCharacter.health + ' health.</p>';
                    return;
                }
            } else {
                if (getRandomNumber(1, 10) <= 4) {
                    gameManager.activeCharacter.health = 850;
                    gameManager.player.innerHTML = '<h2> ' + gameManager.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + gameManager.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + gameManager.activeCharacter.attack + '</li><li><b>Health:</b> ' + gameManager.activeCharacter.health + '</li><li><b>Agility:</b> ' + gameManager.activeCharacter.agility + '</li><li> <b>' + gameManager.activeCharacter.skills.skill1.name + ':</b> ' + gameManager.activeCharacter.skills.skill1.description + '</li><li> <b>' + gameManager.activeCharacter.skills.skill2.name + ':</b> ' + gameManager.activeCharacter.skills.skill2.description + '</li></ul></div>';
                    gameManager.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + gameManager.activeCharacter.health + ' health.</p>';
                    return;
                }
            }
        }
            gameManager.activeCharacter.health = 0;
            result.innerHTML = '<p>You lose in ' + gameManager.round + ' rounds</p>'
            gameManager.selectContent(result);
    }

}