$(document).ready(function () {

    // Globals
    const rotation = [0, 90, 180, 270];
    const info = $("#info");
    let phase = 0;
    let isSolved = false;
    const mkContBtn = $("<button id='continue'>Continue</button>");
    const mkRestartBtn = $("<button id='restart'>Play Again</button>");
    const gameSpaceFiller = "<div class='goal-container'><div id='goal-grid'></div></div><div class='puzzle-container'><div id='puzzle-grid'></div></div>";
    const star_img = `<img class="win-star" src="assets/images/star.png">`;
    const nonstar_img = `<img class="win-star" src="assets/images/non-star.png">`;

    let time = 0;
    let clock = undefined;
    let timeByTiles;

    //const gameMode = [puzzles3x3, puzzles4x4, puzzles5x5, random5x5];

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


    startScreen = () => {
        $("#game-space").empty();

        rateStars = () => {
            if (time < (timeByTiles * 2)) {
                info.html(star_img + star_img + star_img);
            }
            else if (time > (timeByTiles * 3)) {
                info.html(star_img + nonstar_img + nonstar_img);
            }
            else {
                info.html(star_img + star_img + nonstar_img);
            };
        };

        if (phase === (puzzles.length - 1)) {
            rateStars();
            info.append("<p>That's all of the puzzles!</p>")
            info.append(mkRestartBtn);
            // restart button
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
                rateStars();
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
        if (phase > (puzzles - 1)) {
            getRandom25(puzzles[phase]);
        }
        $("#game-space").html(gameSpaceFiller);
        puzzle(puzzles[phase]);
    };


    puzzle = (answerArr) => {
        const randomPuzzle = [];
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
            if (phase === 2) { console.log("I rotated and r is:" + r) }
            if (r === 3) {
                randomPuzzle[val] = rotation[0];
                $(this).css('transform', 'rotate(' + rotation[0] + 'deg)');
            } else {
                randomPuzzle[val] = rotation[r + 1];
                $(this).css('transform', 'rotate(' + rotation[r + 1] + 'deg)');
            }

            checkForSolved(puzzles[phase], randomPuzzle);
            console.log(randomPuzzle.join(", "));

            if (isSolved === true) {
                console.log("The puzzle was solved!");
                stopTimer();
                // TODO: ANIMATION FOR WIN HERE
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