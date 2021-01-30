import { FC, memo, FormHTMLAttributes } from 'react'
import { Form as FormikForm } from 'formik'
import styled from 'styled-components'

const FormikFormStyled = styled(FormikForm)`
  min-width: 100%;
`

export const Form: FC<FormHTMLAttributes<HTMLFontElement>> = memo(({ children }) => {
  return <FormikFormStyled>{children}</FormikFormStyled>
})
