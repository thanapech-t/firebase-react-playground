import React from 'react'
import styled from 'styled-components'
import { logout } from '../../ducks/auth'
import { Button, Icon } from 'antd'
import { connect } from 'react-redux'
import { compose } from 'recompose'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  color: black;
`

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
  position: fixed;
  background-color: black;
  height: 50px;
  width: 100%;
`

const LogoutButton = styled(Button)`
  width: fit-content;
  margin: 10px;
`

const Topic = styled.h1``

const Detail = styled.div`
  font-size: 20px;
  color: red;
`

const Landing = ({ logout, user }) => (
  <React.Fragment>
    <Header>
      <LogoutButton type="primary" onClick={() => logout()}>
        Logout
      </LogoutButton>
    </Header>
    <Container>
      <Topic>Welcome Landing Page !</Topic>
      <Detail>{user}</Detail>
    </Container>
  </React.Fragment>
)

const enhancer = compose(
  connect(
    state => ({
      user: state.auth.user,
    }),
    { logout },
  ),
)

export default enhancer(Landing)
