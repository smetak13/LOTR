
const gameManager = {

    activeCharacter: '',
    activeEnemy: '',
    player: '',
    opponent: '',
    playerResult: '',
    opponentResult: '',
    resultStats: '',
    round: 0,
    basicHealth: '',
    basicAttack: '',
    regenerationCount: '',
    playerInfoSkill: '',
    playerInfoAttack: '',
    opponentInfoAttack: '',
    manaInfo: '',
    manaSkillInfo: '',
    manaButton: '',
    activeManaSkill: {
        name: 'Mana Skill',
        description: 'You need to generate 7 mana points to get a Mana Skill.'
    },

    getRandomNumber(start, range) {
        return Math.round((Math.random() * (range-start)) + start);
    },

    chooseCharacter(character) {
        this.player = document.querySelector('.player');
        this.opponent = document.querySelector('.opponent');
        this.playerResult = document.querySelector('.player-result');
        this.opponentResult = document.querySelector('.opponent-result');
        this.resultStats = document.querySelector('.result-stats');
        this.playerInfoSkill = document.querySelector('.player-info-skill');
        this.playerInfoAttack = document.querySelector('.player-info-attack');
        this.opponentInfoAttack = document.querySelector('.opponent-info-attack');
        this.manaInfo = document.querySelector('.mana-info');
        this.manaSkillInfo = document.querySelector('.mana-skill-info');
        this.manaButton = document.getElementById('mana-button');
        this.activeCharacter = character;
        this.renderPlayerStats();
        this.basicHealth = this.activeCharacter.health;
        this.basicAttack = this.activeCharacter.attack;
        this.selectContent(difficulty);
    },

    chooseDifficulty(difficulty) {
        this.chooseEnemy(difficulty)
    },

    chooseEnemy(difficulty) {
        
        if (difficulty === 'easy') {
            this.activeEnemy = easyEnemies[this.getRandomNumber(0, easyEnemies.length)];
            if (this.activeEnemy===undefined) return this.chooseEnemy(difficulty);
        }
        if (difficulty === 'medium') {
            this.activeEnemy = mediumEnemies[this.getRandomNumber(0, mediumEnemies.length)];
            if (this.activeEnemy===undefined) return this.chooseEnemy(difficulty);
        }
        if (difficulty === 'hard') {
            this.activeEnemy = hardEnemies[this.getRandomNumber(0, hardEnemies.length)];
            if (this.activeEnemy===undefined) return this.chooseEnemy(difficulty);
        }

        this.renderOpponentStats();
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

    renderPlayerStats() {
        return this.player.innerHTML = '<h2> ' + this.activeCharacter.name + ' </h2><div class="stats-arena"><img src="./characters/' + this.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeCharacter.attack + '</li><li><b>Health:</b> ' + this.activeCharacter.health + '</li><li><b>Agility:</b> ' + this.activeCharacter.agility + '</li><li><b>Mana:</b> ' + this.activeCharacter.mana + '</li><li> <b>' + this.activeCharacter.skills.skill1.name + ':</b> ' + this.activeCharacter.skills.skill1.description + '</li><li> <b>' + this.activeCharacter.skills.skill2.name + ':</b> ' + this.activeCharacter.skills.skill2.description + '</li><li><b> ' + this.activeManaSkill.name + ':</b> ' + this.activeManaSkill.description + '</li></ul></div>';
    },

    renderOpponentStats() {
        return this.opponent.innerHTML = '<h2> ' + this.activeEnemy.name + ' </h2><div class="stats-arena"><img src="./enemies/' + this.activeEnemy.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeEnemy.attack + '</li><li><b>Health:</b> ' + this.activeEnemy.health + '</li><li><b>Agility:</b> ' + this.activeEnemy.agility + '</li><li><b>Vulnerability:</b> ' + this.activeEnemy.vulnerability + '</li></ul></div>';
    },

}

