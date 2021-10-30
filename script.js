let time;
let highestTime = document.cookie.match('(^|;) ?highest=([^;]*)(;|$)') != null ? document.cookie.match('(^|;) ?highest=([^;]*)(;|$)')[2] : 0
let startTime;
let endTime;
let currentlyWaiting = false;
let currentlyPlaying = false;
let notCheating = true;
let wait;
let randomTime;
let button = document.getElementById("start");
let text = document.getElementById("text");

if(location.protocol != 'https:') {
    location.href = 'https:' + window.location.href.substring(window.location.protocol.length);
}

button.onclick = function(){
  currentlyPlaying = true;
  document.body.style.backgroundColor = "#fa5c79";
  button.style.display = "none";
  text.innerHTML = "Please wait until the screen turns green.";
  currentlyWaiting = true;
  wait = setTimeout(function(){
    document.body.style.backgroundColor = "#55faaa";
    startTime = new Date().getTime();
    text.innerHTML = "Click!";
    currentlyWaiting = false;
  }, (Math.random() * 5 + 2) * 1000);
};



document.onclick = function(){
  if(currentlyPlaying && notCheating){
    if(currentlyWaiting){
      clearTimeout(wait);
      wait = setTimeout(function(){
        document.body.style.backgroundColor = "#55faaa";
        startTime = new Date().getTime();
        text.innerHTML = "Click!";
        currentlyWaiting = false;
      }, (Math.random() * 5 + 2) * 1000);
    } else{
      endTime = new Date().getTime();
      currentlyPlaying = false;
      time = endTime - startTime;
      document.body.style.backgroundColor = "#3c84f0";
      highestTime = highestTime === 0 ? time : Math.min(highestTime, time);
      document.cookie = "highest=" + highestTime;
      text.innerHTML = `Your time: ${time} milliseconds<br><br>Your Highest Time: ${highestTime} milliseconds`;
      button.style.display = "inline";
      button.innerHTML = "Continue";
      button.style.width = "110px";
    }
  }
};


document.onmousedown = function(){
  if(currentlyPlaying && currentlyWaiting){
    clearTimeout(wait);
    notCheating = false;
  }
};

document.onmouseup = function(){
  if(currentlyPlaying && currentlyWaiting){
    notCheating = true;
    wait = setTimeout(function(){
      document.body.style.backgroundColor = "#55faaa";
      startTime = new Date().getTime();
      text.innerHTML = "Click!";
      currentlyWaiting = false;
    }, (Math.random() * 5 + 2) * 1000);
  }
};