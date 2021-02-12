import { FC, memo, HTMLAttributes } from 'react'
import styled from 'styled-components'

import { Box } from './Box'

const StyledBox = styled(Box)`
  button {
    margin-left: 16px;

    &:first-child {
      margin-left: 0;
    }
  }
`

export const ButtonGroup: FC<HTMLAttributes<HTMLDivElement>> = memo(({ children, ...props }) => (
  <StyledBox {...props}>{children}</StyledBox>
))
