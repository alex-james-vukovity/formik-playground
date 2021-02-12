import { FC, memo, HTMLAttributes } from 'react'

export const Table: FC<HTMLAttributes<HTMLTableElement>> = memo(({ children, ...props }) => (
  <table {...props}>{children}</table>
))
