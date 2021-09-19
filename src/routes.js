import App from '@src/App'
import Landing from '@components/Landing'
import MazeGenerator from '@components/MazeGenerator'

const routes = [
  {
    component: App,
    routes: [
      {
        component: Landing,
        path: '/',
        exact: true,
      },
      {
        component: MazeGenerator,
        path: '/maze-generator',
        exact: true
      }
    ]
  }
]

export default routes
