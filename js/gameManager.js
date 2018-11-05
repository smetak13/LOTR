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


class Enemy {
    constructor(name, difficulty, vulnerability, attack, health, agility) {
        this.name = name;
        this.difficulty = difficulty;
        this.vulnerability = vulnerability;
        this.attack = attack;
        this.health = health;
        this.agility = agility;
    }

};


const greatSpider = new Enemy('Great Spider', 'easy', 'Sam', 230, 3300, 17);
const orc = new Enemy('Orc', 'easy', 'Gimli', 250, 3200, 12);
const warg = new Enemy('Warg', 'easy', 'Gimli', 240, 3240, 22);
const gollum = new Enemy('Gollum', 'easy', 'Sam', 220, 3460, 15);
const orcLeader = new Enemy('Orc Leader', 'medium', 'Gimli', 330, 3620, 13);
const nazgul = new Enemy('Nazgul', 'medium', 'Aragorn', 370, 3740, 20);
const shelob = new Enemy('Shelob', 'medium', 'Sam', 310, 3780, 19);
const troll = new Enemy('Troll', 'medium', 'Legolas', 380, 3820, 8);
const oliphant = new Enemy('Oliphant', 'medium', 'Legolas', 360, 3900, 9);
const saruman = new Enemy('Saruman', 'hard', 'Gandalf', 350, 4540, 12);
const balrog = new Enemy('Balrog', 'hard', 'Gandalf', 490, 4240, 8);
const kingOfTheDead = new Enemy('King of the Dead', 'hard', 'Aragorn', 370, 4600, 15);
const sauron = new Enemy('Sauron', 'hard', 'Frodo', 360, 4850, 7);

const easyEnemies = [greatSpider, orc, warg, gollum];
const mediumEnemies = [orcLeader, nazgul, shelob, troll, oliphant];
const hardEnemies = [saruman, balrog, kingOfTheDead, sauron];



function getRandomNumber(start, range) {
    return Math.round((Math.random() * (range-start)) + start);
}

const gameManager = {

    activeCharacter: '',
    activeEnemy: '',
    player: '',
    opponent: '',
    round: 0,
    basicHealth: '',
    regenerationCount: '',
    playerInfoSkill: '',
    playerInfoAttack: '',
    opponentInfoAttack: '',

    chooseCharacter(character) {
        this.player = document.querySelector('.player');
        this.opponent = document.querySelector('.opponent');
        this.playerInfoSkill = document.querySelector('.player-info-skill');
        this.playerInfoAttack = document.querySelector('.player-info-attack');
        this.opponentInfoAttack = document.querySelector('.opponent-info-attack');
        this.activeCharacter = character;
        this.player.innerHTML = '<h2> ' + this.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + this.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeCharacter.attack + '</li><li><b>Health:</b> ' + this.activeCharacter.health + '</li><li><b>Agility:</b> ' + this.activeCharacter.agility + '</li><li> <b>' + this.activeCharacter.skills.skill1.name + ':</b> ' + this.activeCharacter.skills.skill1.description + '</li><li> <b>' + this.activeCharacter.skills.skill2.name + ':</b> ' + this.activeCharacter.skills.skill2.description + '</li></ul></div>';
        this.basicHealth = this.activeCharacter.health;
        this.selectContent(difficulty);
    },

    chooseDifficulty(difficulty) {
        this.chooseEnemy(difficulty)
    },

    chooseEnemy(difficulty) {
        
        if (difficulty === 'easy') {
            this.activeEnemy = easyEnemies[getRandomNumber(0, easyEnemies.length)];
        }
        if (difficulty === 'medium') {
            this.activeEnemy = mediumEnemies[getRandomNumber(0, mediumEnemies.length)];
        }
        if (difficulty === 'hard') {
            this.activeEnemy = hardEnemies[getRandomNumber(0, hardEnemies.length)];
        }

        this.opponent.innerHTML = '<h2> ' + this.activeEnemy.name + ' </h2><div class="stats-arena"><img src="./enemies/' + this.activeEnemy.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeEnemy.attack + '</li><li><b>Health:</b> ' + this.activeEnemy.health + '</li><li><b>Agility:</b> ' + this.activeEnemy.agility + '</li><li><b>Vulnerability:</b> ' + this.activeEnemy.vulnerability + '</li></ul></div>';
        
        this.selectContent(arena);
    },

    selectContent(page) {
        menu.style.display = 'none';
        difficulty.style.display = 'none';
        arena.style.display = 'none';
        result.style.display = 'none';
        page.style.display = 'block';
    },

    newGame() {
        window.location = 'index.html';
    },
    

    characterAttack() {

        this.round += 1

        if (this.round===1) {
            if ((this.activeEnemy.agility + getRandomNumber(1, 10)) > (this.activeCharacter.agility + getRandomNumber(1, 10))) {
                return this.enemyAttack();
            }
        }
        
        if (this.activeCharacter.skills.skill1.name==='Axe Fury') {
            this.activeCharacter.attack *= 1.1;
            this.activeCharacter.attack = Math.round(this.activeCharacter.attack);
            this.player.innerHTML = '<h2> ' + this.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + this.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeCharacter.attack + '</li><li><b>Health:</b> ' + this.activeCharacter.health + '</li><li><b>Agility:</b> ' + this.activeCharacter.agility + '</li><li> <b>' + this.activeCharacter.skills.skill1.name + ':</b> ' + this.activeCharacter.skills.skill1.description + '</li><li> <b>' + this.activeCharacter.skills.skill2.name + ':</b> ' + this.activeCharacter.skills.skill2.description + '</li></ul></div>';
        }

        let basicDamage = this.activeCharacter.attack;

        let offsetDamage = getRandomNumber(20, 60);
        basicDamage += offsetDamage;

        let vulnerabilityDamage = 0;

        if (this.activeEnemy.vulnerability===this.activeCharacter.name) {
            vulnerabilityDamage = getRandomNumber(50, 150);
        }

        basicDamage += vulnerabilityDamage;

        switch (this.activeCharacter.skills.skill1.name) {
            case 'Iron Will':
                if (this.round > 1) {
                    this.playerInfoSkill.innerHTML = '<p></p>';
                    if (getRandomNumber(1, 10) <= 4) {
                        this.regenerationCount = this.basicHealth - this.activeCharacter.health;
                        if (this.regenerationCount > 150) {
                            this.regenerationCount = 150;
                        }
                        this.activeCharacter.health += 150;
                        if (this.activeCharacter.health > this.basicHealth) {
                            this.activeCharacter.health = this.basicHealth;
                        }
                        this.player.innerHTML = '<h2> ' + this.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + this.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeCharacter.attack + '</li><li><b>Health:</b> ' + this.activeCharacter.health + '</li><li><b>Agility:</b> ' + this.activeCharacter.agility + '</li><li> <b>' + this.activeCharacter.skills.skill1.name + ':</b> ' + this.activeCharacter.skills.skill1.description + '</li><li> <b>' + this.activeCharacter.skills.skill2.name + ':</b> ' + this.activeCharacter.skills.skill2.description + '</li></ul></div>';
                        if (this.regenerationCount > 0) {
                        this.playerInfoSkill.innerHTML = '<p>You regenerated ' + this.regenerationCount + ' health.</p>';
                        }
                    }
                }
            break;
            case 'Anduril Sword':
                if (getRandomNumber(1, 10) <= 5) {
                    basicDamage += this.activeEnemy.attack
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

        this.activeEnemy.health -= basicDamage;

        this.opponent.innerHTML = '<h2> ' + this.activeEnemy.name + ' </h2><div class="stats-arena"><img src="./enemies/' + this.activeEnemy.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeEnemy.attack + '</li><li><b>Health:</b> ' + this.activeEnemy.health + '</li><li><b>Agility:</b> ' + this.activeEnemy.agility + '</li><li><b>Vulnerability:</b> ' + this.activeEnemy.vulnerability + '</li></ul></div>';

        this.playerInfoAttack.innerHTML = '<p>You caused ' + basicDamage + ' damage to your opponent.</p>'

        if (this.activeEnemy.health <= 0) {
            this.activeEnemy.health = 0;
            resultStats.innerHTML = '<h4>You win in ' + this.round + ' rounds</h4>';
            return this.selectContent(result);
        }

        
        if (this.activeCharacter.skills.skill1.name==='The One Ring') {
            if (getRandomNumber(1, 10)<=5) {
                this.opponentInfoAttack.innerHTML = '<p>You dodged your enemy´s attack</p>';
                return;
            }
        }

        switch (this.activeCharacter.skills.skill2.name) {
            case 'Light of Galadriel':
                if (this.activeEnemy.name==='Shelob') {
                    if (getRandomNumber(1, 10)<=5) {
                        this.opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack</p>';
                        return;
                    }
                } else {
                    if (getRandomNumber(1, 10)<=4) {
                        this.opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack</p>';
                        return;
                    }
                }         
                break;
            case 'Lighter than the Wind':
                if (getRandomNumber(1, 20)<=5) {
                    this.opponentInfoAttack.innerHTML = '<p>You dodged your enemy´s attack</p>';
                    return;
                }
                break;
            case 'Stunning':
                if (getRandomNumber(1, 10)<=3) {
                    this.opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack</p>';
                    return;
                }
                break;
        
        }

        this.enemyAttack()
        
    },

    enemyAttack() {

        let basicDamage = this.activeEnemy.attack;
    
        let offsetDamage = getRandomNumber(20, 120);
    
        basicDamage += offsetDamage;
    
        if (this.activeCharacter.skills.skill2.name==='You Shall Not Pass') {
            if (this.activeEnemy.name==='Balrog') {
                if (getRandomNumber(1, 10) <= 6) {
                    basicDamage = 170;
                }
            } else {
                if (getRandomNumber(1, 10) <= 5) {
                    basicDamage = 170;
                }
            }
        };
    
        this.activeCharacter.health -= basicDamage;
    
        this.opponentInfoAttack.innerHTML = '<p>Enemy caused you ' + basicDamage + ' damage.</p>';
    
        this.player.innerHTML = '<h2> ' + this.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + this.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeCharacter.attack + '</li><li><b>Health:</b> ' + this.activeCharacter.health + '</li><li><b>Agility:</b> ' + this.activeCharacter.agility + '</li><li> <b>' + this.activeCharacter.skills.skill1.name + ':</b> ' + this.activeCharacter.skills.skill1.description + '</li><li> <b>' + this.activeCharacter.skills.skill2.name + ':</b> ' + this.activeCharacter.skills.skill2.description + '</li></ul></div>';
        
        if (this.activeCharacter.health <= 0) {
            if (this.activeCharacter.skills.skill2.name==='Mithril shirt') {
                if (getRandomNumber(1, 10) <= 5) {
                    this.activeCharacter.health = 700;
                    this.player.innerHTML = '<h2> ' + this.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + this.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeCharacter.attack + '</li><li><b>Health:</b> ' + this.activeCharacter.health + '</li><li><b>Agility:</b> ' + this.activeCharacter.agility + '</li><li> <b>' + this.activeCharacter.skills.skill1.name + ':</b> ' + this.activeCharacter.skills.skill1.description + '</li><li> <b>' + this.activeCharacter.skills.skill2.name + ':</b> ' + this.activeCharacter.skills.skill2.description + '</li></ul></div>';
                    this.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + this.activeCharacter.health + ' health.</p>';
                    return;
                }
            }
            if (this.activeCharacter.skills.skill2.name==='Deal with the Dead') {
                if (this.activeEnemy.name==='King of the Dead') {
                    if (getRandomNumber(1, 10) <= 6) {
                        this.activeCharacter.health = 850;
                        this.player.innerHTML = '<h2> ' + this.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + this.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeCharacter.attack + '</li><li><b>Health:</b> ' + this.activeCharacter.health + '</li><li><b>Agility:</b> ' + this.activeCharacter.agility + '</li><li> <b>' + this.activeCharacter.skills.skill1.name + ':</b> ' + this.activeCharacter.skills.skill1.description + '</li><li> <b>' + this.activeCharacter.skills.skill2.name + ':</b> ' + this.activeCharacter.skills.skill2.description + '</li></ul></div>';
                        this.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + this.activeCharacter.health + ' health.</p>';
                        return;
                    }
                } else {
                    if (getRandomNumber(1, 10) <= 4) {
                        this.activeCharacter.health = 850;
                        this.player.innerHTML = '<h2> ' + this.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + this.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeCharacter.attack + '</li><li><b>Health:</b> ' + this.activeCharacter.health + '</li><li><b>Agility:</b> ' + this.activeCharacter.agility + '</li><li> <b>' + this.activeCharacter.skills.skill1.name + ':</b> ' + this.activeCharacter.skills.skill1.description + '</li><li> <b>' + this.activeCharacter.skills.skill2.name + ':</b> ' + this.activeCharacter.skills.skill2.description + '</li></ul></div>';
                        this.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + this.activeCharacter.health + ' health.</p>';
                        return;
                    }
                }
            }
                this.activeCharacter.health = 0;
                resultStats.innerHTML = '<h4>You lose in ' + this.round + ' rounds</h4>'
                this.selectContent(result);
        }
    
    }

}


let menu = document.querySelector('.menu');
let difficulty = document.querySelector('.difficulty');
difficulty.style.display = 'none';
let arena = document.querySelector('.arena');
arena.style.display = 'none';
let result = document.querySelector('.result');
result.style.display = 'none';
let resultStats = document.querySelector('.result-stats')
let frodoStats = document.querySelector('.frodo-stats');
let samStats = document.querySelector('.sam-stats');
let legolasStats = document.querySelector('.legolas-stats');
let aragornStats = document.querySelector('.aragorn-stats');
let gimliStats = document.querySelector('.gimli-stats');
let gandalfStats = document.querySelector('.gandalf-stats');

frodoStats.innerHTML = '<ul><li><b>Attack:</b> ' + frodo.attack + '</li><li><b>Health:</b> ' + frodo.health + '</li><li><b>Agility:</b> ' + frodo.agility + '</li><li> <b>' + frodo.skills.skill1.name + ':</b> ' + frodo.skills.skill1.description + '</li><li> <b>' + frodo.skills.skill2.name + ':</b> ' + frodo.skills.skill2.description + '</li></ul>';
samStats.innerHTML = '<ul><li><b>Attack:</b> ' + sam.attack + '</li><li><b>Health:</b> ' + sam.health + '</li><li><b>Agility:</b> ' + sam.agility + '</li><li> <b>' + sam.skills.skill1.name + ':</b> ' + sam.skills.skill1.description + '</li><li> <b>' + sam.skills.skill2.name + ':</b> ' + sam.skills.skill2.description + '</li></ul>';
legolasStats.innerHTML = '<ul><li><b>Attack:</b> ' + legolas.attack + '</li><li><b>Health:</b> ' + legolas.health + '</li><li><b>Agility:</b> ' + legolas.agility + '</li><li> <b>' + legolas.skills.skill1.name + ':</b> ' + legolas.skills.skill1.description + '</li><li> <b>' + legolas.skills.skill2.name + ':</b> ' + legolas.skills.skill2.description + '</li></ul>';
aragornStats.innerHTML = '<ul><li><b>Attack:</b> ' + aragorn.attack + '</li><li><b>Health:</b> ' + aragorn.health + '</li><li><b>Agility:</b> ' + aragorn.agility + '</li><li> <b>' + aragorn.skills.skill1.name + ':</b> ' + aragorn.skills.skill1.description + '</li><li> <b>' + aragorn.skills.skill2.name + ':</b> ' + aragorn.skills.skill2.description + '</li></ul>';
gimliStats.innerHTML = '<ul><li><b>Attack:</b> ' + gimli.attack + '</li><li><b>Health:</b> ' + gimli.health + '</li><li><b>Agility:</b> ' + gimli.agility + '</li><li> <b>' + gimli.skills.skill1.name + ':</b> ' + gimli.skills.skill1.description + '</li><li> <b>' + gimli.skills.skill2.name + ':</b> ' + gimli.skills.skill2.description + '</li></ul>';
gandalfStats.innerHTML = '<ul><li><b>Attack:</b> ' + gandalf.attack + '</li><li><b>Health:</b> ' + gandalf.health + '</li><li><b>Agility:</b> ' + gandalf.agility + '</li><li> <b>' + gandalf.skills.skill1.name + ':</b> ' + gandalf.skills.skill1.description + '</li><li> <b>' + gandalf.skills.skill2.name + ':</b> ' + gandalf.skills.skill2.description + '</li></ul>';
