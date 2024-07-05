// these messy functions setup the html based on the size of the puzzle
// we create a grid of any size, and create the appropriate number of buttons for all the tiles the grid can take

// this function creates the grid
function setupGrid()
{
    // the grid should never be split up even on skinny monitors (phones)
    // there are two different scaling methods depending on if it is a wide monitor or a skinny one
    // odd things happen on medium width monitors
    var scale;
    if(window.innerWidth > window.innerHeight)
    {
        // on a wide monitor, we scale to contain the height in the window or the width in half the window
        // whichever is smaller is what we end up using
        scale = Math.min(((window.innerHeight - 200) / (GRID_SIZE_W + 1)), ((window.innerWidth / 2) / (GRID_SIZE_H + 1)));
    }
    else
    {
        // skinny monitors always scale to the width. it is impossible for the width to fit and the height to not on a monitor that is taller than it is wide
        scale = window.innerWidth / (GRID_SIZE_H + 1);
    }
    // but regardless of the mode we don't want the tiles to ever be larger than their true size (100). That would start to look weird and pixelated.
    // so this next line is there to make sure that if we do make a scale adjustment it is a scale down and never a scale up.

    scale = Math.min(scale, 100);
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

    // now that the document contains the necessary number of tiles, let's update the internal array to match
    clearPlayerGrid();
}


// this function creates the buttons
function setupButtons()
{
    // html time
    var toAppend = "";
    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        toAppend += "<button id='c-";
        toAppend += i;
        toAppend += "' class='game-button' onclick=\"setColor('";
        toAppend += i;
        toAppend += "')\"><img class='tile-50' src='./tiles/";
        toAppend += i;
        toAppend += "-x.png' alt='";
        toAppend += i;
        toAppend += "-x'></button>&nbsp;";
    }
    toAppend += "&nbsp;";
    for(let i = 0; i < GRID_SIZE_H; i++)
    {
        toAppend += "<button id='s-";
        toAppend += i;
        toAppend += "' class='game-button' onclick=\"setShape('";
        toAppend += i;
        toAppend += "')\"><img class='tile-50' src='./tiles/x-";
        toAppend += i;
        toAppend += ".png' alt='x-";
        toAppend += i;
        toAppend += "'></button>&nbsp;";
    }
    toAppend += "&nbsp;<button id='x' class='game-button' onclick='setDelete()'><img class='tile-50' src='./tiles/delete.png' alt='x'></button>";
    document.getElementById("buttons").innerHTML = toAppend;


    // if the currently selected buttons are buttons that are about to disappear, set them back to the first option
    if(Number(globalSelectedColor) >= GRID_SIZE_W)
    {
        globalSelectedColor = '0';
        globalOldSelectedColor = '0';
        setColor('0');
    }
    else
    {
        setColor(globalSelectedColor);
    }

    if(Number(globalSelectedShape) >= GRID_SIZE_H)
    {
        globalSelectedShape = '0';
        globalOldSelectedShape = '0';
        setShape('0');
    }
    else
    {
        setShape(globalSelectedShape);
    }
}
