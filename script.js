// CONSTANTS

// Instructions section
const buttonStart = document.getElementById("startGameButton");
const gameInstructions = document.getElementById("gameInstructions");
const instruction = document.getElementById("instruction");
const rules = [
  "1. To win you have to avoid all the obstacles: stones and rabbits",
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

let backgroundMusic = new Audio('./sounds/music.mp3');
backgroundMusic.loop = true;

const playAudio = () => backgroundMusic.play();

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

    cloudPosition -= 0.1;
    newCloud.style.left = cloudPosition + "vw";
  }, 10);
}

// Function to start generating clouds
function handleEnvironment() {
  playAudio();
  createCloud();
  setTimeout(handleEnvironment, Math.random() * 3000);
}

// OSTACLES AND GAME LOGIC

let obstacleTimer;

const createObstacle = () => {
  if (!gameOver) {
    const obstacle = document.createElement("div");
    obstacle.classList.add("obstacle");
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
        player.classList.contains("jump")
      ) {
        score++;
        console.log(score);
      } else if (
        obstaclePosition > 13 &&
        obstaclePosition < 17 &&
        !player.classList.contains("jump")
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
      // Remove the current run class
      player.classList.remove(`run${i}`);
      // Reset to 'run1'
      i = 1;
    } else {
      // Increment i for the next class
      i++;
    }

    // Add the run class for current index
    player.classList.add(`run${i}`);

    // Remove the run class for previous index
    if (i > 1) {
      player.classList.remove(`run${i - 1}`);
    }
  }, 50);
};

// Player jump

const barkEffect = new Audio("./sounds/dog-bark.wav");

const jump = () => {
  barkEffect.play();
  player.classList.add("jump");
  setTimeout(() => {
    player.classList.remove("jump");
  }, 300);
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
  startObstacles();
};

const handleGameOver = () => {
  console.log(`GAME OVER\nSCORE: ${score}`);
  clearInterval(obstacleTimer);
  clearInterval(playerRunInterval);
  gameOver = true;
};

addInstructions();
openInstructions();

buttonStart.addEventListener("click", function (e) {
  closeInstructions();
  game();
});
