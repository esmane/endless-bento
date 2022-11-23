function random_range(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newPuzzle()
{
	switch(difficulty)
	{
		case 0:
			generatePuzzleById(random_range(1, 20));
			break;
		case 1:
			generatePuzzleById(random_range(1, 10));
			break;
		case 2:
			generatePuzzleById(random_range(11, 20));
			break;
	}
}

function generatePuzzleById(id)
{
	// first let's load up the proper clues and solution grid for our puzzle into arrays
	switch(id)
	{
		case 1:
			puzzle1();
			break;
		case 2:
			puzzle2();
			break;
		case 3:
			puzzle3();
			break;
		case 4:
			puzzle4();
			break;
		case 5:
			puzzle5();
			break;
		case 6:
			puzzle6();
			break;
		case 7:
			puzzle7();
			break;
		case 8:
			puzzle8();
			break;
		case 9:
			puzzle9();
			break;
		case 10:
			puzzle10();
			break;
		case 11:
			puzzle11();
			break;
		case 12:
			puzzle12();
			break;
		case 13:
			puzzle13();
			break;
		case 14:
			puzzle14();
			break;
		case 15:
			puzzle15();
			break;
		case 16:
			puzzle16();
			break;
		case 17:
			puzzle17();
			break;
		case 18:
			puzzle18();
			break;
		case 19:
			puzzle19();
			break;
		case 20:
			puzzle20();
			break;
	}
	
	// now let's draw those arrays to the screen
	clearClues();
	for(let i = 0; i < clues.length; i++)
	{
		drawClue(clues[i]);
	}	
}