let menu = document.querySelector('.menu');
let difficulty = document.querySelector('.difficulty');
difficulty.style.display = 'none';
let arena = document.querySelector('.arena');
arena.style.display = 'none';
let result = document.querySelector('.result');
result.style.display = 'none';
let audioIcon = document.getElementById('audio-icon');
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


document.addEventListener('DOMContentLoaded', playAudio);


const soundtrack = [

    new Audio('./audio/01.mp3'),
    new Audio('./audio/02.mp3'),
    new Audio('./audio/03.mp3'),
    new Audio('./audio/04.mp3'),
    new Audio('./audio/05.mp3'),
    new Audio('./audio/06.mp3'),
    new Audio('./audio/07.mp3'),
    new Audio('./audio/08.mp3'),
    new Audio('./audio/09.mp3'),
    new Audio('./audio/10.mp3'),
    new Audio('./audio/11.mp3'),
    new Audio('./audio/12.mp3'),
    new Audio('./audio/13.mp3'),
    new Audio('./audio/14.mp3'),
    new Audio('./audio/15.mp3'),
    new Audio('./audio/16.mp3'),
    new Audio('./audio/17.mp3'),
    new Audio('./audio/18.mp3'),  
     
]
let activeAudio;

function playAudio() {
    activeAudio = soundtrack[gameManager.getRandomNumber(0, soundtrack.length)]
    activeAudio.play();
}

let audioStatus;

function stopAudio() {
    if (audioStatus === undefined) {
        activeAudio.pause();
        audioStatus = 'playing';
        audioIcon.src = 'muteAudioIcon.svg';

    } else {
        activeAudio.play();
        audioStatus = undefined;
        audioIcon.src = "audioIcon.svg"
    }
}