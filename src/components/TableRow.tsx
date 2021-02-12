import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledTableRow = styled.tr`
  cursor: pointer;
`

export const TableRow: FC<HTMLAttributes<HTMLTableRowElement>> = memo(({ children, ...props }) => (
  <StyledTableRow {...props}>{children}</StyledTableRow>
))
