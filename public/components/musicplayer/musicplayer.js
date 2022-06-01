// Code used and referenced from https://www.youtube.com/watch?v=gXkqy0b4M5g&ab_channel=DevEd

// returning HTML elements
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

// Here I am defining the individual covers, display pictures and audio files as parcel can't dynamically change the sources of files once it's begun packaging everything. I also needed to relocate the images and audio files where my javascript file is located, hence it being in the components file.
// This was a real problem for me to work around because of the way parcel handles image sources. After discussing with one of my tutors, we found declaring individual images a work around for my purposes of StudBud. If this was a real project, I understand utilising URLs or an API to gather my images a better work around.

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

  // The number in which song plays first. Would usually be 0, but I've setup the index to start at 1 for simplicity's sake.
let musicIndex = 1;

window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playMusic();
    playingSong();
});

function loadMusic(indexNumb){
    // -1 from the index because it starts at 1 rather than 0.
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    document.getElementById("cover").src=covers[[indexNumb - 1]];
    document.getElementById("dp").src=dps[[indexNumb - 1]];
    document.getElementById("audio").src=songs[[indexNumb - 1]];
    
}

// Functions for playing, pausing and skipping music. Essentially adds or removes a class in order to control the outcome of the music. See below for the event listener.
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

// Using an index in order to allow the user to skip through songs in a logical manner (if you were to skip the final song, it would return to the first song)
function prevMusic() {
    musicIndex--;

    if(musicIndex < 1) {
        musicIndex = allMusic.length;
    }

    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

function nextMusic() {
    musicIndex++;

    if(musicIndex > allMusic.length) {
        musicIndex = 1;
    }

    loadMusic(musicIndex);
    playMusic();
    playingSong();
}

// updating the song's progress based on the user
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

// updating the duration's HTML element.
function songDuration(event) {
    let duration = audio.duration;
    let totalMin = Math.floor(duration / 60);
    let totalSec = Math.floor(duration % 60);
    if(totalSec < 10) {
        totalSec = `0${totalSec}`;
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
}

// find the progress of the song by utilising an event element.
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

// Event listener for playing and pausing the music. See above for the functions that add and remove the 'playing' class
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
        pauseMusic()
    } else {
        playMusic()
        playingSong()
    }
})


// Dynamically loading in the music list into the HTML.
let ulTag = document.querySelector(".music-list ul");

for (let i = 0; i < allMusic.length; i++) {
    let liTag = `<li li-index="${i + 1}">
                <div class="row">
                  <span>${allMusic[i].name}</span>
                  <p>${allMusic[i].artist}</p>
                </div>
              </li>`;

    ulTag.insertAdjacentHTML("beforeend", liTag); //inserting the li inside ul tag
}

// check what song is playing by using a for loop through the music list. Alternatively could've used a forEach function.
function playingSong(){
    const allLiTag = ulTag.querySelectorAll("li");
    
    for (let j = 0; j < allLiTag.length; j++) {
      
    // give playing song a 'playing' class, which is later used to style the playing song within the list.
      if(allLiTag[j].classList.contains("playing")){
        allLiTag[j].classList.remove("playing");
      }
  
      //if the li tag index is equal to the musicIndex then add playing class in it
      if(allLiTag[j].getAttribute("li-index") == musicIndex){
        allLiTag[j].classList.add("playing");
      }
    }
  }

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