function initialize() {
  //  helper funtions to grab DOM elements
  const $ = (item) => { return document.getElementById(item); };
  const $$ = (item) => { return document.querySelector(item); };

  // grab DOM elements
  const timerBox = $('timerBox');
  const secondsBox = $('secondsBox');
  const minutesBox = $('minutesBox');
  const hoursBox = $('hoursBox');
  const startBtn = $('start');
  const stopBtn = $('stop');
  const pauseBtn = $('pause');
  const body = document.body;
  const ding = $$('.ding');
  const repsNumberSpan = $$('.repsNumberSpan');
  const howManyLeftButton = $('howManyLeft');
  const timeLeftDisplay = $('timeLeftDisplay');
  const howManyPullupsLeftDisplay = $('howManyPullupsLeft');
  const paceNeededDisplay = $('paceNeeded');
  const numberButtonsDiv = $$('.number_buttons');
  const nubmerButtons = document.querySelectorAll('.number_button');

  const pullups = +10000;
  const keyCodesAndNumbers = [
    { code: 49, num: 1 },
    { code: 50, num: 2 },
    { code: 51, num: 3 },
    { code: 52, num: 4 },
    { code: 53, num: 5 },
    { code: 54, num: 6 },
    { code: 55, num: 7 },
    { code: 56, num: 8 },
    { code: 57, num: 9 },
    { code: 48, num: 10 },
    { code: 77, num: 0 }
  ];

  let intervalID;
  let seconds = +00;
  let minutes = +00;
  let hours = +00;
  let numberOfReps = +0;
  let secondsIn24Hours = +86400;
  let pullupsRemaining;
  let bgColor = ['white', '#92C7CF', '#AAD7D9', '#FBF9F1',
    '#E5E1DA', '#7BD3EA', '#A1EEBD', '#F6F7C4', '#F2AFEF',
    '#C499F3', '#756AB6', '#AC87C5', '#E0AED0', '#FFE5E5',
    '#7BD3EA', '#A1EEBD', '#F6F7C4', '#F6D6D6'];

  minutesBox.innerText = `00`;
  secondsBox.innerText = `00`;
  hoursBox.innerText = `00`;
  repsNumberSpan.innerText = '0';

  timerBox.innerText = `${hoursBox.innerText}:${minutesBox.innerText}:${secondsBox.innerText}`;

  document.addEventListener('keyup', countPullups);
  startBtn.addEventListener('click', start);
  stopBtn.addEventListener('click', stop);
  pauseBtn.addEventListener('click', pause);
  howManyLeftButton.addEventListener('click', howMuchTimeLeft);

  function isHandheldDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }

  if (isHandheldDevice() === true) {
    numberButtonsDiv.style.display = 'flex';
  }

  const countPullupsFromNumberButtons = (e) => {
    e.preventDefault();
    const currentPullups = Number(repsNumberSpan.innerText);

    repsNumberSpan.innerText = currentPullups + Number(e.target.value);
  };


  nubmerButtons.forEach(number => {
    number.addEventListener('click', countPullupsFromNumberButtons);
  });


  function dingNoise() {
    ding.play();
  }

  function changeBgEveryHalfMinute() {
    if (seconds === 30 || seconds === 0) {
      dingNoise();

      // background change did not look good for the camera so taken it out.
      // let index = Math.floor(Math.random() * bgColor.length);
      // body.style.backgroundColor = bgColor[index] 
    }
  }

  function start(e) {
    e.preventDefault();
    dingNoise();
    intervalID = setInterval(() => {
      secondsIn24Hours--;
      seconds++;
      changeBgEveryHalfMinute();
      minutes < 10 ? minutesBox.innerText = `0${minutes}` : minutesBox.innerText = `${minutes}`;
      seconds < 10 ? secondsBox.innerText = `0${seconds}` : secondsBox.innerText = `${seconds}`;

      if (seconds > 59) {
        minutes++;
        seconds = 0;
        changeBgEveryHalfMinute();
        secondsBox.innerText = `0${seconds}`;
      }
      if (minutes > 59) {
        minutes = 0;
        minutesBox.innerText = `0${minutes}`;
        hours++;
        hoursBox.innerText = `0${hours}`;
      }

      timerBox.innerText = `${hoursBox.innerText}:${minutesBox.innerText}:${secondsBox.innerText}`;


    }, 1000);
    startBtn.disabled = true;
    pauseBtn.disabled = false;

  }

  function stop() {
    startBtn.disabled = false;
    clearInterval(intervalID);
    seconds = +0;
    minutes = +0;
    minutesBox.innerText = `00`;
    secondsBox.innerText = `00`;
    hoursBox.innerText = `00`;
    timerBox.innerText = `${hoursBox.innerText}:${minutesBox.innerText}:${secondsBox.innerText}`;

  }

  function pause() {
    clearInterval(intervalID);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  function countPullups(e) {
    //press M to subtract 1 invalid pullup rep
    if (e.keyCode === 77) {
      numberOfReps--;
    }

    const found = keyCodesAndNumbers.filter((item, index) => {
      if (e.keyCode === item.code) { return item; }
    });
    numberOfReps = numberOfReps + Number(found[0].num);
    repsNumberSpan.innerText = numberOfReps;

    return numberOfReps;
  }


  function howManyPullupsLeft() {
    pullupsRemaining = pullups - numberOfReps;
    howManyPullupsLeftDisplay.innerText = `Pull-ups left: ${pullupsRemaining}`;
    return pullupsRemaining;
  }


  function howMuchTimeLeft(e) {
    e.preventDefault();
    const minutesRemaining = Math.floor(secondsIn24Hours / 60);
    const secondsRemainder = secondsIn24Hours % 60;
    const hoursRemaining = Math.floor(minutesRemaining / 60);
    const minutesRemainder = minutesRemaining % 60;
    const timeLeft = `Time left: ${hoursRemaining} : ${minutesRemainder}: ${secondsRemainder}`;
    timeLeftDisplay.innerHTML = timeLeft;
    howManyPullupsLeft();
    const pace = Math.ceil(pullupsRemaining / minutesRemaining);
    paceNeededDisplay.innerText = `Pace needed: ${pace} / minute`;
  }

};

initialize();