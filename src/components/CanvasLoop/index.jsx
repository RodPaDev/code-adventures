import PropTypes from 'prop-types'
import { useState } from 'react'

let keepRunning = false

const CanvasLoop = ({
  width,
  height,
  forwardedRef,
  reset,
  draw,
  noLoop = false,
  drawText = 'Draw',
  resetText = 'Reset',
  setIsExportable
}) => {
  const [framesPerSecond, setFramesPerSecond] = useState(60)
  const [isRunning, setIsRunning ] = useState(false)

  const handleRange = e => {
    e.preventDefault()
    setFramesPerSecond(e.currentTarget.value)
  }

  const loop = (draw, fps) => {
    let lastTimestamp = 0
    let hasStarted = false
    let hasFinished = false
    function update(timestamp) {
      // console.log(keepRunning)
      if (keepRunning && !hasFinished) {
        requestAnimationFrame(update)
        if (fps != 0 && timestamp - lastTimestamp < 1000 / fps) return
        
        let [isStart, isFinished] = draw()
        hasStarted = isStart
        hasFinished = isFinished
        lastTimestamp = timestamp
      } else if (hasStarted && hasFinished) {
        draw()
        keepRunning = false
        setIsExportable(hasFinished)
      }
    }
    update()
  }

  const redrawCanvas = e => {
    e.preventDefault()
    if (noLoop) return draw()
    if (keepRunning) {
      reset()
      keepRunning = false
      draw()
      setIsRunning(false)
    } else {
      reset()
      keepRunning = true
      setIsRunning(true)
      setIsExportable(false)
      loop(draw, framesPerSecond)
    }
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex gap-5'>
        <div className='flex flex-col max-w-sm w-full'>
          <label htmlFor='range'>
            Frames Per Second:{' '}
            <span>
              {parseInt(framesPerSecond, 10) !== 100
                ? framesPerSecond
                : 'Unlimited'}
            </span>
          </label>
          <input
            type='range'
            name='fps'
            id='fps'
            value={framesPerSecond}
            onChange={handleRange}
            min={5}
            max={100}
            step={5}
          />
        </div>
        <button
          className='text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded whitespace-nowrap'
          onClick={redrawCanvas}
        >
          {!isRunning ? drawText : resetText}
        </button>
      </div>
      <canvas
        className='shadow-md border border-gray-100'
        style={{ width, height }}
        ref={forwardedRef}
        width={width}
        height={height}
      ></canvas>
    </div>
  )
}

export default CanvasLoop

CanvasLoop.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  draw: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  resetText: PropTypes.string.isRequired,
  noLoop: PropTypes.bool,
  drawText: PropTypes.string,
  setIsExportable: PropTypes.func,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
}
