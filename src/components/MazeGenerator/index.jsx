import { useEffect, useRef, useState } from 'react'
import { saveAs } from 'file-saver'
import Select from 'react-select'

import MazeGrid from './RecursiveBacktracking'

import CanvasLoop from '@components/CanvasLoop'

const exponentialStep = [8, 16, 32, 64, 128]
const saveAsOptions = ['json', 'png', 'jpg']
const canvasSize = 512

const MazeGenerator = () => {
  const canvasRef = useRef(null)
  const [mazeGrid, setMazeGrid] = useState(null)
  const [hasInstantiated, setHasInstantiated] = useState(false)
  const [cellSize, setCellSize] = useState(2)
  const [isExportable, setIsExportable] = useState(false)
  const [exportMode, setExportMode] = useState('jpg')
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
      if (exportMode === 'json') {
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
      <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi elementum lectus vel rutrum dictum. Vivamus in tincidunt erat, a malesuada risus. Nunc eget elit in lorem vulputate viverra. Praesent cursus hendrerit magna ac tempor. Aliquam maximus felis tellus, nec volutpat dolor dignissim quis. Phasellus et nibh quis justo rhoncus auctor id eget augue. Pellentesque mollis hendrerit est, non dapibus tortor dictum a. Proin neque urna, sollicitudin vel sodales at, aliquet sit amet mi. Aliquam a volutpat tellus. Fusce accumsan condimentum cursus. Aliquam erat volutpat. Etiam quis pulvinar arcu, non hendrerit quam. Suspendisse id justo dapibus, ornare elit eu, ullamcorper nisi. Quisque id fermentum leo.

In hac habitasse platea dictumst. Phasellus at aliquet sem, eu blandit tellus. Suspendisse ac mauris in mauris auctor hendrerit. Donec et massa quis enim semper dictum sed et tortor. Aenean vel enim vel ligula pharetra pellentesque. Maecenas eget est cursus, bibendum diam vitae, congue orci. Cras volutpat pellentesque justo, nec cursus ipsum euismod eu. Cras ac pharetra odio. Vivamus a libero elit. Mauris rutrum lorem vel felis tempor facilisis. Sed sagittis ligula et ligula commodo fringilla vitae quis ex. Phasellus sapien turpis, eleifend at finibus at, suscipit eu purus. Integer nisi ex, consectetur a tempus ac, ultrices fermentum libero. Praesent fringilla vulputate congue.

Aliquam molestie, diam non fermentum cursus, nisi augue pulvinar lorem, non laoreet augue arcu eget arcu. Ut elementum sit amet est ac posuere. Vivamus ac metus eu odio dapibus luctus in vel ex. Nam eget pharetra felis. Maecenas bibendum euismod turpis, id dapibus eros rhoncus quis. Donec egestas ante vitae ornare ultricies. Nullam sed odio non erat gravida convallis.

Donec mollis ipsum eu dolor posuere mattis. Nunc tellus elit, interdum non laoreet eget, bibendum ut sem. Maecenas viverra rhoncus ullamcorper. Suspendisse malesuada erat vitae ultrices pretium. Sed ut volutpat quam. Donec aliquam erat quis mollis dignissim. Sed ut commodo nibh. Donec imperdiet neque id nibh vulputate sollicitudin. Ut ut pellentesque enim. Quisque sollicitudin eget orci sit amet aliquam.

Nam laoreet velit non ante pulvinar, et iaculis est ultrices. Etiam felis mi, hendrerit et est id, facilisis mollis dui. Ut non nisi in felis tristique imperdiet id nec nibh. Aenean ut augue at neque pellentesque gravida. Duis fermentum libero et pellentesque tristique. Nullam eget tincidunt risus. Vestibulum molestie fermentum ex, ut efficitur leo rhoncus tempus. Aenean pellentesque sagittis cursus. Vivamus mollis metus enim, in pellentesque purus tempor ut.
      </div>
    </div>
  )
}

export default MazeGenerator
