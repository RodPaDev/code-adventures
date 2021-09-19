import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const style = 'cursor-pointer mr-5 hover:text-yellow-500'
const disabledStyle = 'cursor-default mr-5 hover:text-gray-500'

const Link = ({ path, title, disabled = false }) => {
  return disabled ? (
    <a className={disabledStyle}>{title}</a>
  ) : (
    <NavLink to={path} className={style} activeClassName='text-yellow-500'>
      {title}
    </NavLink>
  )
}

Link.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

export default Link
