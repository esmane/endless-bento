// these messy functions setup the html based on the size of the puzzle
// we create a grid of any size, and create the appropriate number of buttons for all the tiles the grid can take

// scale constant
const SCALE_ROOT = 3;

// this function creates the grid
function setupGrid()
{
    var scale = Math.min(100 * (3 / Math.max(GRID_SIZE_W, GRID_SIZE_H)), 100);
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
