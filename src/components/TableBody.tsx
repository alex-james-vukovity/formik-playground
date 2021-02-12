import { FC, memo, HTMLAttributes } from 'react'

export const TableBody: FC<
  HTMLAttributes<HTMLTableSectionElement>
> = memo(({ children, ...props }) => <tbody {...props}>{children}</tbody>)
