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


// main init function. runs on startup and is responsible for loading the settings and generating the first puzzle.
window.onload = function()
{
    // setup the default grid and button sizes
    setupGrid();
    setupButtons();

    setColor('0');
    setShape('0');

  
    // now let's attempt to load the previous settings using cookies
    // difficulty
    var c = getCookie("difficulty");
    DIFFICULTY = Number(c);
    switch(DIFFICULTY)
    {
        case 0:
            document.getElementById("difficulty-jr").checked = true;
            break;
        case 1:
            document.getElementById("difficulty-sr").checked = true;
            break;
        case 2:
            document.getElementById("difficulty-mst").checked = true;
            break;
    }
    
    // autoselect
    c = getCookie("autosel");
    switch(c)
    {
        case 'c':
            document.getElementById("autosel-color").checked = true;
            break;
            
        case 'n':
            document.getElementById("autosel-off").checked = true;
            break;
            
        // default to shape
        default:
            document.getElementById("autosel-shape").checked = true;
            break;
    }
	
	// width and height
	c = getCookie("width");
	if(Number(c) >= 2 && Number(c) <= 5)
	{
	    document.getElementById("size-w").value = Number(c);
	}
	else
	{
	    document.getElementById("size-w").value = 3;
	}
	
	c = getCookie("height");
	if(Number(c) >= 2 && Number(c) <= 5)
	{
	    document.getElementById("size-h").value = Number(c);
	}
	else
	{
	    document.getElementById("size-h").value = 3;
	}
    
    // dark mode
    c = getCookie("dark-background");
    if((window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) || c === "true")
	{
		document.getElementById("dark-background-option").checked = true;
		globalIsDarkBackground = true;
	}
	else
	{
		document.getElementById("dark-background-option").checked = false;		
	}
	
	
    // now that we've loaded the settings, let's generate a puzzle
    clearPlayerGrid();
    generatePuzzle();
}