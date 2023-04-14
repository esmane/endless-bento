// global puzzle settings
var GRID_SIZE_W = 3;    // also, the number of colors
var GRID_SIZE_H = 3;    // also, the number of shapes
var DIFFICULTY = 1;     // 0 for jr, 1 for sr, 2 for master

// global interface settings
var globalSettingAutoSelect = "s"    // c for color, s for shape, n for none
var globalIsDarkBackground = false;

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
    
    document.getElementById("difficulty-sr").checked = true;
	document.getElementById("autosel-number").checked = true;
	document.getElementById("size-w").value = 3;
    document.getElementById("size-h").value = 3;
    
    if(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches)
	{
		document.getElementById("dark-background-option").checked = true;
		isDarkBackground = true;
	}
	else
	{
		document.getElementById("dark-background-option").checked = false;		
	}

    clearPlayerGrid();
    generatePuzzle();
}
