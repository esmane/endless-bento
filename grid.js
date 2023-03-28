// clears the grid
function clearPlayerGrid()
{
    globalPlayerGrid = [];
    for(let i = 0; i < GRID_SIZE_H; i++)
    {
        globalPlayerGrid[i] = [];
        for(let j = 0; j < GRID_SIZE_W; j++)
        {
            globalPlayerGrid[i][j] = "x-x";
        }
    }
}


// redraws the whole grid according to the globalPlayerGrid array
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
function setTile(x, y)
{
	globalPlayerGrid[x][y] = globalSelectedColor + '-' + globalSelectedShape;
	document.getElementById(x + '-' + y).src = "./tiles/" + globalPlayerGrid[x][y] + ".png";
}

function clearTile(x, y)
{
    globalPlayerGrid[x][y] = "x-x";
    document.getElementById(x + '-' + y).src = "./tiles/" + globalPlayerGrid[x][y] + ".png";
}
