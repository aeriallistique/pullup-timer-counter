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

  let seconds = +00;
  let minutes = +00;
  let hours = +00;
  let numberOfReps=+0;
  let bgColor = ['white', '#92C7CF','#AAD7D9', '#FBF9F1', 
    '#E5E1DA', '#7BD3EA', '#A1EEBD', '#F6F7C4', '#F2AFEF', 
    '#C499F3', '#756AB6', '#AC87C5','#E0AED0','#FFE5E5',
    '#7BD3EA','#A1EEBD','#F6F7C4', '#F6D6D6' ];

    minutesBox.innerText=`00`
    secondsBox.innerText=`00`
    hoursBox.innerText=`00`;
    repsNumberSpan.innerText='0'

    timerBox.innerText= `${hoursBox.innerText}:${minutesBox.innerText}:${secondsBox.innerText}`;

  let intervalID; 


    document.addEventListener('keyup', handleSpaceClick)
    startBtn.addEventListener('click', start)
    stopBtn.addEventListener('click', stop)
    pauseBtn.addEventListener('click', pause)

 
  function dingNoise(){
    ding.play();
  }

  function changeBgEveryHalfMinute(){
    if(seconds === 30 || seconds === 0){
      dingNoise();
      let index = Math.floor(Math.random() * bgColor.length);
      body.style.backgroundColor = bgColor[index] }
  }

  function start(){
    dingNoise()
    intervalID = setInterval(()=>{
      seconds++;
      changeBgEveryHalfMinute()
      minutes <10 ? minutesBox.innerText=`0${minutes}` : minutesBox.innerText=`${minutes}`
      seconds < 10 ? secondsBox.innerText=`0${seconds}`: secondsBox.innerText=`${seconds}`

      if(seconds > 59){ 
        seconds=0; minutes++;
        changeBgEveryHalfMinute()
        secondsBox.innerText = `${seconds}`
      }
      if(minutes > 59){
        minutes=0;
        minutesBox.innerText=`0${minutes}`;
        hours++;
        hoursBox.innerText = `0${hours}`
      }

      timerBox.innerText= `${hoursBox.innerText}:${minutesBox.innerText}:${secondsBox.innerText}`;

    },1000)
    startBtn.disabled=true;
    pauseBtn.disabled=false;

  }

  function stop(){
    startBtn.disabled=false;
    clearInterval(intervalID);
    seconds = +0;
    minutes = +0;
    minutesBox.innerText=`00`
    secondsBox.innerText=`00`
    hoursBox.innerText=`00`;
    timerBox.innerText= `${hoursBox.innerText}:${minutesBox.innerText}:${secondsBox.innerText}`;

  }

  function pause(){
    clearInterval(intervalID)
    startBtn.disabled=false;
    pauseBtn.disabled=true;
  }

  function handleSpaceClick(e){
    if(e.keyCode===32 || which===32){
      numberOfReps++;
      repsNumberSpan.innerText = numberOfReps;
    }
  }

};

initialize();