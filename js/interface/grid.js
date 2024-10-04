// these functions are responsible for setting the tiles in the grid
// we store an array internally that stores what tile is in each spot
// we also display this grid on the screen using a grid of divs and images in html
// these functions keep the two in sync as well as controlling what happens when tiles are clicked

// clears the grid array and also resets the visible tiles to all blank
function clearPlayerGrid()
{
    globalPlayerGrid = initArray([GRID_SIZE_W, GRID_SIZE_H]);
    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        globalPlayerGrid[i] = [];
        for(let j = 0; j < GRID_SIZE_H; j++)
        {
            globalPlayerGrid[i][j] = "x-x";
            document.getElementById(i + '-' + j).src = "./tiles/" + globalPlayerGrid[i][j] + ".png";
            document.getElementById(i + '-' + j).alt = globalPlayerGrid[i][j];
        }
    }
}


// redraws the whole grid according to the globalPlayerGrid array. this function does not change the contents of the array,
// it just changes what is shown so that it matches the array
function redrawGrid()
{
    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        for(let j = 0; j < GRID_SIZE_H; j++)
        {
            document.getElementById(i + '-' + j).src = "./tiles/" + globalPlayerGrid[i][j] + ".png";
        }
    }
}


// sets a single tile (generally for clicking in the grid)
// we set three things: the internal array used for checking if the puzzle has been solved
// the image displayed in the grid
// the alt-text so that the game can be played without images
function setTile(x, y)
{
    // set the three main things
    globalPlayerGrid[x][y] = globalSelectedColor + '-' + globalSelectedShape;
    document.getElementById(x + '-' + y).src = "./tiles/" + globalPlayerGrid[x][y] + ".png";
    document.getElementById(x + '-' + y).alt = globalPlayerGrid[x][y];

    // check if the puzzle has been solved
    if(equal(globalPlayerGrid, globalSolutionGrid))
    {
        // display the modal window
        document.getElementById("modal-display").style.display = "block";
        
        // clear the saved puzzle if it exists
        setCookie("saved-clues", "", 0);
        setCookie("saved-grid", "", 0);
        globalDoNotSave = true;
    }

    // at this point we are done setting the grid. the rest of this function is cycling through the selection options
    // cycle through the different tile selections depending on the setting and if we are currently on delete (don't cycle delete)
    if(globalSelectedColor !== 'x')
    {
        switch(globalSettingAutoSelect)
        {
        // shape
        case 's':
            // the number of possible shapes is dependent on the grid height (because non-square grids are valid)
            if(Number(globalSelectedShape) < GRID_SIZE_H - 1)
            {
                setShape(String(Number(globalSelectedShape) + 1));
            }
            else
            {
                setShape('0');
            }
            break;

        // color
        case 'c':
            // the number of possible shapes is dependent on the grid width (because non-square grids are valid)
            if(Number(globalSelectedColor) < GRID_SIZE_W - 1)
            {
                setColor(String(Number(globalSelectedColor) + 1));
            }
            else
            {
                setColor('0');
            }
            break;

        // default
        default:
            break;

        }
    }
}


// clears a tile
function clearTile(x, y)
{
    globalPlayerGrid[x][y] = "x-x";
    document.getElementById(x + '-' + y).src = "./tiles/" + globalPlayerGrid[x][y] + ".png";
    document.getElementById(x + '-' + y).alt = globalPlayerGrid[x][y];
}


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
    scaleTimeout = setTimeout(function() {setupGrid(true);}, 250);
};
