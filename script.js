document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    let selectedPiece = "knight";

    if (!board) {
        console.error("Элемент board не найден!");
        return;
    }

    const pieceSelect = document.getElementById("pieceSelect");
    if (pieceSelect) {
        pieceSelect.addEventListener("change", function (e) {
            selectedPiece = e.target.value;
            clearHighlights();
        });
    }

    function createBoard() {
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
    }

    function clearHighlights() {
        document.querySelectorAll(".highlight").forEach(function (sq) {
            sq.classList.remove("highlight");
        });
        document.querySelectorAll(".selected").forEach(function (sq) {
            sq.classList.remove("selected");
        });
    }

    function getSquare(row, col) {
        return document.querySelector("[data-row='" + row + "'][data-col='" + col + "']");
    }

    function isValidPosition(row, col) {
        return row >= 0 && row < 8 && col >= 0 && col < 8;
    }

    function getKnightMoves(row, col) {
        const offsets = [
            [-2, -1], [-2, 1],
            [-1, -2], [-1, 2],
            [1, -2], [1, 2],
            [2, -1], [2, 1]
        ];

        const moves = [];
        for (let i = 0; i < offsets.length; i++) {
            const newRow = row + offsets[i][0];
            const newCol = col + offsets[i][1];
            if (isValidPosition(newRow, newCol)) {
                moves.push([newRow, newCol]);
            }
        }
        return moves;
    }

    function getRookMoves(row, col) {
        const moves = [];

        for (let r = row - 1; r >= 0; r--) {
            moves.push([r, col]);
        }
        for (let r = row + 1; r < 8; r++) {
            moves.push([r, col]);
        }
        for (let c = col - 1; c >= 0; c--) {
            moves.push([row, c]);
        }
        for (let c = col + 1; c < 8; c++) {
            moves.push([row, c]);
        }

        return moves;
    }

    function getMoves(piece, row, col) {
        if (piece === "knight") {
            return getKnightMoves(row, col);
        } else if (piece === "rook") {
            return getRookMoves(row, col);
        }
        return [];
    }

    function highlightMoves(moves) {
        for (let i = 0; i < moves.length; i++) {
            const square = getSquare(moves[i][0], moves[i][1]);
            if (square) {
                square.classList.add("highlight");
            }
        }
    }

    board.addEventListener("click", function (e) {
        if (!e.target.classList.contains("square")) {
            return;
        }

        clearHighlights();

        const row = parseInt(e.target.dataset.row, 10);
        const col = parseInt(e.target.dataset.col, 10);

        if (isNaN(row) || isNaN(col)) {
            return;
        }

        e.target.classList.add("selected");

        const moves = getMoves(selectedPiece, row, col);
        highlightMoves(moves);
    });

    createBoard();
});
