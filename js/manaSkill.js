
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