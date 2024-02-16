// CONSTANTS

// Instructions section
const buttonStart = document.getElementById("startGameButton");
const gameInstructions = document.getElementById("gameInstructions");
const instruction = document.getElementById("instruction");
const buttonPlayAgain = document.getElementById("playAgain");
const buttonDontPlayAgain = document.getElementById("dontPlayAgain");
const finalMessage = document.getElementById("goodbyeMessage");
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
//let playAgain = false;

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

/*function openFinalMessage() {
  if (gameOver)
    finalMessage.style.display = "block";
}

function closeFinalMessage() {
  finalMessage.style.display = "none";
}*/

// AMBIENCE

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
function createCloud() {
  const newCloud = document.createElement("div");
  const cloudDetail = getRandomCloud();
  const cloudStyle = cloudDetail.name;
  const cloudWidth = cloudDetail.width;

  newCloud.classList.add("cloud", cloudStyle);
  ambience.appendChild(newCloud);

  let cloudPosition = 50;
  newCloud.style.left = cloudPosition + "vw";

  let cloudTimer = setInterval(() => {
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

// Function to start generating clouds
function handleEnvironment() {
  createCloud();
  setTimeout(handleEnvironment, Math.random() * 3000);
}


// OSTACLES AND GAME LOGIC
const obstacles = ["rock", "tree", "flower"];

let obstacleTimer;

const getRandomObstacle = () => {
  const randomIndex = Math.floor(Math.random() * obstacles.length);
  return obstacles[randomIndex];
};

const createObstacle = () => {
  if (!gameOver) {
    const obstacle = document.createElement("img");
    const obstacleDetail = getRandomObstacle();
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
        score++;
        scoreDisplay.innerText = score.toString().padStart(3, "0");
        console.log(score);
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

const startObstacles = () => {
  createObstacle();
  setTimeout(startObstacles, Math.random() * 4000 + 2000);
};

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
const jump = () => {
  if (!gameOver) {
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

// GAME

const game = () => {
  playerRun();
  handleEnvironment();
  setTimeout(startObstacles, 4000);
};

const handleGameOver = () => {
  console.log(`GAME OVER\nSCORE: ${score}`);
  clearInterval(obstacleTimer);
  clearInterval(playerRunInterval);
  gameOver = true;
};

buttonStart.addEventListener("click", function (e) {
  closeInstructions();
  game();
});

/*buttonPlayAgain.addEventListener("click", function(e) {
  playAgain = !playAgain;
  closeFinalMessage();
  if (playAgain)
    game();
})*/

/*buttonDontPlayAgain.addEventListener("click", function(e) {
  playAgain = false;
})*/

addInstructions();
openInstructions();
//openFinalMessage();

