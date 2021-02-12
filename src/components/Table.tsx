import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledTable = styled.table`
  border-collapse: collapse;
`

export const Table: FC<HTMLAttributes<HTMLTableElement>> = memo(({ children, ...props }) => (
  <StyledTable {...props}>{children}</StyledTable>
))
