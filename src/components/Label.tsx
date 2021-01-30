import { FC, memo, LabelHTMLAttributes } from 'react'
import styled from 'styled-components'

const LabelStyled = styled.label`
  display: block;
  font-size: 14px;
  line-height: 24px;
  font-weight: 500;
`

export const Label: FC<LabelHTMLAttributes<HTMLLabelElement>> = memo(({ children, ...props }) => (
  <LabelStyled {...props}>{children}</LabelStyled>
))
