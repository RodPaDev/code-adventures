import history from '@src/history'
import NavLink from './NavLink'

const Navigation = () => {
  const goHome = e => {
    e.preventDefault()
    history.push('/')
  }

  return (
    <header className='text-gray-600 body-font'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <a
          onClick={goHome}
          className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
        >
          <span className='cursor-pointer ml-3 text-xl'>Visual Algo</span>
        </a>
        <nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
          <NavLink path='/maze-generator' title='Maze Generator' />
          <NavLink path={null} title='More coming soon...' />
        </nav>
      </div>
    </header>
  )
}

export default Navigation
