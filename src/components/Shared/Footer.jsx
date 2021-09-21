import githubSvg from '@src/assets/svg/github.svg'
import linkedinSvg from '@src/assets/svg/linkedin.svg'
import twitterSvg from '@src/assets/svg/twitter.svg'
import SocialLink from './SocialLink'

const Footer = () => {
  return (
    <footer className='text-gray-600 body-font'>
      <div className='container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col'>
        <p className='text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4'>
          Made by
          <a
            href='https://twitter.com/rodpadev'
            className='text-gray-600 ml-1'
          >
            Patrick Rodrigues
          </a>{' '}
          {'and powered by 🚀 fuel.'}
        </p>
        <span className='inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start'>
          <SocialLink
            src={linkedinSvg}
            ariaLabel='LinkedIn'
            link='https://www.linkedin.com/in/rodpadev/'
          />
          <SocialLink
            src={twitterSvg}
            ariaLabel='Twitter'
            link='https://twitter.com/RodPaDev'
          />
          <SocialLink
            src={githubSvg}
            ariaLabel='GitHub'
            link='https://github.com/RodPaDev'
          />
        </span>
      </div>
    </footer>
  )
}

export default Footer
