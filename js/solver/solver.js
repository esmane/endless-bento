var ALL_POSSIBILITIES;      // this stores all the possibilities that a square could be. useful for elimination

var solverPossibilityGrid;  // 3d array of all the squares and all the tiles that each square could be
var solverSolvedGrid;       // 2d array of the solved puzzle


// this function prepares the solver global variables so that the solver can function properly
function initSolver()
{
    ALL_POSSIBILITIES = initArray([GRID_SIZE_W * GRID_SIZE_H]);
    solverPossibilityGrid = initArray([GRID_SIZE_W, GRID_SIZE_H, GRID_SIZE_W * GRID_SIZE_H]);
    solverSolvedGrid = initArray([GRID_SIZE_W, GRID_SIZE_H]);

    let index = 0;
    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        for(let j = 0; j < GRID_SIZE_H; j++)
        {
            ALL_POSSIBILITIES[index] = i + '-' + j;
            index++;
        }
    }

    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        for(let j = 0; j < GRID_SIZE_H; j++)
        {
            solverSolvedGrid[i][j] = "x-x";
            for(let k = 0; k < GRID_SIZE_W * GRID_SIZE_H; k++)
            {
                solverPossibilityGrid[i][j][k] = ALL_POSSIBILITIES[k];
            }
        }
    }
}


// the main solver function
function solverEliminateClues(clueNo)
{
    var possibleLocations = solverCheckClueLocations(clueNo);
    
    // if there is only one possible spot, absolute eliminate the clue
    if(possibleLocations.length === 1)
    {
        // x and y refer to the clue's location in the grid
        // because this is absolute elimination, there is only one possible location for the clue.
        var gridX = Number(possibleLocations[0].charAt(0));
        var gridY = Number(possibleLocations[0].charAt(2));
        
        // this repeats
        for(let clueX = 0; clueX < globalClues[clueNo].length; clueX++)
        {
            _nextSquareEliminate:
            for(let clueY = 0; clueY < globalClues[clueNo][0].length; clueY++)
            {
                // for every tile of the clue, let's do some elimination
                // what happens next depends on what the square of the clue is
                if(globalClues[clueNo][clueX][clueY] === "x-x")
                {
                    continue _nextSquareEliminate;
                }
                else if(globalClues[clueNo][clueX][clueY].charAt(0) === 'x')
                {
                    // a clue that tells us shape only
                    solverSetSquareShape(gridX + clueX, gridY + clueY, globalClues[clueNo][clueX][clueY].charAt(2));
                }
                else if(globalClues[clueNo][clueX][clueY].charAt(2) === 'x')
                {
                    // a clue that tells us color only
                    solverSetSquareColor(gridX + clueX, gridY + clueY, globalClues[clueNo][clueX][clueY].charAt(0));
                }
                else
                {
                    solverSetSquare(gridX + clueX, gridY + clueY, globalClues[clueNo][clueX][clueY]);
                }
            }
        }
    }
    else
    {
        // relative elimination           
    }
}


// this tells us where a clue can fit into the grid
function solverCheckClueLocations(clueNo)
{
    // the first thing we need to do with a clue is see where it "fits" into the grid.
    // what we do next depends on how many places it can fit and what sorts of tiles it contains.
    // we will create a 1D array that tracks all the possible spots as strings of format x,y
    var possibleLocations = [];
    
    // now let's check every spot on the grid the clue could physically fit
    for(let gridX = 0; gridX <= (GRID_SIZE_W - globalClues[clueNo].length); gridX++)
    {
        for(let gridY = 0; gridY <= (GRID_SIZE_H - globalClues[clueNo][0].length); gridY++)
        {
            let fits = true;
            // now we need to check every square of the clue
            _clueCheckLoop:
            for(let clueX = 0; clueX < globalClues[clueNo].length; clueX++)
            {
                _nextSquare:
                for(let clueY = 0; clueY < globalClues[clueNo][0].length; clueY++)
                {
                    // what happens next depends on what the square of the clue is
                    if(globalClues[clueNo][clueX][clueY] === "x-x")
                    {
                        continue _nextSquare;
                    }
                    else if(globalClues[clueNo][clueX][clueY].charAt(0) === 'x')
                    {
                        // a clue that tells us shape only
                        if(solverIsShapePossibility(gridX + clueX, gridY + clueY, globalClues[clueNo][clueX][clueY].charAt(2)))
                        {
                            continue _nextSquare;
                        }
                        else
                        {
                            fits = false;
                            break _clueCheckLoop;
                        }
                    }
                    else if(globalClues[clueNo][clueX][clueY].charAt(2) === 'x')
                    {
                        // a clue that tells us shape only
                        if(solverIsColorPossibility(gridX + clueX, gridY + clueY, globalClues[clueNo][clueX][clueY].charAt(0)))
                        {
                            continue _nextSquare;
                        }
                        else
                        {
                            fits = false;
                            break _clueCheckLoop;
                        }
                    }
                    else if(solverIsPossibility(gridX + clueX, gridY + clueY, globalClues[clueNo][clueX][clueY]))
                    {
                        continue _nextSquare;
                    }
                    else
                    {
                        fits = false;
                        break _clueCheckLoop;
                    }
                }
            }
            
            if(fits)
            {
                possibleLocations.push(gridX + ',' + gridY);
            }
        }
    }
    return possibleLocations;   
}