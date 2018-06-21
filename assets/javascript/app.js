$(document).ready(function () {

    // Globals
    var rotation = [0, 90, 180, 270];
    var mkContBtn = $("<button id='continue'>Continue</button>");
    var gameSpaceFiller = "<div class='goal-container'><div id='goal-grid'></div></div><div class='puzzle-container'><div id='puzzle-grid'></div></div>"
    var info = $("#info");
    var wins = 0
    var losses = 0;
    var phase = 0;
    var isSolved = false;

    var timer = 15;

    //puzzles
    var puzzle1 = [270, 0, 90, 180];
    var puzzle2 = [0, 270, 0, 180, 90, 180, 0, 270, 0];
    var puzzle3 = [270, 180, 0, 90, 90, 90, 180, 270, 270];
    var puzzle4 = [0, 270, 0, 270, 90, 180, 90, 180, 270, 270, 0, 0, 180, 180, 90, 90];
    var puzzle5 = [0, 180, 90, 180, 180, 0, 180, 270, 270, 90, 0, 180, 180, 0, 270, 0];
    var puzzleRoll = [];


    // Functions

    function startScreen() {
        $("#game-space").empty();
        if (phase === 0) {
            info.html("<p>Make the puzzle on the left-hand side match " +
                "the image on the ride-hand side before time runs out!</p>");
        }
        else if (phase === 6) {
            //Win state
        }
        else {
            if (isSolved === false) {
                losses++;
                info.html("<p>Too bad. " +
                    "Continue anyway?</p>");
            }
            else {
                wins++;
                info.html("<p>Great job! " +
                    "Move on to the next puzzle?</p>");
            }
        }
        info.append(mkContBtn);
        // start puzzle when you click continue
        $("#continue").on("click", function () {
            startPuzzle();
        });

        phase++;
        isSolved = false;
    }; // end startScreen


    function startPuzzle() {
        info.empty();
        puzzleRoll = [];
        $("#game-space").html(gameSpaceFiller);
        if (phase === 1) {
            puzzle(puzzle1, puzzleRoll, phase);
        }
        else if (phase === 2) {
            puzzle(puzzle2, puzzleRoll, phase);
        }
        else if (phase === 3) {
            puzzle(puzzle3, puzzleRoll, phase);
        }
        else if (phase === 4) {
            puzzle(puzzle4, puzzleRoll, phase);
        }
        else if (phase === 5) {
            puzzle(puzzle5, puzzleRoll, phase);
        }
    };


    function puzzle(answerArr, puzArr, p) {
        for (var i = 0; i < answerArr.length; i++) {
            $("#goal-grid").addClass("puzzle-" + p).append(
                $("<div class='block'></div>").css('transform', 'rotate(' + answerArr[i] + 'deg)')
            )
        }
        for (var i = 0; i < answerArr.length; i++) {
            var r = Math.floor(Math.random() * rotation.length);
            puzArr[i] = rotation[r];
            $("#puzzle-grid").addClass("puzzle-" + p).append(
                $("<div id='block'></div>").attr("value", i).css('transform', 'rotate(' + puzArr[i] + 'deg)')
            )
        }
        if (isSolved === false) {
            console.log(isSolved)
            $(document.body).on("click", "#block", function () {
                var val = $(this).attr("value");
                var r = rotation.indexOf(puzArr[val]);
                if (r === 3) {
                    $(this).css('transform', 'rotate(' + rotation[0] + 'deg)');
                    puzArr[val] = rotation[0];
                } else {
                    $(this).css('transform', 'rotate(' + rotation[r + 1] + 'deg)');
                    puzArr[val] = rotation[r + 1];
                }
                checkForSolved(answerArr, puzArr);
            });
        } // end if solved
    };

    function checkForSolved(answr, puz) {
        for (var i = answr.length; i--;) {
            if (answr[i] !== puz[i])
                return false;
        }
        isSolved = true;
        setTimeout(startScreen, 1500);
        return true;
    }


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