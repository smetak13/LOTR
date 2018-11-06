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
            gameManager.playerResult.innerHTML = '<h2> ' + gameManager.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + gameManager.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + gameManager.activeCharacter.attack + '</li><li><b>Health:</b> ' + gameManager.activeCharacter.health + '</li><li><b>Agility:</b> ' + gameManager.activeCharacter.agility + '</li><li><b>Mana:</b> ' + gameManager.activeCharacter.mana + '</li><li> <b>' + gameManager.activeCharacter.skills.skill1.name + ':</b> ' + gameManager.activeCharacter.skills.skill1.description + '</li><li> <b>' + gameManager.activeCharacter.skills.skill2.name + ':</b> ' + gameManager.activeCharacter.skills.skill2.description + '</li><li><b> ' + gameManager.activeManaSkill.name + ':</b> ' + gameManager.activeManaSkill.description + '</li></ul></div>';
            gameManager.playerResult.setAttribute('id', 'dead');
            gameManager.opponentResult.innerHTML = '<h2> ' + gameManager.activeEnemy.name + ' </h2><div class="stats-arena"><img src="./enemies/' + gameManager.activeEnemy.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + gameManager.activeEnemy.attack + '</li><li><b>Health:</b> ' + gameManager.activeEnemy.health + '</li><li><b>Agility:</b> ' + gameManager.activeEnemy.agility + '</li><li><b>Vulnerability:</b> ' + gameManager.activeEnemy.vulnerability + '</li></ul></div>';
            gameManager.resultStats.innerHTML = '<h4>You lose in ' + gameManager.round + ' rounds.</h4>';
            gameManager.selectContent(result);
    }

};