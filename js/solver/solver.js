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
            solverPossibilityGrid[i][j] = ALL_POSSIBILITIES;
        }
    }
}
