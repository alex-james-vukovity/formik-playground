import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

import { Text } from './Text'

const ErrorMessageStyled = styled(Text)`
  color: red;
`

export const ErrorMessage: FC<
  HTMLAttributes<HTMLParagraphElement>
> = memo(({ children, ...props }) => (
  <ErrorMessageStyled {...props}>Error: {children}</ErrorMessageStyled>
))
