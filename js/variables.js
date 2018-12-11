
const soundtrack = [

    new Audio('audio/01.mp3'),
    new Audio('audio/02.mp3'),
    new Audio('audio/03.mp3'),
    new Audio('audio/04.mp3'),
    new Audio('audio/05.mp3'),
    new Audio('audio/06.mp3'),
    new Audio('audio/07.mp3'),
    new Audio('audio/08.mp3'),
    new Audio('audio/09.mp3'),
    new Audio('audio/10.mp3'),
    new Audio('audio/11.mp3'),
    new Audio('audio/12.mp3'),
    new Audio('audio/13.mp3'),
    new Audio('audio/14.mp3'),
    new Audio('audio/15.mp3'),
    new Audio('audio/16.mp3'),
    new Audio('audio/17.mp3'),
    new Audio('audio/18.mp3'),  
     
]
let activeAudio = soundtrack[gameManager.getRandomNumber(0, soundtrack.length - 1)]
let audioStatus;

function playAudio() {

    let audioIcon = document.getElementById('audio-icon');

    if (audioStatus === undefined) {
        activeAudio.pause();
        audioStatus = 'playing';
        audioIcon.src = 'img/muteAudioIcon.svg';

    } else {
        activeAudio.play();
        audioStatus = undefined;
        audioIcon.src = "img/audioIcon.svg"
    }
}

document.addEventListener('DOMContentLoaded', gameManager.init());
window.addEventListener('load', playAudio);