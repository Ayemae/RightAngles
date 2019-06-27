$(document).ready(function () {

    // Globals
    let phase = 0;
    let mode = 0;

    let time = 0;
    let clock = undefined;
    let timeByTiles;

    // Functions //

    ///// timer /////
    stopTimer = () => {
        clearInterval(clock);
        clock = undefined;
    }
    countUp = () => {
        time++;
        $("#timer").html(time + " seconds");
    }
    runTimer = () => {
        clock = setInterval(countUp, 1000)
    }
    ////////////////


    startScreen = (modeLength) => {
        let puzzlePosition = "right";
        let answerPosition = "left";

        if (window.innerWidth < 645) {
            puzzlePosition = "bottom";
            answerPosition = "top";
        }


        $("#game-space").empty();

        rateStars = () => {
            const star_img = `<img class="win-star" src="assets/images/star.png">`;
            const nonstar_img = `<img class="win-star" src="assets/images/non-star.png">`;

            if (time < (timeByTiles * 2)) {
                $("#info").html(star_img + star_img + star_img);
            }
            else if (time > (timeByTiles * 3)) {
                $("#info").html(star_img + nonstar_img + nonstar_img);
            }
            else {
                $("#info").html(star_img + star_img + nonstar_img);
            };
        };

        if (phase >= modeLength) {
            rateStars();
            $("#info").append(`<p>That's all of the puzzles!</p>`)
            $("#info").append(`<button id="restart">Play Again</button>`);
            // restart button
            $("#restart").on("click", function () {
                restartGame();
            });
        }
        else {
            if (phase <= 0) {
                $("#info").html(`<p>Make the puzzle on the 
                ${puzzlePosition} match the image on the 
                    ${answerPosition}!</p>`);
                $("#info").append(`<button id="mode3x3">3x3 Mode</button> <br/>
                                   <button id="mode4x4">4x4 Mode</button> <br/>
                                   <button id="mode5x5">5x5 Mode</button> <br/>
                                   <button id="rand5x5">5x5 Random Mode</button>`);
                $("#mode3x3").on("click", function () {
                    mode = 0;
                    startPuzzle(mode);
                });
                $("#mode4x4").on("click", function () {
                    mode = 1;
                    startPuzzle(mode);
                });
                $("#mode5x5").on("click", function () {
                    mode = 2;
                    startPuzzle(mode);
                });
                $("#rand5x5").on("click", function () {
                    mode = 3;
                    startPuzzle(mode);
                });
            }
            else {
                rateStars();
                $("#info").append(`<p>Great job!</p>`);
                $("#info").append(`<button id="continue">Next Puzzle</button>`);
                $("#continue").on("click", function () {
                    startPuzzle(mode);
                });
            }
        }
    }; // end startScreen


    startPuzzle = (mode) => {
        console.log("The phase is: " + phase)
        time = 0;
        isSolved = false;
        $("#info").empty();

        $("#game-space").html(
            `<div class="goal-container">
            <div id="goal-grid"></div>
        </div>
        <div class="puzzle-container">
            <div id="puzzle-grid"></div>   
        </div>`);

        puzzle(mode);
    };


    puzzle = (mode) => {
        const rotation = [0, 90, 180, 270];
        const gameMode = [puzzles3x3, puzzles4x4, puzzles5x5];
        let puzzles = [];
        let randomPuzzle = [];
        let modeLength = 10;
        if (mode < 3) {
            puzzles = gameMode[mode];
            modeLength = puzzles.length;
        }
        else {
            puzzles[phase] = getRandom25();
            modeLength = 20;
        };
        console.log(`Mode length: ${modeLength}`);

        // Set game up
        isSolved = false;
        timeByTiles = puzzles[phase].length;
        runTimer();
        $("#timer").html(time + " seconds");
        //Create solved puzzle image
        for (var i = 0; i < puzzles[phase].length; i++) {
            $("#goal-grid").addClass(`puzzle-${puzzles[phase].length}x`).append(
                $("<div id='static-block' class='block-color puz-" + phase + "-color'></div>").css('transform', 'rotate(' + puzzles[phase][i] + 'deg)')
            )
        }
        //Create randomized puzzle
        for (var i = 0; i < puzzles[phase].length; i++) {
            var r = Math.floor(Math.random() * rotation.length);
            randomPuzzle[i] = rotation[r];
            $("#puzzle-grid").addClass(`puzzle-${puzzles[phase].length}x`).append(
                $("<div id='block' class='block-color puz-" + phase + "-color'></div>").attr("value", i).css('transform', 'rotate(' + randomPuzzle[i] + 'deg)')
            )
        }

        // When you click a tile...
        $(document.body).on("click", "#block", function () {
            var val = $(this).attr("value");
            var r = rotation.indexOf(randomPuzzle[val]);
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
                const blockSeparate = 12;
                const paddingShrink = (20 - blockSeparate);

                stopTimer();
                $(document.body).off("click", "#block");

                // win animation
                $("#puzzle-grid").animate({
                    padding: paddingShrink + "px",
                    gridColumnGap: blockSeparate + "px",
                    gridRowGap: blockSeparate + "px"
                }, 600, "swing")
                    .animate({
                        padding: paddingShrink + "px",
                        gridColumnGap: blockSeparate + "px",
                        gridRowGap: blockSeparate + "px"
                    }, 400, "swing")
                    .animate({
                        padding: "20px",
                        gridColumnGap: "0px",
                        gridRowGap: "0px"
                    }, 30, "swing")
                    .animate({
                        gridColumnGap: "0px",
                        gridRowGap: "0px"
                    }, 1300, () => {
                        $(this).after(startScreen(modeLength));
                    });
                // end win animation
            }
        }); // end on-click
    };

    checkForSolved = (answr, puz) => {
        for (var j = answr.length; j--;) {
            if (answr[j] !== puz[j]) {
                return;
            }
        }
        isSolved = true;
        phase++;
        return isSolved;
    }

    getRandom25 = () => {
        const rotation = [0, 90, 180, 270];
        let rand5x5puzzle = [];
        for (var i = 0; i < 25; i++) {
            var r = Math.floor(Math.random() * rotation.length);
            rand5x5puzzle.push(rotation[r]);
        }
        console.log(rand5x5puzzle)
        return rand5x5puzzle;
    };


    restartGame = () => {
        phase = 0;
        $("#info").empty();
        startScreen();
        return phase;
    }


    // Run game

    startScreen();


}); // end doc.ready