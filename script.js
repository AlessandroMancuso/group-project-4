// SCRIPT

const buttonStart = document.getElementById('startGameButton');
const gameInstructions = document.getElementById('gameInstructions');
const instruction = document.getElementById('instruction');
const rules = ["1. To win you have to avoid all the obstacles: stones and rabbits",
    "2. If you collide with any of the obstacles you will automatically lose and lose your score.",
    "3. To jump press the 'up', 'enter' or 'space' key",
    "4. Good luck and have fun with Jumping game",
];
let startGame = false;
function addInstructions() {
    for (let i=0; i<4; i++) {
        const instruction1 = document.createElement('p');
        instruction1.textContent = rules[i];
        instruction.appendChild(instruction1);
    }
}
function openInstructions() {
    gameInstructions.style.display = 'block';
}

function closeInstructions() {
    gameInstructions.style.display = 'none';
}
function jumpKey(event) {
    // Verifica si el código de la tecla presionada es 'Enter' (código 13)
    switch (event.keyCode) {
        case 13:
        case 32:
        case 38:
        case 87:
            console.log("jumping");
            //jump()
            break;
    }
}

function game() {
}

buttonStart.addEventListener('click', function(e) {
    startGame = !startGame;
    if (startGame) {
        closeInstructions();
        console.log("You clicked on OK")
        // start game
        game();

    }
    startGame = !startGame;
});
addInstructions();
openInstructions();
document.addEventListener('keydown',jumpKey);
