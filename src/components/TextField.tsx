import { FC, InputHTMLAttributes } from 'react'
import { useField } from 'formik'

import { Box } from './Box'
import { Text } from './Text'
import { Label } from './Label'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export const TextField: FC<Props> = ({ name = '', label, ...props }) => {
  const [field, { touched, error }] = useField<string>(name)

  return (
    <Box>
      {label && <Label htmlFor={name}>{label}</Label>}
      {touched && error && <Text>Error: {error}</Text>}
      <input id={name} {...props} {...field} />
    </Box>
  )
}
