// CONSTANTS

// Instructions section
const buttonStart = document.getElementById("startGameButton");
const gameInstructions = document.getElementById("gameInstructions");
const instruction = document.getElementById("instruction");
// const buttonPlayAgain = document.getElementById("playAgain");
// const buttonDontPlayAgain = document.getElementById("dontPlayAgain");
const message = document.getElementById("message");
const finalScore = document.getElementById("final-score");
// const finalMessage = document.getElementById("goodbyeMessage");
const rules = [
  "1. To win you have to avoid all the obstacles: stones, trees and rabbits",
  "2. If you collide with any of the obstacles you will automatically lose and lose your score.",
  "3. To jump press the 'up', 'enter' or 'space' key",
  "4. Good luck and have fun with Jumping game",
];

// Game section
const gameContainer = document.getElementById("gameContainer");
const ambience = document.getElementById("ambience");
const player = document.getElementById("player");

//SCORE
let score = 0;
let scoreDisplay = document.getElementById("score");
let gameOver = false;

// INSTRUCTIONS MANAGEMENT
function addInstructions() {
  for (let i = 0; i < 4; i++) {
    const instruction1 = document.createElement("p");
    instruction1.textContent = rules[i];
    instruction.appendChild(instruction1);
  }
}

function openInstructions() {
  gameInstructions.style.display = "block";
}

function closeInstructions() {
  gameInstructions.style.display = "none";
}

// AMBIENCE
let backgroundMusic = new Audio("./sounds/music.mp3");
backgroundMusic.loop = true;

const playAudio = () => backgroundMusic.play();
const stopAudio = () => backgroundMusic.pause();

const clouds = [
  { name: "big-cloud", width: 150 },
  { name: "medium-cloud", width: 110 },
  { name: "small-cloud", width: 70 },
];

const getRandomCloud = () => {
  const randomIndex = Math.floor(Math.random() * clouds.length);
  return clouds[randomIndex];
};

// Function to create and move a new cloud

let cloudTimer;

function createCloud() {
  if(!gameOver){
    const newCloud = document.createElement("div");
    const cloudDetail = getRandomCloud();
    const cloudStyle = cloudDetail.name;
    const cloudWidth = cloudDetail.width;

    newCloud.classList.add("cloud", cloudStyle);
    ambience.appendChild(newCloud);

    let cloudPosition = 50;
    newCloud.style.left = cloudPosition + "vw";

    cloudTimer = setInterval(() => {
      if (cloudPosition < -cloudWidth) {
        clearInterval(cloudTimer);
        newCloud.remove();
      }

      if (!gameOver) {
        cloudPosition -= 0.1;
        newCloud.style.left = cloudPosition + "vw";
      }
    }, 10);
  }
}

// Function to start generating clouds
let cloudTimeOut;

function handleEnvironment() {
  if (!gameOver) {
    createCloud();
    cloudTimeOut = setTimeout(handleEnvironment, Math.random() * 3000);
  }
}

const clearClouds = () => {
  const cloudElements = document.querySelectorAll('.cloud');

  cloudElements.forEach(function(cloudElement) {
    cloudElement.remove();
  });
}

// SCORE

const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    let context = this;
    let args = arguments;
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (callNow) func.apply(context, args);
  };
};

const increaseScore = () => {
  score++;
  scoreDisplay.innerText = score.toString().padStart(3, "0");
  console.log(score);
};

const scorePlus = debounce(increaseScore, 1000, true);

const resetScore = () => {
  score = 0;
  scoreDisplay.innerText = score.toString().padStart(3, "0");
}

// OBSTACLES AND GAME LOGIC
const obstacles = ["rock", "tree", "flower"];

let obstacleTimer;

const getRandomObstacle = () => {
  const randomIndex = Math.floor(Math.random() * obstacles.length);
  console.log(randomIndex);
  console.log(obstacles[randomIndex])
  return obstacles[randomIndex];
};

let obstacle = document.createElement("img");
const createObstacle = () => {
  if (!gameOver) {
    // obstacle = document.createElement("img");
    let obstacleDetail = getRandomObstacle();
    console.log(obstacleDetail);
    obstacle.classList.add("obstacle", obstacleDetail);
    gameContainer.appendChild(obstacle);

    let obstaclePosition = 50;
    obstacle.style.left = obstaclePosition + "vw";

    obstacleTimer = setInterval(() => {
      if (obstaclePosition < -50) {
        clearInterval(obstacleTimer);
        obstacle.remove();
      }

      if (
        obstaclePosition > 13 &&
        obstaclePosition < 17 &&
        player.classList.contains("jump-up")
      ) {
        scorePlus();
      } else if (
        obstaclePosition > 13 &&
        obstaclePosition < 17 &&
        !player.classList.contains("jump-up")
      ) {
        handleGameOver();
      }

      obstaclePosition -= 0.5;
      obstacle.style.left = obstaclePosition + "vw";
    }, 10);
  }
};

let obstacleTimeout;

const startObstacles = () => {
  if (!gameOver) {
    createObstacle();
    obstacleTimeout = setTimeout(startObstacles, Math.random() * 4000 + 2000);
  }
};

const clearObstacles = () => {
  const obstacleElements = document.querySelectorAll('.obstacle');

  obstacleElements.forEach(function(obstacleElement) {
    obstacleElement.remove();
  });
}

// PLAYER
let playerRunInterval;

const playerRun = () => {
  let i = 0;

  playerRunInterval = setInterval(() => {
    if (i == 9) {
      player.classList.remove(`run${i}`);
      i = 1;
    } else {
      i++;
    }
    player.classList.add(`run${i}`);
    if (i > 1) {
      player.classList.remove(`run${i - 1}`);
    }
  }, 50);
};

// Player jump

const barkEffect = new Audio("./sounds/dog-bark.wav");

const jump = () => {
  if (!gameOver) {
    barkEffect.play();
    player.classList.add("jump-up");
    setTimeout(() => {
      player.classList.remove("jump-up");
      player.classList.add("jump-down");
      setTimeout(() => {
        player.classList.remove("jump-down");
      }, 300);
    }, 300);
  }
};

const jumpKey = (event) => {
  switch (event.keyCode) {
    case 13:
    case 32:
    case 38:
    case 87:
      jump();
      break;
  }
};

document.addEventListener("keydown", jumpKey);

// Game Over display && restart function
const gameOverContainer = document.querySelector(".game-over-container");
const restartBtn = document.getElementById("restart_btn");
const quitBtn = document.getElementById("quit_btn");
const quitGame = document.getElementById("quit_game");

const clearGame = () => {
  resetScore();
  clearObstacles();
  clearClouds();
  hiddenGameOver();
  gameOver = false;
}

const gameRestart = () => {
  clearGame();
  game();
};

const gameQuit = () => {
  clearGame();
  openInstructions();
};

const showGamePause = () => {
  stopGame();
  gameOverContainer.classList.remove("hidden");
  message.innerText = "GAME PAUSE";
  quitBtn.addEventListener("click", gameQuit);
  restartBtn.addEventListener("click", gameRestart);
}

const showGameOver = () => {
  gameOverContainer.classList.remove("hidden");
  message.innerText = "GAME OVER";
  finalScore.classList.remove("hidden");
  finalScore.innerText = `Final Score: ${score}`;
  quitBtn.addEventListener("click", gameQuit);
  restartBtn.addEventListener("click", gameRestart);
};

const hiddenGameOver = () => {
  gameOverContainer.classList.add("hidden");
}

document.addEventListener('keydown', function(event) {
  if (event.key === "Escape" || event.key === "Esc") {
    showGamePause();
  }
});

quitGame.addEventListener("click", showGamePause);

// GAME
const stopGame = () => {

  stopAudio();
  // Clear timers
  clearInterval(cloudTimer);
  clearInterval(obstacleTimer);
  clearInterval(playerRunInterval);

  // Clear existing timeouts
  clearTimeout(obstacleTimeout);
  clearTimeout(cloudTimeOut);
}

const game = () => {
  playAudio();
  playerRun();
  handleEnvironment();
  setTimeout(startObstacles, 4000);
};

const handleGameOver = () => {
  stopGame();

  gameOver = true;
  showGameOver();
};

buttonStart.addEventListener("click", function (e) {
  closeInstructions();
  game();
});

addInstructions();
openInstructions();