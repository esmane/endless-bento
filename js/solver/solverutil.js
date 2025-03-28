// this function checks if a square in the solver's possibility grid has the given tile as a valid possibility
function solverIsPossibility(x, y, tile)
{
    for(let i = 0; i < solverPossibilityGrid[x][y].length; i++)
    {
        if(solverPossibilityGrid[x][y][i] === tile)
        {
            return true;
        }
    }
    return false;
}

// these next two check if a given color or shape is a valid possibility for the given square. any tile with the given color or shape is a valid possibility
function solverIsColorPossibility(x, y, color, used)
{
    var count = 0;
    var match = "";
    for(let i = 0; i < solverPossibilityGrid[x][y].length; i++)
    {
        if(solverPossibilityGrid[x][y][i].charAt(0) === color)
        {
            count++;
            if(count === 1)
            {
                match = solverPossibilityGrid[x][y][i];
            }
            else
            {
                return true;
            }
        }
    }
    return checkDuplicates(used, match, count);
}

function solverIsShapePossibility(x, y, shape, used)
{
    var count = 0;
    var match = "";  // if there is only one possibility that fits the desired shape into the spot, we want to know exactly what tile it is using
    for(let i = 0; i < solverPossibilityGrid[x][y].length; i++)
    {
        if(solverPossibilityGrid[x][y][i].charAt(2) === shape)
        {
            count++;
            if(count === 1)
            {
                match = solverPossibilityGrid[x][y][i];
            }
            else
            {
                return true;
            }
        }
    }
    return checkDuplicates(used, match, count);
}

function checkDuplicates(used, match, count)
{
    if(count === 1)
    {
        for(let i = 0; i < used.length; i++)
        {
            if(used[i] === match)
            {
                // if the tile we need to match here was already used to match a different square within the same clue, the clue actually cannot fit in the desired position
                return false;
            }
        }
        used.push(match);
        return true;
    }
    return false;    
}



// this next one eliminates tiles from our possibilities
function solverEliminatePossibility(x, y, tile)
{
    for(let i = solverPossibilityGrid[x][y].length - 1; i >= 0; i--)
    {
        if(solverPossibilityGrid[x][y][i] === tile)
        {
            solverPossibilityGrid[x][y].splice(i, 1);
            break;
        }
    }
}



// these next three functions are sort of the inverse of the eliminate functions.
// they make the given tile the given square's only possibility,
// and they eliminate it as an option from every other tile on the grid
function solverSetSquare(x, y, tile)
{
    // first we want to eliminate the tile as a possibility from all squares
    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        for(let j = 0; j < GRID_SIZE_H; j++)
        {
            solverEliminatePossibility(i, j, tile);
        }
    }

    // then we want to make it the only possibility for the given tile
    solverPossibilityGrid[x][y] = [tile];
}


// this one eliminates all the possibilities that are NOT the color specified
function solverSetSquareColor(x, y, color)
{
    for(let i = solverPossibilityGrid[x][y].length - 1; i >= 0; i--)
    {
        if(solverPossibilityGrid[x][y][i].charAt(0) !== color)
        {
            solverPossibilityGrid[x][y].splice(i, 1);
        }
    }
}

function solverSetSquareShape(x, y, shape)
{
    for(let i = solverPossibilityGrid[x][y].length - 1; i >= 0; i--)
    {
        if(solverPossibilityGrid[x][y][i].charAt(2) !== shape)
        {
            solverPossibilityGrid[x][y].splice(i, 1);
        }
    }
}
