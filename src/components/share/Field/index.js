import React from 'react'
import styled from 'styled-components'
import { Field } from 'redux-form'
import { compose } from 'recompose'

import TextInput from './TextInput'
import Password from './Password'
import TextArea from './TextArea'

const Container = styled.div`
  width: 100%;
  margin: 0 auto 24px;
`

const Label = styled.label``

const ErrorContainer = styled.div``

const ErrorText = styled.span`
  color: red;
  padding-left: 5px;
`

const TypeRenderer = (type, props) => {
  switch (type) {
    case 'text':
      return <TextInput {...props} />
    case 'password':
      return <Password {...props} />
    case 'textarea':
      return <TextArea {...props} />
    default:
      break
  }
}

const FieldRenderer = ({ className, label, ...props }) => {
  const {
    type,
    hideError,
    meta: { error, touched },
    asyncError,
  } = props
  return (
    <Container className={className}>
      {label && <Label className="label">{label}</Label>}
      {TypeRenderer(type, props)}
      {!hideError && touched && (error || asyncError) && (
        <ErrorContainer className="error-container">
          <ErrorText className="error" type={type}>
            {error || asyncError}
          </ErrorText>
        </ErrorContainer>
      )}
    </Container>
  )
}

const CustomField = props => <Field {...props} component={FieldRenderer} />

const enhancer = compose()

export default enhancer(CustomField)
