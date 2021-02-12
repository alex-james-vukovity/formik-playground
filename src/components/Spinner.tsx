import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

import { Box } from './Box'

const StyledBox = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const StyledSpinner = styled(Box)`
  width: 300px;
  height: 300px;
  border: 10px solid grey;
  border-top: 10px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const Spinner: FC<HTMLAttributes<HTMLDivElement>> = memo(({ children, ...props }) => (
  <StyledBox>
    <StyledSpinner {...props}>{children}</StyledSpinner>
  </StyledBox>
))
