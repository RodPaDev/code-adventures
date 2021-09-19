import App from 'App.js'

import MazeGenerator from 'components/MazeGenerator'

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/maze-generators',
        exact: true,
        component: MazeGenerator
      }
    ]
  }
]

export default routes
