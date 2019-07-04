import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Auth from '../components/Auth'
import Landing from '../components/Landing'
import NotFound from '../components/404NotFound'

const AppRouter = () => (
  <Switch>
    <Route path="/" exact component={Landing} />
    <Route component={NotFound} />
  </Switch>
)

export const AuthRouter = () => (
  <Switch>
    <Route path="/" exact component={Auth} />
    <Route component={NotFound} />
  </Switch>
)

export default AppRouter
