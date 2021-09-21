import { useEffect, useRef, useState } from 'react'
import { saveAs } from 'file-saver'
import Select from 'react-select'

import MazeGrid from './RecursiveBacktracking/RecursiveBacktracking'

import CanvasLoop from '@components/CanvasLoop'

const exponentialStep = [8, 16, 32, 64, 128]
const saveAsOptions = ['json', 'png', 'jpg']
const canvasSize = 512

const MazeGenerator = () => {
  const canvasRef = useRef(null)
  const [mazeGrid, setMazeGrid] = useState(null)
  const [hasInstantiated, setHasInstantiated] = useState(false)
  const [cellSize, setCellSize] = useState(3)
  const [isExportable, setIsExportable] = useState(false)
  const [exportMode, setExportMode] = useState({ value: 'jpg', label: 'JPG' })
  const [gridSize, setGridSize] = useState(
    canvasSize / exponentialStep[cellSize - 1]
  )

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
    let parsedValue = parseInt(e.currentTarget.value, 10)
    setGridSize(canvasSize / exponentialStep[parsedValue - 1])
  }

  const exportGrid = e => {
    const data = mazeGrid.export()
    if (mazeGrid.hasFinished && isExportable) {
      if (exportMode.value === 'json') {
        const blob = new Blob([JSON.stringify(data)], {
          type: 'text/plain;charset=utf-8'
        })
        saveAs(blob, `maze-${data.id}.json`)
      } else {
        mazeGrid.canvas.toBlob(blob => {
          saveAs(blob, `maze-${data.id}.${exportMode.value}`)
        })
      }
    }
  }

  const handleInput = value => {
    setExportMode(value)
  }

  return (
    <div className='flex gap-x-5'>
      <div className='flex flex-col gap-5'>
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
        <div className='flex gap-5'>
          <div className='flex flex-col'>
            <label htmlFor='cell-size'>
              Grid Size: {gridSize}x{gridSize}
            </label>
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
          </div>
          <div className='flex gap-5'>
            <Select
              className='min-w-full'
              value={exportMode}
              onChange={handleInput}
              options={saveAsOptions.map(item => ({
                value: item,
                label: item.toUpperCase()
              }))}
            />
            <button
              disabled={!isExportable}
              className={`text-white ${
                isExportable
                  ? 'opacity-100 hover:bg-yellow-600'
                  : 'opacity-50 cursor-not-allowed'
              } bg-yellow-500 border-0 py-2 px-6 focus:outline-none rounded whitespace-nowrap`}
              onClick={exportGrid}
            >
              Export
            </button>
          </div>
        </div>
      </div>
      {/* <div>hello</div> */}
    </div>
  )
}

export default MazeGenerator
