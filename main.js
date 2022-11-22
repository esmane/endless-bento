// global settings
const GRID_SIZE_W = 3;
const GRID_SIZE_H = 3;

// variables
var playerGrid;
var solutionGrid;

var selectedLetter = 'a';
var selectedNumber = '1';
var oldSelectedLetter = 'a';
var oldSelectedNumber = '1';


// this function runs on startup and is responsible for starting the game
window.onload = function()
{
	clearPlayerGrid();
	
	setLetter('a');
	setNumber('1');	
	
	puzzle1();
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


function setTile(x, y)
{
	playerGrid[x][y] = selectedLetter + '-' + selectedNumber;
	document.getElementById(x + '-' + y).src = "./tiles/" + playerGrid[x][y] + ".png";
	
	if(playerGrid === solutionGrid)
	{
		alert("Congratulations! The puzzle is completely solved");
	}
	else
	{
		// select a new tiles
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
}

function clearTile(x, y)
{
	playerGrid[x][y] = "x-x";
	document.getElementById(x + '-' + y).src = "./tiles/" + playerGrid[x][y] + ".png";
}

