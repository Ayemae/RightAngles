$(document).ready(function () {

    // Globals
    var rotation = [0, 90, 180, 270];
    var info = $("#info");
    var phase = 0;
    var isSolved = false;
    var mkContBtn = $("<button id='continue'>Continue</button>");
    var mkRestartBtn = $("<button id='restart'>Play Again</button>");
    var gameSpaceFiller = "<div class='goal-container'><div id='goal-grid'></div></div><div class='puzzle-container'><div id='puzzle-grid'></div></div>"

    var time = 0;
    var clock = undefined;
    var timeByTiles;

    //puzzles
    const definedPuzzles = 7;
    const puzzle1 = [270, 0, 90, 180];
    const puzzle2 = [90, 270, 0, 270, 90, 180, 180, 0, 270];
    const puzzle3 = [0, 270, 0, 180, 90, 180, 0, 270, 0];
    const puzzle4 = [270, 270, 0, 90, 180, 90, 0, 270, 90];
    const puzzle5 = [0, 270, 0, 270, 90, 180, 90, 180, 270, 90, 180, 0, 180, 0, 270, 90];
    const puzzle6 = [0, 180, 90, 180, 180, 0, 180, 270, 270, 90, 0, 180, 180, 0, 270, 0];
    const puzzle7 = [180, 90, 180, 90, 180, 270, 0, 270, 0, 270, 90, 180, 90, 180, 90, 0, 270, 0, 270, 0, 180, 90, 180, 90, 180];
    var puzzle8 = [];
    var puzzle9 = [];
    var puzzle10 = [];
    var allPuzzles = [puzzle1, puzzle2, puzzle3, puzzle4, puzzle5, puzzle6, puzzle7, puzzle8, puzzle9, puzzle10];

    // Functions

    function stopTimer() {
        clearInterval(clock);
        clock = undefined;
    }

    function countUp() {
        time++;
        $("#timer").html(time + " seconds");
    }

    function runTimer() {
        clock = setInterval(countUp, 1000)
    }


    function startScreen() {
        $("#game-space").empty();
        if (phase === (allPuzzles.length - 1)) {
            console.log("Time?: " + timeByTiles * 2);
            if (time < (timeByTiles * 2)) {
                info.html("***");
            }
            else if (time > (timeByTiles * 3)) {
                info.html("*");
            }
            else {
                info.html("**");
            }
            info.append("<p>That's all of the puzzles!</p>")
            info.append(mkRestartBtn);
            // start puzzle when you click continue
            $("#restart").on("click", function () {
                restartGame();
            });
        }
        else {
            if (phase === 0) {
                info.html(`<p>Make the puzzle match
                    the image on the left!</p>`);
            }
            else {
                console.log("Time?: " + timeByTiles * 2);
                if (time < (timeByTiles * 2)) {
                    info.html("***");
                }
                else if (time > (timeByTiles * 3)) {
                    info.html("*");
                }
                else {
                    info.html("**");
                }
                info.append("<p>Great job! " +
                    "Move on to the next puzzle?</p>");
            }
            info.append(mkContBtn);
            // start puzzle when you click continue
            $("#continue").on("click", function () {
                startPuzzle();
            });
        }
    }; // end startScreen


    function startPuzzle() {
        console.log("The phase is: " + phase)
        time = 0;
        isSolved = false;
        info.empty();
        // puzzleRoll = [];
        if (phase > (definedPuzzles - 1)) {
            getRandom25(allPuzzles[phase]);
        }
        $("#game-space").html(gameSpaceFiller);
        puzzle(allPuzzles[phase]);
    };


    puzzle = (answerArr) => {
        const randomPuzzle = [];
        console.log("puzzle start");
        // Set game up
        isSolved = false;
        timeByTiles = answerArr.length;
        runTimer();
        $("#timer").html(time + " seconds");
        //Create solved puzzle image
        for (var i = 0; i < answerArr.length; i++) {
            $("#goal-grid").addClass(`puzzle-${answerArr.length}x`).append(
                $("<div id='static-block' class='block-color puz-" + phase + "-color'></div>").css('transform', 'rotate(' + answerArr[i] + 'deg)')
            )
        }
        //Create randomized puzzle
        for (var i = 0; i < answerArr.length; i++) {
            var r = Math.floor(Math.random() * rotation.length);
            randomPuzzle[i] = rotation[r];
            $("#puzzle-grid").addClass(`puzzle-${answerArr.length}x`).append(
                $("<div id='block' class='block-color puz-" + phase + "-color'></div>").attr("value", i).css('transform', 'rotate(' + randomPuzzle[i] + 'deg)')
            )
        }
        //No self-solving puzzles!
        checkForSolved(answerArr, randomPuzzle); {
            if (isSolved === true) {
                randomPuzzle[0] = randomPuzzle[1] = randomPuzzle[2] = randomPuzzle[3] = 0;
                isSolved = false;
            }
        }

        // When you click a tile...
        $(document.body).on("click", "#block", function () {
            var val = $(this).attr("value");
            var r = rotation.indexOf(randomPuzzle[val]);
            if (phase === 2) {console.log("I rotated and r is:" + r)}
            if (r === 3) {
                randomPuzzle[val] = rotation[0];
                $(this).css('transform', 'rotate(' + rotation[0] + 'deg)');
            } else {
                randomPuzzle[val] = rotation[r + 1];
                $(this).css('transform', 'rotate(' + rotation[r + 1] + 'deg)');
            }

            checkForSolved(allPuzzles[phase], randomPuzzle);

            if (isSolved === true) {
                console.log("The puzzle was solved!");
                stopTimer();
                // ANIMATION FOR WIN HERE
                startScreen();
            }
        }); // end on-click
    };

    function checkForSolved(answr, puz) {
        for (var j = answr.length; j--;) {
            if (answr[j] !== puz[j]) {
                return;
            }
        }
        isSolved = true;
        phase++;
        return isSolved;
    }

    function getRandom25(sevenUp) {
        for (var i = 0; i < 25; i++) {
            var r = Math.floor(Math.random() * rotation.length);
            sevenUp[i] = rotation[r];
        }
        return sevenUp;
    };


    function restartGame() {
        isSolved = false;
        phase = 0;
        // puzzleRoll = [];
        info.empty();
        startScreen();
        return phase;
    }


    // Run game

    startScreen();


}); // end doc.ready