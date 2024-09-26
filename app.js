let boxes = document.querySelectorAll(".box");
let Reset = document.querySelector("#Reset");
let xWinsDisplay = document.querySelector("#xWins");
let oWinsDisplay = document.querySelector("#oWins");

let turnO = true; // Player X, player O
let gameBoard = Array(9).fill(null); // Store the game state
let xWins = 0; // Count for Player X
let oWins = 0; // Count for Player O

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [2, 4, 6],
    [1, 4, 7],
    [2, 5, 8]
];

// Function to check the winner
function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            alert(`${gameBoard[a]} Wins!`);
            if (gameBoard[a] === "X") {
                xWins++;
                xWinsDisplay.innerText = xWins; // Update X wins count in the table
            } else {
                oWins++;
                oWinsDisplay.innerText = oWins; // Update O wins count in the table
            }
            disableAllBoxes(); // Disable the game after a win
            return;
        }
    }

    // Check for a tie (all boxes filled)
    if (!gameBoard.includes(null)) {
        alert("It's a tie!");
    }
}

// Function to disable all boxes after a game ends
function disableAllBoxes() {
    boxes.forEach(box => {
        box.disabled = true;
    });
}

// Add event listener to each box
boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            gameBoard[index] = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            gameBoard[index] = "X";
            turnO = true;
        }
        box.disabled = true; // Disable box after clicking
        checkWinner(); // Check if there's a winner
    });
});

// Reset button functionality
Reset.addEventListener("click", () => {
    gameBoard.fill(null); // Reset gameBoard array
    boxes.forEach(box => {
        box.innerText = ""; // Clear all box texts
        box.disabled = false; // Re-enable all boxes
    });
    turnO = true; // Reset the turn to 'O'
});
