import { nanoid } from 'nanoid'

class MazeGrid {
  constructor(canvas, cellSize = 5) {
    this.id = nanoid(6)
    this.canvas = canvas
    this.context = canvas.getContext('2d')
    this.cellSize = cellSize
    this.columns = Math.floor(canvas.width / cellSize)
    this.rows = Math.floor(canvas.height / cellSize)
    this.stack = []
    this.grid = []
    this.currentCell = null
    this.hasStarted = false
    this.hasFinished = false
    this.init()
  }

  init() {
    let x = 0
    let y = 0
    while (x < this.rows) {
      y = 0
      while (y < this.columns) {
        this.grid.push(new MazeCell(x, y))
        y += 1
      }
      x += 1
    }

    this.currentCell = this.grid[0]
  }

  reset(cellSize) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.id = nanoid(6)
    this.cellSize = cellSize
    this.columns = Math.floor(this.canvas.width / cellSize)
    this.rows = Math.floor(this.canvas.height / cellSize)
    this.stack = []
    this.grid = []
    this.currentCell = null
    this.hasStarted = false
    this.hasFinished = false
    this.init()
  }

  draw() {
    this.hasStarted = true
    this.context.fillStyle = 'white'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for (let cell of this.grid) {
      cell.draw(this.context, this.cellSize, !this.hasFinished)
    }

    this.currentCell.visited = true
    this.currentCell.highlight(this.context, this.cellSize, !this.hasFinished)
    const next = this.currentCell.checkAdjacentCell(
      this.grid,
      this.columns,
      this.rows
    )
    if (next) {
      next.visited = true
      this.stack.push(this.currentCell)
      this.removeWalls(this.currentCell, next)
      this.currentCell = next
    } else if (this.stack.length > 0) {
      this.currentCell = this.stack.pop()
    }

    this.hasFinished =
      this.hasStarted &&
      this.stack.length === 0 &&
      this.currentCell.row === 0 &&
      this.currentCell.column === 0
  }

  removeWalls(current, next) {
    const x = current.row - next.row
    const y = current.column - next.column
    if (x === 1) {
      current.walls.left = false
      next.walls.right = false
    } else if (x === -1) {
      current.walls.right = false
      next.walls.left = false
    }

    if (y === 1) {
      current.walls.top = false
      next.walls.bottom = false
    } else if (y === -1) {
      current.walls.bottom = false
      next.walls.top = false
    }
  }

  export() {
    return {
      id: this.id,
      cellSize: this.cellSize,
      rows: this.rows,
      columns: this.columns,
      grid: this.grid
    }
  }
}
class MazeCell {
  constructor(row, column) {
    this.row = row
    this.column = column
    this.walls = { top: true, right: true, bottom: true, left: true }
    this.visited = false
  }

  highlight(context, cellSize, render) {
    const x = this.row * cellSize
    const y = this.column * cellSize
    if (render) {
      context.fillStyle = 'rgba(245, 158, 11, 1)'
      context.fillRect(x, y, cellSize, cellSize)
    }
  }

  checkAdjacentCell(grid, columns, rows) {
    let unvisited = []
    const top = grid[this.index(this.row, this.column - 1, columns, rows)]
    const right = grid[this.index(this.row + 1, this.column, columns, rows)]
    const bottom = grid[this.index(this.row, this.column + 1, columns, rows)]
    const left = grid[this.index(this.row - 1, this.column, columns, rows)]

    if (top && !top.visited) unvisited.push(top)
    if (right && !right.visited) unvisited.push(right)
    if (bottom && !bottom.visited) unvisited.push(bottom)
    if (left && !left.visited) unvisited.push(left)

    const randomIndex = Math.floor(Math.random() * unvisited.length)
    return unvisited.length > 0 ? unvisited[randomIndex] : null
  }

  draw(context, cellSize, render = true) {
    const x = this.row * cellSize
    const y = this.column * cellSize

    const wallLines = {
      top: () => this.line(x, y, x + cellSize, y, context),
      right: () =>
        this.line(x + cellSize, y, x + cellSize, y + cellSize, context),
      bottom: () => this.line(x, y + cellSize, x, y + cellSize, context),
      left: () => this.line(x, y + cellSize, x, y, context)
    }

    context.strokeStyle = 'black'
    context.beginPath()
    for (const [side, isToDraw] of Object.entries(this.walls)) {
      if (isToDraw) wallLines[side]()
    }
    context.stroke()

    if (render && this.visited) {
      context.fillStyle = 'rgba(245, 158, 11, 0.5)'
      context.fillRect(x, y, cellSize, cellSize)
    }
  }

  line(startX, startY, a, b, context) {
    context.moveTo(startX, startY)
    context.lineTo(a, b)
  }

  index(row, column, columns, rows) {
    const outOfBounds =
      column < 0 || row < 0 || column > columns - 1 || row > rows - 1
    return !outOfBounds ? column + row * columns : -1
  }
}

export default MazeGrid
