# endless bento
It's a clone of the bento puzzle minigame from *Nancy Drew: Shadow at the Water's Edge*. I haven't seen this type of puzzle anywhere else (if you have let me know) so I made a browser version that generates its own puzzles and can be played anywhere. [Play here!](https://esmane.github.io/endless-bento/)

## How to play
### Rules
Your goal is to fill the grid with tiles in such a way that all the clues are satisfied and every tile is different (no shape-color combination appears more than once). The clues show you select portions of the solution. You have to use logic to deduce where exactly in the grid each clues goes.

A clue may tell you the shape of a square, the color of a square, or both. Empty squares in a clue must be on the grid, but they could be anything.
For example, in a 3x3 puzzle, if you have a clue that is a 3x2 grid and has 3 circles on the top row and 3 empty squares on the bottom row, you know that the 3 circles are going to be in a row and they are either going to be in the top or middle row (they can't go on the bottom).

### Controls
You select the tile you want to place by using the buttons below the grid. Instead of having a different button for every single possible tile, you select the color and shape that you want separately. You place tiles by clicking on the grid. Depending on the "autoselect mode" that you have set (under settings) the game may select a new color or shape automatically after you place a tile. You can delete a tile from the grid by right-clicking on it, and there is also a delete button below the grid in case you are playing on a touchscreen and can't right-click. Although each shape-color combination is only going to be used once in solving the puzzle, the game does not check this for you and you can (incorrectly) place multiple of the same tile.

## How are the puzzles generated?
First we fill the solution grid randomly with all of the tiles. Then we randomly generate clues that reveal random portions of this grid. After generating a few clues, we attempt to solve the puzzle. If the puzzle is solveable and has an acceptable amount of clues, we call the puzzle complete and draw the clues to the screen. If the puzzle is not solveable, we generate more clues until it is. If the puzzle contains very many clues and is still not solveable, we throw the puzzle away and generate a new one.

## What is the difference between the difficulty levels?
### Junior
- Junior level will always generate a clue that covers the entire grid.
- Junior level restricts the techniques that the internal solver is allowed to use. This forces all Junior puzzles to be solveable using simpler logic than the other two levels.

### Senior
- Senior level generates a clue that covers the entire grid around 50% of the time.
- Senior level is less likely to reveal both the color and the shape of a tile than the other two levels.

### Master
- Master level never generates a clue that covers the entire grid.
- Master level allows more tiles to be revealed across all the clues than the other two levels. This has more to do with making the generation of Master puzzles faster than making them harder to solve.

## Misc
My code is pretty disgusting looking (or is it? I am not a professional) but it is all here if you want to look at it or use it. In the future I will likely update this so that it uses cookies to save the state of the current puzzle. I will also likely continue tweaking the puzzle generation, although I am pretty happy with where it currently is.
