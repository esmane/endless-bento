function drawClue(clue)
{
    var toAppend = "<div class='clue-grid'>";
    for(let i = 0; i < clue.length; i++)
    {
        toAppend += "<div class='clue-row'>"
        for(let j = 0; j < clue[i].length; j++)
        {
            toAppend += "<div class='clue-item'><img class='tile-50' src='./tiles/";
            
            toAppend += clue[i][j];           
            
            toAppend += ".png' alt='tile'></div>";
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