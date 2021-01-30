import { FC, InputHTMLAttributes } from 'react'
import { useField } from 'formik'

import { Box } from './Box'
import { Label } from './Label'
import { ErrorMessage } from './ErrorMessage'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const TextField: FC<Props> = ({ name = '', label, ...props }) => {
  const [field, { touched, error }] = useField<string>(name)

  return (
    <Box>
      {label && <Label htmlFor={name}>{label}</Label>}
      {touched && error && <ErrorMessage>{error}</ErrorMessage>}
      <input id={name} {...props} {...field} />
    </Box>
  )
}
