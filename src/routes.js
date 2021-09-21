import { lazy } from 'react'

const Landing = lazy(() =>
  import(
    /* webpackPreload: true */ /* webpackChunkName: "Landing" */ '@components/Landing'
  )
)
const App = lazy(() =>
  import(
    /* webpackPreload: true */ /* webpackChunkName: "App" */ '@src/App'
  )
)
const MazeGenerator = lazy(() =>
  import(
    /* webpackPreload: true */ /* webpackChunkName: "MazeGenerator" */ '@components/MazeGenerator'
  )
)

const routes = [
  {
    component: App,
    routes: [
      {
        component: Landing,
        path: '/',
        exact: true
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
