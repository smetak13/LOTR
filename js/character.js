class Character {
    constructor(name, info, attack, health, agility, mana, skills) {
        this.name = name;
        this.info = info;
        this.attack = attack;
        this.health = health;
        this.agility = agility;
        this.mana = mana;
        this.skills = skills;
    }

}

const frodo = new Character('Frodo', 'some info', 270, 2640, 20, 0, 
    {
        skill1: {
            name: 'The One Ring',
            description: 'All the physical attacks towards this card have a 50% chance to miss.'
        },
        skill2: {
            name: 'Mithril shirt',
            description: 'After the card dies, there is a 50% chance the card is ressurected and continues with 700 health.'
        },
});

const sam = new Character('Sam', 'some info', 280, 2800, 17, 0, 
    {
        skill1: {
            name: 'Iron Will',
            description: 'There is a 40% chance to regenerate 150 health.'
        },
        skill2: {
            name: 'Light of Galadriel',
            description: 'There is a 40% chance the enemy will be stunned in the next round. The chance is 50% against Shelob.'
        },
});

const legolas = new Character('Legolas', 'some info', 320, 2840, 18, 0, 
    {
        skill1: {
            name: 'Arrow Fury',
            description: 'There is a 40% chance your total damage increases by 100%.'
        },
        skill2: {
            name: 'Lighter than the Wind',
            description: 'There is a 30% chance to evade attack by your enemy.'
        },
});

const aragorn = new Character('Aragorn', 'some info', 350, 2840, 14, 0, 
    {
        skill1: {
            name: 'Anduril Sword',
            description: 'There is a 50% chance your attack increases by your opponent´s basic attack.'
        },
        skill2: {
            name: 'Deal with the Dead',
            description: 'After the card dies, there is a 40% chance the card is ressurected and continues with 850 health. The chance is 60% against the King of the Dead.'
        },
});

const gimli = new Character('Gimli', 'some info', 300, 2900, 10, 0, 
    {
        skill1: {
            name: 'Axe Fury',
            description: 'Your basic attack increases by 10% each round.'
        },
        skill2: {
            name: 'Stunning',
            description: 'There is a 30% chance the enemy will be stunned in the next round.'
        },
});

const gandalf = new Character('Gandalf', 'some info', 270, 2720, 12, 0, 
    {
        skill1: {
            name: 'White Light',
            description: 'There is a 30% chance your total damage increases by 200%.'
        },
        skill2: {
            name: 'You Shall Not Pass',
            description: 'There is a 50% chance to limit the attack by your enemy to 170 damage. The chance is 60% against Balrog.'
        },
});