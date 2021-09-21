import { Fragment } from 'react'

import Featured from './Shared/Featured'
import adventureSvg from '@src/assets/svg/adventure.svg'
import githubSvg from '@src/assets/svg/github.svg'
import linkedinSvg from '@src/assets/svg/linkedin.svg'
import twitterSvg from '@src/assets/svg/twitter.svg'
import SocialLink from './Shared/SocialLink'

const Landing = () => {
  return (
    <Fragment>
      <section className='bg-white dark:bg-gray-800'>
        <div className='container px-6 py-8 mx-auto'>
          <div className='items-center lg:flex'>
            <div className='lg:w-1/2'>
              <h2 className='text-3xl font-bold text-gray-800 dark:text-gray-100'>
                Join The Adventure!
              </h2>

              <p className='mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md'>
                {"Hey! I'm Patrick, a Software Developer"}{' '}
                <a
                  className='font-bold text-indigo-600 dark:text-indigo-400'
                  href='https://awesome-source.com/'
                >
                  {'@AwesomeSource.'}
                </a>{' '}
                {`And here I will share what I have learned experimenting and
                playing around with code.`}
              </p>
              <p className='mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md'>
                {`Code Adventures is inspired and named after the famous youtube
                series by`}{' '}
                <a
                  className='font-bold text-indigo-600 dark:text-indigo-400'
                  href={'https://www.youtube.com/watch?v=r_It_X7v-1E&list=PLFt_AvWsXl0ehjAfLFsp1PGaatzAwo0uK'}
                >
                  {'Sebastian Lague'}
                </a>
              </p>
              <div className='flex items-center mt-6 -mx-2'>
                <SocialLink src={linkedinSvg} ariaLabel='LinkedIn' link='https://www.linkedin.com/in/rodpadev/' />
                <SocialLink src={twitterSvg} ariaLabel='Twitter' link='https://twitter.com/RodPaDev' />
                <SocialLink src={githubSvg} ariaLabel='GitHub' link='https://github.com/RodPaDev' />
              </div>
            </div>

            <div className='mt-8 lg:mt-0 lg:w-1/2'>
              <div className='flex items-center justify-center lg:justify-end'>
                <div className='max-w-lg'>
                  <img
                    className='object-cover object-center w-full h-64'
                    src={adventureSvg}
                    alt=''
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Featured />
    </Fragment>
  )
}

export default Landing
