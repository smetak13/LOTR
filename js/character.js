
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

    round += 1

    if (round===1) {
        if ((activeEnemy.agility + getRandomNumber(1, 10)) > (activeCharacter.agility + getRandomNumber(1, 10))) {
            return enemyAttack();
        }
    }

    
    if (activeCharacter.skills.skill1.name==='Axe Fury') {
        activeCharacter.attack *= 1.1;
        activeCharacter.attack = Math.round(activeCharacter.attack);
        player.innerHTML = '<h2> ' + activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + activeCharacter.attack + '</li><li><b>Health:</b> ' + activeCharacter.health + '</li><li><b>Agility:</b> ' + activeCharacter.agility + '</li><li> <b>' + activeCharacter.skills.skill1.name + ':</b> ' + activeCharacter.skills.skill1.description + '</li><li> <b>' + activeCharacter.skills.skill2.name + ':</b> ' + activeCharacter.skills.skill2.description + '</li></ul></div>';
    }

    let basicDamage = activeCharacter.attack;

    let offsetDamage = getRandomNumber(20, 60);
    basicDamage += offsetDamage;

    let vulnerabilityDamage = 0;

    if (activeEnemy.vulnerability===activeCharacter.name) {
        vulnerabilityDamage = getRandomNumber(50, 150);
    }

    basicDamage += vulnerabilityDamage;

    switch (activeCharacter.skills.skill1.name) {
        case 'Iron Will':
            if (round > 1) {
                playerInfoSkill1.innerHTML = '<p></p>';
                if (getRandomNumber(1, 10) <= 4) {
                    regenerationCount = basicHealth - activeCharacter.health;
                    if (regenerationCount > 150) {
                        regenerationCount = 150;
                    }
                    activeCharacter.health += 150;
                    if (activeCharacter.health > basicHealth) {
                        activeCharacter.health = basicHealth;
                    }
                    player.innerHTML = '<h2> ' + activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + activeCharacter.attack + '</li><li><b>Health:</b> ' + activeCharacter.health + '</li><li><b>Agility:</b> ' + activeCharacter.agility + '</li><li> <b>' + activeCharacter.skills.skill1.name + ':</b> ' + activeCharacter.skills.skill1.description + '</li><li> <b>' + activeCharacter.skills.skill2.name + ':</b> ' + activeCharacter.skills.skill2.description + '</li></ul></div>';
                    if (regenerationCount > 0) {
                    playerInfoSkill1.innerHTML = '<p>You regenerated ' + regenerationCount + ' health.</p>';
                    }
                }
            }
        break;
        case 'Anduril Sword':
            if (getRandomNumber(1, 10) <= 5) {
                basicDamage += activeEnemy.attack
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

    activeEnemy.health -= basicDamage;

    opponent.innerHTML = '<h2> ' + activeEnemy.name + ' </h2><div class="stats-arena"><img src="./enemies/' + activeEnemy.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + activeEnemy.attack + '</li><li><b>Health:</b> ' + activeEnemy.health + '</li><li><b>Agility:</b> ' + activeEnemy.agility + '</li><li><b>Vulnerability:</b> ' + activeEnemy.vulnerability + '</li></ul></div>';

    playerInfoAttack.innerHTML = '<p>You caused ' + basicDamage + ' damage to your opponent.</p>'

    if (activeEnemy.health <= 0) {
        activeEnemy.health = 0;
        result.innerHTML = '<p>You win in ' + round + ' rounds</p>';
        return gameManager.selectContent(result);
    }

    
    if (activeCharacter.skills.skill1.name==='The One Ring') {
        if (getRandomNumber(1, 10)<=5) {
            opponentInfoAttack.innerHTML = '<p>You dodged your enemy´s attack</p>';
            return;
        }
    }

    switch (activeCharacter.skills.skill2.name) {
        case 'Light of Galadriel':
            if (activeEnemy.name==='Shelob') {
                if (getRandomNumber(1, 10)<=5) {
                    opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack</p>';
                    return;
                }
            } else {
                if (getRandomNumber(1, 10)<=4) {
                    opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack</p>';
                    return;
                }
            }         
            break;
        case 'Lighter than the Wind':
            if (getRandomNumber(1, 20)<=5) {
                opponentInfoAttack.innerHTML = '<p>You dodged your enemy´s attack</p>';
                return;
            }
            break;
        case 'Stunning':
            if (getRandomNumber(1, 10)<=3) {
                opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack</p>';
                return;
            }
            break;
    
    }

    enemyAttack()
    
}
