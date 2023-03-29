// these messy functions setup the html based on the size of the puzzle
// we create a grid of any size, and create the appropriate number of buttons for all the tiles the grid can take

function setupGrid()
{
    var toAppend = "";
    for(let i = 0; i < GRID_SIZE_H; i++)
    {
        toAppend += "<div class='grid-row'>";
        for(let j = 0; j < GRID_SIZE_W; j++)
        {
            toAppend += "<div class='grid-item'><img id='";
            toAppend += i;
            toAppend += "-";
            toAppend += j;
            toAppend += "'class='tile-100' src='./tiles/x-x.png' alt='x-x' onclick='setTile(";
            toAppend += i;
            toAppend += ", ";
            toAppend += j;
            toAppend += ")' oncontextmenu='clearTile(";
            toAppend += i;
            toAppend += ", ";
            toAppend += j;
            toAppend += ")'></div>&nbsp;";
        }
        toAppend += "</div>";
    }

    document.getElementById("grid").innerHTML = toAppend;

    // now that the document contains the necessary number of tiles, let's update the internal array to match
    clearPlayerGrid();
}


function setupButtons()
{
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
}
