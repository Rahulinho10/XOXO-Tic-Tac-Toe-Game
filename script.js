let gameName = document.getElementById('gameName');
let restartBtn  = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winner-strike');

const O_text = "O";
const X_text = "X";
let livePlayer = X_text;
let boxSpaces = Array(9).fill(null);

const startGame = function() {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
}

function boxClicked(e) {
    const id = e.target.id;

    if(!boxSpaces[id]) {
        boxSpaces[id] = livePlayer;
        e.target.innerText = livePlayer;

        if(playerWin() !==false) {
            gameName.innerText = `${livePlayer} has Won!`;
            let win_blocks = playerWin()

            win_blocks.map(box => boxes[box].style.backgroundColor = winnerIndicator);
            return;
        }

        livePlayer = livePlayer == X_text ? O_text : X_text;
    }
}

const winCombination = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerWin() {
    for (const condition of winCombination) {
        let [a, b, c] = condition;

        if(boxSpaces[a] && (boxSpaces[a] == boxSpaces[b] && boxSpaces[a] == boxSpaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

restartBtn.addEventListener('click', gameRestart);

function gameRestart() {
    boxSpaces.fill(null);
    boxes.forEach(box =>{
        box.innerText = '';
        box.style.backgroundColor = '';
    });

    gameName.innerText = 'XOXO';

    livePlayer = X_text;
}


startGame();
