// Array of possible button colors
const buttonColours = ["red", "blue", "green", "yellow"];

// Reference to the level title element
const h1Text = $("#level-title");

// Arrays to store the game pattern and the user clicked pattern
let gamePattern = [];
const userClickedPattern = [];

// Reference to all the buttons
const buttons = $(".btn");

// Game state variables
let gameStart = false;
let level = 0;

// Start the game when the "a" key is pressed
$(document).keydown((event) => {
  if (!gameStart) {
    h1Text.text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

// Handle button clicks

buttons.on("click", (event) => {
  if (!gameStart) {
    return;
  }
  const userChosenColour = $(event.target).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

// Check the user's answer against the game pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence();
        userClickedPattern.length = 0;
      }, 1000);
    }
  } else {
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    h1Text.text("Game Over, Press A to Restart");
    setTimeout(() => {
      startOver();
    }, 1000);
  }
}

// Generate the next sequence in the game
function nextSequence() {
  userClickedPattern.length = 0;

  level++;
  h1Text.text("Level " + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
}

// Play the sound associated with a color
function playSound(name) {
  const audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

// Animate the button press
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// Reset the game state
function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}
