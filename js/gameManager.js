
const gameManager = {

    activeCharacter: '',
    activeEnemy: '',
    player: '',
    opponent: '',
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
    

    characterAttack() {

        this.round += 1;

        this.manaInfo.innerHTML = '<p></p>';
        this.manaSkillInfo.innerHTML = '<p></p>';
        this.opponentInfoAttack.innerHTML = '<p></p>';
        this.playerInfoAttack.innerHTML = '<p></p>';
        this.playerInfoSkill.innerHTML = '<p></p>';

        if (this.getRandomNumber(1, 10) <= 6) {
            this.activeCharacter.mana += 1;
            this.renderPlayerStats();
            this.manaInfo.innerHTML = '<p>You generated 1 mana.</p>';
        }

        if (this.activeCharacter.mana >= 7) {
            this.manaButton.innerHTML = 'Mana Attack';
            this.generateManaSkill();
        }

        if (this.round===1) {
            if ((this.activeEnemy.agility + this.getRandomNumber(1, 10)) > (this.activeCharacter.agility + this.getRandomNumber(1, 10))) {
                return this.enemyAttack();
            }
        }
        
        if (this.activeCharacter.skills.skill1.name==='Axe Fury') {
            this.activeCharacter.attack *= 1.1;
            this.activeCharacter.attack = Math.round(this.activeCharacter.attack);
            this.renderPlayerStats();
        }

        let basicDamage = this.activeCharacter.attack;

        let offsetDamage = this.getRandomNumber(20, 60);
        basicDamage += offsetDamage;

        let vulnerabilityDamage = 0;

        if (this.activeEnemy.vulnerability===this.activeCharacter.name) {
            vulnerabilityDamage = this.getRandomNumber(50, 150);
        }

        basicDamage += vulnerabilityDamage;

        switch (this.activeCharacter.skills.skill1.name) {
            case 'Iron Will':
                if (this.round > 1) {
                    this.playerInfoSkill.innerHTML = '<p></p>';
                    if (this.getRandomNumber(1, 10) <= 4) {
                        this.regenerationCount = this.basicHealth - this.activeCharacter.health;
                        if (this.regenerationCount > 150) {
                            this.regenerationCount = 150;
                        }
                        this.activeCharacter.health += 150;
                        if (this.activeCharacter.health > this.basicHealth) {
                            this.activeCharacter.health = this.basicHealth;
                        }
                        this.renderPlayerStats();
                        if (this.regenerationCount > 0) {
                            this.playerInfoSkill.innerHTML = '<p>You regenerated ' + this.regenerationCount + ' health.</p>';
                        }
                    }
                }
            break;
            case 'Anduril Sword':
                if (this.getRandomNumber(1, 10) <= 5) {
                    basicDamage += this.activeEnemy.attack
                }
            break; 
            case 'Arrow Fury':
                if (this.getRandomNumber(1, 10) <= 4) {
                    basicDamage *= 2;
                }
            break;
            case 'White Light':
                if (this.getRandomNumber(1, 10) <= 3) {
                    basicDamage *= 3;
                }
            break;
        
        }

        this.activeEnemy.health -= basicDamage;

        this.renderOpponentStats();

        this.playerInfoAttack.innerHTML = '<p>You caused ' + basicDamage + ' damage to your opponent.</p>'


        if (this.activeEnemy.health <= 0) {
            this.activeEnemy.health = 0;
            resultStats.innerHTML = '<h4>You win in ' + this.round + ' rounds.</h4>';
            return this.selectContent(result);
        }

        
        if (this.activeCharacter.skills.skill1.name==='The One Ring') {
            if (this.getRandomNumber(1, 10)<=5) {
                this.opponentInfoAttack.innerHTML = '<p>You dodged your enemy´s attack.</p>';
                return;
            }
        }

        switch (this.activeCharacter.skills.skill2.name) {
            case 'Light of Galadriel':
                if (this.activeEnemy.name==='Shelob') {
                    if (this.getRandomNumber(1, 10)<=5) {
                        this.opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack.</p>';
                        return;
                    }
                } else {
                    if (this.getRandomNumber(1, 10)<=4) {
                        this.opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack.</p>';
                        return;
                    }
                }         
                break;
            case 'Lighter than the Wind':
                if (this.getRandomNumber(1, 10)<=3) {
                    this.opponentInfoAttack.innerHTML = '<p>You dodged your enemy´s attack.</p>';
                    return;
                }
                break;
            case 'Stunning':
                if (this.getRandomNumber(1, 10)<=3) {
                    this.opponentInfoAttack.innerHTML = '<p>Your opponent is stunned and cannot attack.</p>';
                    return;
                }
                break;
        
        }
        this.enemyAttack();
        
    },

    enemyAttack() {

        let basicDamage = this.activeEnemy.attack;
    
        let offsetDamage = this.getRandomNumber(20, 120);
    
        basicDamage += offsetDamage;
    
        if (this.activeCharacter.skills.skill2.name==='You Shall Not Pass') {
            if (this.activeEnemy.name==='Balrog') {
                if (this.getRandomNumber(1, 10) <= 6) {
                    basicDamage = 170;
                }
            } else {
                if (this.getRandomNumber(1, 10) <= 5) {
                    basicDamage = 170;
                }
            }
        };
    
        this.activeCharacter.health -= basicDamage;
    
        this.opponentInfoAttack.innerHTML = '<p>Enemy caused you ' + basicDamage + ' damage.</p>';
    
        this.renderPlayerStats();

        if (this.activeCharacter.health <= 0) {
            if (this.activeCharacter.skills.skill2.name==='Mithril shirt') {
                if (this.getRandomNumber(1, 10) <= 5) {
                    this.activeCharacter.health = 700;
                    this.renderPlayerStats();
                    this.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + this.activeCharacter.health + ' health.</p>';
                    return;
                }
            }
            if (this.activeCharacter.skills.skill2.name==='Deal with the Dead') {
                if (this.activeEnemy.name==='King of the Dead') {
                    if (this.getRandomNumber(1, 10) <= 6) {
                        this.activeCharacter.health = 850;
                        this.renderPlayerStats();
                        this.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + this.activeCharacter.health + ' health.</p>';
                        return;
                    }
                } else {
                    if (this.getRandomNumber(1, 10) <= 4) {
                        this.activeCharacter.health = 850;
                        this.renderPlayerStats();
                        this.opponentInfoAttack.innerHTML = '<p>You ressurected and continue with ' + this.activeCharacter.health + ' health.</p>';
                        return;
                    }
                }
            }
                this.activeCharacter.health = 0;
                resultStats.innerHTML = '<h4>You lose in ' + this.round + ' rounds.</h4>'
                this.selectContent(result);
        }
    
    },

    regenerateMana() {

        this.round += 1;

        if (this.manaButton.innerHTML==='Mana Attack') {
            return this.manaAttack();
        }

        this.activeCharacter.mana += 3;

        this.manaInfo.innerHTML = '<p>You generated 3 mana.</p>';
        this.opponentInfoAttack.innerHTML = '<p></p>';
        this.playerInfoAttack.innerHTML = '<p></p>';
        this.playerInfoSkill.innerHTML = '<p></p>';

        if (this.activeCharacter.mana >= 7) {
            this.manaButton.innerHTML = 'Mana Attack';
            this.generateManaSkill();
        }

        this.enemyAttack();
    },

    generateManaSkill() {
        if (this.activeManaSkill.name==='Mana Skill') {
            this.activeManaSkill = manaSkills[this.getRandomNumber(0, manaSkills.length)];
            if (this.activeManaSkill===undefined) {
                this.activeManaSkill = { 
                    name: 'Mana Skill',
                    description: 'You need to generate 7 mana points to get a Mana Skill.'
                }
                return this.generateManaSkill();
            } else {
                this.manaSkillInfo.innerHTML = '<p>You gained new Mana Skill: ' + this.activeManaSkill.name + '</p>';
                this.renderPlayerStats();
            }
        }
        else return;
    },

    manaAttack() {

        this.manaInfo.innerHTML = '<p></p>';
        this.manaSkillInfo.innerHTML = '<p></p>';
        this.opponentInfoAttack.innerHTML = '<p></p>';
        this.playerInfoAttack.innerHTML = '<p></p>';
        this.playerInfoSkill.innerHTML = '<p></p>';

        this.activeCharacter.mana -= 7;
        if (this.activeCharacter.mana < 7) {
            this.manaButton.innerHTML = 'Regenerate';
        }

        let basicDamage = this.basicAttack;

        switch (this.activeManaSkill.name) {
            case 'Regeneration':
                this.regenerationCount = this.basicHealth - this.activeCharacter.health;
                if (this.regenerationCount > this.basicHealth * 0.4) {
                    this.regenerationCount = this.basicHealth * 0.4;
                }
                this.activeCharacter.health += this.basicHealth * 0.4;
                if (this.activeCharacter.health > this.basicHealth) {
                    this.activeCharacter.health = this.basicHealth;
                }

                this.manaSkillInfo.innerHTML = '<p>You regenerated ' + this.regenerationCount + ' health.</p>'
                
                
                break;
        }

        let offsetDamage = this.getRandomNumber(20, 60);
        basicDamage += offsetDamage;
        let vulnerabilityDamage = 0;
        if (this.activeEnemy.vulnerability===this.activeCharacter.name) {
            vulnerabilityDamage = this.getRandomNumber(50, 150);
        }
        basicDamage += vulnerabilityDamage;
        this.activeEnemy.health -= basicDamage;

        this.renderOpponentStats();

        this.playerInfoAttack.innerHTML = '<p>You caused ' + basicDamage + ' damage to your opponent.</p>'




        this.activeManaSkill = {
            name: 'Mana Skill',
            description: 'You need to generate 7 mana points to get a Mana Skill.'
        };

        this.enemyAttack();

    }

}

