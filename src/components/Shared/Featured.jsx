import Card from './Card'
import mazePng from '@src/assets/thumbnails/maze.png'


const Featured = () => {
  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-2 mx-auto'>
        <div className='flex flex-col text-center w-full mb-10'>
          <h2 className='text-xs text-indigo-500 tracking-widest font-medium title-font mb-1'>
            FEATURED WORK
          </h2>
          <h1 className='sm:text-3xl text-2xl font-medium title-font text-gray-900'>
            My Coolest Adventures So Far
          </h1>
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
      </div>
    </section>
  )
}

export default Featured
