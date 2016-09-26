const marsRover = require('../src/mars-rover')
const expect = require("chai").expect

describe('Mars Rover', () => {

  describe('When the rover is stopped', () => {
    const grid = {}
    const state = {
      stopped: true
    }

    it('should return previous state', () => {
      const input = "U"
      const result = marsRover(state, grid, input)
      expect(result).to.equal(state)
    });
  });

  describe('R command (turn right)', () => {
    const grid = {}
    const input = "R"

    it('should change direction from ↠ to ↡', () => {
      const state = {
        direction: '↠'
      }
      const result = marsRover(state, grid, input)
      expect(result.direction).to.equal('↡')
    });

    it('should change direction from ↡ to ←', () => {
      const state = {
        direction: '↡'
      }
      const result = marsRover(state, grid, input)
      expect(result.direction).to.equal('←')
    });

    it('should change direction from ← to ↑', () => {
      const state = {
        direction: '←'
      }
      const result = marsRover(state, grid, input)
      expect(result.direction).to.equal('↑')
    });

    it('should change direction from ↑ to ↠', () => {
      const state = {
        direction: '↑'
      }
      const result = marsRover(state, grid, input)
      expect(result.direction).to.equal('↠')
    });
  });

  describe('L command (turn left)', () => {
    const grid = {}
    const input = "L"

    it('should change direction from ↠ to ↑', () => {
      const state = {
        direction: '↠'
      }
      const result = marsRover(state, grid, input)
      expect(result.direction).to.equal('↑')
    });

    it('should change direction from ↡ to ↠', () => {
      const state = {
        direction: '↡'
      }
      const result = marsRover(state, grid, input)
      expect(result.direction).to.equal('↠')
    });

    it('should change direction from ← to ↡', () => {
      const state = {
        direction: '←'
      }
      const result = marsRover(state, grid, input)
      expect(result.direction).to.equal('↡')
    });

    it('should change direction from ↑ to ←', () => {
      const state = {
        direction: '↑'
      }
      const result = marsRover(state, grid, input)
      expect(result.direction).to.equal('←')
    });
  });

  describe('U command (move forward)', () => {
    const emptyGrid = {
      dimensions: [10, 10],
      rovers: []
    }
    const input = "U"

    it('should increase X position when direction is ↠', () => {
      const state = {
        position: [0, 0],
        direction: '↠'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([1, 0])
      expect(result.stopped).to.not.be.true
    });

    it('should decrease Y position when direction is ↡', () => {
      const state = {
        position: [0, 2],
        direction: '↡'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([0, 1])
      expect(result.stopped).to.not.be.true

    });

    it('should decrease X position when direction is ←', () => {
      const state = {
        position: [2, 0],
        direction: '←'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([1, 0])
      expect(result.stopped).to.not.be.true
    });

    it('should increase Y position when direction is ↑', () => {
      const state = {
        position: [0, 0],
        direction: '↑'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([0, 1])
      expect(result.stopped).to.not.be.true
    });

    it('should stop the rover and keep position when direction is ↑ and rover is at the grid top limit', () => {
      const state = {
        position: [0, 9],
        direction: '↑'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([0, 9])
      expect(result.stopped).to.be.true
    });

    it('should stop the rover and keep position when direction is ↡ and rover is at the grid bottom limit', () => {
      const state = {
        position: [5, 0],
        direction: '↡'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([5, 0])
      expect(result.stopped).to.be.true
    });

    it('should stop the rover and keep position when direction is ← and rover is at the grid left limit', () => {
      const state = {
        position: [0, 5],
        direction: '←'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([0, 5])
      expect(result.stopped).to.be.true
    });

    it('should stop the rover and keep position when direction is ↠ and rover is at the grid right limit', () => {
      const state = {
        position: [9, 5],
        direction: '↠'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([9, 5])
      expect(result.stopped).to.be.true
    });

    it('should stop the rover and keep position if encounters another rover in the same grid position', () => {
      const grid = {
        dimensions: [10, 10],
        rovers: [[2, 1]]
      }
      const state = {
        position: [1, 1],
        direction: '↠'
      }
      const result = marsRover(state, grid, input)
      expect(result.position).to.deep.equal([1, 1])
      expect(result.stopped).to.be.true
    });
  });

  describe('D command (move backwards)', () => {
    const emptyGrid = {
      dimensions: [10, 10],
      rovers: []
    }
    const input = "D"

    it('should decrease X position when direction is ↠', () => {
      const state = {
        position: [2, 0],
        direction: '↠'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([1, 0])
      expect(result.stopped).to.not.be.true
    });

    it('should increase Y position when direction is ↡', () => {
      const state = {
        position: [0, 0],
        direction: '↡'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([0, 1])
      expect(result.stopped).to.not.be.true

    });

    it('should increase X position when direction is ←', () => {
      const state = {
        position: [0, 0],
        direction: '←'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([1, 0])
      expect(result.stopped).to.not.be.true
    });

    it('should decrease Y position when direction is ↑', () => {
      const state = {
        position: [0, 2],
        direction: '↑'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([0, 1])
      expect(result.stopped).to.not.be.true
    });

    it('should stop the rover and keep position when direction is ↑ and rover is at the grid bottom limit', () => {
      const state = {
        position: [5, 0],
        direction: '↑'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([5, 0])
      expect(result.stopped).to.be.true
    });

    it('should stop the rover and keep position when direction is ↡ and rover is at the grid top limit', () => {
      const state = {
        position: [5, 9],
        direction: '↡'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([5, 9])
      expect(result.stopped).to.be.true
    });

    it('should stop the rover and keep position when direction is ← and rover is at the grid right limit', () => {
      const state = {
        position: [9, 5],
        direction: '←'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([9, 5])
      expect(result.stopped).to.be.true
    });

    it('should stop the rover and keep position when direction is ↠ and rover is at the grid left limit', () => {
      const state = {
        position: [0, 5],
        direction: '↠'
      }
      const result = marsRover(state, emptyGrid, input)
      expect(result.position).to.deep.equal([0, 5])
      expect(result.stopped).to.be.true
    });

    it('should stop the rover and keep position if encounters another rover in the same grid position', () => {
      const grid = {
        dimensions: [10, 10],
        rovers: [[1, 1]]
      }
      const state = {
        position: [2, 1],
        direction: '↠'
      }
      const result = marsRover(state, grid, input)
      expect(result.position).to.deep.equal([2, 1])
      expect(result.stopped).to.be.true
    });
  });

  describe('When avoiding other rovers', () => {
    const grid = {
      dimensions: [10, 10],
      rovers: [[1, 2], [2, 3], [3, 4]]
    }
    const state = {
      position: [0, 0],
      direction: '↠'
    }
    const expected = {
      position: [9, 9],
      direction: '↑'
    }

    it('should go from one corner of the grid to the opposite', () => {
      const input = "UUUUUUUUULUUUUUUUUU"
      const result = marsRover(state, grid, input)
      expect(result).to.deep.equal(expected)
    });

    it('should go from one corner of the grid to the opposite through the diagonal', () => {
      const input = "ULURULURULURULURULURULURULURULURULU"
      const result = marsRover(state, grid, input)
      expect(result).to.deep.equal(expected)
    });
  });

});
