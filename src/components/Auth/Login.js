import React from 'react'
import styled from 'styled-components'
import Field from '../share/Field'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import { compose } from 'recompose'
import { login } from '../../ducks/auth'
import { Button, Icon } from 'antd'

const Container = styled.form`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`
const Form = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const CustomField = styled(Field)`
  margin: 0 auto 30px;
  width: 100%;
  max-width: 300px;
`

const Submit = styled(Button)`
  width: fit-content;
  margin: 0 auto;
`

const validate = value => {
  console.log('vlaue', value)
  const error = {}
  if (!value.id) {
    error.id = 'please fill'
  }
  if (!value.password) {
    error.password = 'please fill'
  }

  return error
}

const Login = ({ isLoading, login, handleSubmit, ...props }) => (
  <Container onSubmit={handleSubmit(values => login(values))}>
    <Form>
      <CustomField
        name="id"
        type="text"
        placeholder="id"
        addonBefore={<Icon type="user" />}
      />
      <CustomField
        name="password"
        type="password"
        placeholder="password"
        addonBefore={<Icon type="lock" />}
      />
      <Submit loading={isLoading} type="primary" htmlType="submit">
        Submit
      </Submit>
    </Form>
  </Container>
)

const enhancer = compose(
  connect(
    state => ({
      isLoading: state.auth.isLoading,
    }),
    { login },
  ),
  reduxForm({ form: 'login', validate }),
)

export default enhancer(Login)
