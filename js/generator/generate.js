// main puzzle generation function
// here's basically how it works:
// we have a two step loop that repeats until the puzzle is generated
// the first step randomly generates clues
// the second step tries to solve the puzzle, and fills in the solution grid
// we repeat these two steps until the puzzle has been solved and the full solution grid has been filled in
function generatePuzzle()
{
    // first step, make sure the grid size hasn't been changed before generating the puzzle
    if(GRID_SIZE_H != globalPlayerGrid.length || GRID_SIZE_W != globalPlayerGrid[0].length)
    {
        setupGrid();
        setupButtons();
    }

    // now we want to setup a blank solution grid, this will get filled as we add clues and solve the puzzle.
    globalSolutionGrid = [];
    for(let i = 0; i < GRID_SIZE_H; i++)
    {
        globalSolutionGrid[i] = [];
        for(let j = 0; j < GRID_SIZE_W; j++)
        {
            globalSolutionGrid[i][j] = "x-x";
        }
    }

    var solved = false;
    while(!solved)
    {
        generateClue();

        // now let's check if the puzzle has been solved
        _checkLoop:
        for(let i = 0; i < GRID_SIZE_H; i++)
        {
            globalSolutionGrid[i] = [];
            for(let j = 0; j < GRID_SIZE_W; j++)
            {
                if(globalSolutionGrid[i][j] === "x-x")
                {
                    solved = true;
                    break _checkLoop;
                }
            }
        }
    }
}


function generateClue()
{

}
