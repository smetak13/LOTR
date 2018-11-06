
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

    if (gameManager.manaButton.innerHTML==='Mana Attack') {
        return manaAttack();
    }

    gameManager.activeCharacter.mana += 3;

    gameManager.manaInfo.innerHTML = '<p>You generated 3 mana.</p>';
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

    gameManager.manaInfo.innerHTML = '<p></p>';
    gameManager.manaSkillInfo.innerHTML = '<p></p>';
    gameManager.opponentInfoAttack.innerHTML = '<p></p>';
    gameManager.playerInfoAttack.innerHTML = '<p></p>';
    gameManager.playerInfoSkill.innerHTML = '<p></p>';

    gameManager.activeCharacter.mana -= 7;
    if (gameManager.activeCharacter.mana < 7) {
        gameManager.manaButton.innerHTML = 'Regenerate';
    }

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

    gameManager.playerInfoAttack.innerHTML = '<p>You caused ' + basicDamage + ' damage to your opponent.</p>'




    gameManager.activeManaSkill = {
        name: 'Mana Skill',
        description: 'You need to generate 7 mana points to get a Mana Skill.'
    };

    enemyAttack();

}