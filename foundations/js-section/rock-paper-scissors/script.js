function computerPlay() {
  const computerChoice = random(2);
  switch (computerChoice) {
    case 0:
      return "rock";
      break;
    case 1:
      return "paper";
      break;
    case 2:
      return "scissors";
      break;
  }
}

function playRound(playerSelection, computerSelection) {
  playerSelection = capitalize(playerSelection);
  computerSelection = capitalize(computerSelection);

  if (
    (playerSelection === "Rock" && computerSelection === "Scissors") ||
    (playerSelection === "Paper" && computerSelection === "Rock") ||
    (playerSelection === "Scissors" && computerSelection === "Paper")
  ) {
    display(`You won the round! ${playerSelection} beats ${computerSelection}`);
    return "Player";
  } else if (
    (computerSelection === "Rock" && playerSelection === "Scissors") ||
    (computerSelection === "Paper" && playerSelection === "Rock") ||
    (computerSelection === "Scissors" && playerSelection === "Paper")
  ) {
    display(
      `You lost the round! ${computerSelection} beats ${playerSelection}`
    );
    return "Computer";
  } else if (playerSelection === computerSelection) {
    display(`This round is a Tie!`);
    return "Tie";
  } else return `ERROR`;
}

// DOM selectors
const buttons = document.querySelector(".buttons");
const results = document.querySelector("#results");
const playerChoice = document.querySelector("#player-choice");
const computerChoice = document.querySelector("#computer-choice");
const playerTotal = document.querySelector("#player-total");
const computerTotal = document.querySelector("#computer-total");
const finalResults = document.querySelector("#final-results");
const game = document.querySelector("#game");
const winGif = document.querySelector("#win-gif");
const loseGif = document.querySelector("#lose-gif");
const resetContainer = document.querySelector(".reset-container");
const playAgain = document.querySelector("#play-again");
playAgain.addEventListener("click", () => location.reload());

// Event listener to start play
buttons.addEventListener("click", function (e) {
  if (e.target.nodeName === "BUTTON") {
    let playerSelection = e.target.id;
    let computerSelection = computerPlay();
    let roundWinner = playRound(playerSelection, computerSelection);
    displayChoices(playerSelection, computerSelection, roundWinner);
    keepScore(roundWinner);
  }
});
const keepScore = outer();
function outer() {
  let playerScore = 0;
  let computerScore = 0;
  // This inner function has private access to the scores and eliminates global variables
  const inner = (roundWinner) => {
    switch (roundWinner) {
      case "Player":
        playerScore++;
        playerTotal.textContent = playerScore;
        break;
      case "Computer":
        computerScore++;
        computerTotal.textContent = computerScore;
        break;
    }
    if (playerScore === 5 || computerScore === 5) {
      endGame();
      if (playerScore > computerScore) {
        finalResults.textContent = `You won the game! ${playerScore} to ${computerScore}`;
        winGif.classList.remove("hidden");
      } else if (computerScore > playerScore) {
        finalResults.textContent = `You lost the game!  ${computerScore} to ${playerScore}`;
        loseGif.classList.remove("hidden");
      }
    }
  };
  // By returning the function we can have access to the parent scope even after the parent function has returned and closed
  return inner;
}
// Helper functions
function random(number) {
  return Math.floor(Math.random() * (number + 1));
}
function capitalize(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
function display(string) {
  results.textContent = string;
}
function displayChoices(playerSelection, computerSelection, roundWinner) {
  playerChoice.textContent = playerSelection;
  computerChoice.textContent = computerSelection;
  switch (roundWinner) {
    case "Player":
      playerChoice.style.color = "green";
      computerChoice.style.color = "red";
      break;
    case "Computer":
      computerChoice.style.color = "green";
      playerChoice.style.color = "red";
      break;
    default:
      playerChoice.style.color = "#000000";
      computerChoice.style.color = "#000000";
      break;
  }
}
function endGame() {
  resetContainer.classList.remove("hidden");
  game.classList.add("hidden");
}
