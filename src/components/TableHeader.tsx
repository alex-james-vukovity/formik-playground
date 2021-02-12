import { FC, memo, HTMLAttributes } from 'react'

export const TableHeader: FC<
  HTMLAttributes<HTMLTableHeaderCellElement>
> = memo(({ children, ...props }) => <th {...props}>{children}</th>)
