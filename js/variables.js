let activeCharacter;
let activeEnemy;

let menu = document.querySelector('.menu');
let difficulty = document.querySelector('.difficulty');
difficulty.style.display = 'none';
let arena = document.querySelector('.arena');
arena.style.display = 'none';
let result = document.querySelector('.result');
result.style.display = 'none';
let player = document.querySelector('.player');
let opponent = document.querySelector('.opponent');
let playerInfoSkill1 = document.querySelector('.player-info-skill1');
let playerInfoSkill2 = document.querySelector('.player-info-skill2');
let playerInfoAttack = document.querySelector('.player-info-attack');
let opponentInfoAttack = document.querySelector('.opponent-info-attack');
let frodoStats = document.querySelector('.frodo-stats');
let samStats = document.querySelector('.sam-stats');
let legolasStats = document.querySelector('.legolas-stats');
let aragornStats = document.querySelector('.aragorn-stats');
let gimliStats = document.querySelector('.gimli-stats');
let gandalfStats = document.querySelector('.gandalf-stats');

frodoStats.innerHTML = '<ul><li><b>Attack:</b> ' + frodo.attack + '</li><li><b>Health:</b> ' + frodo.health + '</li><li><b>Agility:</b> ' + frodo.agility + '</li><li> <b>' + frodo.skills.skill1.name + ':</b> ' + frodo.skills.skill1.description + '</li><li> <b>' + frodo.skills.skill2.name + ':</b> ' + frodo.skills.skill2.description + '</li></ul>';
samStats.innerHTML = '<ul><li><b>Attack:</b> ' + sam.attack + '</li><li><b>Health:</b> ' + sam.health + '</li><li><b>Agility:</b> ' + sam.agility + '</li><li> <b>' + sam.skills.skill1.name + ':</b> ' + sam.skills.skill1.description + '</li><li> <b>' + sam.skills.skill2.name + ':</b> ' + sam.skills.skill2.description + '</li></ul>';
legolasStats.innerHTML = '<ul><li><b>Attack:</b> ' + legolas.attack + '</li><li><b>Health:</b> ' + legolas.health + '</li><li><b>Agility:</b> ' + legolas.agility + '</li><li> <b>' + legolas.skills.skill1.name + ':</b> ' + legolas.skills.skill1.description + '</li><li> <b>' + legolas.skills.skill2.name + ':</b> ' + legolas.skills.skill2.description + '</li></ul>';
aragornStats.innerHTML = '<ul><li><b>Attack:</b> ' + aragorn.attack + '</li><li><b>Health:</b> ' + aragorn.health + '</li><li><b>Agility:</b> ' + aragorn.agility + '</li><li> <b>' + aragorn.skills.skill1.name + ':</b> ' + aragorn.skills.skill1.description + '</li><li> <b>' + aragorn.skills.skill2.name + ':</b> ' + aragorn.skills.skill2.description + '</li></ul>';
gimliStats.innerHTML = '<ul><li><b>Attack:</b> ' + gimli.attack + '</li><li><b>Health:</b> ' + gimli.health + '</li><li><b>Agility:</b> ' + gimli.agility + '</li><li> <b>' + gimli.skills.skill1.name + ':</b> ' + gimli.skills.skill1.description + '</li><li> <b>' + gimli.skills.skill2.name + ':</b> ' + gimli.skills.skill2.description + '</li></ul>';
gandalfStats.innerHTML = '<ul><li><b>Attack:</b> ' + gandalf.attack + '</li><li><b>Health:</b> ' + gandalf.health + '</li><li><b>Agility:</b> ' + gandalf.agility + '</li><li> <b>' + gandalf.skills.skill1.name + ':</b> ' + gandalf.skills.skill1.description + '</li><li> <b>' + gandalf.skills.skill2.name + ':</b> ' + gandalf.skills.skill2.description + '</li></ul>';

let chosenDifficulty;
let round = 0;
let basicHealth;
let regenerationCount;