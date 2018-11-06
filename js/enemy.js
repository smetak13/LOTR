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


const greatSpider = new Enemy('Great Spider', 'easy', 'Sam', 230, 3500, 17);
const orc = new Enemy('Orc', 'easy', 'Gimli', 250, 3400, 12);
const warg = new Enemy('Warg', 'easy', 'Gimli', 240, 3440, 22);
const gollum = new Enemy('Gollum', 'easy', 'Sam', 220, 3660, 15);
const orcLeader = new Enemy('Orc Leader', 'medium', 'Gimli', 330, 3820, 13);
const nazgul = new Enemy('Nazgul', 'medium', 'Aragorn', 370, 3940, 20);
const shelob = new Enemy('Shelob', 'medium', 'Sam', 310, 3980, 19);
const troll = new Enemy('Troll', 'medium', 'Legolas', 380, 4020, 8);
const oliphant = new Enemy('Oliphant', 'medium', 'Legolas', 360, 4100, 9);
const saruman = new Enemy('Saruman', 'hard', 'Gandalf', 350, 4740, 12);
const balrog = new Enemy('Balrog', 'hard', 'Gandalf', 490, 4440, 8);
const kingOfTheDead = new Enemy('King of the Dead', 'hard', 'Aragorn', 370, 4800, 15);
const sauron = new Enemy('Sauron', 'hard', 'Frodo', 360, 5050, 7);

const easyEnemies = [greatSpider, orc, warg, gollum];
const mediumEnemies = [orcLeader, nazgul, shelob, troll, oliphant];
const hardEnemies = [saruman, balrog, kingOfTheDead, sauron];



function enemyAttack() {

    let basicDamage = gameManager.activeEnemy.attack;

    let offsetDamage = gameManager.getRandomNumber(20, 120);

    basicDamage += offsetDamage;

    if (gameManager.activeCharacter.skills.skill2.name==='You Shall Not Pass') {
        if (gameManager.activeEnemy.name==='Balrog') {
            if (gameManager.getRandomNumber(1, 10) <= 6) {
                basicDamage = 170;
            }
        } else {
            if (gameManager.getRandomNumber(1, 10) <= 5) {
                basicDamage = 170;
            }
        }
    };

    gameManager.activeCharacter.health -= basicDamage;

    gameManager.opponentInfoAttack.innerHTML = '<p>Enemy caused you ' + basicDamage + ' damage.</p>';

    gameManager.renderPlayerStats();

    if (gameManager.activeCharacter.health <= 0) {
        if (gameManager.activeCharacter.skills.skill2.name==='Mithril shirt') {
            if (gameManager.getRandomNumber(1, 10) <= 5) {
                gameManager.activeCharacter.health = 700;
                gameManager.renderPlayerStats();
                gameManager.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + gameManager.activeCharacter.health + ' health.</p>';
                return;
            }
        }
        if (gameManager.activeCharacter.skills.skill2.name==='Deal with the Dead') {
            if (gameManager.activeEnemy.name==='King of the Dead') {
                if (gameManager.getRandomNumber(1, 10) <= 6) {
                    gameManager.activeCharacter.health = 850;
                    gameManager.renderPlayerStats();
                    gameManager.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + gameManager.activeCharacter.health + ' health.</p>';
                    return;
                }
            } else {
                if (gameManager.getRandomNumber(1, 10) <= 4) {
                    gameManager.activeCharacter.health = 850;
                    gameManager.renderPlayerStats();
                    gameManager.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + gameManager.activeCharacter.health + ' health.</p>';
                    return;
                }
            }
        }
            gameManager.activeCharacter.health = 0;
            gameManager.playerResult.innerHTML = gameManager.renderPlayerStats();
            gameManager.playerResult.setAttribute('id', 'dead');
            gameManager.opponentResult.innerHTML = gameManager.renderOpponentStats();
            gameManager.resultStats.innerHTML = '<h4>You lose in ' + gameManager.round + ' rounds.</h4>';
            gameManager.selectContent(result);
    }

};