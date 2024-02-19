// this array is going to keep track of how many times each tile appears in a clue.
var generatorClueCount;
var generatorTotalCount;


// main puzzle generation function
// here's basically how it works:
// we have a two step loop that repeats until the puzzle is generated
// the first step randomly generates clues
// the second step tries to solve the puzzle, and fills in the solution grid
// we repeat these two steps until the puzzle has been solved and the full solution grid has been filled in
function generatePuzzle(s)
{
    // first, let's see what the grid width and height are
    // not a typo, width and height are reversed for some reason
    GRID_SIZE_H = Math.round(document.getElementById("size-w").value);
    GRID_SIZE_W = Math.round(document.getElementById("size-h").value);
    
    if(GRID_SIZE_H < 2)
    {
        GRID_SIZE_H = 2;
        document.getElementById("size-w").value = 2;
    }
    else if(GRID_SIZE_H > 5)
    {
        GRID_SIZE_H = 5;
        document.getElementById("size-w").value = 5;
    }
    
    if(GRID_SIZE_W < 2)
    {
        GRID_SIZE_W = 2;
        document.getElementById("size-h").value = 2;
    }
    else if(GRID_SIZE_H > 5)
    {
        GRID_SIZE_H = 5;
        document.getElementById("size-w").value = 5;
    }

    
    // first step, make sure the grid size hasn't been changed before generating the puzzle
    if(GRID_SIZE_W != globalPlayerGrid.length || GRID_SIZE_H != globalPlayerGrid[0].length)
    {
        setupGrid();
        setupButtons();
    }

    var goodPuzzle = false;
    while(!goodPuzzle)
    {
    goodPuzzle = generatePuzzleSub();
    
        // at this point we have a solveable puzzle generated. but how good is it?
        // just as puzzles with more than 10 clues are bad puzzles, puzzles with less than 3 clues are also bad
        if(globalClues.length < Math.max(GRID_SIZE_W, GRID_SIZE_H))
        {
            goodPuzzle = false;
        }
    }
    
    // now we have a good puzzle
    clearClues();
    for(let i = 0; i < globalClues.length; i++)
    {
        drawClue(globalClues[i]);
    }
}


// this is the generate function that gets called from the main one
// this is broken out to prevent recursion
function generatePuzzleSub(s)
{
    var clueWidth = GRID_SIZE_W;
    var clueHeight = GRID_SIZE_H;
    
    // fill the grid and clear clues
    generateFillGrid();
    globalClues = [];
    initSolver();
    clearPlayerGrid();

    // an individual tile should not appear in more than 2 clues.
    // so if a tile appears in two clues, it should not reappear in any other clues.
    // this is a means of cutting down redundant clues.    
    generatorClueCount = initArray([GRID_SIZE_W, GRID_SIZE_H]);
    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        generatorClueCount[i] = [];
        for(let j = 0; j < GRID_SIZE_H; j++)
        {
            generatorClueCount[i][j] = 0;
        }
    }
    
    // we shouldn't have more tiles in the clues than in the actual puzzle
    generatorTotalCount = 0;
    
    
    // create the first clue    
    var rand = Math.random();
    switch(DIFFICULTY)
    {
        // easy mode always has a full size clue
        case 0:
            generateClue(clueWidth, clueHeight);
            break;
            
        // medium mode has them 40% of the time
        case 1:
            if(rand < 0.4)
            {
                generateClue(clueWidth, clueHeight);
            }
            break;
            
        // hard mode never has them
        case 2:
            break;
    }
    
    
    // the rest of the clues are generated in a loop
    // the random constants will be adjusted with testing to generate more fun puzzles
    
    // this is a value that depends on the puzzle size
    var maxTotalCount = GRID_SIZE_W * GRID_SIZE_H;
    if(DIFFICULTY === 2)
    {
        switch(maxTotalCount)
        {
            case 10:
            case 12:
                maxTotalCount++;
                break;
                
            case 15:
                maxTotalCount += 3;
                break;
                
            case 16:
                maxTotalCount += 4;
                break;
                
            case 20:
                maxTotalCount += 6;
                break;
                
            case 25:
                maxTotalCount += 10;
                break;
        }
    }
    else
    {
        switch(maxTotalCount)
        {
            case 20:
                maxTotalCount += 2;
                break;
                
            case 25:
                maxTotalCount += 6;
                break;
        }
    }
    
    while(!solverStep(0))
    {
        // find a size for the new clue
        clueWidth = Math.floor(Math.random() * (GRID_SIZE_W + 1));
        clueHeight = Math.floor(Math.random() * (GRID_SIZE_H + 1));
        
        // we do not want to generate any 1x1 clues because they are useless, and we also do not want to generate any more full size clues because there should only be one of those per puzzle.
        if(clueWidth === GRID_SIZE_W && clueHeight === GRID_SIZE_H)
        {
            rand = Math.random();
            if(rand < 0.5)
            {
                clueWidth--;
            }
            else
            {
                clueHeight--;
            }
        }
        else if(clueWidth === 1 && clueHeight === 1)
        {
            rand = Math.random();
            if(rand < 0.5)
            {
                clueWidth++;
            }
            else
            {
                clueHeight++;
            }
        }
        
        generateClue(clueWidth, clueHeight);
        
        // if we've generated more than 10 clues or the clues contain more tiles than the puzzle and the puzzle isn't solveable, chances are it is a bad puzzle. let's try again
        if(globalClues.length >= Math.max(GRID_SIZE_W, GRID_SIZE_H) * 2 || generatorTotalCount > maxTotalCount)
        {
            return false;
        }
    }
    return true;
}


// this function fills the solution grid randomly
function generateFillGrid()
{
    globalSolutionGrid = initArray([GRID_SIZE_W, GRID_SIZE_H]);
    
    // first get a list of all the possibilities
    var ALL_POSSIBILITIES = initArray([GRID_SIZE_W * GRID_SIZE_H]);

    let index = 0;
    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        for(let j = 0; j < GRID_SIZE_H; j++)
        {
            ALL_POSSIBILITIES[index] = i + '-' + j;
            index++;
        }
    }
    
    for(let gridX = 0; gridX < GRID_SIZE_W; gridX++)
    {
        for(let gridY = 0; gridY < GRID_SIZE_H; gridY++)
        {
            let n = Math.floor(Math.random() * ALL_POSSIBILITIES.length);
            globalSolutionGrid[gridX][gridY] = ALL_POSSIBILITIES[n];
            ALL_POSSIBILITIES.splice(n, 1);
        }   
    }
}


// this function generates individual clues
function generateClue(w, h)
{
    var newClue = initArray([w, h]);
    var goodClue = false;

    // we need to pick a location for the clue
    var locationX = Math.floor(Math.random() * (GRID_SIZE_W - w + 1));
    var locationY = Math.floor(Math.random() * (GRID_SIZE_H - h + 1));
    
    // now we need to decide how many squares the clue will actually have filled in.
    // this is random and also depends on the difficulty and puzzle size
    var squares = 0;
    var maxSquares = Math.max(4, Math.ceil(w * h / 2));
    var rand;
    
    if(Math.min(w, h) >= 4 && w === GRID_SIZE_W && h === GRID_SIZE_H)
    {
        maxSquares = Math.ceil(w * h / 2) + 2;
    }

    for(let clueX = 0; clueX < w; clueX++)
    {
        for(let clueY = 0; clueY < h; clueY++)
        {
            newClue[clueX][clueY] = "x-x";
            rand = Math.random();
            if(rand < 0.6 && squares <= maxSquares && generatorClueCount[locationX + clueX][locationY + clueY] <= 5)
            {
                rand = Math.random();
                goodClue = true;
                squares++;
                switch(DIFFICULTY)
                {
                    case 1:
                        if(rand < 0.7)
                        {
                            rand = Math.random();
                            generatorClueCount[locationX + clueX][locationY + clueY] += 2;
                            generatorTotalCount += 0.5;
                            if(rand < 0.5)
                            {
                                newClue[clueX][clueY] = "x-" + globalSolutionGrid[locationX + clueX][locationY + clueY].charAt(2);
                            }
                            else
                            {
                                newClue[clueX][clueY] = globalSolutionGrid[locationX + clueX][locationY + clueY].charAt(0) + "-x";
                            }
                        }
                        else
                        {
                            newClue[clueX][clueY] = globalSolutionGrid[locationX + clueX][locationY + clueY];
                            generatorClueCount[locationX + clueX][locationY + clueY] += 3;
                            generatorTotalCount += 1;
                        }
                        break;
                        
                    case 0:
                    case 2:
                        if(rand < 0.8)
                        {
                            rand = Math.random();
                            generatorClueCount[locationX + clueX][locationY + clueY] += 2;
                            generatorTotalCount += 0.5;
                            if(rand < 0.5)
                            {
                                newClue[clueX][clueY] = "x-" + globalSolutionGrid[locationX + clueX][locationY + clueY].charAt(2);
                            }
                            else
                            {
                                newClue[clueX][clueY] = globalSolutionGrid[locationX + clueX][locationY + clueY].charAt(0) + "-x";
                            }
                        }
                        else
                        {
                            newClue[clueX][clueY] = globalSolutionGrid[locationX + clueX][locationY + clueY];
                            generatorClueCount[locationX + clueX][locationY + clueY] += 3;
                            generatorTotalCount += 1;
                        }
                        break;
                }
            }
        }
    }
    
    if(goodClue)
    {
        globalClues.push(newClue);
    }
}
