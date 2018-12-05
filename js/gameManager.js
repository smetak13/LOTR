
const gameManager = {

    activeCharacter: undefined,
    activeEnemy: undefined,
    activeRune: undefined,
    player: document.querySelector('.player'),
    opponent: document.querySelector('.opponent'),
    playerResult: document.querySelector('.player-result'),
    opponentResult: document.querySelector('.opponent-result'),
    resultStats: document.querySelector('.result-stats'),
    round: 0,
    roundsCounter: document.getElementById('rounds-counter'),
    basicHealth: 0,
    basicAttack: 0,
    regenerationCount: 0,
    playerInfoSkill: document.querySelector('.player-info-skill'),
    playerInfoAttack: document.querySelector('.player-info-attack'),
    opponentInfoAttack: document.querySelector('.opponent-info-attack'),
    runeInfo: document.querySelector('.rune-info'),
    manaInfo: document.querySelector('.mana-info'),
    manaSkillInfo: document.querySelector('.mana-skill-info'),
    manaButton: document.getElementById('mana-button'),
    activeManaSkill: {
        name: 'Mana Skill',
        description: 'You need to generate 7 mana points to get a Mana Skill.'
    },
    menu: document.querySelector('.menu'),
    rune: document.querySelector('.rune'),
    difficulty: document.querySelector('.difficulty'),
    arena: document.querySelector('.arena'),
    result: document.querySelector('.result'),
    frodoStats: document.querySelector('.frodo-stats'),
    samStats: document.querySelector('.sam-stats'),
    legolasStats: document.querySelector('.legolas-stats'),
    aragornStats: document.querySelector('.aragorn-stats'),
    gimliStats: document.querySelector('.gimli-stats'),
    gandalfStats: document.querySelector('.gandalf-stats'),
    fireRuneStats: document.querySelector('.fire-rune-stats'),
    waterRuneStats: document.querySelector('.water-rune-stats'),
    earthRuneStats: document.querySelector('.earth-rune-stats'),
    airRuneStats: document.querySelector('.air-rune-stats'),


    init() {
        
        this.rune.style.display = 'none';
        this.difficulty.style.display = 'none';
        this.arena.style.display = 'none';
        this.result.style.display = 'none';

        this.fireRuneStats.innerHTML = '<ul><li>' + fire.description + '</li></ul>'
        this.waterRuneStats.innerHTML = '<ul><li>' + water.description + '</li></ul>'
        this.earthRuneStats.innerHTML = '<ul><li>' + earth.description + '</li></ul>'
        this.airRuneStats.innerHTML = '<ul><li>' + air.description + '</li></ul>'

        this.frodoStats.innerHTML = '<ul><li><b>Attack:</b> ' + frodo.attack + '</li><li><b>Health:</b> ' + frodo.health + '</li><li><b>Agility:</b> ' + frodo.agility + '</li><li> <b>' + frodo.skills.skill1.name + ':</b> ' + frodo.skills.skill1.description + '</li><li> <b>' + frodo.skills.skill2.name + ':</b> ' + frodo.skills.skill2.description + '</li></ul>';
        this.samStats.innerHTML = '<ul><li><b>Attack:</b> ' + sam.attack + '</li><li><b>Health:</b> ' + sam.health + '</li><li><b>Agility:</b> ' + sam.agility + '</li><li> <b>' + sam.skills.skill1.name + ':</b> ' + sam.skills.skill1.description + '</li><li> <b>' + sam.skills.skill2.name + ':</b> ' + sam.skills.skill2.description + '</li></ul>';
        this.legolasStats.innerHTML = '<ul><li><b>Attack:</b> ' + legolas.attack + '</li><li><b>Health:</b> ' + legolas.health + '</li><li><b>Agility:</b> ' + legolas.agility + '</li><li> <b>' + legolas.skills.skill1.name + ':</b> ' + legolas.skills.skill1.description + '</li><li> <b>' + legolas.skills.skill2.name + ':</b> ' + legolas.skills.skill2.description + '</li></ul>';
        this.aragornStats.innerHTML = '<ul><li><b>Attack:</b> ' + aragorn.attack + '</li><li><b>Health:</b> ' + aragorn.health + '</li><li><b>Agility:</b> ' + aragorn.agility + '</li><li> <b>' + aragorn.skills.skill1.name + ':</b> ' + aragorn.skills.skill1.description + '</li><li> <b>' + aragorn.skills.skill2.name + ':</b> ' + aragorn.skills.skill2.description + '</li></ul>';
        this.gimliStats.innerHTML = '<ul><li><b>Attack:</b> ' + gimli.attack + '</li><li><b>Health:</b> ' + gimli.health + '</li><li><b>Agility:</b> ' + gimli.agility + '</li><li> <b>' + gimli.skills.skill1.name + ':</b> ' + gimli.skills.skill1.description + '</li><li> <b>' + gimli.skills.skill2.name + ':</b> ' + gimli.skills.skill2.description + '</li></ul>';
        this.gandalfStats.innerHTML = '<ul><li><b>Attack:</b> ' + gandalf.attack + '</li><li><b>Health:</b> ' + gandalf.health + '</li><li><b>Agility:</b> ' + gandalf.agility + '</li><li> <b>' + gandalf.skills.skill1.name + ':</b> ' + gandalf.skills.skill1.description + '</li><li> <b>' + gandalf.skills.skill2.name + ':</b> ' + gandalf.skills.skill2.description + '</li></ul>';
        
        this.roundsCounter.innerHTML = '<h5>Round: 1<h5>';
    },

    getRandomNumber(start, range) {
        return Math.round((Math.random() * (range-start)) + start);
    },

    chooseCharacter(character) {
        this.activeCharacter = character;
        this.renderPlayerStats();
        this.basicHealth = this.activeCharacter.health;
        this.basicAttack = this.activeCharacter.attack;
        this.selectContent(this.rune);
    },

    chooseRune(rune) {
        this.activeRune = rune;
        if (this.activeRune.name === 'Earth') {
            this.runeInfo.innerHTML = '<div class="passive-rune"><h5>' + this.activeRune.name + '</h5><img src="img/' + this.activeRune.name.toLowerCase() + '.png" width="100"><h6>Rune is active</h6></div>';
            return this.selectContent(this.difficulty);
        }
        this.renderRuneStats();
        this.selectContent(this.difficulty);
    },

    chooseDifficulty(difficulty) {
        this.chooseEnemy(difficulty)
    },

    chooseEnemy(difficulty) {
        
        if (difficulty === 'easy') {
            this.activeEnemy = easyEnemies[this.getRandomNumber(0, easyEnemies.length - 1)];
        }
        if (difficulty === 'medium') {
            this.activeEnemy = mediumEnemies[this.getRandomNumber(0, mediumEnemies.length - 1)];
        }
        if (difficulty === 'hard') {
            this.activeEnemy = hardEnemies[this.getRandomNumber(0, hardEnemies.length - 1)];
        }

        this.renderOpponentStats();
        this.selectContent(this.arena);
    },

    selectContent(page) {
        this.menu.style.display = 'none';
        this.rune.style.display = 'none';
        this.difficulty.style.display = 'none';
        this.arena.style.display = 'none';
        this.result.style.display = 'none';
        page.style.display = 'block';
    },

    newGame() {
        window.location = 'index.html';
    },

    renderPlayerStats() {
        return this.player.innerHTML = '<h2> ' + this.activeCharacter.name + ' </h2><div class="stats-arena"><img src="img/characters/' + this.activeCharacter.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeCharacter.attack + '</li><li><b>Health:</b> ' + this.activeCharacter.health + '</li><li><b>Agility:</b> ' + this.activeCharacter.agility + '</li><li><b>Mana:</b> ' + this.activeCharacter.mana + '</li><li> <b>' + this.activeCharacter.skills.skill1.name + ':</b> ' + this.activeCharacter.skills.skill1.description + '</li><li> <b>' + this.activeCharacter.skills.skill2.name + ':</b> ' + this.activeCharacter.skills.skill2.description + '</li><li><b> ' + this.activeManaSkill.name + ':</b> ' + this.activeManaSkill.description + '</li></ul></div>';
    },

    renderOpponentStats() {
        return this.opponent.innerHTML = '<h2> ' + this.activeEnemy.name + ' </h2><div class="stats-arena"><img src="img//enemies/' + this.activeEnemy.name.toLowerCase() + '.png' + ' "><ul><li><b>Attack:</b> ' + this.activeEnemy.attack + '</li><li><b>Health:</b> ' + this.activeEnemy.health + '</li><li><b>Agility:</b> ' + this.activeEnemy.agility + '</li><li><b>Vulnerability:</b> ' + this.activeEnemy.vulnerability + '</li></ul></div>';
    },

    renderRuneStats() {
        return this.runeInfo.innerHTML = '<div class="active-rune" onclick="useRune()"><h5>' + this.activeRune.name + '</h5><img src="img/' + this.activeRune.name.toLowerCase() + '.png" width="100"><h6>Activate rune</h6></div>';
    },

    renderPassiveRuneStats() {
        return this.runeInfo.innerHTML = '<div class="passive-rune"><h5>' + this.activeRune.name + '</h5><img src="img/' + this.activeRune.name.toLowerCase() + '-dead.png" width="100"><h6>Rune is dead</h6></div>';
    }

}

