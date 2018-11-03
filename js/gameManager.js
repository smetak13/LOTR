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
    greatSpider: new Enemy('Great Spider', 'easy', 'Sam', 230, 3300, 17),
    orc: new Enemy('Orc', 'easy', 'Gimli', 250, 3200, 12),
    warg: new Enemy('Warg', 'easy', 'Gimli', 240, 3240, 22),
    gollum: new Enemy('Gollum', 'easy', 'Sam', 220, 3460, 15),
    orcLeader: new Enemy('Orc Leader', 'medium', 'Gimli', 330, 3620, 13),
    nazgul: new Enemy('Nazgul', 'medium', 'Aragorn', 370, 3740, 20),
    shelob: new Enemy('Shelob', 'medium', 'Sam', 310, 3780, 19),
    troll: new Enemy('Troll', 'medium', 'Legolas', 380, 3820, 8),
    oliphant: new Enemy('Oliphant', 'medium', 'Legolas', 360, 3900, 9),
    saruman: new Enemy('Saruman', 'hard', 'Gandalf', 350, 4540, 12),
    balrog: new Enemy('Balrog', 'hard', 'Gandalf', 490, 4240, 8),
    kingOfTheDead: new Enemy('King of the Dead', 'hard', 'Aragorn', 370, 4600, 15),
    sauron: new Enemy('Sauron', 'hard', 'Frodo', 360, 4850, 7),
    easyEnemies: '',
    mediumEnemies: '',
    hardEnemies: '',

    chooseCharacter(character) {
        this.easyEnemies = [this.greatSpider, this.orc, this.warg, this.gollum];
        this.mediumEnemies = [this.orcLeader, this.nazgul, this.shelob, this.troll, this.oliphant];
        this.hardEnemies = [this.saruman, this.balrog, this.kingOfTheDead, this.sauron];
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
            this.activeEnemy = this.easyEnemies[getRandomNumber(0, this.easyEnemies.length)];
        }
        if (difficulty === 'medium') {
            this.activeEnemy = this.mediumEnemies[getRandomNumber(0, this.mediumEnemies.length)];
        }
        if (difficulty === 'hard') {
            this.activeEnemy = this.hardEnemies[getRandomNumber(0, this.hardEnemies.length)];
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
    }
}