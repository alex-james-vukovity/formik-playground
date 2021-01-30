import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const FormGridContainerStyled = styled.div`
  display: grid;
  grid-template-rows: auto;
  row-gap: 20px;
  padding: 0 20px;
`

export const FormGridContainer: FC<HTMLAttributes<HTMLDivElement>> = memo(({ children }) => (
  <FormGridContainerStyled>{children}</FormGridContainerStyled>
))
