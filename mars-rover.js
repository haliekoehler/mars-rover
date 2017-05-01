/**
 * Created by HKoehler on 3/17/17.
 */

'use strict';

(function () {

    var board = [];

    // -- BUTTONS -- //
    var startButton = $('#start-btn');
    var leftButton = $('#l-btn');
    var middleButton = $('#m-btn');
    var rightButton = $('#r-btn');

    // -- POSSIBLE DIRECTIONS --//
    var direction = ['N', 'E', 'S', 'W'];

    // -- ROVERS -- //
    var rover1 = new Object ();
        rover1.name = "Rover 1";
        rover1.body = $('<div id="rover1" class="rover">' +
            '<div class="number">1</div>' +
            '<div class="wheel wheel1"></div>' +
            '<div class="wheel wheel2"></div>' +
            '<div class="wheel wheel3"></div>' +
            '<div class="wheel wheel4"></div>' +
            '</div>');
        rover1.x = 1;
        rover1.y = 1;
        rover1.d = direction[0];
        rover1.active = false;

    var rover2 = new Object();
        rover2.name = "Rover 2";
        rover2.body = $('<div id="rover2" class="rover">' +
            '<div class="number">2</div>' +
            '<div class="wheel wheel1"></div>' +
            '<div class="wheel wheel2"></div>' +
            '<div class="wheel wheel3"></div>' +
            '<div class="wheel wheel4"></div>' +
            '</div>');
        rover2.x = 6;
        rover2.y = 1;
        rover2.d = direction[0];
        rover2.active = false;

    var roversArray = [rover1, rover2];

    disable(leftButton, middleButton, rightButton);

    // ----- START BUTTON ----- //
    startButton.click(function(){

        startRovers(rover1, rover2);
        console.log('Rovers Placed');

        enable(leftButton, middleButton, rightButton);
        disable(startButton);

        startGame(rover1, rover2);
    });

    // Start Game
    function startGame (rover1, rover2){

        console.log('Game Started...');

        // Switch between Rovers
        function toggleRovers (){
            if (rover1.active == false){
                activateRover(rover1);
                deactivateRover(rover2);
                return rover1;
            } else if (rover1.active == true){
                deactivateRover(rover1);
                activateRover(rover2);
                return rover2;
            }
        }

        var activeRover = toggleRovers();

        middleButton.click(function(){
            moveRover(activeRover);
            updateLocationText();
            toggleRovers();
        });

        leftButton.click(function(){
            turnLeft(activeRover);
            updateLocationText();
        });

        rightButton.click(function(){
            turnRight(activeRover);
            updateLocationText();
        });
    }


    // Place Rovers on Board
    function startRovers (){
        var startingPoint1 = rover1.x.toString() + "-" + rover1.y.toString();
        var startingPoint2 = rover2.x.toString() + "-" + rover2.y.toString();

        $("#" + startingPoint1).append(rover1.body);   // Rover 1 starting point
        $("#" + startingPoint2).append(rover2.body);   // Rover 2 starting point
    }

    // Enable & Disable Button(s)
    function enable() {
        for (var i = 0; i < arguments.length; i++){
            arguments[i].attr("disabled", false)
        }
    }
    function disable() {
        for (var i = 0; i < arguments.length; i++) {
            arguments[i].attr("disabled", true)
        }
    }

    // Activate and Deactivate Rovers
    function activateRover(rover){
        rover.body.addClass("active-rover");
        rover.active = true;
        console.log(rover.name + ' is activated.');
    }
    function deactivateRover (rover) {
        rover.body.removeClass("active-rover");
        rover.active = false;
        console.log(rover.name + ' is DEactivated')
    }


    // Move Rover Forward 1 Tile
    function moveRover (rover) {
        if (
            (rover.d == "N" && rover.y == 6) ||
            (rover.d == "E" && rover.x == 6) ||
            (rover.d == "S" && rover.y == 1) ||
            (rover.d == "W" && rover.x == 1)
        ) {
            alert("You've reached the edge! You need to turn!")
        } else {

            if (rover.d === "N") {
                rover.y += 1;
            } else if (rover.d === "E") {
                rover.x += 1;
            } else if (rover.d === "S") {
                rover.y -= 1;
            } else if (rover.d === "W") {
                rover.x -= 1;
            }

            var newPosition = rover.x.toString() + "-" + rover.y.toString();

            $("#" + newPosition).append(rover.body);
            updateLocationText();
            updateGame();
        }
    }

    // Turn Rover Left
    function turnLeft(rover) {

        if (rover.d === "N"){
            rover.body.css({'transform' : 'rotate(' + 270 + 'deg)'});
            rover.d = "W";
        } else if (rover.d === "E"){
            rover.body.css({'transform' : 'rotate(' + 0 + 'deg)'});
            rover.d = "N";
        } else if (rover.d === "S"){
            rover.body.css({'transform' : 'rotate(' + 90 + 'deg)'});
            rover.d = "E";
        } else if (rover.d === "W"){
            rover.body.css({'transform' : 'rotate(' + 180 + 'deg)'});
            rover.d = "S";
        }

        return rover;
    }

    // Turn Rover Right
    function turnRight(rover) {
       if (rover.d === "N"){
            rover.body.css({'transform' : 'rotate(' + 90 + 'deg)'});
            rover.d = "E"
        } else if (rover.d === "E"){
            rover.body.css({'transform' : 'rotate(' + 180 + 'deg)'});
            rover.d = "S";
        } else if (rover.d === "S"){
            rover.body.css({'transform' : 'rotate(' + 270 + 'deg)'});
            rover.d = "W";
        } else if (rover.d === "W"){
            rover.body.css({'transform' : 'rotate(' + 0 + 'deg)'});
            rover.d = "N"
        }

        return rover;
    }

    // Update Rover's Location & Direction
    function updateLocationText (){
        var r1x = rover1.x;
        var r1y = rover1.y;
        var r1d = rover1.d;
        var r2x = rover2.x;
        var r2y = rover2.y;
        var r2d = rover2.d;

        $("#r1-x").text(r1x);
        $("#r1-y").text(r1y);
        $("#r1-d").text(r1d);
        $("#r2-x").text(r2x);
        $("#r2-y").text(r2y);
        $("#r2-d").text(r2d);
    }

    function updateGame(){
        var updateRover1 = (rover1.x.toString() + ", " + rover1.y.toString());
        var updateRover2 = (rover2.x.toString() + ", " + rover2.y.toString());

        var found1 = $.inArray(updateRover1, board);
        var found2 = $.inArray(updateRover2, board);

        if (found1 >= 0){
            console.log(board);
        } else {
            board.push(updateRover1)
        }

        if (found2 >= 0){
            console.log(board);
        } else {
            board.push(updateRover2)
        }
    }

})();

// TODO -----------------------------------------------------------------------------------------------------

// A pair of robotic rovers are to be landed by NASA on a plateau on Mars.
// This plateau, which is curiously rectangular, must be navigated by the rovers
// so that their on-board cameras can get a complete view of the surrounding terrain
// to send back to Earth.

// A rover's position and direction is represented by a combination of x and y coordinates
// and a letter representing one of the four cardinal compass points. The plateau is
// divided up into a grid to simplify navigation. An example position might be 0, 0, N,
// which means the rover is in the bottom left corner and facing North.

// In order to control a rover, NASA sends a simple string of letters. The possible letters are L, R and M.
// The letters L and R makes the rover spin 90 degrees left or right respectively,
// without moving from its current spot. The letter M means move forward one grid point
// and maintain the same heading.

// Assume that the square directly North from (x, y) is (x, y+1).

// Input Format :
// The first line of input is the upper-right coordinates of the plateau,
// the lower-left coordinates are assumed to be 0, 0.
// The rest of the input is information pertaining to the rovers that have been deployed.

// Each rover has two lines of input. The first line gives the rover's position,
// and the second line is a series of instructions telling the rover how to explore the plateau.
// The position is made up of two integers and a letter separated by spaces,
// corresponding to the x and y co-ordinates and the rover's orientation.

// Each rover will be finished sequentially, which means that the second rover won't start to move
// until the first one has finished moving.

