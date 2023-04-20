
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// waiting to catch the first keypress
$(document).keydown(function(event){
    
    if (started===false)
    {
        nextSequence();
        started = true;
        $("#level-title").text("Level "+level);
    }
});



// triggering the buttons when they are clicked
$(".btn").click(function(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(level);
});




// functions of the game

// function which is able to generate the next sequence of the game
function nextSequence()
{

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);


    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    
    playSound(randomChosenColour);

    level++;
    $("#level-title").text("Level "+level);

}

// function which is able to generate the sound of the respective color
function playSound(soundColor)
{
    var soundPath = "sounds/"+soundColor+".mp3";
    var audio = new Audio(soundPath);
    audio.play();
}

// function which can animate the button
function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    
    setTimeout(function(){
        $("#"+currentColour).removeClass('pressed');
}, 100);
}

// function to check the gamePattern and userClickedPattern
function checkAnswer(currentLevel)
{
    var lastIndexNum = currentLevel-1;
    if(currentLevel===userClickedPattern.length)
    {
        var correct =0;
        for(var i=0; i<currentLevel; i++){
            if(gamePattern[i]===userClickedPattern[i]){
                correct++;
            }
        }

        if(correct===currentLevel){
            nextSequence();
        }
    }
}












