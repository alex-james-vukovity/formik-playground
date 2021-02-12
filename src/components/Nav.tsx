import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  margin: 16px 0;
`

export const Nav: FC<HTMLAttributes<HTMLDivElement>> = memo(({ children, ...props }) => (
  <StyledNav {...props}>{children}</StyledNav>
))
