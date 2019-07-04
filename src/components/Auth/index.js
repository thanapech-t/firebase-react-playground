import React from 'react'
import Login from './Login'

import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const Auth = () => (
  <Container>
    <Login />
  </Container>
)

export default Auth
