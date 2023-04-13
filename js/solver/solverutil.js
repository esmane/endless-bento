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
function solverIsColorPossibility(x, y, color)
{
    for(let i = 0; i < solverPossibilityGrid[x][y].length; i++)
    {
        if(solverPossibilityGrid[x][y][i].charAt(0) === color)
        {
            return true;
        }
    }
    return false;
}

function solverIsShapePossibility(x, y, shape)
{
    for(let i = 0; i < solverPossibilityGrid[x][y].length; i++)
    {
        if(solverPossibilityGrid[x][y][i].charAt(2) === shape)
        {
            return true;
        }
    }
    return false;
}



// these next two tell you how many possibilities there are for the given square if it has to be a certain color or shape.
function solverNumberOfColorPossibilities(x, y, color)
{
    var count = 0;
    for(let i = 0; i < solverPossibilityGrid[x][y].length; i++)
    {
        if(solverPossibilityGrid[x][y][i].charAt(0) === color)
        {
            count++;
        }
    }
    return count;
}

function solverNumberOfShapePossibilities(x, y, shape)
{
    var count = 0;
    for(let i = 0; i < solverPossibilityGrid[x][y].length; i++)
    {
        if(solverPossibilityGrid[x][y][i].charAt(2) === shape)
        {
            count++;
        }
    }
    return count;
}


// these next two tell you what tile the square has to be if it has to be a certain color or shape and there is only one possibility for that square for that color or shape
function solverGetColorPossibility(x, y, color)
{
    if(solverNumberOfColorPossibilities(x, y, color) === 1)
    {
        for(let i = 0; i < solverPossibilityGrid[x][y].length; i++)
        {
            if(solverPossibilityGrid[x][y][i].charAt(0) === color)
            {
                return solverPossibilityGrid[x][y][i];
            }
        }
    }
    return undefined;
}

function solverGetShapePossibility(x, y, shape)
{
    if(solverNumberOfShapePossibilities(x, y, shape) === 1)
    {
        for(let i = 0; i < solverPossibilityGrid[x][y].length; i++)
        {
            if(solverPossibilityGrid[x][y][i].charAt(2) === shape)
            {
                return solverPossibilityGrid[x][y][i];
            }
        }
    }
    return undefined;
}



// these next three eliminate tiles from our possibilities
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

function solverEliminateColor(x, y, color)
{
    for(let i = solverPossibilityGrid[x][y].length - 1; i >= 0; i--)
    {
        if(solverPossibilityGrid[x][y][i].charAt(0) === color)
        {
            solverPossibilityGrid[x][y].splice(i, 1);
        }
    }
}

function solverEliminateShape(x, y, shape)
{
    for(let i = solverPossibilityGrid[x][y].length - 1; i >= 0; i--)
    {
        if(solverPossibilityGrid[x][y][i].charAt(2) === shape)
        {
            solverPossibilityGrid[x][y].splice(i, 1);
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

function solverSetSquareColor(x, y, color)
{
    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        if(i != color)
        {
            solverEliminateColor(x, y, i);
        }
    }
}

function solverSetSquareShape(x, y, shape)
{
    // then we want to make it the only possibility for the given tile
    solverPossibilityGrid[x][y] = [];
    for(let i = 0; i < GRID_SIZE_H; i++)
    {
        solverPossibilityGrid[x][y][i] = i + '-' + shape;
    }
}
