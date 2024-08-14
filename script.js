console.log("Welcome to Spotify");
let songIndex=0;
let audioElement =new Audio('songs/1.mp3');
let masterplay=document.getElementById('masterplay');
let gif=document.getElementById('gif');
let masterSong= document.getElementById('masterSong');
//id of the play button
let myProgressBar=document.getElementById('myProgressBar');
let songItems=Array.from(document.getElementsByClassName('songItem'));
let songs=[
 
        {songName:"Dil To Bachcha Hai - Ishqiya", filepath:"songs/1.mp3", coverPath:"covers/dil2.jpeg"},
        {songName:"Tum Tak", filepath:"songs/2.mp3", coverPath:"covers/tum.jpg"},
        {songName:"Let-Her-Go-x-Husn", filepath:"songs/3.mp3", coverPath:"covers/let.jpeg"},
        {songName:"Chaudhary-Mame-Khan", filepath:"songs/4.mp3", coverPath:"covers/Chaudhary.jpg"},
        {songName:"Bolo Ta Ra Ra", filepath:"songs/5.mp3", coverPath:"covers/download.jpeg"},
        {songName:"Shubh Aangan", filepath:"songs/6.mp3", coverPath:"covers/subh.jpeg"},
  
    

]

songItems.forEach((element,i)=>{
console.log(element,i);

    element.getElementsByTagName("img")[0].src =songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML =songs[i].songName;
    
})


//audioElement.play();

//handle play/pause
masterplay.addEventListener('click',()=>{
    if (audioElement.paused || audioElement.currentTime<=0) {
        audioElement.play();
        //convert play to pause
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterplay.classList.add('fa-circle-play');
        masterplay.classList.remove('fa-circle-pause');
        gif.style.opacity=0;
        makeAllPlays();

    }
    
})

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
  
   //seekbar Update
    pogress=parseInt((audioElement.currentTime/audioElement.duration)*100)
    //updation of seekbar with time
    myProgressBar.value=pogress;

})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
})
const makeAllPlays =() =>{
   
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.add('fa-circle-play');
        element.classList.remove('fa-circle-pause');
    })

}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
       
        makeAllPlays();
        index=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`songs/${songIndex+1 }.mp3`;
        masterSong.innerHTML=songs[songIndex].songName;
        audioElement.currentTime =0;
        audioElement.play();
        gif.style.opacity = 1;

        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    audioElement.src = songs[songIndex].filepath;
    masterSong.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');

    // Update the song play/pause button
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0) {
        songIndex = songs.length - 1;
    } else {
        songIndex -= 1;
    }

    audioElement.src = songs[songIndex].filepath;
    masterSong.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');

    // Update the song play/pause button
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
})

// Play the next song when the current song ends
audioElement.addEventListener('ended', () => {
    if(songIndex >= songs.length - 1) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }

    audioElement.src = songs[songIndex].filepath;
    masterSong.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');

    // Update the song play/pause button
    makeAllPlays();
    document.getElementById(songIndex).classList.remove('fa-circle-play');
    document.getElementById(songIndex).classList.add('fa-circle-pause');
});
