/* 
1.  select random color
2.  game pattern
3.  adding sound and flash to random color button.
4.  adding pressed class to random-color-button
5.  user clicked key puh to userClickedpattern.
6.  adding user-clicked-button sound and flash and .pressed class
7.  checkanswer -   if gp(up.len) == up(up.len)
                        gp.len == up.len
                            nextseq();
                    else 
                        wrong 
                        startover
8.  startover - reset the game
*/

var buttonColors = ["red", "blue", "yellow", "green"] 
var gamePattern = [];
var userPattern = [];
var started = false;
var level = 0;

function nextSequence(){
    userPattern = [];
    var randomnum = Math.floor(Math.random()*4);
    var randomColor = buttonColors[randomnum];
    $("#"+randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    level += 1;
    $("h1").text("Level " + level);
    gamePattern.push(randomColor);
    sound(randomColor);
}

function sound(color){
    var audio = new Audio("./sounds/"+ color +".mp3");
    audio.play();
}

$(".btn").click(function() {
    var buttonClicked = $(this).attr('id');
    userPattern.push(buttonClicked);
    sound(buttonClicked);
    $("."+buttonClicked).toggleClass('pressed');
    setTimeout(function() {
        $("."+buttonClicked).toggleClass('pressed');
    }, 100);
    checkAnswer(userPattern.length - 1)
})

$(document).keypress(function(e){
    if(!started){
        nextSequence();
        started = true;
    }
    
})

function checkAnswer(userLast){
    if (gamePattern[userLast] == userPattern[userLast]){
        console.log("suceess");
        if(gamePattern.length == userPattern.length)
        setTimeout(function() {
            nextSequence();
        }, 1000);
    }
    else{
        console.log("wrong");
        $("h1").text("GAME OVER");
        $("body").toggleClass("game-over");
        setTimeout(function() {
            $("body").toggleClass("game-over");
            $("h1").text("Press any Key to Start");
        }, 1000);
        
        gamePattern = [];
        userPattern = [];
        started = false;
        level = 0;
    }
}