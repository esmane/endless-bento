// check if the puzzle has been solved
// source: https://stackoverflow.com/questions/27102507/assert-if-two-2d-arrays-are-equal
function equal(array1, array2) {
    if (!Array.isArray(array1) && !Array.isArray(array2)) {
        return array1 === array2;
    }

    if (array1.length !== array2.length) {
        return false;
    }

    for (var i = 0, len = array1.length; i < len; i++) {
        if (!equal(array1[i], array2[i])) {
            return false;
        }
    }
    return true;
}

// set the player grid to all blanks
function clearPlayerGrid()
{
	playerGrid = [];
	for(let i = 0; i < GRID_SIZE_W; i++)
	{
		playerGrid[i] = [];
		for(let j = 0; j < GRID_SIZE_H; j++)
		{
			playerGrid[i][j] = "x-x";
		}
	}
}

function redrawGrid()
{
	for(let i = 0; i < GRID_SIZE_W; i++)
	{
		for(let j = 0; j < GRID_SIZE_H; j++)
		{
			document.getElementById(i + '-' + j).src = "./tiles/" + playerGrid[i][j] + ".png";
		}
	}
}

function setTile(x, y)
{
	playerGrid[x][y] = selectedLetter + '-' + selectedNumber;
	document.getElementById(x + '-' + y).src = "./tiles/" + playerGrid[x][y] + ".png";
	
	if(equal(playerGrid, solutionGrid))
	{
		// delay the alert slightly so that we can see the completed puzzle on chrome
		setTimeout(alert("Congratulations! The puzzle is completely solved."), 10);
		newPuzzle();
	}
	else
	{
		// select a new tiles
		if(autoSelect === 'n')
		{
			switch(selectedNumber)
			{
			case '1':
				{
					setNumber('2');
				}
				break;
				
			case '2':
				{
					setNumber('3');
				}
				break;
			case '3':
				{
					setNumber('1');
				}
				break;
			}
		}
		else if(autoSelect === 'l')
		{
			switch(selectedLetter)
			{
			case 'a':
				{
					setLetter('b');
				}
				break;
				
			case 'b':
				{
					setLetter('c');
				}
				break;
			case 'c':
				{
					setLetter('a');
				}
				break;
			}
		}	
	}
}

function clearTile(x, y)
{
	playerGrid[x][y] = "x-x";
	document.getElementById(x + '-' + y).src = "./tiles/" + playerGrid[x][y] + ".png";
}
