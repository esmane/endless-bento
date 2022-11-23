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
		playerGrid[i] = [];
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
	
	if(playerGrid === solutionGrid)
	{
		alert("Congratulations! The puzzle is completely solved");
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