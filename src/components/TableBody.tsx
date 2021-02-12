import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

const StyledTableBody = styled.tbody`
  tr:hover {
    outline: 2px solid black;
    cursor: pointer;
  }
`

export const TableBody: FC<
  HTMLAttributes<HTMLTableSectionElement>
> = memo(({ children, ...props }) => <StyledTableBody {...props}>{children}</StyledTableBody>)
