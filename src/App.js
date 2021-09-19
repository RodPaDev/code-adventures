import Navigation from '@components/Navigation'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router'
import { renderRoutes } from 'react-router-config'

function App({ route }) {
  return (
    <div className='App'>
      <Navigation />
      {renderRoutes(route.routes)}
    </div>
  )
}

App.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.arrayOf(PropTypes.object)
  })
}

export default withRouter(App)
