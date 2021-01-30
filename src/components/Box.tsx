import { FC, memo, HTMLAttributes } from 'react'

export const Box: FC<HTMLAttributes<HTMLDivElement>> = memo(({ children }) => <div>{children}</div>)
