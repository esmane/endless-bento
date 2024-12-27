// these come in handy
const COLOR = 0;
const SHAPE = 1;
const DELETE = 2;

// don't repeat yourself
// what: what we are setting
// set: true if we are selecting, false if we are unselecting
function setButton(what, set)
{
    // no need to do anything if we don't have anything selected
    if((what === COLOR && globalSelectedColor === 'x') || (what === SHAPE && globalSelectedShape === 'x'))
    {
        return;
    }
    
    var e;
    
    if(what === COLOR)
    {
        e = document.getElementById("c-" + globalSelectedColor);
    }
    else if(what === SHAPE)
    {
        e = document.getElementById("s-" + globalSelectedShape);
    }
    else
    {
        e = document.getElementById("x");
    }
    
    if(set)
    {
        e.className = "selected-game-button";
    }
    else
    {
        e.className = "game-button";
    }
}

function checkDelete()
{
    if(globalSelectedShape === 'x' && globalSelectedColor === 'x')
    {
        globalSelectedDelete = true;
        setButton(DELETE, true);
    }
}


// these functions are executed when the buttons at the bottom of the puzzle are clicked.
// they set the color and shape of the tile that will get placed when the grid is clicked.
// additionally we can set to delete mode, and we have the function that sets that in here as well.
function setColor(color)
{
    // if we click the currently selected color, and we are not in delete mode, unset the  color
    if(globalSelectedColor === color && globalSelectedDelete === false)
    {
        setButton(COLOR, false);
        globalSelectedColor = 'x';
    }
    else
    {
        // set previously selected button to grey
        if(globalSelectedDelete)
        {
            // if delete was selected we want to do two things: set the shape and unset the x
            setButton(DELETE, false);
            setButton(SHAPE, true);
            
            globalSelectedDelete = false;
        }
        else
        {
            // otherwise we need to unset the previously selected color
            setButton(COLOR, false);
        }

        // now set the new selected color and style it to highlighted
        globalSelectedColor = color;
        setButton(COLOR, true);
    }
    
    checkDelete();
}


function setShape(shape)
{
    // if we click the currently selected shape, and we are not in delete mode, unset the shape
    if(globalSelectedShape === shape && globalSelectedDelete === false)
    {
        setButton(SHAPE, false);
        globalSelectedShape = 'x';
    }
    else
    {
        // set previously selected button to grey
        if(globalSelectedDelete)
        {
            // if delete was selected we want to do two things: set the color and unset the x
            setButton(DELETE, false);
            setButton(COLOR, true);
            
            globalSelectedDelete = false;
        }
        else
        {
            // otherwise we need to unset the previously selected shape
            setButton(SHAPE, false);
        }

        // now set the new selected shape and style it to highlighted
        globalSelectedShape = shape;
        setButton(SHAPE, true);
    }
    
    // oh, and one more thing
    checkDelete();
}


function setDelete()
{
    // if we are in delete mode, unset delete mode
    if(globalSelectedDelete)
    {
        globalSelectedDelete = false;
        
        // uncolor x and color selected shape and color
        setButton(COLOR, true);
        setButton(SHAPE, true);
        setButton(DELETE, false);
    }
    // otherwise set delete mode
    else
    {
        globalSelectedDelete = true;
        
        // uncolor shape and color and color x
        setButton(COLOR, false);
        setButton(SHAPE, false);
        setButton(DELETE, true);
    }
}
