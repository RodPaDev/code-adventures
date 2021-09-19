import App from 'App.js'

import MazeGenerator from 'components/MazeGenerator'

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/maze-generator',
        exact: true,
        component: MazeGenerator
      }
    ]
  }
]

export default routes
