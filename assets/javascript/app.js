$(document).ready(function () {

    // Globals
    var rotation = [0, 90, 180, 270];
    var puzzleGrid = $("#puzzle-grid");
    var goalGrid = $("#goal-grid");
    var mkContBtn = $("<button id='continue'>Continue</button>");
    var gameSpaceFiller = "<div class='goal-container'><div id='goal-grid'></div></div><div class='puzzle-container'><div id='puzzle-grid'></div></div>"
    var info = $("#info");
    var wins;
    var losses;
    var phase = 1;


    // Functions

    function startScreen() {
        info.html("<p>Make the puzzle on the left-hand side match the image on the ride-hand side before time runs out!</p>");
        info.append(mkContBtn);
        // start puzzle when you click continue
        $("#continue").on("click", function () {
            startPuzzle();
        });
    }; // end startScreen


    function startPuzzle() {
        info.empty();
        $("#game-space").html(gameSpaceFiller);
        if (phase === 1) {
            puzzle1();
        }
    };

    function puzzle1() {
        var puzzle1Answer = [270, 0, 90, 180]
        for (var i = 0; i < puzzle1Answer.length; i++) {
            $("#goal-grid").addClass("puzzle-1").append(
                $("<div id='block'></div>").css('transform', 'rotate(' + puzzle1Answer[i] + 'deg)')
            )
        }
        var puzzleRoll = [];
        for (var i = 0; i < puzzle1Answer.length; i++) {
            n = Math.floor(Math.random() * rotation.length);
            puzzleRoll[i] = rotation[n];
            $("#puzzle-grid").addClass("puzzle-1").append(
                $("<div id='block'></div>").css('transform', 'rotate(' + puzzleRoll[i] + 'deg)')
            )
        }
    };


    // Run game

    startScreen();


    //Make space for goal blocks and randomized blocks on html
    // Determine number of blocks per level
    // use css grid to place blocks accordingly
    //determine goal block rotations
    // randomize block rotation
    // // //if the random block rotations are already at goal values, re-shuffle
    // make blocks rotate by 90 degrees on click
    // determine whether or not the blocks in the randomized space have the same rotation values as the blocks in the goal space
    // set timer
    // +1 wins if they finish before the timer, +1 losses if they don't
    // congrats screen if win
    // too bad screen if lost
    // proceed button
    // verdict screens



    //Level 1: 4 blocks


}); // end doc.ready