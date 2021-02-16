import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const PanelStyled = styled.article`
  padding: 20px;
  height: 100%;
`

export const Panel: FC<HTMLAttributes<HTMLDivElement>> = memo(({ children, ...props }) => (
  <PanelStyled {...props}>{children}</PanelStyled>
))
