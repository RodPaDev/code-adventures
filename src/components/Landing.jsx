import Card from '@components/Shared/Card'
import { Fragment } from 'react'

import mazePng from '@src/assets/thumbnails/maze.png'

const Landing = () => {
  return (
    <Fragment>
      <div className='flex flex-wrap w-full mb-20'>
        <div className='lg:w-1/2 w-full mb-6 lg:mb-0'>
          <h1 className='sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900'>
            Join the adventure!
          </h1>
          <div className='h-1 w-20 bg-yellow-500 rounded'></div>
        </div>
        <p className='lg:w-1/2 w-full leading-relaxed text-gray-500'>
          Code Adventures is inspired by Sebastian Lague, and here I will share what I have learned experimenting and playing around with code.
        </p>
      </div>
      <div className='flex flex-wrap -m-4'>
        <Card
          path={'/maze-generator'}
          title={'Maze Generator'}
          subtitle={'Generator'}
          imgSrc={mazePng}
          description={
            'Generates a maze that you can export to use in other projects. I created this so that I could use random mazes in Unity'
          }
        />
      </div>
    </Fragment>
  )
}

export default Landing
