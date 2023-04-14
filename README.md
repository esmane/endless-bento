# endless bento
It's a clone of the bento puzzle minigame from *Nancy Drew: Shadow at the Water's Edge*. I haven't seen this type of puzzle anywhere else (if you have let me know) so I made a browser version that can be played anywhere, because these puzzles are a lot of fun.

## How to play
### Rules
You are given a grid of squares. Your goal is to fill these squares with tiles in such a way that all the clues are met and no shape-color combination appears more than once. The clues appear either to the left or on top of the grid (depending on your screen aspect ratio) and show you select portions of the solution's grid. You have to deduce where exactly in the grid these clues go based on the other clues. A clue may tell you the shape of a square, the color of a square, or both. If a clue contains empty squares that means that there is a tile in that spot, but it could be anything. For example, in a 3x3 puzzle, if you have a clue that is a 3x2 grid and has 3 circles on the top row and 3 empty squares on the bottom row, you know that the 3 circles are going to be in a row and they are either going to be in the top or middle row (they can't go on the bottom).

### Controls
Beneath the grid there is a row of buttons you can press. You can select the color and shape that you want separately and then click on the grid to place that tile. Depending on the "autoselect mode" that you have set (under menu) the game may select a new color or shape automatically after you place a tile. You can delete a tile by right-clicking, but there is also a delete button in case you are playing on a touch screen. Although each shape-color combination is only going to be used once in solving the puzzle, the game does not check this for you and you can (incorrectly) place multiple of the same tile.

## How are the puzzles generated?
First we fill the solution grid randomly with all of the tiles. Then we randomly generate clues that reveal random portions of this grid. The details of these clues depend on the difficulty level selected (check the generator code for details). After generating a few clues, we attempt to solve the puzzle. If the puzzle is solveable we then call the puzzle complete and draw the clues to the screen. If the puzzle is not solveable, we generate more clues until it is.

## Misc
My code is pretty disgusting looking (or is it? I am not a professional) but it is all here if you want to look at it. In the future I will likely update this so that it uses cookies to save your settings and the state of the current puzzle.
