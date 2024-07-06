var solverPossibilityGrid;  // 3d array of all the squares and all the tiles that each square could be


// this function prepares the solver global variables so that the solver can function properly
function initSolver()
{
    var ALL_POSSIBILITIES = initArray([GRID_SIZE_W * GRID_SIZE_H]);
    solverPossibilityGrid = initArray([GRID_SIZE_W, GRID_SIZE_H, GRID_SIZE_W * GRID_SIZE_H]);

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
            for(let k = 0; k < GRID_SIZE_W * GRID_SIZE_H; k++)
            {
                solverPossibilityGrid[i][j][k] = ALL_POSSIBILITIES[k];
            }
        }
    }
}



// this is the main solver function. it steps through the grid and all clues and eliminates as necessary.
// this function will return true if the puzzle has been solved and false if it hasn't
// this function is how the generator links with the solver.
// the generator will invoke the solver by calling this function every time it creates a few new clues.
// this is in hopes that the puzzle is now solveable.
// if it gets a return true, the generator knows it has generated a solveable puzzle.
// if it gets a return false, the generator knows it needs to make some more clues.
// the startClue argument tells the solver what clue it should start by parsing, to make it a little more efficient
function solverStep(startClue)
{
    // begin first pass of clues, starting with the clue specified
    for(let i = startClue; i < globalClues.length; i++)
    {
        solverEliminateClues(i);
    }

    // after checking all the clues is the perfect time to eliminate logically
    solverEliminateLogically();

    // now let's check if the puzzle has been solved
    var solved = true;
    _solveCheckLoop:
    for(let gridX = 0; gridX < GRID_SIZE_W; gridX++)
    {
        for(let gridY = 0; gridY < GRID_SIZE_H; gridY++)
        {
            if(solverPossibilityGrid[gridX][gridY].length !== 1)
            {
                solved = false;
                break _solveCheckLoop;
            }
        }
    }

    if(solved)
    {
        return true;
    }

    // if the puzzle hasn't been solved yet, begin pass two
    // begin first pass of clues, starting with the clue specified
    for(let i = startClue; i < globalClues.length; i++)
    {
        solverEliminateClues(i);
    }

    // after checking all the clues is the perfect time to eliminate logically
    solverEliminateLogically();

    // now let's check if the puzzle has been solved
    solved = true;
    _solveCheckLoop2:
    for(let gridX = 0; gridX < GRID_SIZE_W; gridX++)
    {
        for(let gridY = 0; gridY < GRID_SIZE_H; gridY++)
        {
            if(solverPossibilityGrid[gridX][gridY].length !== 1)
            {
                solved = false;
                break _solveCheckLoop2;
            }
        }
    }

    if(solved)
    {
        return true;
    }

    return false;
}



// this function is probably the most important solver function.
// it eliminates possiblities based on a single clue, using both absolute and relative elimination
function solverEliminateClues(clueNo)
{
    var possibleLocations = solverCheckClueLocations(clueNo);
    var gridX = 0;
    var gridY = 0;

    // if there is only one possible spot, absolute eliminate the clue
    if(possibleLocations.length === 1)
    {
        // x and y refer to the clue's location in the grid
        // because this is absolute elimination, there is only one possible location for the clue.
        gridX = Number(possibleLocations[0].charAt(0));
        gridY = Number(possibleLocations[0].charAt(2));

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
    // we don't do relative elimination on easy mode, this requires easy mode puzzles to be solvable exclusively by absolutely placing clues.
    else if(DIFFICULTY !== 0)
    {
        // relative elimination
        // unlike with absolute elimination, we can only do relative elimination some of the time
        // we can only do relative elimination on clues that tell us both the color and shape of certain squares
        for(let clueX = 0; clueX < globalClues[clueNo].length; clueX++)
        {
            for(let clueY = 0; clueY < globalClues[clueNo][0].length; clueY++)
            {
                if(globalClues[clueNo][clueX][clueY].charAt(0) !== 'x' && globalClues[clueNo][clueX][clueY].charAt(2) !== 'x')
                {
                    // if a tile does in fact tell us both, we need to eliminate that tile from every single squares possibilities
                    for(let gridXX = 0; gridXX < GRID_SIZE_W; gridXX++)
                    {
                        for(let gridYY = 0; gridYY < GRID_SIZE_H; gridYY++)
                        {
                            solverEliminatePossibility(gridXX, gridYY, globalClues[clueNo][clueX][clueY]);
                        }
                    }
                }
            }
        }

        // now that we've eliminated the possiblities, we need to add them back but only to the spots where they could fit according to the clue
        // this means we need to try for every previously determined spot that the clue could fit
        for(let i = 0; i < possibleLocations.length; i++)
        {
            gridX = Number(possibleLocations[i].charAt(0));
            gridY = Number(possibleLocations[i].charAt(2));

            // this repeats
            for(let clueX = 0; clueX < globalClues[clueNo].length; clueX++)
            {
                for(let clueY = 0; clueY < globalClues[clueNo][0].length; clueY++)
                {
                    // if a square in the clue fits the pattern
                    if(globalClues[clueNo][clueX][clueY].charAt(0) !== 'x' && globalClues[clueNo][clueX][clueY].charAt(2) !== 'x')
                    {
                        // add it back only for the square that matches that clue in that clue location
                        solverPossibilityGrid[gridX + clueX][gridY + clueY].push(globalClues[clueNo][clueX][clueY]);
                    }
                }
            }
        }
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



// this final function eliminates logically
// the purpose of this function is to eliminate according to this rule:
// if a square has only one possibility, that square must contain the possibility.
// therefore, that possibility cannot fit anywhere else in the grid, so we can eliminate it as a possibility from all other squares
function solverEliminateLogically()
{
    for(let gridX = 0; gridX < GRID_SIZE_W; gridX++)
    {
        for(let gridY = 0; gridY < GRID_SIZE_H; gridY++)
        {
            if(solverPossibilityGrid[gridX][gridY].length === 1)
            {
                solverSetSquare(gridX, gridY, solverPossibilityGrid[gridX][gridY][0]);
            }
        }
    }
}
