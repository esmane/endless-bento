// main loading function
function loadPuzzle(clues, grid)
{
    // step one: load the saved data
    globalClues = JSON.parse(clues);
    globalPlayerGrid = JSON.parse(grid);
    
    
    // step two: draw the grid
    if(GRID_SIZE_W !== globalPlayerGrid.length || GRID_SIZE_H !== globalPlayerGrid[0].length)
    {
        GRID_SIZE_W = globalPlayerGrid.length;
        GRID_SIZE_H = globalPlayerGrid[0].length;
        
        // when loading a puzzle we do not want to clear the grid
        setupGridHTML(true, globalScaleFactor);
        setupButtonsHTML(globalScaleFactor);
    }
    else
    {
        redrawGrid();
    }
    
    
    // step three: generate the solution
    // the solution is not actually saved because
    // in a valid puzzle the clues already tell us the solution.
    // this keeps the size of the save data small
    initSolver();
    
    // we don't know what difficulty the saved puzzle is
    // so, we want to set the difficulty to max before we run the solver
    // this way the solver will have the best chance of solving the puzzle
    // since easy mode cripples the solver
    var oldDifficulty = DIFFICULTY;
    DIFFICULTY = 2;
    
    var solved = false;
    var attempts = 5;
    while(!solved && attempts > 0)
    {
        solved = solverStep(0);
        attempts--;
    }
    
    if(!solved)
    {
        console.log("Failed to solve loaded puzzle!");
    }
    
    DIFFICULTY = oldDifficulty;
    
    // move solver grid to solution grid
    // this is necessary for the solution checker to work
    globalSolutionGrid = initArray([GRID_SIZE_W, GRID_SIZE_H]);
    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        for(let j = 0; j < GRID_SIZE_H; j++)
        {
            // zeroth index is the only possibility in a solved puzzle
            globalSolutionGrid[i][j] = solverPossibilityGrid[i][j][0];
        }
    }
    
    
    // step four: redraw the clues
    setupCluesHTML(globalScaleFactor);
}


// cookie based save and load functions
// used for saving the puzzle when the window is closed
function loadPuzzleFromCookies()
{
    var clues = getCookie("saved-clues");
    var grid = getCookie("saved-grid");
    
    clues = decodeURIComponent(clues);
    grid = decodeURIComponent(grid);

    loadPuzzle(clues, grid);
}

function savePuzzleToCookies()
{
    var clues = JSON.stringify(globalClues);
    var grid = JSON.stringify(globalPlayerGrid);
    
    clues = encodeURIComponent(clues);
    grid = encodeURIComponent(grid);
    
    setCookie("saved-clues", clues, 180);
    setCookie("saved-grid", grid, 180);
}


// url based save and load functions
// used for sharing puzzles or saving without cookies
function loadPuzzleFromURL()
{
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("c") && searchParams.has("g"))
    {
        var clues = searchParams.get("c");
        var grid = searchParams.get("g");
        clues = decodeURIComponent(clues);
        grid = decodeURIComponent(grid);
        
        loadPuzzle(clues, grid);
        return true;
    }

    // check for force bento
    // if we don't have force-bento, we do something silly
    if(!searchParams.has("force-bento"))
    {
        // on april fools day, we do something silly
        const date = new Date();
        if(date.getMonth() === 3 && date.getDate() === 1)
        {
            console.log("April Fools!");
            // window.location = "https://esmane.github.io/endless-shave-ice/";
        }
    }
    return false;
}

function savePuzzleToURL()
{
    var clues = JSON.stringify(globalClues);
    var grid = JSON.stringify(globalPlayerGrid);
    
    clues = encodeURIComponent(clues);
    grid = encodeURIComponent(grid);
    
    var puzzleQuery = "?c=" + clues + "&g=" + grid;
    
    // thanks https://stackoverflow.com/a/5817559
    var puzzleURL = window.location.href.replace(window.location.search, "");
    puzzleURL += puzzleQuery;
    
    console.log(puzzleURL);
}
