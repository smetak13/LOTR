class Character {
    constructor(name, info, attack, health, agility, mana, skills) {
        this.name = name;
        this.info = info;
        this.attack = attack;
        this.health = health;
        this.agility = agility;
        this.mana = mana;
        this.skills = skills;
    }

}

const frodo = new Character('Frodo', 'some info', 270, 2640, 20, 0, 
    {
        skill1: {
            name: 'The One Ring',
            description: 'All the physical attacks towards this card have a 50% chance to miss.',
            probability: 50,
        },
        skill2: {
            name: 'Mithril shirt',
            description: 'After the card dies, there is a 50% chance the card is ressurected and continues with 700 health.',
            probability: 50,
            health: 700,
        },
});

const sam = new Character('Sam', 'some info', 280, 2800, 17, 0, 
    {
        skill1: {
            name: 'Iron Will',
            description: 'There is a 40% chance to regenerate 150 health.',
            probability: 40,
            health: 150,
        },
        skill2: {
            name: 'Light of Galadriel',
            description: 'There is a 40% chance the enemy will be stunned in the next round. The chance is 50% against Shelob.',
            probability1: 40,
            probability2: 50,
        },
});

const legolas = new Character('Legolas', 'some info', 320, 2840, 18, 0, 
    {
        skill1: {
            name: 'Arrow Fury',
            description: 'There is a 40% chance your total damage increases by 100%.',
            probability: 40,
            damage: 2,
        },
        skill2: {
            name: 'Lighter than the Wind',
            description: 'There is a 30% chance to evade attack by your enemy.',
            probability: 30,
        },
});

const aragorn = new Character('Aragorn', 'some info', 350, 2840, 14, 0, 
    {
        skill1: {
            name: 'Anduril Sword',
            description: 'There is a 60% chance your attack increases by your opponent´s basic attack.',
            probability: 60,
        },
        skill2: {
            name: 'Deal with the Dead',
            description: 'After the card dies, there is a 50% chance the card is ressurected and continues with 850 health. The chance is 60% against the King of the Dead.',
            probability1: 50,
            probability2: 60,
            health: 850,
        },
});

const gimli = new Character('Gimli', 'some info', 300, 2900, 10, 0, 
    {
        skill1: {
            name: 'Axe Fury',
            description: 'Your basic attack increases by 10% each round.',
            attack: 1.1,
        },
        skill2: {
            name: 'Stunning',
            description: 'There is a 30% chance the enemy will be stunned in the next round.',
            probability: 30,
        },
});

const gandalf = new Character('Gandalf', 'some info', 270, 2720, 12, 0, 
    {
        skill1: {
            name: 'White Light',
            description: 'There is a 30% chance your total damage increases by 200%.',
            probability: 30,
            damage: 3,
        },
        skill2: {
            name: 'You Shall Not Pass',
            description: 'There is a 50% chance to limit the attack by your enemy to 170 damage. The chance is 60% against Balrog.',
            probability1: 50,
            probability2: 60,
            damage: 170,
        },
});



function characterAttack() {

    gameManager.round += 1;
    gameManager.roundsCounter.innerHTML = '<h5>Round: ' + gameManager.round + '</h5>'

    gameManager.manaInfo.innerHTML = '<p></p>';
    gameManager.manaSkillInfo.innerHTML = '<p></p>';
    gameManager.opponentInfoAttack.innerHTML = '<p></p>';
    gameManager.playerInfoAttack.innerHTML = '<p></p>';
    gameManager.playerInfoSkill.innerHTML = '<p></p>';

    if (gameManager.getRandomNumber(1, 100) <= 60) {
        gameManager.activeCharacter.mana += 1;
        gameManager.renderPlayerStats();
        gameManager.manaInfo.innerHTML = '<p>You generated 1 mana.</p>';
    }

    if (gameManager.activeCharacter.mana >= 7) {
        gameManager.manaButton.innerHTML = 'Mana Attack';
        generateManaSkill();
    }

    if (gameManager.round===1) {
        if ((gameManager.activeEnemy.agility + gameManager.getRandomNumber(1, 10)) > (gameManager.activeCharacter.agility + gameManager.getRandomNumber(1, 10))) {
            return enemyAttack();
        }
    }
    
    if (gameManager.activeCharacter.skills.skill1.name==='Axe Fury') {
        gameManager.activeCharacter.attack *= gameManager.activeCharacter.skills.skill1.attack;
        gameManager.activeCharacter.attack = Math.round(gameManager.activeCharacter.attack);
        gameManager.renderPlayerStats();
    }

    let basicDamage = gameManager.activeCharacter.attack;

    let offsetDamage = gameManager.getRandomNumber(20, 60);
    basicDamage += offsetDamage;

    let vulnerabilityDamage = 0;

    if (gameManager.activeEnemy.vulnerability===gameManager.activeCharacter.name) {
        vulnerabilityDamage = gameManager.getRandomNumber(50, 150);
    }

    basicDamage += vulnerabilityDamage;

    switch (gameManager.activeCharacter.skills.skill1.name) {
        case 'Iron Will':
            if (gameManager.round > 1) {
                gameManager.playerInfoSkill.innerHTML = '<p></p>';
                if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill1.probability) {
                    gameManager.regenerationCount = gameManager.basicHealth - gameManager.activeCharacter.health;
                    if (gameManager.regenerationCount > gameManager.activeCharacter.skills.skill1.health) {
                        gameManager.regenerationCount = gameManager.activeCharacter.skills.skill1.health;
                    }
                    gameManager.activeCharacter.health += gameManager.activeCharacter.skills.skill1.health;
                    if (gameManager.activeCharacter.health > gameManager.basicHealth) {
                        gameManager.activeCharacter.health = gameManager.basicHealth;
                    }
                    gameManager.renderPlayerStats();
                    if (gameManager.regenerationCount > 0) {
                        gameManager.playerInfoSkill.innerHTML = '<p>You regenerated ' + gameManager.regenerationCount + ' health.</p>';
                    }
                }
            }
        break;
        case 'Anduril Sword':
            if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill1.probability) {
                basicDamage += gameManager.activeEnemy.attack
            }
        break; 
        case 'Arrow Fury':
            if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill1.probability) {
                basicDamage *= gameManager.activeCharacter.skills.skill1.damage;
            }
        break;
        case 'White Light':
            if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill1.probability) {
                basicDamage *= gameManager.activeCharacter.skills.skill1.damage;
            }
        break;
    
    }

    gameManager.activeEnemy.health -= basicDamage;

    gameManager.renderOpponentStats();

    gameManager.playerInfoAttack.innerHTML = '<p>You caused ' + basicDamage + ' damage to your opponent.</p>'


    if (gameManager.activeEnemy.health <= 0) {
        gameManager.activeEnemy.health = 0;
        gameManager.playerResult.innerHTML = gameManager.renderPlayerStats();
        gameManager.opponentResult.innerHTML = gameManager.renderOpponentStats();
        gameManager.opponentResult.setAttribute('id', 'dead');
        gameManager.resultStats.innerHTML = '<h4>You win in ' + gameManager.round + ' rounds.</h4>';
        return gameManager.selectContent(gameManager.result);
    }

    
    if (gameManager.activeCharacter.skills.skill1.name==='The One Ring') {
        if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill1.probability) {
            gameManager.opponentInfoAttack.innerHTML = '<p>You dodged your enemy´s attack.</p>';
            return;
        }
    }

    switch (gameManager.activeCharacter.skills.skill2.name) {
        case 'Light of Galadriel':
            if (gameManager.activeEnemy.name==='Shelob') {
                if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill2.probability2) {
                    gameManager.opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack.</p>';
                    return;
                }
            } else {
                if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill2.probability1) {
                    gameManager.opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack.</p>';
                    return;
                }
            }         
            break;
        case 'Lighter than the Wind':
            if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill2.probability) {
                gameManager.opponentInfoAttack.innerHTML = '<p>You dodged your enemy´s attack.</p>';
                return;
            }
            break;
        case 'Stunning':
            if (gameManager.getRandomNumber(1, 100) <= gameManager.activeCharacter.skills.skill2.probability) {
                gameManager.opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack.</p>';
                return;
            }
            break;
    
    }
    enemyAttack();
    
};
