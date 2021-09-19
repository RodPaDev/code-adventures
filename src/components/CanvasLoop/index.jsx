import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'

function loop(hasStarted, hasFinished, draw, fps) {
  let lastTimestamp = 0
  function update(timestamp) {
    if (!hasFinished) {
      requestAnimationFrame(update)
      if (fps != 0 && timestamp - lastTimestamp < 1000 / fps) return
      draw()
      lastTimestamp = timestamp
    } else if (hasStarted && hasFinished) {
      draw()
    }
  }
  update()
}

const CanvasLoop = ({
  width,
  height,
  forwardedRef,
  hasStarted,
  hasFinished,
  draw,
  noLoop = false,
  redrawText = 'Redraw'
}) => {
  const [framesPerSecond, setFramesPerSecond] = useState(60)

  useEffect(() => {}, [hasStarted, hasFinished, draw, noLoop])

  const handleRange = e => {
    e.preventDefault()
    setFramesPerSecond(e.currentTarget.value)
  }

  const redrawCanvas = e => {
    e.preventDefault()
    if (noLoop) return draw()
    loop(hasStarted, hasFinished, draw, framesPerSecond)
  }

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex gap-5'>
        <div className='flex flex-col max-w-sm w-full'>
          <label htmlFor='range'>
            Frames Per Second:{''}
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
          className='text-white bg-yellow-500 border-0 py-2 px-6 focus:outline-none hover:bg-yellow-600 rounded'
          onClick={redrawCanvas}
        >
          {redrawText}
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
  hasStarted: PropTypes.bool,
  hasFinished: PropTypes.bool,
  noLoop: PropTypes.bool,
  redrawText: PropTypes.string,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
}
