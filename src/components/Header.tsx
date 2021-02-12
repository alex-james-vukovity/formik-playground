import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  text-align: center;
`

export const Header: FC<HTMLAttributes<HTMLDivElement>> = memo(({ children, ...props }) => (
  <StyledHeader {...props}>{children}</StyledHeader>
))
