import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledTableHead = styled.thead`
  tr:hover {
    background-color: white;
  }
`

export const TableHead: FC<
  HTMLAttributes<HTMLTableSectionElement>
> = memo(({ children, ...props }) => <StyledTableHead {...props}>{children}</StyledTableHead>)
