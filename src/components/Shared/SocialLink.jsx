import classNames from 'classnames'
import PropTypes from 'prop-types'

const SocialLink = ({ src, link, ariaLabel, className = '' }) => {
  return (
    <a className='mx-2' href={link} aria-label={ariaLabel}>
      <img
        className={classNames(
          'w-5 h-5 text-gray-700 fill-current dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400',
          className
        )}
        src={src}
        alt=''
      />
    </a>
  )
}

export default SocialLink

SocialLink.propTypes = {
  src: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  className: PropTypes.string
}
