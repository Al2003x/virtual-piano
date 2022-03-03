const piano = document.querySelector(".piano");
const pianoKeys = document.querySelectorAll(".piano-key");
const openFullScreen = document.querySelector(".openfullscreen");
const buttons = document.querySelectorAll(".btn");
const btnContainer = document.querySelector(".btn-container");

function playAudio(src) {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
}

piano.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("piano-key")) {
    e.target.classList.add("piano-key-active", "piano-key-active-pseudo");
    e.target.classList.remove("piano-key-remove-mouse");
    let note = e.target.dataset.note;
    let src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }
});

piano.addEventListener("mouseup", (e) => {
  e.target.classList.remove("piano-key-active", "piano-key-active-pseudo");
  e.target.classList.add("piano-key-remove-mouse");
});

// Notes & Letters

btnContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn")) {
    buttons.forEach((el) => {
      el.classList.remove("btn-active");
    });
    e.target.classList.add("btn-active");
  }

  if (e.target.classList.contains("btn-letters")) {
    pianoKeys.forEach((el) => {
      el.classList.add("piano-key-letter");
    });
  } else if (e.target.classList.contains("btn-notes", "btn-active")) {
    pianoKeys.forEach((el) => {
      el.classList.remove("piano-key-letter");
      el.classList.add("piano-key-remove-mouse");
    });
  }
});

window.addEventListener("keydown", (e) => {
  let letter = e.code;
  if (e.repeat === true) {
    return;
  }
  const keyNote = document.querySelector(
    `div[data-letter=${letter[3]}]`
  );
  keyNote.classList.add("piano-key-active");
  const src = `assets/audio/${keyNote.dataset.note}.mp3`;
  playAudio(src);
});

window.addEventListener("keyup", (e) => {
  if (e.code === null) return;
  let letter = e.code[3];
  const keyNote = document.querySelector(
    `div[data-letter=${letter}]`
  );
  keyNote.classList.remove("piano-key-active");
});

const startSound = (e) => {
  e.target.classList.add("piano-key-active", "piano-key-active-pseudo");
  let note = e.target.dataset.note;
  let src = `assets/audio/${note}.mp3`;
  playAudio(src);
};

const stopSound = (e) => {
  e.target.classList.remove("piano-key-active");
};

const startCorrespondOver = (event) => {
  if (event.target.classList.contains("piano-key")) {
    event.target.classList.add("piano-key-active");
  }
  pianoKeys.forEach((elem) => {
    elem.addEventListener("mouseover", startSound);
    elem.addEventListener("mouseout", stopSound);
  });
};

const stopCorrespondOver = () => {
  pianoKeys.forEach((elem) => {
    elem.classList.remove("piano-key-active");
    elem.removeEventListener("mouseover", startSound);
    elem.removeEventListener("mouseout", stopSound);
  });
};

piano.addEventListener("mousedown", startCorrespondOver, false);
piano.addEventListener("mouseup", stopCorrespondOver);

// Fullscreen

function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

openFullScreen.addEventListener("click", () => toggleFullScreen());
