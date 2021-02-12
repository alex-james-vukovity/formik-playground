import { FC, memo, HTMLAttributes } from 'react'

export const TableHead: FC<
  HTMLAttributes<HTMLTableSectionElement>
> = memo(({ children, ...props }) => <thead {...props}>{children}</thead>)
