import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Card = ({
  path,
  title,
  subtitle,
  imgSrc = 'https://dummyimage.com/720x400',
  description
}) => {
  return (
    <div className='xl:w-1/4 md:w-1/2 p-4'>
      <Link to={path}>
        <div className='bg-gray-100 p-6 rounded-lg'>
          <img
            className='h-40 rounded w-full object-cover object-center mb-6'
            src={imgSrc}
            alt='content'
          />
          <h3 className='tracking-widest text-yellow-500 text-xs font-medium title-font'>
            {subtitle.toUpperCase()}
          </h3>
          <h2 className='text-lg text-gray-900 font-medium title-font mb-4'>
            {title}
          </h2>
          <p className='leading-relaxed text-base'>{description}</p>
        </div>
      </Link>
    </div>
  )
}

Card.propTypes = {
  path: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

export default Card
