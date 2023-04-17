function drawClue(clue)
{
    var scale = 50 * (3 / Math.max(GRID_SIZE_W, GRID_SIZE_H));
    var toAppend = "<div class='clue-grid'>";
    for(let i = 0; i < clue.length; i++)
    {
        toAppend += "<div class='clue-row'";
        toAppend += " style='height: ";
        toAppend += scale;
        toAppend += "px;'>"
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


function clearClues()
{
    document.getElementById("clues").innerHTML = "";
}