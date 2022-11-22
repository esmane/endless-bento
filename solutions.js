function puzzle1()
{
solutionGrid = [["a-3", "b-2", "a-1"],
				["b-1", "a-2", "c-1"],
				["b-3", "c-3", "c-2"]];
				
drawClue([["a", "x-x", "1"],
		  ["b-1", "x-x", "c-1"],
	      ["b-3", "c", "x-x"]]);
		  
drawClue([["b"], ["x-x"], ["3"]]);

drawClue([["3", "x-x", "c"]]);

drawClue([["3", "x-x"], ["x-x", "a"]]);
}