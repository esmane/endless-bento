// global puzzle settings
var GRID_SIZE_W = 3;
var GRID_SIZE_H = 3;

// global interface settings
var autoSelect = "c"    // c for color, s for shape, n for none

// these are for the buttons
var globalSelectedColor = '0';
var globalSelectedShape = '0';
var globalOldSelectedColor = '0';
var globalOldSelectedShape = '0';

// the grid
var globalPlayerGrid;
var globalSolutionGrid;
var globalClues = [];


window.onload = function()
{
    createEmptyGrid();
    createButtons();

    setColor('0');
    setShape('0');

    clearPlayerGrid();
}
