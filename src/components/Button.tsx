import { FC, memo, ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

const ButtonStled = styled.button`
  background-color: white;
  padding: 8px 16px;
  border: 1px solid black;

  &:focus {
    outline: 2px solid black;
  }
`

export const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = memo(({ children, ...props }) => <ButtonStled {...props}>{children}</ButtonStled>)
