class Maze {
  constructor(canvas, cellSize = 5) {
    this.canvas = canvas
    this.context = canvas.getthis.Context('2d')
    this.cellSize = cellSize
    this.columns = Math.floor(canvas.width / cellSize)
    this.rows = Math.floor(canvas.height / cellSize)

    this.grid = []
    this.currentCell = null
    this.hasStarted = false
    this.hasFinished = false
    this.columns = Math.floor()
  }

  init() {
    let x = 0
    let y = 0
    while (x < this.rows) {
      y = 0
      while (y < this.columns) {
        const cell = new Cell(x, y)
        this.grid.push(cell)
        y += 1
      }
      x += 1
    }

    this.currentCell = this.grid[0]
  }

  draw() {
    this.context.fillStyle = 'gray'
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height)
    for (let cell of this.grid) {
      cell.draw(!this.hasFinished)
    }

    this.currentCell.visited = true
    this.currentCell.highlight(!this.hasFinished)
    const next = this.currentCell.checkAdjacentCell()
    if (next) {
      this.hasStarted = true
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
}

class Cell extends Maze {
  constructor(row, column, canvas, cellSize) {
    super(canvas, cellSize)
    this.row = row
    this.column = column
    this.walls = { top: true, right: true, bottom: true, left: true }
    this.visited = false
  }

  highlight(render) {
    const x = this.row * this.cellSize
    const y = this.column * this.cellSize
    if (render) {
      this.context.fillStyle = 'rgba(127, 255, 0, 0.5)'
      this.context.fillRect(x, y, this.cellSize, this.cellSize)
    }
  }

  checkAdjacentCell() {
    let unvisited = []
    const top = this.grid[this.index(this.row, this.column - 1)]
    const right = this.grid[this.index(this.row + 1, this.column)]
    const bottom = this.grid[this.index(this.row, this.column + 1)]
    const left = this.grid[this.index(this.row - 1, this.column)]

    if (top && !top.visited) unvisited.push(top)
    if (right && !right.visited) unvisited.push(right)
    if (bottom && !bottom.visited) unvisited.push(bottom)
    if (left && !left.visited) unvisited.push(left)

    const randomIndex = Math.floor(Math.random() * unvisited.length)
    return unvisited.length > 0 ? unvisited[randomIndex] : null
  }

  draw(render) {
    const x = this.row * this.cellSize
    const y = this.column * this.cellSize

    const wallLines = {
      top: () => this.line(x, y, x + this.cellSize, y),
      right: () =>
        this.line(x + this.cellSize, y, x + this.cellSize, y + this.cellSize),
      bottom: () => this.line(x, y + this.cellSize, x, y + this.cellSize),
      left: () => this.line(x, y + this.cellSize, x, y)
    }

    this.context.strokeStyle = 'black'
    this.context.beginPath()
    for (const [side, isToDraw] of Object.entries(this.walls)) {
      if (isToDraw) wallLines[side]()
    }
    this.context.stroke()

    if (render && this.visited) {
      this.context.fillStyle = 'rgba(259,139,32,0.50)'
      this.context.fillRect(x, y, this.cellSize, this.cellSize)
    }
  }

  line(startX, startY, a, b) {
    this.context.moveTo(startX, startY)
    this.context.lineTo(a, b)
  }

  index(row, column) {
    const outOfBounds =
      column < 0 || row < 0 || column > this.columns - 1 || row > this.rows - 1
    return !outOfBounds ? column + row * this.columns : -1
  }
}
