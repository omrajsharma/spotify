console.log("welcome to spotify")

// VARIABLES
let songIndex = 0;
let audioElement = new Audio('assets/songs/01-aadat-atif-aslam.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let wave = document.getElementById('wave');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// SONG LIST
let songs = [
    {songName : "Aadat - Atif Aslma", filePath : "assets/songs/01-aadat-atif-aslam.mp3", coverPath : "assets/songs/01-aadat-atif-aslam.jpg"},
    {songName : "Agar tum sath ho", filePath : "assets/songs/02-agar-tum-sath-ho.mp3", coverPath : "assets/songs/02-agar-tum-sath-ho.jpg"},
    {songName : "Kinna chir - cover", filePath : "assets/songs/03-kinna-chir-cover.mp3", coverPath : "assets/songs/03-kinna-chir-cover.jpg"},
    {songName : "Fir se ud chala", filePath : "assets/songs/04-fir-se-ud-chala.mp3", coverPath : "assets/songs/04-fir-se-ud-chala.jpg"},
    {songName : "Chahne lage hum", filePath : "assets/songs/05-kitna-chahta-hu.mp3", coverPath : "assets/songs/05-kitna-chahta-hu.jpg"},
    {songName : "Kun faya kun", filePath : "assets/songs/06-kun-faya-kun.mp3", coverPath : "assets/songs/06-kun-faya-kun.jpg"},
    {songName : "O sathi", filePath : "assets/songs/07-o-sathi-atif-aslam.mp3", coverPath : "assets/songs/07-o-sathi-atif-aslam.jpg"},
]

console.log(songs[5].duration)

songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
    // element.getElementsByClassName("timestamp")[0].innerText = songs[i].duration;
})

// LISTEN TO EVENT LISTNER

    // Handle Play/Pause events
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterSongName.innerText = songs[songIndex].songName;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle'); 
        wave.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle'); 
        masterPlay.classList.add('fa-play-circle'); 
        wave.style.opacity = 0; 
    }
})

    // Progress Bar Update On music play
audioElement.addEventListener('timeupdate', ()=>{
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

    // Progress Bar Change Event
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = (myProgressBar.value/100)*audioElement.duration;
})

    // Play song from song capsules
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove("fa-pause-circle");
        element.classList.add("fa-play-circle");
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target)
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        wave.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

    // Prev/Next
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= songs.length-1){
        songIndex = 0;
    }
    else {
        songIndex+=1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    wave.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex < 0){
        songIndex = songs.length-1;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    wave.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})