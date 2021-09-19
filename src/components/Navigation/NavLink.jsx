import PropTypes from 'prop-types'
import history from '@src/history'

const NavLink = ({ path, title }) => {
  const onClick = () => {
    history.push(path)
  }
  return (
    <a onClick={onClick} className='mr-5 hover:text-gray-900'>
      {title}
    </a>
  )
}

NavLink.propTypes = {
  path: PropTypes.string.isRequired,

  title: PropTypes.string.isRequired
}

export default NavLink
