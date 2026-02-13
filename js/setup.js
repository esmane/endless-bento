// these messy functions setup the html based on the size of the puzzle
// we create a grid of any size, and create the appropriate number of buttons for all the tiles the grid can take

// this function creates the grid
function setupGridHTML(redraw, scale)
{
    scale *= 100;
    scale = Math.max(scale, 50);
    var toAppend = "";
    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        toAppend += "<div class='grid-row'>";
        for(let j = 0; j < GRID_SIZE_H; j++)
        {
            toAppend += "<div class='grid-item'><img id='";
            toAppend += i;
            toAppend += "-";
            toAppend += j;
            toAppend += "' class='tile-100' src='./tiles/x-x.png' alt='x-x' onclick='setTile(";
            toAppend += i;
            toAppend += ", ";
            toAppend += j;
            toAppend += ")' oncontextmenu='clearTile(";
            toAppend += i;
            toAppend += ", ";
            toAppend += j;
            toAppend += ")' style='width: ";
            toAppend += scale;
            toAppend += "px; height: ";
            toAppend += scale;
            toAppend += "px;'></div>&nbsp;";
        }
        toAppend += "</div>";
    }

    document.getElementById("grid").innerHTML = toAppend;

    // if we passed a redraw argument we want to redraw the grid according to the array rather than clearing the internal array to match the newly created empty grid
    // if we did not pass a redraw argument we just want to clear the internal array
    if(redraw === false)
    {
        // now that the document contains the necessary number of tiles, let's update the internal array to match
        clearPlayerGrid();
    }
    else
    {
        redrawGrid();
    }
}


// this function creates the buttons
function setupButtonsHTML(scale)
{
    scale *= 50;
    scale = Math.max(scale, 40);
    // html time
    var toAppend = "";
    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        toAppend += "<button id='c-";
        toAppend += i;
        toAppend += "' class='game-button' onclick=\"setColor('";
        toAppend += i;
        toAppend += "')\" style='width: ";
        toAppend += scale;
        toAppend += "px; height: ";
        toAppend += scale;
        toAppend += "px;'><img class='tile-50' src='./tiles/";
        toAppend += i;
        toAppend += "-x.png' alt='";
        toAppend += i;
        toAppend += "-x' style='width: ";
        toAppend += scale;
        toAppend += "px; height: ";
        toAppend += scale;
        toAppend += "px;'></button>&nbsp;";
    }
    toAppend += "&nbsp;";
    for(let i = 0; i < GRID_SIZE_H; i++)
    {
        toAppend += "<button id='s-";
        toAppend += i;
        toAppend += "' class='game-button' onclick=\"setShape('";
        toAppend += i;
        toAppend += "')\" style='width: ";
        toAppend += scale;
        toAppend += "px; height: ";
        toAppend += scale;
        toAppend += "px;'><img class='tile-50' src='./tiles/x-";
        toAppend += i;
        toAppend += ".png' alt='x-";
        toAppend += i;
        toAppend += "' style='width: ";
        toAppend += scale;
        toAppend += "px; height: ";
        toAppend += scale;
        toAppend += "px;'></button>&nbsp;";
    }
    
    toAppend += "&nbsp;<button id='x' class='game-button' onclick='setDelete()' style='width: ";
    toAppend += scale;
    toAppend += "px; height: ";
    toAppend += scale;
    toAppend += "px;'><img class='tile-50' src='./tiles/delete.png' alt='x' style='width: ";
    toAppend += scale;
    toAppend += "px; height: ";
    toAppend += scale;
    toAppend += "px;'></button>";
    document.getElementById("buttons").innerHTML = toAppend;

    // if the currently selected buttons are buttons that are about to disappear, set them back to the first option
    if(Number(globalSelectedColor) >= GRID_SIZE_W)
    {
        globalSelectedColor = '0';
        setColor('0', true);
    }
    else
    {
        setColor(globalSelectedColor, true);
    }

    if(Number(globalSelectedShape) >= GRID_SIZE_H)
    {
        globalSelectedShape = '0';
        setShape('0', true);
    }
    else
    {
        setShape(globalSelectedShape, true);
    }
    
    if(globalSelectedDelete)
    {
        globalSelectedDelete = false;
        setDelete();
    }
}


// this function creates the clues
function setupCluesHTML(scale)
{
    scale *= Math.min(50 * (3 / Math.max(GRID_SIZE_W, GRID_SIZE_H)), 50);
    scale = Math.max(scale, 25);
    document.getElementById("clues").innerHTML = "";
    for(let i = 0; i < globalClues.length; i++)
    {
        drawClueHTML(globalClues[i], scale);
    }
}

// helper function for previous
function drawClueHTML(clue, scale)
{
    var toAppend = "<div class='clue-grid'>";
    for(let i = 0; i < clue.length; i++)
    {
        toAppend += "<div class='clue-row'";
        toAppend += " style='height: ";
        toAppend += scale;
        toAppend += "px;'>";
        for(let j = 0; j < clue[i].length; j++)
        {
            toAppend += "<div class='clue-item'><img class='tile-50' src='./tiles/";
            toAppend += clue[i][j];
            toAppend += ".png' alt='";
            toAppend += clue[i][j];
            toAppend += "' style='width: ";
            toAppend += scale;
            toAppend += "px; height: ";
            toAppend += scale;
            toAppend += "px;'></div>";
        }
        toAppend += "</div>";
    }
    toAppend += "</div>";
    document.getElementById("clues").innerHTML += toAppend;
}



// this function determines the scale for the grid, buttons, and clues
function determineScale()
{
    // the grid should never be split up even on skinny monitors (phones)
    // there are two different scaling methods depending on if it is a wide monitor or a skinny one
    // odd things happen on medium width monitors
    let scale = 100;
    if(window.innerWidth > window.innerHeight)
    {
        // on a wide monitor, we scale to contain the height in the window or the width in half the window
        // whichever is smaller is what we end up using
        scale = Math.min(((window.innerHeight - 200) / (GRID_SIZE_W + 1)), ((window.innerWidth / 2) / (GRID_SIZE_H + 1)));
    }
    else
    {
        // skinny monitors always scale to the width. it is impossible for the width to fit and the height to not on a monitor that is taller than it is wide
        // for some reason 5 wide puzzles need to be scaled more than the others
        if(GRID_SIZE_H > 4)
        {
            scale = window.innerWidth / (GRID_SIZE_H + 1.5);
        }
        else
        {
            scale = window.innerWidth / (GRID_SIZE_H + 1);
        }
    }
    // but regardless of the mode we don't want the tiles to ever be larger than their true size (100). That would start to look weird and pixelated.
    // so this next line is there to make sure that if we do make a scale adjustment it is a scale down and never a scale up.

    scale = Math.min(scale / 100, 1);
    return scale;
}
