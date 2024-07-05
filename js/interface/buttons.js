// these functions are executed when the buttons at the bottom of the puzzle are clicked.
// they set the color and shape of the tile that will get placed when the grid is clicked.
// additionally we can set to delete mode, and we have the function that sets that in here as well.

function setColor(color)
{
    // set previously selected button to grey
    var e;
    if(globalSelectedColor === 'x')
    {
        e = document.getElementById("x");
    }
    else
    {
        e = document.getElementById("c-" + globalSelectedColor);
    }
    e.className = "game-button";

    // set the new selected button and style it to highlighted
    globalSelectedColor = color;
    e = document.getElementById("c-" + globalSelectedColor);
    e.className = "selected-game-button";

    // if the previously selected button was the delete button we want to set the shape back too
    if(globalSelectedShape === 'x')
    {
        globalSelectedShape = globalOldSelectedShape;
        e = document.getElementById("s-" + globalSelectedShape);
        e.className = "selected-game-button";
    }
}


function setShape(shape)
{
    // set previously selected button to grey
    var e;
    if(globalSelectedShape === 'x')
    {
        e = document.getElementById("x");
    }
    else
    {
        e = document.getElementById("s-" + globalSelectedShape);
    }
    e.className = "game-button";

    // set the new selected button and style it to highlighted
    globalSelectedShape = shape;
    e = document.getElementById("s-" + globalSelectedShape);
    e.className = "selected-game-button";

    // if the previously selected button was the delete button we want to set the color back too
    if(globalSelectedColor === 'x')
    {
        globalSelectedColor = globalOldSelectedColor;
        e = document.getElementById("c-" + globalSelectedColor);
        e.className = "selected-game-button";
    }
}


function setDelete()
{
    // set previously selected color and shape to grey
    var e = document.getElementById("s-" + globalSelectedShape);
    e.className = "game-button";
    e = document.getElementById("c-" + globalSelectedColor);
    e.className = "game-button";

    // set selected letter and number to x
    globalOldSelectedShape = globalSelectedShape;
    globalOldSelectedColor = globalSelectedColor;

    globalSelectedColor = 'x';
    globalSelectedShape = 'x';

    // set delete button to red
    e = document.getElementById('x');
    e.className = "selected-game-button";
}
