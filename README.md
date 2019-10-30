# Mars Rover

Application that moves a rover around Mars, which is modelled as a rectangular grid.

The rover will be giving a starting coordinate and direction it is facing.  
The rover will take four commands, left, right, up and down.  
On the commands left or right, the rover will rotate -90 or +90 degrees and remain in the same grid
position.  
On the commands up or down, the rover will move one grid position according to the rotation of the rover.  
If the rover attempts to move off the grid it should stop moving.  
If the rover encounters another rover in the same grid position it should stop moving before moving to the
grid position.  
When the rover stops moving it should log out it's final position.

### Sample input:

Grid size: 10, 7  
Rover position: 1, 3  
Rover direction: 0  
Rover input: UUULUUUUUU  
Rover position: 2, 2  
Rover direction: 90  
Rover input: UULLLDDDD  
Rover position: 9, 9  
Rover direction: -90  
Rover input: DDDDRDRDDRUUUUUUUU

## Run:

npm install

npm test
