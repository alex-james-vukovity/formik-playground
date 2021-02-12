import { FC, TextareaHTMLAttributes } from 'react'
import { useField } from 'formik'
import styled from 'styled-components'

import { Box } from './Box'
import { Label } from './Label'
import { ErrorMessage } from './ErrorMessage'

const MultiLineTextFieldStyled = styled.textarea`
  width: fill-available;
  padding: 8px 16px;
  border: 2px solid black;
  resize: vertical;
  font-size: 14px;
  line-height: 24px;

  &:focus {
    outline: 2px solid black;
  }
`

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export const MultiLineTextField: FC<Props> = ({ name = '', label, ...props }) => {
  const [field, { touched, error }] = useField<string>(name)

  return (
    <Box>
      {label && <Label htmlFor={name}>{label}</Label>}
      {touched && error && <ErrorMessage>{error}</ErrorMessage>}
      <MultiLineTextFieldStyled rows={8} id={name} {...props} {...field} />
    </Box>
  )
}
