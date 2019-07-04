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
`

const LogoutButton = styled(Button)`
  width: fit-content;
  margin: 0 auto;
`

const Landing = ({ logout }) => (
  <Container>
    LANdingggggggggggggg
    <LogoutButton type="primary" onClick={() => logout()}>
      LogoutButton
    </LogoutButton>
  </Container>
)

const enhancer = compose(
  connect(
    state => ({}),
    { logout },
  ),
)

export default enhancer(Landing)
