import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const TextStyled = styled.p`
  font-size: 14px;
  line-height: 24px;
  margin: 0;
  padding: 0;
`

export const Text: FC<HTMLAttributes<HTMLParagraphElement>> = memo(({ children, ...props }) => (
  <TextStyled {...props}>{children}</TextStyled>
))
