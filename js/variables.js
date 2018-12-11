
document.addEventListener('DOMContentLoaded', gameManager.init());
window.addEventListener('load', playAudio);


const soundtrack = [

    new Audio('../audio/01.Mp3'),
    new Audio('../audio/02.Mp3'),
    new Audio('../audio/03.Mp3'),
    new Audio('../audio/04.Mp3'),
    new Audio('../audio/05.Mp3'),
    new Audio('../audio/06.Mp3'),
    new Audio('../audio/07.Mp3'),
    new Audio('../audio/08.Mp3'),
    new Audio('../audio/09.Mp3'),
    new Audio('../audio/10.Mp3'),
    new Audio('../audio/11.Mp3'),
    new Audio('../audio/12.Mp3'),
    new Audio('../audio/13.Mp3'),
    new Audio('../audio/14.Mp3'),
    new Audio('../audio/15.Mp3'),
    new Audio('../audio/16.Mp3'),
    new Audio('../audio/17.Mp3'),
    new Audio('../audio/18.Mp3'),  
     
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