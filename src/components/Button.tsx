import { FC, memo, ButtonHTMLAttributes } from 'react'
import styled from 'styled-components'

const ButtonStyled = styled.button`
  background-color: white;
  height: 35px;
  min-width: 35px;
  padding: 0px 16px;
  border: 2px solid black;
  cursor: pointer;

  &:focus {
    outline: 2px solid black;
  }

  &:disabled {
    cursor: not-allowed;
    color: black;
    border: 2px solid #dedede;
  }
`

export const Button: FC<
  ButtonHTMLAttributes<HTMLButtonElement>
> = memo(({ children, ...props }) => <ButtonStyled {...props}>{children}</ButtonStyled>)
