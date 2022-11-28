// global settings
const GRID_SIZE_W = 3;
const GRID_SIZE_H = 3;

// game settings
var difficulty = 0;	// 0 for random, 1 for easy, 2 for hard
var autoSelect = 'n';	// n for number, l for letter, x for neither
var isDarkBackground = false;

// variables
var playerGrid;
var solutionGrid;
var clues = [];
var puzzleId = 0;
var debugPuzzleInfo;

var selectedLetter = 'a';
var selectedNumber = '1';
var oldSelectedLetter = 'a';
var oldSelectedNumber = '1';


// this function runs on startup and is responsible for starting the game
window.onload = function()
{
	// reset the grid
	clearPlayerGrid();
	
	setLetter('a');
	setNumber('1');
	
	// settings updates and stuff
	// in the future i will add cookies so settings are saved and they will be loaded here
	document.getElementById("difficulty-rand").checked = true;
	document.getElementById("autosel-number").checked = true;
	
	if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
	{
		document.getElementById("dark-background-option").checked = true;
		isDarkBackground = true;
	}
	else
	{
		document.getElementById("dark-background-option").checked = false;		
	}
	
	// generate a new puzzle
	newPuzzle();
}
