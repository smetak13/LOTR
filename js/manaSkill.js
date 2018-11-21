class ManaSkill {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

const regeneration = new ManaSkill('Regeneration', 'Regenerate 40% of your basic health.');
const bloodsucker = new ManaSkill('Bloodsucker', 'Your basic attack is increased by 150% and your health is increased by 100% of the damage dealt to your opponent.');
const craze = new ManaSkill('Craze', 'Your basic attack is increased by 300% for one round.');
const reflection = new ManaSkill('Reflection', 'your basic attack is increased by 150% and your opponent´s attack is reflected back at him in the next round.');

const manaSkills = [regeneration, bloodsucker, craze, reflection];



function regenerateMana() {

    gameManager.round += 1;
    gameManager.roundsCounter.innerHTML = '<h5>Round: ' + gameManager.round + '</h5>'

    if (gameManager.manaButton.innerHTML==='Mana Attack') {
        return manaAttack();
    }

    gameManager.activeCharacter.mana += 3;

    gameManager.manaInfo.innerHTML = '<p>You generated 3 mana.</p>';
    gameManager.manaSkillInfo.innerHTML = '<p></p>';
    gameManager.opponentInfoAttack.innerHTML = '<p></p>';
    gameManager.playerInfoAttack.innerHTML = '<p></p>';
    gameManager.playerInfoSkill.innerHTML = '<p></p>';

    if (gameManager.activeCharacter.mana >= 7) {
        gameManager.manaButton.innerHTML = 'Mana Attack';
        generateManaSkill();
    }

    enemyAttack();
}



function generateManaSkill() {
    if (gameManager.activeManaSkill.name==='Mana Skill') {
        gameManager.activeManaSkill = manaSkills[gameManager.getRandomNumber(0, manaSkills.length)];
        if (gameManager.activeManaSkill===undefined) {
            gameManager.activeManaSkill = { 
                name: 'Mana Skill',
                description: 'You need to generate 7 mana points to get a Mana Skill.'
            }
            return generateManaSkill();
        } else {
            gameManager.manaSkillInfo.innerHTML = '<p>You gained new Mana Skill: ' + gameManager.activeManaSkill.name + '</p>';
            gameManager.renderPlayerStats();
        }
    }
    else return;
}



function manaAttack() {

    gameManager.round += 1;
    gameManager.roundsCounter.innerHTML = '<h5>Round: ' + gameManager.round + '</h5>'

    gameManager.manaInfo.innerHTML = '<p></p>';
    gameManager.manaSkillInfo.innerHTML = '<p></p>';
    gameManager.opponentInfoAttack.innerHTML = '<p></p>';
    gameManager.playerInfoAttack.innerHTML = '<p></p>';
    gameManager.playerInfoSkill.innerHTML = '<p></p>';

    gameManager.activeCharacter.mana -= 7;
    if (gameManager.activeCharacter.mana < 7) {
        gameManager.manaButton.innerHTML = 'Regenerate';
    }

    gameManager.renderPlayerStats();

    let basicDamage = gameManager.basicAttack;

    switch (gameManager.activeManaSkill.name) {
        case 'Regeneration':
            gameManager.regenerationCount = gameManager.basicHealth - gameManager.activeCharacter.health;
            if (gameManager.regenerationCount > gameManager.basicHealth * 0.4) {
                gameManager.regenerationCount = gameManager.basicHealth * 0.4;
            }
            gameManager.activeCharacter.health += gameManager.basicHealth * 0.4;
            if (gameManager.activeCharacter.health > gameManager.basicHealth) {
                gameManager.activeCharacter.health = gameManager.basicHealth;
            }

            gameManager.manaSkillInfo.innerHTML = '<p>You regenerated ' + gameManager.regenerationCount + ' health.</p>'
            gameManager.renderPlayerStats();
            
            break;
        case 'Craze':
            basicDamage *= 4;
            break;
        case 'Reflection':
            basicDamage *= 2.5;
            break;
        case 'Bloodsucker':
            basicDamage *= 2.5;
            break;
    }

    let offsetDamage = gameManager.getRandomNumber(20, 60);
    basicDamage += offsetDamage;
    let vulnerabilityDamage = 0;
    if (gameManager.activeEnemy.vulnerability===gameManager.activeCharacter.name) {
        vulnerabilityDamage = gameManager.getRandomNumber(50, 150);
    }
    basicDamage += vulnerabilityDamage;
    gameManager.activeEnemy.health -= basicDamage;

    gameManager.renderOpponentStats();

    gameManager.manaInfo.innerHTML = '<p>You caused ' + basicDamage + ' damage to your opponent.</p>';


    if (gameManager.activeManaSkill.name==='Bloodsucker') {
        gameManager.regenerationCount = gameManager.basicHealth - basicDamage;
            if (gameManager.regenerationCount > basicDamage) {
                gameManager.regenerationCount = basicDamage;
            }
            gameManager.activeCharacter.health += basicDamage;
            if (gameManager.activeCharacter.health > gameManager.basicHealth) {
                gameManager.activeCharacter.health = gameManager.basicHealth;
            }

            gameManager.manaSkillInfo.innerHTML = '<p>You regenerated ' + gameManager.regenerationCount + ' health.</p>';
            gameManager.renderPlayerStats();
    }


    if (gameManager.activeManaSkill.name==='Reflection') {

        let basicDamage = gameManager.activeEnemy.attack;
        let offsetDamage = gameManager.getRandomNumber(20, 120);
        basicDamage += offsetDamage;
        gameManager.activeEnemy.health -= basicDamage;
        gameManager.opponentInfoAttack.innerHTML = '<p>Your opponent´s attack was reflected back at him and caused ' + basicDamage + ' damage.';
        gameManager.renderOpponentStats();
        if (gameManager.activeEnemy.health <= 0) {
            gameManager.activeEnemy.health = 0;
            gameManager.playerResult.innerHTML = gameManager.renderPlayerStats();
            gameManager.opponentResult.innerHTML = gameManager.renderOpponentStats();
            gameManager.opponentResult.setAttribute('id', 'dead');
            gameManager.resultStats.innerHTML = '<h4>You win in ' + gameManager.round + ' rounds.</h4>';
            return gameManager.selectContent(result);
        } else {
            gameManager.activeManaSkill = {
                name: 'Mana Skill',
                description: 'You need to generate 7 mana points to get a Mana Skill.'
            };
            gameManager.renderPlayerStats();
            return;
        }
    }


    if (gameManager.activeEnemy.health <= 0) {
        gameManager.activeEnemy.health = 0;
        gameManager.playerResult.innerHTML = gameManager.renderPlayerStats();
        gameManager.opponentResult.innerHTML = gameManager.renderOpponentStats();
        gameManager.opponentResult.setAttribute('id', 'dead');
        gameManager.resultStats.innerHTML = '<h4>You win in ' + gameManager.round + ' rounds.</h4>';
        return gameManager.selectContent(result);
    }


    gameManager.activeManaSkill = {
        name: 'Mana Skill',
        description: 'You need to generate 7 mana points to get a Mana Skill.'
    };

    gameManager.renderPlayerStats();

    enemyAttack();

}