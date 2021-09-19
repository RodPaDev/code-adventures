import Navigation from '@components/Navigation'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'

function App({ route }) {
  return (
    <div className='App'>
      <Navigation />
      <section className='text-gray-600 body-font'>
        <div className='container px-5 py-5 mx-auto'>
          {renderRoutes(route.routes)}
        </div>
      </section>
    </div>
  )
}

App.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.arrayOf(PropTypes.object)
  })
}

export default withRouter(App)
