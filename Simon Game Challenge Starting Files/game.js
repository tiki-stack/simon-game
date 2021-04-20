// alert("Works");

var buttonColors = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//New game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

// Check Answer
function checkAnswer(currentLevel) {

  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success');

    if (userClickedPattern.length === gamePattern.length) {

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function() {
        nextSequence();
      }, 1000);

    }

  } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

// Computer's Turn
function nextSequence() {
  userClickedPattern = [];

  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);

  playSound(randomChosenColor);
}

// User's Turn
$(".btn").click(function() {
  let userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// Start Game
$(document).keypress(function() {
  if (!started) {
    nextSequence();
    $("#level-title").text("Level " + level);
    started = true;
  }
});

// Sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animation
function animatePress(currentColor) {
  $('#' + currentColor).addClass('pressed');
  setTimeout(function() {
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}
