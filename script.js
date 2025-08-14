const board = document.getElementById("board");
let selectedPiece = "knight";

document.getElementById("pieceSelect").addEventListener("change", (e) => {
  selectedPiece = e.target.value;
});

// deck
for (let row = 0; row < 8; row++) {
  for (let col = 0; col < 8; col++) {
    const square = document.createElement("div");
    square.classList.add("square");
    if ((row + col) % 2 === 0) {
      square.classList.add("white");
    } else {
      square.classList.add("black");
    }
    square.dataset.row = row;
    square.dataset.col = col;
    board.appendChild(square);
  }
}

// moves for knight
function getKnightMoves(row, col) {
  const moves = [
    [row - 2, col - 1],
    [row - 2, col + 1],
    [row - 1, col - 2],
    [row - 1, col + 2],
    [row + 1, col - 2],
    [row + 1, col + 2],
    [row + 2, col - 1],
    [row + 2, col + 1],
  ];
  return moves.filter(([r, c]) => r >= 0 && r < 8 && c >= 0 && c < 8);
}

// direction
board.addEventListener("click", (e) => {
  if (!e.target.classList.contains("square")) return;

  // highlighter
  document.querySelectorAll(".highlight").forEach(sq => sq.classList.remove("highlight"));

  const row = parseInt(e.target.dataset.row);
  const col = parseInt(e.target.dataset.col);

  if (selectedPiece === "knight") {
    const moves = getKnightMoves(row, col);
    moves.forEach(([r, c]) => {
      const square = document.querySelector(`[data-row='${r}'][data-col='${c}']`);
      square.classList.add("highlight");
    });
  }
});
