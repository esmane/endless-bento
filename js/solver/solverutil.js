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



// these final three eliminate tiles from our possibilities
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

function SolverEliminateColor(x, y, color)
{
    for(let i = solverPossibilityGrid[x][y].length - 1; i >= 0; i--)
    {
        if(solverPossibilityGrid[x][y][i].charAt(0) === color)
        {
            solverPossibilityGrid[x][y].splice(i, 1);
        }
    }
}

function SolverEliminateShape(x, y, shape)
{
    for(let i = solverPossibilityGrid[x][y].length - 1; i >= 0; i--)
    {
        if(solverPossibilityGrid[x][y][i].charAt(2) === shape)
        {
            solverPossibilityGrid[x][y].splice(i, 1);
        }
    }
}
