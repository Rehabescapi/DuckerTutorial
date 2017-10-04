import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { MainContainer, HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer, UserContainer, DuckDetailsContainer} from 'containers'
import {NoMatch} from 'components'
export default function getRoutes (checkAuth) {
  return (
    <Router>
      <MainContainer>
        <Switch>
          <Route exact={true} path='/' component={checkAuth(HomeContainer)} />
          <Route path='/auth' component={checkAuth(AuthenticateContainer)} />
          <Route path='/feed' component={checkAuth(FeedContainer)} />
          <Route path='/logout' component = {LogoutContainer} />
          <Route path='/:uid' component = {checkAuth(UserContainer)}/>
          <Route path='/:duckId' component = {checkAuth(UserContainer)}/>
          <Route component={NoMatch}/>
        </Switch>
      </MainContainer>
    </Router>
  )
}
