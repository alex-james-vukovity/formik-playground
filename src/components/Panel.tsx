import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const PanelStyled = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Panel: FC<HTMLAttributes<HTMLDivElement>> = memo(({ children }) => (
  <PanelStyled>{children}</PanelStyled>
))
