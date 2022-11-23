// what is this even for?
// the solutions as defined in solution.js have the solutiongrid and clues defined with d, e, f and 4, 5, 6
// this is so we can shuffle them up when we actually draw the puzzle
// to create the illusion of there being more different puzzles than there are
var solutionD = 'a';
var solutionE = 'b';
var solutionF = 'c';
var solution4 = '1';
var solution5 = '2';
var solution6 = '3';

// shuffle function for clues 
// source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function random_range(min, max)
{
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function newPuzzle()
{
	// reset the grid
	clearPlayerGrid();
	redrawGrid();
	
	let oldPuzzleId = puzzleId;
	
	switch(difficulty)
	{
		case 0:
			while(puzzleId === oldPuzzleId)
			{
				puzzleId = random_range(1, 20);
			}
			break;
		case 1:
			while(puzzleId === oldPuzzleId)
			{
				puzzleId = random_range(1, 10);
			}
			break;
		case 2:
			while(puzzleId === oldPuzzleId)
			{
				puzzleId = random_range(11, 20);
			}
			break;
	}
	generatePuzzleById(puzzleId);
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
	
	// now let's figure out what shape each letter is going to be etc
	solutionF = "abc";
	solutionD = solutionF.charAt(random_range(0, 2));
	solutionF = solutionF.replace(solutionD, '');
	solutionE = solutionF.charAt(random_range(0, 1));
	solutionF = solutionF.replace(solutionE, '');
	
	solution6 = "123";
	solution4 = solution6.charAt(random_range(0, 2));
	solution6 = solution6.replace(solution4, '');
	solution5 = solution6.charAt(random_range(0, 1));
	solution6 = solution6.replace(solution5, '');
	
	// now let's adjust the solutiongrid
	for(let i = 0; i < solutionGrid.length; i++)
	{
		for(let j = 0; j < solutionGrid[i].length; j++)
		{
			solutionGrid[i][j] = solutionGrid[i][j].replace('d', solutionD);
			solutionGrid[i][j] = solutionGrid[i][j].replace('e', solutionE);
			solutionGrid[i][j] = solutionGrid[i][j].replace('f', solutionF);
			solutionGrid[i][j] = solutionGrid[i][j].replace('4', solution4);
			solutionGrid[i][j] = solutionGrid[i][j].replace('5', solution5);
			solutionGrid[i][j] = solutionGrid[i][j].replace('6', solution6);
		}
	}
	// and the clues
	for(let i = 0; i < clues.length; i++)
	{
		for(let j = 0; j < clues[i].length; j++)
		{
			for(let k = 0; k < clues[i][j].length; k++)
			{
			clues[i][j][k] = clues[i][j][k].replace('d', solutionD);
			clues[i][j][k] = clues[i][j][k].replace('e', solutionE);
			clues[i][j][k] = clues[i][j][k].replace('f', solutionF);
			clues[i][j][k] = clues[i][j][k].replace('4', solution4);
			clues[i][j][k] = clues[i][j][k].replace('5', solution5);
			clues[i][j][k] = clues[i][j][k].replace('6', solution6);
			}
		}
	}
	
	// now let's draw those arrays to the screen
	clearClues();
	shuffleArray(clues);
	for(let i = 0; i < clues.length; i++)
	{
		drawClue(clues[i]);
	}	
}