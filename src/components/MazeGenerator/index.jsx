import CanvasLoop from '@components/CanvasLoop'
import { useEffect, useRef, useState } from 'react'
import MazeGrid from './RecursiveBacktracking'

const MazeGenerator = () => {
  const canvasRef = useRef(null)
  const [mazeGrid, setMazeGrid] = useState(null)
  const [hasInstantiated, setHasInstantiated] = useState(false)

  useEffect(() => {
    if (canvasRef.current) {
      setMazeGrid(new MazeGrid(canvasRef.current, 50))
      setHasInstantiated(true)
    }
  }, [canvasRef])

  useEffect(() => {
    if (hasInstantiated && mazeGrid) {
      mazeGrid.draw()
    }
  }, [hasInstantiated])

  const draw = () => {
    mazeGrid.draw()
    return [mazeGrid.hasStarted, mazeGrid.hasFinished]
  }

  const reset = () => {
    mazeGrid.reset(50)
  }

  return (
    <CanvasLoop
      width={500}
      height={500}
      forwardedRef={canvasRef}
      draw={draw}
      reset={reset}
      drawText={'Generate Maze'}
      resetText={'Reset Maze'}
    />
  )
}

export default MazeGenerator
