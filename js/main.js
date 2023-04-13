// global puzzle settings
var GRID_SIZE_W = 3;    // also, the number of colors
var GRID_SIZE_H = 3;    // also, the number of shapes
var DIFFICULTY = 1;     // 0 for jr, 1 for sr, 2 for master

// global interface settings
var globalSettingAutoSelect = "s"    // c for color, s for shape, n for none

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
    setupGrid();
    setupButtons();

    setColor('0');
    setShape('0');

    clearPlayerGrid();
    // generatePuzzle();
    
    // just for testing the solver, let's do these functions automatically
    puzzle1();
    initSolver();
}



// we should load a premade puzzle in order to test our solver

function puzzle1()
{
	globalSolutionGrid = [
		["0-2", "1-1", "0-0"],
		["1-0", "0-1", "2-0"],
		["1-2", "2-2", "2-1"]];
		
	// reset cluess
	globalClues.length = 0;
	
	globalClues[0] = [
		["0-x", "x-x", "x-0"],
		["1-0", "x-x", "2-0"],
		["1-2", "2-x", "x-x"]];
		
	globalClues[1] = [
		["1-x"],
		["x-x"],
		["x-2"]];
		
	globalClues[2] = [
		["x-2", "x-x"],
		["x-x", "0-x"]];
		
	globalClues[3] = [
		["x-2", "x-x", "2-x"]];
}