import { FC, useState } from 'react'

import { Heading, Box, Button } from './components'

export const App: FC = () => {
  const [count, setCount] = useState(0)

  return (
    <Box>
      <Box>
        <Button onClick={() => setCount(count + 1)}>Increase</Button>
      </Box>
      <Box>
        <Button>Im not working</Button>
      </Box>
      <Box>{count}</Box>
      <Box>hey</Box>
      <Heading variant='h1'>Hey im h1</Heading>
      <Heading variant='h2'>Hey im h2</Heading>
      <Heading variant='h3'>Hey im h3</Heading>
    </Box>
  )
}
