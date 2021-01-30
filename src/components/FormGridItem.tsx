import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const FormGridItemStyled = styled.div``

export const FormGridItem: FC<HTMLAttributes<HTMLDivElement>> = memo(({ children, ...props }) => (
  <FormGridItemStyled {...props}>{children}</FormGridItemStyled>
))
