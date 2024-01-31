function initialize(){

  const timerBox = document.getElementById('timerBox')
  const secondsBox = document.getElementById('secondsBox')
  const minutesBox = document.getElementById('minutesBox')
  const hoursBox = document.getElementById('hoursBox')
  const startBtn = document.getElementById('start')
  const stopBtn = document.getElementById('stop')
  const pauseBtn = document.getElementById('pause')
  const body = document.body;
  const ding = document.querySelector('.ding');
  const repsNumberSpan = document.querySelector('.repsNumberSpan')
  const howManyLeftButton = document.getElementById('howManyLeft');
  const timeLeftDisplay = document.getElementById('timeLeftDisplay');
  const howManyPullupsLeftDisplay = document.getElementById('howManyPullupsLeft');
  const paceNeededDisplay = document.getElementById('paceNeeded');
  


  var t;
  var s;
  var totalSecondsElapsed;
  var startTime;
  var hasStartBtnBeenPushed = false;
  var newStartTimePauseBtnPush;
  const pullups = +10000;
  const keyCodesAndNumbers = [
    {code:49, num:1},
    {code:50, num:2},
    {code:51, num:3},
    {code:52, num:4},
    {code:53, num:5},
    {code:54, num:6},
    {code:55, num:7},
    {code:56, num:8},
    {code:57, num:9},
    {code:48, num:10}
  ]
  
  
  let numberOfReps=+0;
  let pullupsRemaining;
  let bgColor = ['white', '#92C7CF','#AAD7D9', '#FBF9F1', 
    '#E5E1DA', '#7BD3EA', '#A1EEBD', '#F6F7C4', '#F2AFEF', 
    '#C499F3', '#756AB6', '#AC87C5','#E0AED0','#FFE5E5',
    '#7BD3EA','#A1EEBD','#F6F7C4', '#F6D6D6' ];

    minutesBox.innerText=`00`
    secondsBox.innerText=`00`
    hoursBox.innerText=`00`;
    repsNumberSpan.innerText='0'

    timerBox.innerText= `${hoursBox.innerText}:${minutesBox.innerText}:${secondsBox.innerText}`;

  
    document.addEventListener('keyup', countPullups)
    startBtn.addEventListener('click', start)
    stopBtn.addEventListener('click', stop)
    pauseBtn.addEventListener('click', pause)
    howManyLeftButton.addEventListener('click', howMuchTimeLeft)
 
  function dingNoise(){
    ding.play();
  }

  function changeBgEveryHalfMinute(){
      let index = Math.floor(Math.random() * bgColor.length);
      body.style.backgroundColor = bgColor[index] 
  }


  function start(e){
    e.preventDefault();    
    hasStartBtnBeenPushed ? 
      startTime = Number(newStartTimePauseBtnPush)
      :
      startTime = Math.floor(Date.now() / 1000); //Get the starting time (right now) in seconds

    console.log('start', newStartTimePauseBtnPush, startTime)


    newStartTimePauseBtnPush = 0;
    hasStartBtnBeenPushed = false;
    localStorage.setItem("startTime", startTime); // Store it if I want to restart the timer on the next page
    

    function startTimeCounter() {
        console.log('counter', startTime)
        var now = Math.floor(Date.now() / 1000); // get the time now
        var diff = now - startTime; // diff in seconds between now and start
        var h = Math.floor(diff/60/60);
        var m = Math.floor(diff / 60); // get minutes value (quotient of diff)
        s = Math.floor(diff % 60); // get seconds value (remainder of diff)

        h = checkTime(h)
        m = checkTime(m); // add a leading zero if it's single digit
        s = checkTime(s); // add a leading zero if it's single digit
        timerBox.innerText = h + ":" + m + ":" + s; // update the element where the timer will appear
        
        //play ding and change background every half minute
        if(s === '00' || s === 30){
          dingNoise();
          changeBgEveryHalfMinute();
        } 
        totalSecondsElapsed = (h*60*60)+(m*60)+ Number(s);
        
        t = setTimeout(startTimeCounter, 500); // set a timeout to update the timer
    }
      
    function checkTime(i) {
        if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
        return i;
    }

    startTimeCounter();
    startBtn.disabled=true;
    pauseBtn.disabled=false;
  }

  function stop(){
    startBtn.disabled=false;
    clearTimeout(t);
  }

  function pause(){
    newStartTimePauseBtnPush = Math.floor(Date.now() / 1000);
    clearTimeout(t);
    hasStartBtnBeenPushed = true;
    
    startBtn.disabled=false;
    pauseBtn.disabled=true;
    console.log('pause', newStartTimePauseBtnPush)
  }

  function countPullups(e){
   const found = keyCodesAndNumbers.filter((item,index)=>{
      if(e.keyCode===item.code ){return item}
    })
    numberOfReps = numberOfReps + Number(found[0]?.num)
    repsNumberSpan.innerText = numberOfReps;
  
    return numberOfReps;
  }


  function howManyPullupsLeft(){
    pullupsRemaining = pullups - numberOfReps;
    howManyPullupsLeftDisplay.innerText = `Pu left: ${pullupsRemaining}`;
    return pullupsRemaining;
  }
  

  function howMuchTimeLeft(e){
    e.preventDefault();
    let secondsIn24Hours = 86400 - totalSecondsElapsed;
     const minutesRemaining = Math.floor(secondsIn24Hours / 60);
     const secondsRemainder = secondsIn24Hours % 60;
     const hoursRemaining = Math.floor(minutesRemaining / 60);
     const minutesRemainder = minutesRemaining % 60;
     const timeLeft = `Time left: ${hoursRemaining} : ${minutesRemainder}: ${secondsRemainder}`
     timeLeftDisplay.innerHTML = timeLeft;
     howManyPullupsLeft();
     const pace = Math.ceil(pullupsRemaining / minutesRemaining)
     paceNeededDisplay.innerText = `Pace needed: ${pace} / minute`;
  }
  
};

initialize();