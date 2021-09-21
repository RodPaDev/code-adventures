import { useEffect, useRef, useState } from 'react'
import { saveAs } from 'file-saver'

import MazeGrid from './RecursiveBacktracking'

import CanvasLoop from '@components/CanvasLoop'

const exponentialStep = [8, 16, 32, 64, 128]
const saveAsOptions = ['json', 'png', 'svg']

const MazeGenerator = () => {
  const canvasRef = useRef(null)
  const [mazeGrid, setMazeGrid] = useState(null)
  const [hasInstantiated, setHasInstantiated] = useState(false)
  const [cellSize, setCellSize] = useState(2)
  const [isExportable, setIsExportable] = useState(false)
  const [exportMode, setExportMode] = useState('jpg')

  useEffect(() => {
    if (canvasRef.current) {
      setMazeGrid(
        new MazeGrid(canvasRef.current, exponentialStep[cellSize - 1])
      )
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
    mazeGrid.reset(exponentialStep[cellSize - 1])
  }

  const onResizeGrid = e => {
    e.preventDefault()
    setCellSize(e.currentTarget.value)
  }

  const exportGrid = e => {
    const data = mazeGrid.export()
    if (mazeGrid.hasFinished && isExportable) {
      if(exportMode === 'json'){
        // const blob = new Blob([JSON.stringify(data)], {
        //   type: 'text/plain;charset=utf-8'
        // })
        // saveAs(blob, `maze-${data.id}.json`)
      } else {
        mazeGrid.canvas.toBlob(blob => {
          saveAs(blob, `maze-${data.id}.${exportMode}`)
        })
      }

    }
  }

  return (
    <div>
      <CanvasLoop
        width={512}
        height={512}
        forwardedRef={canvasRef}
        draw={draw}
        reset={reset}
        drawText={'Generate Maze'}
        resetText={'Reset Maze'}
        setIsExportable={setIsExportable}
      />
      <label htmlFor='cell-size'>{exponentialStep[cellSize - 1]}</label>
      <input
        type='range'
        name='cell-size'
        id='cell-size'
        min={1}
        max={5}
        step={1}
        value={cellSize}
        onChange={onResizeGrid}
      />
      <button
        disabled={!isExportable}
        className={`text-white ${
          isExportable ? 'opacity-100 hover:bg-yellow-600' : 'opacity-50 cursor-not-allowed'
        } bg-yellow-500 border-0 py-2 px-6 focus:outline-none rounded`}
        onClick={exportGrid}
      >
        Export
      </button>
    </div>
  )
}

export default MazeGenerator
