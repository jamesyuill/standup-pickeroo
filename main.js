let isSpinning = false;
let timeDelay = 100;
let increment = 5;
let frames = 0;
let num = 0;
let counter = 0;
let hasSpeakerBeenChosen = false;

const speakers = document.getElementById('speakers');
const removedDiv = document.getElementById('removed-speakers');
const resultDiv = document.getElementById('result-div');
const resultPara = document.getElementById('result-para');
resultPara.innerText = 'Get Spinning!';
const spinBtn = document.getElementById('spin-button');

//Adds Sound - but not reliable
// const player = new Tone.Player('./bip.mp3').toDestination();
// player.volume.value = -6;

const names = [
  'James',
  'Isobel',
  'Sarah',
  'Joe',
  'Keith',
  'Naeem',
  'Anna',
  'Laura',
];

const removed = [];

function renderSpeakers(list, div) {
  div.replaceChildren();
  if (list.length === 0) {
    div.style.backgroundColor = '#43aa8b';
  } else if (div.id === 'removed-speakers') {
    div.style.backgroundColor = 'grey';
  } else {
    div.style.backgroundColor = 'white';
  }

  if (names.length === 0 && div.id === 'speakers') {
    spinBtn.setAttribute('disabled', 'true');
    const speakerDiv = document.createElement('div');

    const label = document.createElement('p');
    label.innerText = 'No Names Left';
    speakerDiv.appendChild(label);
    div.appendChild(speakerDiv);
  }

  if (names.length === 1) {
    spinBtn.setAttribute('disabled', 'true');
  } else if (names.length > 1) {
    spinBtn.removeAttribute('disabled');
  }

  for (const name of list) {
    const speakerDiv = document.createElement('div');
    speakerDiv.setAttribute('class', 'speaker');
    speakerDiv.setAttribute('id', `${name}`);
    const label = document.createElement('p');
    label.innerText = name;
    speakerDiv.appendChild(label);
    div.appendChild(speakerDiv);

    speakerDiv.addEventListener('click', handleClick);
  }
}

function handleClick(e) {
  let name = this.id;
  if (this.parentNode.id === 'speakers') {
    let index = names.indexOf(name);
    let removedName = names.splice(index, 1);
    removed.push(removedName[0]);
    renderSpeakers(names, speakers);
    renderSpeakers(removed, removedDiv);
  } else if (this.parentNode.id === 'removed-speakers') {
    let index = removed.indexOf(name);
    let removedName = removed.splice(index, 1);
    names.push(removedName[0]);
    renderSpeakers(names, speakers);
    renderSpeakers(removed, removedDiv);
  }
}

renderSpeakers(names, speakers);
renderSpeakers(removed, removedDiv);

spinBtn.addEventListener('click', spinHandler);

function spinHandler() {
  // Tone.start(); //Starts the audio Context
  counter = 0;
  isSpinning = true;
  hasSpeakerBeenChosen = false;
  spinBtn.setAttribute('disabled', 'true');
}

const randomNum = (list) => {
  return Math.floor(Math.random() * list.length);
};

function loop() {
  if (isSpinning) {
    frames += 1;
    if (frames === 600) {
      frames = 0;
      increment = 5;
      hasSpeakerBeenChosen = true;
      isSpinning = false;
      spinBtn.removeAttribute('disabled');
    } else if (frames > 500) {
      increment = 40;
    } else if (frames > 400) {
      increment = 30;
    } else if (frames > 300) {
      increment = 20;
    } else if (frames > 200) {
      increment = 10;
    }

    if (frames % increment === 0) {
      if (counter === 0) {
        num = randomNum(names);
      }
      // player.start(); //triggers the audio clip
      let currentSpeaker = document.getElementById(names[num]);
      currentSpeaker.classList.add('selected');
      resultPara.innerText = names[num];
      counter++;

      if (!hasSpeakerBeenChosen) {
        setTimeout(() => {
          let previousSpeaker = currentSpeaker;
          previousSpeaker.classList.remove('selected');
        }, 100);
      }

      if (num === names.length - 1) {
        num = 0;
      } else {
        num += 1;
      }
    }
  }

  requestAnimationFrame(loop);
}
loop();
