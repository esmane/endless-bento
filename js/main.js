// global puzzle settings
var GRID_SIZE_W = 3;    // also, the number of colors
var GRID_SIZE_H = 3;    // also, the number of shapes
var DIFFICULTY = 1;     // 0 for jr, 1 for sr, 2 for master

// global interface settings
var globalSettingAutoSelect = "n";    // c for color, s for shape, n for none
var globalIsDarkBackground = false;
var globalIsAutosavePuzzle = false;
var globalIsAutosaveSettings = false;
// if the puzzle has been solved, and a new puzzle has not been generated yet, we do not want to save the puzzle!
var globalDoNotSave = false;

// these are for the buttons
var globalSelectedColor = '0';
var globalSelectedShape = '0';
var globalSelectedDelete = false;

// the grid
var globalPlayerGrid;
var globalSolutionGrid;
var globalClues = [];
var globalScaleFactor = 1;


// main init function. runs on startup and is responsible for loading the settings and generating the first puzzle.
window.onload = function()
{
    globalScaleFactor = determineScale();
    // setup the default grid and button sizes
    setupGridHTML(false, globalScaleFactor);
    setupButtonsHTML(globalScaleFactor);


    // now let's attempt to load the previous settings using cookies
    // difficulty
    var c = getCookie("difficulty");
    switch(c)
    {
        case '0':
            document.getElementById("difficulty-jr").checked = true;
            DIFFICULTY = 0;
            break;

        case '2':
            document.getElementById("difficulty-mst").checked = true;
            DIFFICULTY = 2;
            break;

        // default to senior
        default:
            document.getElementById("difficulty-sr").checked = true;
            DIFFICULTY = 1;
            break;
    }

    // autoselect
    c = getCookie("autosel");
    switch(c)
    {
        case 'c':
            document.getElementById("autosel-color").checked = true;
            globalSettingAutoSelect = "c";
            break;

        case 's':
            document.getElementById("autosel-shape").checked = true;
            globalSettingAutoSelect = "s";
            break;

        // default to neither
        default:

            document.getElementById("autosel-off").checked = true;
            globalSettingAutoSelect = "n";
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
    c = getCookie("dark-mode");
    globalIsDarkBackground = false;
    // if (we prefer dark and have no cookie set) or have cookie set to dark, make dark
    if((window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches && c === "") || c === "true")
    {
        document.getElementById("dark-background-option").checked = true;
        setBackground();
    }
    else
    {
        document.getElementById("dark-background-option").checked = false;
    }
    
    // autosave
    c = getCookie("autosave-puzzle");
    if(c === "true")
    {
        globalIsAutosavePuzzle = true;
        document.getElementById("autosave-puzzle-option").checked = true;
    }
    else
    {
        document.getElementById("autosave-puzzle-option").checked = false;
    }
    
    c = getCookie("autosave-settings");
    if(c === "true")
    {
        globalIsAutosaveSettings = true;
        document.getElementById("autosave-settings-option").checked = true;
    }
    else
    {
        document.getElementById("autosave-settings-option").checked = false;
    }


    // now that we've loaded the settings, let's generate a puzzle
    // but first, let's see if we can load a puzzle!
    // first we try to load a puzzle from the url
    if(!loadPuzzleFromURL())
    {
        // if that fails, we try to load from the cookies
        c = getCookie("saved-clues");
        if(c !== "")
        {
            loadPuzzleFromCookies();
        }
        else
        {
            // if that fails, we generate a new puzzle
            clearPlayerGrid();
            generatePuzzle();
        }
    }
    
    // this is how we detect an unload on mobile browsers
    // we save on unload
    document.addEventListener('visibilitychange', function()
    {
        if(document.visibilityState === 'hidden')
        {
            saveEverything();
        }
    });
    
    // this is potentially a resize on mobile browsers
    screen.orientation.addEventListener("change", function()
    {
        globalScaleFactor = determineScale();
        setupButtonsHTML(globalScaleFactor);
        setupCluesHTML(globalScaleFactor);
        setupGridHTML(true, globalScaleFactor);
    });
};


// save on unload
document.onbeforeunload = function()
{
    saveEverything();
};


// this is called when you click the modal
function modalAction()
{
    document.getElementById("modal-display").style.display = "none";
    generatePuzzle();
}


// scale grid when window is resized
// there are probably better ways to do this but this is simple enough
var scaleTimeout;
window.onresize = function()
{
    clearTimeout(scaleTimeout);
    scaleTimeout = setTimeout(function()
        {
            globalScaleFactor = determineScale();
            setupButtonsHTML(globalScaleFactor);
            setupCluesHTML(globalScaleFactor);
            setupGridHTML(true, globalScaleFactor);
        }, 250);
};

