const musicContainer = document.querySelector('.music-container')

const musicCover = document.querySelector(".img-area img")
const musicDp = document.querySelector(".img-dp img")

const musicName = document.querySelector(".song-details .name")
const musicArtist = document.querySelector(".song-details .artist")

const prevBtn = document.querySelector('.prev-song')
const playBtn = document.querySelector('.play-pause')
const nextBtn = document.querySelector('.next-song')

const progressArea = document.querySelector(".progress-area")
const progressBar = document.querySelector(".progress-bar")

const audio = document.querySelector('#audio')

const musicCurrentTime = document.querySelector(".current-time")
const musicDuration = document.querySelector(".max-duration")

const musicList = document.querySelector(".song-name")

// Defining individual cover, display picture and audio files as parcel can't dynamically change the sources. I also needed to relocate the image and audio files where my javascript file was located, hence it strangely being in the components file.
// This was a real problem for me to work around because of the way parcel handles image sources. I discussed with my tutor, we found declaring individual images a work around for my purposes of StudBud. If this was a real project I would utilise URLs or an API to gather my images.

const covers = [
    new URL('covers/gorillaz-cover.jpg', import.meta.url),
    new URL('covers/c418-cover.jpg', import.meta.url),
    new URL('covers/coldplay-cover.jpg', import.meta.url),
    new URL('covers/shelly-cover.jpg', import.meta.url),
];

const dps = [
    new URL('dps/gorillaz-dp.png', import.meta.url),
    new URL('dps/c418-dp.png', import.meta.url),
    new URL('dps/coldplay-dp.png', import.meta.url),
    new URL('dps/shelly-dp.png', import.meta.url),
];

const songs = [
    new URL('songs/gorillaz.mp3', import.meta.url),
    new URL('songs/c418.mp3', import.meta.url),
    new URL('songs/coldplay.mp3', import.meta.url),
    new URL('songs/shelly.mp3', import.meta.url),
];

// Music list array
let allMusic = [
    {
        name: "Feel Good Inc.",
        artist: "Gorillaz",
    },
    {
        name: "Mice on Venus",
        artist: "C418",
    },
    {
        name: "Sparks",
        artist: "Coldplay",
    },
    {
        name: "Steeeam",
        artist: "Shelly",
    },
  ];

let musicIndex = 1;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playMusic();
});

function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    document.getElementById("cover").src=covers[[indexNumb - 1]];
    document.getElementById("dp").src=dps[[indexNumb - 1]];
    document.getElementById("audio").src=songs[[indexNumb - 1]];
}

function playMusic() {
    musicContainer.classList.add('play');
    playBtn.querySelector("i").innerText = "pause";

    audio.play();
}

function pauseMusic() {
    musicContainer.classList.remove("play");
    playBtn.querySelector("i").innerText = "play_arrow";

    audio.pause();
}

function prevMusic() {
    musicIndex--;

    if(musicIndex < 1) {
        musicIndex = allMusic.length;
    }

    loadMusic(musicIndex);
    playMusic();
}

function nextMusic() {
    musicIndex++;

    if(musicIndex > allMusic.length) {
        musicIndex = 1;
    }

    loadMusic(musicIndex);
    playMusic();
}

function updateProgress(event) {
    const {duration, currentTime} = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
}

function setProgress(event) {

    // find total width of progress bar
    const width = this.clientWidth;

    // find x value of where user clicks on progress bar
    const clickX = event.offsetX;
    
    // find duration of song
    const duration = audio.duration;

    // change the time of the song depending where they click on the progress bar
    audio.currentTime = (clickX / width) * duration;
}

function songDuration(event) {
    let duration = audio.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10) {
        totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
}

function songCurrentTime(event) {
    const currentTime = event.srcElement.currentTime;
    let currentMin = Math.floor(currentTime / 60);
    let currentSec = Math.floor(currentTime % 60);
    if(currentSec < 10) {
        currentSec = `0${currentSec}`;
    }
    musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    console.log(event.srcElement.currentTime)
}

function clicked(element){
    let getLiIndex = element.getAttribute("li-index");
    musicIndex = getLiIndex; //updating current song index with clicked li index
    loadMusic(musicIndex);
    playMusic();
    playingSong();
}


playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseMusic()
    } else {
        playMusic()
    }
})

// Event listener for skip and previous buttons
prevBtn.addEventListener('click', prevMusic)
nextBtn.addEventListener('click', nextMusic)

// Event listener for updating progress bar
audio.addEventListener('timeupdate', updateProgress)

// Event listener for setting progress through the progress bar
progressArea.addEventListener('click', setProgress)

// Event listener for auto going to next song after song finishes
audio.addEventListener('ended', nextMusic)

// Event listener for updating song duration 
audio.addEventListener('timeupdate', songDuration)

// Event listener for updating how much of the song has elapsed
audio.addEventListener('timeupdate', songCurrentTime)