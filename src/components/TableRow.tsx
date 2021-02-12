import { FC, memo, HTMLAttributes } from 'react'

export const TableRow: FC<HTMLAttributes<HTMLTableRowElement>> = memo(({ children, ...props }) => (
  <tr {...props}>{children}</tr>
))
