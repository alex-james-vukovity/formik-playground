import { FC, memo, ButtonHTMLAttributes } from 'react'

export const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = memo(({ children, ...props }) => <button {...props}>{children}</button>)
