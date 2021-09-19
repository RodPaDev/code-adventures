import PropTypes from 'prop-types'
import history from '@src/history'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import classNames from 'classnames'

const style = 'cursor-pointer mr-5 hover:text-yellow-500'

const NavLink = ({ path, title }) => {
  const { location } = useLocation()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(location?.pathname === path)
  }, [location])

  const onClick = e => {
    e.preventDefault()
    if(path == null) return
    history.push(path)
  }
  return (
    <a
      onClick={onClick}
      className={classNames(style, { 'text-yellow-500': active,  })}
    >
      {title}
    </a>
  )
}

NavLink.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default NavLink
