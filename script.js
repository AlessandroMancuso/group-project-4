// SCRIPT
const gameContainer = document.getElementById("gameContainer");
const ambience = document.getElementById("ambience");
const player = document.getElementById("player");

const clouds = [
  { name: "big-cloud", width: 150 },
  { name: "medium-cloud", width: 110 },
  { name: "small-cloud", width: 70 },
];

const getRandomCloud = () => {
  const randomIndex = Math.floor(Math.random() * clouds.length);
  return clouds[randomIndex];
};

// Function to create a new obstacle
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
  createCloud();
  setTimeout(handleEnvironment, Math.random() * 3000);
}

// Obstacles
const createObstacle = () => {
  const obstacle = document.createElement("div");
  obstacle.classList.add("obstacle");
  gameContainer.appendChild(obstacle);

  let obstaclePosition = 50;
  obstacle.style.left = obstaclePosition + "vw";

  let obstacleTimer = setInterval(() => {
    if (obstaclePosition < -50) {
      clearInterval(obstacleTimer);
      obstacle.remove();
    }

    obstaclePosition -= 0.5;
    obstacle.style.left = obstaclePosition + "vw";
  }, 10);
};

const startObstacles = () => {
  createObstacle();
  setTimeout(startObstacles, Math.random() * 4000 + 2000);
};

// Player
const playerRun = () => {
  let i = 0;

  const intervalId = setInterval(() => {

    // Check if it's time to reset
    if (i == 9) {
      // Remove the current class
      player.classList.remove(`run${i}`);
      // Reset to 'run1'
      i = 1;
    } else {
      // Increment i for the next class
      i++;
    }

    // Add the class for current index
    player.classList.add(`run${i}`);

    // Remove the class for previous index
    if (i > 1) {
      player.classList.remove(`run${i - 1}`);
    }

    
  }, 50);
};

const jump = () => {
  player.classList.add("jump");
  setTimeout(() => {
    player.classList.remove("jump");
  }, 300);
};

// Event listener for spacebar to jump
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    jump();
  }
});

// GAME

const game = () => {
  playerRun();
  handleEnvironment();
  // startObstacles();
};

game();
