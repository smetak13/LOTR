class Rune {
    constructor(name, description, status = 'active') {
        this.name = name;
        this.description = description;
        this.status = status;
    }
}

const fire = new Rune('Fire', 'Deals 65 damage for each commenced round.');
const water = new Rune('Water', 'Takes 40 health from your opponent for each round and adds it to your health.');
const air = new Rune('Air', 'Regenerates 70 health for each commenced round.');
const earth = new Rune('Earth', 'After the character dies, it is ressurected and continues with 650 health.');