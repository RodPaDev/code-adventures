import { NavLink } from 'react-router-dom'
import Link from './Link'

const Navigation = () => {


  return (
    <header className='text-gray-600 body-font'>
      <div className='container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center'>
        <NavLink
          to="/"
          className='flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0'
        >
          <span className='cursor-pointer ml-3 text-xl'>Visual Algo</span>
        </NavLink>
        <nav className='md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center'>
          <Link path='/maze-generator' title='Maze Generator' />
          <Link disabled path={null} title='More coming soon...' />
        </nav>
      </div>
    </header>
  )
}

export default Navigation
