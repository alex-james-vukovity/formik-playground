import { FC, InputHTMLAttributes } from 'react'
import { useField } from 'formik'
import styled from 'styled-components'

import { Box } from './Box'
import { Label } from './Label'
import { ErrorMessage } from './ErrorMessage'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const InputStyled = styled.input`
  width: fill-available;
  padding: 8px 16px;
  border: 2px solid black;

  &:focus {
    outline: 2px solid black;
  }
`

export const TextField: FC<Props> = ({ name = '', label, ...props }) => {
  const [field, { touched, error }] = useField<string>(name)

  return (
    <Box>
      {label && <Label htmlFor={name}>{label}</Label>}
      {touched && error && <ErrorMessage>{error}</ErrorMessage>}
      <InputStyled type="text" id={name} {...props} {...field} />
    </Box>
  )
}
