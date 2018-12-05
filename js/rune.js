class Rune {
    constructor(name, description, status = 'active', stats) {
        this.name = name;
        this.description = description;
        this.status = status;
        this.stats = stats;
    }
}

const fire = new Rune('Fire', 'Deals 80 damage for each commenced round.',
    {
        damage: 80,
    });
const water = new Rune('Water', 'Takes 40 health from your opponent for each round and adds it to your health.',
    {
        damage: 40,
    });
const air = new Rune('Air', 'Regenerates 80 health for each commenced round.',
    {
        health: 80,
    });
const earth = new Rune('Earth', 'After the character dies, he is ressurected and continues with 450 health.',
    {
        health: 450,
    });


function useRune() {
    
    gameManager.manaInfo.innerHTML = '<p></p>';
    gameManager.manaSkillInfo.innerHTML = '<p></p>';
    gameManager.opponentInfoAttack.innerHTML = '<p></p>';
    gameManager.playerInfoAttack.innerHTML = '<p></p>';
    gameManager.playerInfoSkill.innerHTML = '<p></p>';

    let damage;

    switch (gameManager.activeRune.name) {
        case 'Fire':
            damage = gameManager.activeRune.stats.damage * gameManager.round;
            gameManager.activeEnemy.health -= damage;
            gameManager.manaInfo.innerHTML = '<p>Fire rune caused ' + damage + ' damage to your opponent.</p>'
            gameManager.renderOpponentStats();

            if (gameManager.activeEnemy.health <= 0) {
                gameManager.activeEnemy.health = 0;
                gameManager.playerResult.innerHTML = gameManager.renderPlayerStats();
                gameManager.opponentResult.innerHTML = gameManager.renderOpponentStats();
                gameManager.opponentResult.setAttribute('id', 'dead');
                gameManager.resultStats.innerHTML = '<h4>You win in ' + gameManager.round + ' rounds.</h4>';
                return gameManager.selectContent(gameManager.result);
            }
            break;
        case 'Air':
            gameManager.regenerationCount = gameManager.basicHealth - gameManager.activeCharacter.health;
            if (gameManager.regenerationCount > gameManager.activeRune.stats.health * gameManager.round) {
                gameManager.regenerationCount = gameManager.activeRune.stats.health * gameManager.round;
            }
            gameManager.activeCharacter.health += gameManager.activeRune.stats.health * gameManager.round;
            if (gameManager.activeCharacter.health > gameManager.basicHealth) {
                gameManager.activeCharacter.health = gameManager.basicHealth;
            }
            gameManager.renderPlayerStats();
            if (gameManager.regenerationCount > 0) {
                gameManager.manaInfo.innerHTML = '<p>Air rune regenerated ' + gameManager.regenerationCount + ' health.</p>';
            }
            break;
        case 'Water':
            damage = gameManager.activeRune.stats.damage * gameManager.round;
            gameManager.activeEnemy.health -= damage;
            gameManager.manaInfo.innerHTML = '<p> Water rune caused ' + damage + ' damage to your opponent.';
            gameManager.renderOpponentStats();

            if (gameManager.activeEnemy.health <= 0) {
                gameManager.activeEnemy.health = 0;
                gameManager.playerResult.innerHTML = gameManager.renderPlayerStats();
                gameManager.opponentResult.innerHTML = gameManager.renderOpponentStats();
                gameManager.opponentResult.setAttribute('id', 'dead');
                gameManager.resultStats.innerHTML = '<h4>You win in ' + gameManager.round + ' rounds.</h4>';
                return gameManager.selectContent(gameManager.result);
            }

            gameManager.regenerationCount = gameManager.basicHealth - damage;
            if (gameManager.regenerationCount > damage) {
                gameManager.regenerationCount = damage;
            }
            gameManager.activeCharacter.health += damage;
            if (gameManager.activeCharacter.health > gameManager.basicHealth) {
                gameManager.activeCharacter.health = gameManager.basicHealth;
            }

            gameManager.manaSkillInfo.innerHTML = '<p>Water rune regenerated ' + gameManager.regenerationCount + ' health.</p>';
            gameManager.renderPlayerStats();
            break;
            
    }

    gameManager.renderPassiveRuneStats();
}