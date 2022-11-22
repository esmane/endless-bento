// these functions are called when you press a button in the game to select a new tile
function setLetter(a)
{
	// set previously selected letter button to grey
	var e = document.getElementById(selectedLetter);
	e.className = "game-button";
	
	// set the new selected letter and style the button to highlighted
	selectedLetter = a;
	e = document.getElementById(selectedLetter);
	e.className = "selected-game-button";
	
	if(selectedNumber === 'x')
	{
		selectedNumber = oldSelectedNumber;
		e = document.getElementById(selectedNumber);
		e.className = "selected-game-button";
	}
}

function setNumber(a)
{
	// set previously selected letter button to grey
	var e = document.getElementById(selectedNumber);
	e.className = "game-button";
	
	// set the new selected letter and style the button to highlighted
	selectedNumber = a;
	e = document.getElementById(selectedNumber);
	e.className = "selected-game-button";
	
	if(selectedLetter === 'x')
	{
		selectedLetter = oldSelectedLetter
		e = document.getElementById(selectedLetter);
		e.className = "selected-game-button";
	}
}

function setDelete()
{
	// set previously selected letter and number to grey
	var e = document.getElementById(selectedLetter);
	e.className = "game-button";
	e = document.getElementById(selectedNumber);
	e.className = "game-button";
	
	// set selected letter and number to x
	oldSelectedLetter = selectedLetter;
	oldSelectedNumber = selectedNumber;
	
	selectedLetter = 'x';
	selectedNumber = 'x';
	
	// set delete button to red
	e = document.getElementById('x');
	e.className = "selected-game-button";
}