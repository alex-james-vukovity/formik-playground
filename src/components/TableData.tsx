import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledTableData = styled.td`
  padding: 8px;
`

export const TableData: FC<
  HTMLAttributes<HTMLTableDataCellElement>
> = memo(({ children, ...props }) => <StyledTableData {...props}>{children}</StyledTableData>)
