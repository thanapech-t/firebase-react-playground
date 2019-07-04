import React from 'react'
import styled from 'styled-components'
import {compose, withState, withHandlers, lifecycle} from 'recompose'
import {connect} from 'react-redux'
import {GlobalStyle} from './style'
import store from './ducks'
import {Provider} from 'react-redux'
import {BrowserRouter as Router} from 'react-router-dom'
import Route, {AuthRouter} from './routes'
import {getUserInfo} from './ducks/auth'

const Container = styled.div`
  position: relative;
  overflow: hidden;
`

const bodyEnhancer = compose(
  connect(
    state => ({
      initialized: state.auth.initialized,
      isLogin: state.auth.isLogin,
    }),
    {getUserInfo},
  ),
  lifecycle({
    componentDidMount() {
      this.props.getUserInfo()
    },
  }),
)

const Body = bodyEnhancer(
  ({initialized, ...props}) =>
    initialized && (
      <Router>
        {props.isLogin ? (
          <Container>
            <Route {...props} />
          </Container>
        ) : (
          <AuthRouter {...props} />
        )}
      </Router>
    ),
)

const App = () => (
  <Provider store={store}>
    <GlobalStyle />
    <Body />
  </Provider>
)

export default App
