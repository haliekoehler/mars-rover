/**
 * Created by HKoehler on 3/17/17.
 */

'use strict';

(function () {

    // Create body of two rovers
    var rover1Build = $('<div id="rover1" class="rover">' +
        '<div class="number">1</div>' +
        '<div class="wheel wheel1"></div>' +
        '<div class="wheel wheel2"></div>' +
        '<div class="wheel wheel3"></div>' +
        '<div class="wheel wheel4"></div>' +
        '</div>');
    var rover2Build = $('<div id="rover2" class="rover">' +
        '<div class="number">2</div>' +
        '<div class="wheel wheel1"></div>' +
        '<div class="wheel wheel2"></div>' +
        '<div class="wheel wheel3"></div>' +
        '<div class="wheel wheel4"></div>' +
        '</div>');


    var direction = ['n', 'e', 's', 'w'];

    var rover1 = new Object ();
        rover1.name = "Rover 1";
        rover1.body = rover1Build;
        rover1.x = 1;
        rover1.y = 1;
        rover1.d = direction[0];
        rover1.active = false;

    var rover2 = new Object();
        rover2.name = "Rover 2";
        rover2.body = rover2Build;
        rover2.x = 6;
        rover2.y = 1;
        rover2.d = direction[0];
        rover2.active = false;

    var rovers = [rover1, rover2];

    var startButton = $('#start-btn');
    var leftButton = $('#l-btn');
    var middleButton = $('#m-btn');
    var rightButton = $('#r-btn');

    disable(leftButton, middleButton, rightButton);

    // ----- START BUTTON ----- //
    startButton.click(function(){

        console.log(rover1.x , rover1.y);
        console.log(rover2.x, rover2.y);

        startRovers(rover1, rover2);
        console.log('Rovers Placed');

        enable(leftButton, middleButton, rightButton);
        disable(startButton);

        activateRover(rover1);
        console.log(rover1.active);

        middleButton.click(function(){
            moveRover(rover1);
        });

        leftButton.click(function(){
            turnLeft(rover1);
        });

        rightButton.click(function(){
           turnRight(rover1);
        })
    });

    // Disable Button(s)
    function disable() {
        for (var i = 0; i < arguments.length; i++){
        arguments[i].attr("disabled", true)
        }
    }

    // Enable Button(s)
    function enable() {
        for (var i = 0; i < arguments.length; i++){
            arguments[i].attr("disabled", false)
        }
    }

    function startRovers (){
        var startingPoint1 = rover1.x.toString() + "-" + rover1.y.toString();
        var startingPoint2 = rover2.x.toString() + "-" + rover2.y.toString();

        $("#" + startingPoint1).append(rover1.body);   // Rover 1 starting point
        $("#" + startingPoint2).append(rover2.body);   // Rover 2 starting point
    }

    // Make rover active
    function activateRover(rover){
        rover.body.addClass("active-rover");
        rover.active = true;
    }


    // Move Rover Forward 1 Tile
    function moveRover (rover) {

        console.log("From " + rover.x, rover.y, rover.d);

        if (
            (rover.d == "n" && rover.y == 6) ||
            (rover.d == "e" && rover.x == 6) ||
            (rover.d == "s" && rover.y == 1) ||
            (rover.d == "w" && rover.x == 1)
        ) {
            alert("You've reached the edge! You need to turn!")
        } else {

            if (rover.d === "n") {
                rover.y += 1;
            } else if (rover.d === "e") {
                rover.x += 1;
            } else if (rover.d === "s") {
                rover.y -= 1;
            } else if (rover.d === "w") {
                rover.x -= 1;
            }

            console.log("To " + rover.x, rover.y, rover.d);
            var newPosition = rover.x.toString() + "-" + rover.y.toString();

            $("#" + newPosition).append(rover.body);
        }
    }

    // Turn Rover Left
    function turnLeft(rover) {

        if (rover.d === "n"){
            rover.body.css({'transform' : 'rotate(' + 270 + 'deg)'});
            rover.d = "w";
        } else if (rover.d === "e"){
            rover.body.css({'transform' : 'rotate(' + 0 + 'deg)'});
            rover.d = "n";
        } else if (rover.d === "s"){
            rover.body.css({'transform' : 'rotate(' + 90 + 'deg)'});
            rover.d = "e";
        } else if (rover.d === "w"){
            rover.body.css({'transform' : 'rotate(' + 180 + 'deg)'});
            rover.d = "s";
        }

        console.log("New direction: " + rover.d);
        return rover;
    }

    // Turn Rover Right
    function turnRight(rover) {
       if (rover.d === "n"){
            rover.body.css({'transform' : 'rotate(' + 90 + 'deg)'});
            rover.d = "e"
        } else if (rover.d === "e"){
            rover.body.css({'transform' : 'rotate(' + 180 + 'deg)'});
            rover.d = "s";
        } else if (rover.d === "s"){
            rover.body.css({'transform' : 'rotate(' + 270 + 'deg)'});
            rover.d = "w";
        } else if (rover.d === "w"){
            rover.body.css({'transform' : 'rotate(' + 0 + 'deg)'});
            rover.d = "n"
        }

        console.log("New direction: " + rover.d);
        return rover;
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

