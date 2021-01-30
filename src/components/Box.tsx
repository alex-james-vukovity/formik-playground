import { FC, memo, HTMLAttributes } from 'react'

export const Box: FC<HTMLAttributes<HTMLDivElement>> = memo(({ children, ...props }) => (
  <div {...props}>{children}</div>
))
