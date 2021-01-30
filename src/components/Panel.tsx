import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const PanelStyled = styled.article`
  margin: 20px;
`

export const Panel: FC<HTMLAttributes<HTMLDivElement>> = memo(({ children }) => (
  <PanelStyled>{children}</PanelStyled>
))
