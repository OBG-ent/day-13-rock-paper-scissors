// Rock Paper Scissors — game logic in vanilla JavaScript.
//
// How it works:
// 1. The player clicks one of the three choice buttons.
// 2. The computer picks randomly.
// 3. We compare the two picks with a simple lookup, update the score,
//    and declare a match winner at 5 points.

// The three possible moves, in order.
const CHOICES = ["rock", "paper", "scissors"];

// Which choice beats which. e.g. rock beats scissors.
const BEATS = {
  rock: "scissors",
  paper: "rock",
  scissors: "paper",
};

// Emoji used to display each move.
const EMOJI = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️",
};

const WINNING_SCORE = 5;

// --- State ---
let playerScore = 0;
let cpuScore = 0;
let round = 1;
let matchOver = false;

// --- DOM references ---
const playerScoreEl = document.getElementById("player-score");
const cpuScoreEl = document.getElementById("cpu-score");
const roundEl = document.getElementById("round-label");
const playerPickEl = document.getElementById("player-pick");
const cpuPickEl = document.getElementById("cpu-pick");
const resultEl = document.getElementById("result");
const verdictEl = document.getElementById("verdict");
const resetBtn = document.getElementById("reset");

// Return "player", "cpu", or "tie" for a pair of moves.
function decideWinner(player, cpu) {
  if (player === cpu) return "tie";
  return BEATS[player] === cpu ? "player" : "cpu";
}

// Play one round with the given player choice.
function playRound(playerChoice) {
  if (matchOver) return;

  // Computer picks uniformly at random.
  const cpuChoice = CHOICES[Math.floor(Math.random() * CHOICES.length)];

  // Show both picks in the arena.
  playerPickEl.textContent = EMOJI[playerChoice];
  cpuPickEl.textContent = EMOJI[cpuChoice];

  const winner = decideWinner(playerChoice, cpuChoice);

  if (winner === "tie") {
    resultEl.textContent = "It's a tie — point replayed!";
  } else if (winner === "player") {
    playerScore++;
    resultEl.textContent = `${capitalize(playerChoice)} beats ${cpuChoice} — you score!`;
  } else {
    cpuScore++;
    resultEl.textContent = `${capitalize(cpuChoice)} beats ${playerChoice} — CPU scores!`;
  }

  round++;
  updateBoard();
  checkMatchEnd();
}

// Refresh the scoreboard.
function updateBoard() {
  playerScoreEl.textContent = playerScore;
  cpuScoreEl.textContent = cpuScore;
  roundEl.textContent = matchOver ? "Match over" : `Round ${round}`;
}

// End the match when someone reaches the winning score.
function checkMatchEnd() {
  if (playerScore >= WINNING_SCORE || cpuScore >= WINNING_SCORE) {
    matchOver = true;
    roundEl.textContent = "Match over";
    verdictEl.textContent =
      playerScore > cpuScore
        ? "🏆 You win the match!"
        : "🤖 CPU wins the match. Run it back!";
  }
}

// Reset everything for a fresh match.
function resetMatch() {
  playerScore = 0;
  cpuScore = 0;
  round = 1;
  matchOver = false;
  playerPickEl.textContent = "❔";
  cpuPickEl.textContent = "❔";
  resultEl.textContent = "Make your move!";
  verdictEl.textContent = "";
  updateBoard();
}

// Small helper: capitalize the first letter of a word.
function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// Wire up the buttons.
document.querySelectorAll(".choice").forEach((button) => {
  button.addEventListener("click", () => playRound(button.dataset.choice));
});
resetBtn.addEventListener("click", resetMatch);
