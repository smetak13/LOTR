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