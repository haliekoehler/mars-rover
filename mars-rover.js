/**
 * Created by HKoehler on 3/17/17.
 */

(function () {

    'use strict';

    var rover1, rover2, direction, groundCovered;

    // Create two rovers
    rover1 = $('<div id="rover1" class="rover">' +
        '<div class="middle"></div>' +
        '<div class="wheel wheel1"></div>' +
        '<div class="wheel wheel2"></div>' +
        '<div class="wheel wheel3"></div>' +
        '<div class="wheel wheel4"></div>' +
        '</div>');
    rover2 = $('<div id="rover2" class="rover">' +
        '<div class="wheel wheel1"></div>' +
        '<div class="wheel wheel2"></div>' +
        '<div class="wheel wheel3"></div>' +
        '<div class="wheel wheel4"></div>' +
        '</div>');

    direction = ['n', 'e', 's', 'w'];
    groundCovered = [];


    // Append both rovers to grid
    $('#1-1').append(rover1);
    $('#6-1').append(rover2);


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
