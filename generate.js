function createEmptyGrid()
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
            toAppend += "'class='tile-100' src='./tiles/x-x.png' alt='tile' onclick='setTile(";
            toAppend += i;
            toAppend += ", ";
            toAppend += j;
            toAppend += ")' oncontextmenu='clearTile(";
            toAppend += i;
            toAppend += ", ";
            toAppend += j;
            toAppend += ")'></div>";
        }
        toAppend += "</div>";
    }

    document.getElementById("grid").innerHTML = toAppend;
}


function createButtons()
{
    var toAppend = "";
    for(let i = 0; i < GRID_SIZE_W; i++)
    {
        toAppend += "<button id='l-";
        toAppend += i;
        toAppend += "' class='game-button' onclick='setLetter(";
        toAppend += i;
        toAppend += ")'><img class='tile-50' src='./tiles/'l-";
        toAppend += i;
        toAppend += "'.png' alt='l-";
        toAppend += i;
        toAppend += "'></button>";
    }
    toAppend += "&nbsp;";
    for(let i = 0; i < GRID_SIZE_H; i++)
    {
        toAppend += "<button id='n-";
        toAppend += i;
        toAppend += "' class='game-button' onclick='setNumber(";
        toAppend += i;
        toAppend += ")'><img class='tile-50' src='./tiles/'n-";
        toAppend += i;
        toAppend += "'.png' alt='n-";
        toAppend += i;
        toAppend += "'></button>";
    }
    toAppend += "&nbsp;<button id='x' class='game-button' onclick='setDelete()'><img class='tile-50' src='./tiles/x.png' alt='x'></button>";
    document.getElementById("buttons").innerHTML = toAppend;
}
