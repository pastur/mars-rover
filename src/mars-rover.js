
function marsRover (initialState, grid, input) {
  if (initialState.stopped) { return initialState }
  var state = JSON.parse(JSON.stringify( initialState ));
  for (var command of input) {
    commands[command]? commands[command](state, grid) : unknownCommand()
    if (state.stopped) { break }
  }
  return state
}

const directions = ['↠', '↡', '←', '↑']
const forward = { '↠': [1, 0], '↡': [0, -1], '←': [-1, 0], '↑': [0, 1] }
const reverse = { '↠': [-1, 0], '↡': [0, 1], '←': [1, 0], '↑': [0, -1] }

const commands = {
  'L': leftHandler,
  'R': rightHandler,
  'U': upHandler,
  'D': downHandler
}

const unknownCommand = () => console.log("unknown command")

function getDirectionIndex (direction) {
  for (var i = 0; i < directions.length; i++) {
    if (direction === directions[i]) { return i }
  }
  return 0
}

function leftHandler (state) {
  turn(state, toLeft)
}

function rightHandler (state) {
  turn(state, toRight)
}

function turn(state, toDirection) {
  const currentIndex = getDirectionIndex(state.direction)
  const newIndex = toDirection(currentIndex)
  state.direction = directions[newIndex]
}

const toLeft = (index) => (index - 1 + directions.length) % directions.length
const toRight = (index) => (index + 1) % directions.length

function upHandler (state, grid) {
  moveRover(state, grid, forward)
}

function downHandler (state, grid) {
  moveRover(state, grid, reverse)
}

function moveRover (state, grid, movements) {
  var newPosition = move(state.position, movements[state.direction]);
  if (isOutside(newPosition, grid.dimensions) || isCollision(newPosition, grid.rovers)) {
    state.stopped = true
  } else {
    state.position = newPosition
  }
}

const axis = {
  x: 0,
  y: 1
}

function move (origin, movement) {
  return [origin[axis.x] + movement[axis.x], origin[axis.y] + movement[axis.y] ]
}

function isOutside (position, dimensions) {
  return ( (position[axis.x] < 0 )
    || (position[axis.y] < 0 )
    || (position[axis.x] >= dimensions[axis.x])
    || (position[axis.y] >= dimensions[axis.y]) )
}

function isCollision (position, rovers) {
  for (var rover of rovers) {
    if (overlaps(position, rover)) { return true }
  }
  return false
}

function overlaps (p1, p2) {
  return (p1[axis.x] === p2[axis.x]) && (p1[axis.y] === p2[axis.y])
}

module.exports = marsRover