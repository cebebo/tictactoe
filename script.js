// JavaScript-Code (script.js)

let currentPlayer = "cross";
let fields = Array(9).fill(null);

function render() {
    const gamefieldDiv = document.getElementById('gamefield');
    gamefieldDiv.innerHTML = '';

    const table = document.createElement('table');

    for (let i = 0; i < 3; i++) {
        const row = table.insertRow();

        for (let j = 0; j < 3; j++) {
            const index = i * 3 + j;
            const cell = row.insertCell();

            cell.textContent = (fields[index] === "circle") ? "O" :
                                (fields[index] === "cross") ? "X" : "";


            cell.onclick = function () {
                cellClicked(cell, index);
            };
        }
    }

    gamefieldDiv.appendChild(table);

    // Überprüfe auf Gewinnkombinationen nach dem Rendern der Tabelle
    const winner = checkWinner();
    
    // Wenn ein Gewinner festgestellt wurde, zeige die Meldung an
    if (winner) {
        alert(`${winner} gewinnt!`);
        // Leere das Spielfeld nach der Meldung
        fields = Array(9).fill(null);
        render();
    }
}

function cellClicked(clickedCell, index) {
    if (fields[index] === null) {
        fields[index] = currentPlayer;
        currentPlayer = (currentPlayer === "cross") ? "circle" : "cross";
        render();
    }
}

function checkWinner() {
    // Array mit den möglichen Gewinnkombinationen
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontale
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertikale
        [0, 4, 8], [2, 4, 6]              // Diagonale
    ];

    // Überprüfe jede Gewinnkombination
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;

        // Überprüfe, ob die Werte in der Kombination gleich sind und nicht null
        if (fields[a] && fields[a] === fields[b] && fields[a] === fields[c]) {
            // Markiere die gewinnende Linie
            markWinningLine(pattern);
            return fields[a]; // Gib den Gewinner zurück
        }
    }

    // Überprüfe auf Unentschieden
    if (!fields.includes(null)) {
        alert("Unentschieden!");
        return "Unentschieden";
    }

    // Wenn kein Gewinner festgestellt wurde, gib null zurück
    return null;
}

function markWinningLine(pattern) {
    for (const index of pattern) {
        const cell = document.querySelector(`#gamefield table tr:nth-child(${Math.floor(index / 3) + 1}) td:nth-child(${index % 3 + 1})`);
        cell.style.color = 'red';
        cell.style.textDecoration = 'line-through';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    render();
});
