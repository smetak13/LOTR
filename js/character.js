
class Character {
    constructor(name, info, attack, health, agility, skills) {
        this.name = name;
        this.info = info;
        this.attack = attack;
        this.health = health;
        this.agility = agility;
        this.skills = skills;
    }

}

const frodo = new Character('Frodo', 'some info', 270, 2640, 20,
    {
        skill1: {
            name: 'The One Ring',
            description: 'All the physical attacks towards this card have a 50% chance to miss.'
        },
        skill2: {
            name: 'Mithril shirt',
            description: 'After the card dies, there is a 50% chance the card is ressurected and continues with 700 health.'
        },
});

const sam = new Character('Sam', 'some info', 280, 2800, 17, 
    {
        skill1: {
            name: 'Iron Will',
            description: 'There is a 40% chance to regenerate 150 health.'
        },
        skill2: {
            name: 'Light of Galadriel',
            description: 'There is a 40% chance the enemy will be stunned in the next round. The chance is 50% against Shelob.'
        },
});

const legolas = new Character('Legolas', 'some info', 320, 2840, 18, 
    {
        skill1: {
            name: 'Arrow Fury',
            description: 'There is a 40% chance your total damage increases by 100%.'
        },
        skill2: {
            name: 'Lighter than the Wind',
            description: 'There is a 25% chance to evade attack by your enemy.'
        },
});

const aragorn = new Character('Aragorn', 'some info', 350, 2840, 14, 
    {
        skill1: {
            name: 'Anduril Sword',
            description: 'There is a 50% chance your attack increases by your opponent´s basic attack.'
        },
        skill2: {
            name: 'Deal with the Dead',
            description: 'After the card dies, there is a 40% chance the card is ressurected and continues with 850 health. The chance is 60% against the King of the Dead.'
        },
});

const gimli = new Character('Gimli', 'some info', 300, 2900, 10, 
    {
        skill1: {
            name: 'Axe Fury',
            description: 'Your basic attack increases by 10% each round.'
        },
        skill2: {
            name: 'Stunning',
            description: 'There is a 30% chance the enemy will be stunned in the next round.'
        },
});

const gandalf = new Character('Gandalf', 'some info', 270, 2720, 12, 
    {
        skill1: {
            name: 'White Light',
            description: 'There is a 30% chance your total damage increases by 200%.'
        },
        skill2: {
            name: 'You Shall Not Pass',
            description: 'There is a 50% chance to limit the attack by your enemy to 170 damage. The chance is 60% against Balrog.'
        },
});


function characterAttack() {

    gameManager.round += 1

    if (gameManager.round===1) {
        if ((gameManager.activeEnemy.agility + getRandomNumber(1, 10)) > (gameManager.activeCharacter.agility + getRandomNumber(1, 10))) {
            return enemyAttack();
        }
    }
    
    if (gameManager.activeCharacter.skills.skill1.name==='Axe Fury') {
        gameManager.activeCharacter.attack *= 1.1;
        gameManager.activeCharacter.attack = Math.round(gameManager.activeCharacter.attack);
        gameManager.player.innerHTML = '<h2> ' + gameManager.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + gameManager.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + gameManager.activeCharacter.attack + '</li><li><b>Health:</b> ' + gameManager.activeCharacter.health + '</li><li><b>Agility:</b> ' + gameManager.activeCharacter.agility + '</li><li> <b>' + gameManager.activeCharacter.skills.skill1.name + ':</b> ' + gameManager.activeCharacter.skills.skill1.description + '</li><li> <b>' + gameManager.activeCharacter.skills.skill2.name + ':</b> ' + gameManager.activeCharacter.skills.skill2.description + '</li></ul></div>';
    }

    let basicDamage = gameManager.activeCharacter.attack;

    let offsetDamage = getRandomNumber(20, 60);
    basicDamage += offsetDamage;

    let vulnerabilityDamage = 0;

    if (gameManager.activeEnemy.vulnerability===gameManager.activeCharacter.name) {
        vulnerabilityDamage = getRandomNumber(50, 150);
    }

    basicDamage += vulnerabilityDamage;

    switch (gameManager.activeCharacter.skills.skill1.name) {
        case 'Iron Will':
            if (gameManager.round > 1) {
                gameManager.playerInfoSkill.innerHTML = '<p></p>';
                if (getRandomNumber(1, 10) <= 4) {
                    gameManager.regenerationCount = gameManager.basicHealth - gameManager.activeCharacter.health;
                    if (gameManager.regenerationCount > 150) {
                        gameManager.regenerationCount = 150;
                    }
                    gameManager.activeCharacter.health += 150;
                    if (gameManager.activeCharacter.health > gameManager.basicHealth) {
                        gameManager.activeCharacter.health = gameManager.basicHealth;
                    }
                    gameManager.player.innerHTML = '<h2> ' + gameManager.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + gameManager.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + gameManager.activeCharacter.attack + '</li><li><b>Health:</b> ' + gameManager.activeCharacter.health + '</li><li><b>Agility:</b> ' + gameManager.activeCharacter.agility + '</li><li> <b>' + gameManager.activeCharacter.skills.skill1.name + ':</b> ' + gameManager.activeCharacter.skills.skill1.description + '</li><li> <b>' + gameManager.activeCharacter.skills.skill2.name + ':</b> ' + gameManager.activeCharacter.skills.skill2.description + '</li></ul></div>';
                    if (gameManager.regenerationCount > 0) {
                    gameManager.playerInfoSkill.innerHTML = '<p>You regenerated ' + gameManager.regenerationCount + ' health.</p>';
                    }
                }
            }
        break;
        case 'Anduril Sword':
            if (getRandomNumber(1, 10) <= 5) {
                basicDamage += gameManager.activeEnemy.attack
            }
        break; 
        case 'Arrow Fury':
            if (getRandomNumber(1, 10) <= 4) {
                basicDamage *= 2;
            }
        break;
        case 'White Light':
            if (getRandomNumber(1, 10) <= 3) {
                basicDamage *= 3;
            }
        break;
    
    }

    gameManager.activeEnemy.health -= basicDamage;

    gameManager.opponent.innerHTML = '<h2> ' + gameManager.activeEnemy.name + ' </h2><div class="stats-arena"><img src="./enemies/' + gameManager.activeEnemy.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + gameManager.activeEnemy.attack + '</li><li><b>Health:</b> ' + gameManager.activeEnemy.health + '</li><li><b>Agility:</b> ' + gameManager.activeEnemy.agility + '</li><li><b>Vulnerability:</b> ' + gameManager.activeEnemy.vulnerability + '</li></ul></div>';

    gameManager.playerInfoAttack.innerHTML = '<p>You caused ' + basicDamage + ' damage to your opponent.</p>'

    if (gameManager.activeEnemy.health <= 0) {
        gameManager.activeEnemy.health = 0;
        resultStats.innerHTML = '<p>You win in ' + gameManager.round + ' rounds</p>';
        return gameManager.selectContent(result);
    }

    
    if (gameManager.activeCharacter.skills.skill1.name==='The One Ring') {
        if (getRandomNumber(1, 10)<=5) {
            gameManager.opponentInfoAttack.innerHTML = '<p>You dodged your enemy´s attack</p>';
            return;
        }
    }

    switch (gameManager.activeCharacter.skills.skill2.name) {
        case 'Light of Galadriel':
            if (gameManager.activeEnemy.name==='Shelob') {
                if (getRandomNumber(1, 10)<=5) {
                    gameManager.opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack</p>';
                    return;
                }
            } else {
                if (getRandomNumber(1, 10)<=4) {
                    gameManager.opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack</p>';
                    return;
                }
            }         
            break;
        case 'Lighter than the Wind':
            if (getRandomNumber(1, 20)<=5) {
                gameManager.opponentInfoAttack.innerHTML = '<p>You dodged your enemy´s attack</p>';
                return;
            }
            break;
        case 'Stunning':
            if (getRandomNumber(1, 10)<=3) {
                gameManager.opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack</p>';
                return;
            }
            break;
    
    }

    enemyAttack()
    
}
