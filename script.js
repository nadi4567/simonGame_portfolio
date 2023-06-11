var buttonColors = ["red","blue","green","yellow"];
var gamePattern =[];
var userClickPattern = [];
var level = 0;
var  started = false;

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
// checking answer
$(".btn").click(function(){
  var userChosenColor = $(this).attr("id");
  userClickPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickPattern.length - 1);
});

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
       console.log("success");
       if (userClickPattern.length === gamePattern.length){
         setTimeout(function(){
              nextSequence();
         },1000);
       };
  } else{
    startOver();
   console.log("wrong");
   playSound("wrong");
   $("body").addClass("game-over");
     setTimeout(function(){
       $("body").removeClass("game-over");
     },200);
     $("#level-title").text("Game Over, Press Any Key to Restart");
  };
};
function nextSequence(){
    userClickPattern = [];
    level++;

  //5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
   var randomNumber = Math.floor (Math.random() * 4);
   var randomChosenColor = buttonColors[randomNumber];
   gamePattern.push(randomChosenColor);

   $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColor);

    
};



$(document).keypress(function() {
    if (!started) {
  
      //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });



function playSound(name){
    var audio = new Audio("./sounds/"+ name + ".mp3");
    audio.play()
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100)
}



