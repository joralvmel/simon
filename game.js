let gamePattern =[];
let userClickedPattern =[];
const buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;
let currentStep = 0;
let scoreHistory =[];


//starts game with button click
$(".start").on("click", function() {
  if (gamePattern.length == 0) {
    $("#level-title").html("START!");
    $(".start").addClass("hide");
    $(".container").removeClass("hide");
    setTimeout(function() {
      nextSequence();
    }, 1000);
  }
});

//restarts game with restart button click
$(".restart").on("click", function() {
    resetGame();
    setTimeout(function() {
      nextSequence();
    }, 1000);
});


//user clicks on a button and calls function to check if it is correct or wrong
$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);   
  animatePress(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


//function that checks if the recent user input is wrong or correct
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    let audio = new Audio(`sounds/wrong.mp3`);
    audio.play();
    animateGameOver();
  }
 }

 //fucntion that checks the highest score
 function topScore (){
  scoreHistory.push(level);
  var maxScore = Math.max.apply(null, scoreHistory);
  return(maxScore);
}

 //function for playing the sequence each time the level changes
 function animateGameSequence() {
  if (currentStep < gamePattern.length) {
    const colorToAnimate = gamePattern[currentStep];
    animatePress(colorToAnimate);
    playSound(colorToAnimate);
    currentStep++;
    setTimeout(animateGameSequence, 500);
  } else {
    currentStep = 0;
  }
}

//function for randomly choosing the next color of the sequence and playing the sequence
function nextSequence() {
  userClickedPattern = [];
  level ++;
  $("#level-title").text(`Level  ${level}`);
  let randomNumber = Math.floor((Math.random())*4);
  let randomChosenColour  = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);    
  currentStep = 0;
  animateGameSequence();
  topScore ();
}

//function for playing sounds of each color
function playSound(name) { 
  let audio = new Audio(`sounds/${name}.mp3`);
  audio.play();
}

//function of animating color selection
 function animatePress(currentColour) {
  $(`#${currentColour}`).addClass("pressed");
  setTimeout(function(){
    $(`#${currentColour}`).removeClass("pressed");
  },100);
 }

 //function of animating game over
 function animateGameOver() {
  $(`body`).addClass("game-over");
  $("#level-title").html(`Game over!`);
  $(".container").addClass("hide");
  $(".restart").removeClass("hide");
  $("#score").removeClass("hide");
  if ( level >= topScore() ) {
    $("#score").html(`New High Score!: Level ${topScore()}`);
  } else {
    $("#score").html(`Score: Level ${level}`);
  }
}

//resets the game parameters
function resetGame() {
  $("#level-title").html("START!");
  $('body').removeClass("game-over");
  $(".restart").addClass("hide");
  $(".container").removeClass("hide");
  $(".image").addClass("hide");
  $("#score").addClass("hide");
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  currentStep = 0;
 }



