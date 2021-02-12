import { FC, useEffect, useState } from 'react'
import { useHistory, generatePath } from 'react-router-dom'

import { AppFormProps } from 'interfaces'
import {
  Heading,
  Panel,
  Table,
  TableData,
  TableHeader,
  TableRow,
  TableHead,
  Header,
  Nav,
  Button,
  Text,
  Spinner,
  TableBody
} from 'components'
import { States } from 'enums'

export const List: FC = () => {
  const { push } = useHistory()

  const [data, setData] = useState<AppFormProps[] | undefined>(undefined)
  const [state, setState] = useState<States | undefined>(States.LoadingGet)

  useEffect(() => {
    const call = async (): Promise<void> => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts')

      if (response.ok) {
        const responseBody = await response.json()
        setData(responseBody)
        setState(undefined)
      } else {
        setState(States.Error)
      }
    }

    call()
  }, [])

  if (state === States.Error) {
    return (
      <Panel role="status">
        <Heading variant="h1">
          <Text>Something went wrong</Text>
        </Heading>
      </Panel>
    )
  }

  if (state === States.LoadingGet) {
    return <Spinner />
  }

  return (
    <Panel>
      <Header>
        <Heading variant="h1">List</Heading>
      </Header>
      <Nav>
        <Button onClick={() => push('/posts/create')} type="button">
          <Text>Create</Text>
        </Button>
      </Nav>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeader>
              <Text>id</Text>
            </TableHeader>
            <TableHeader>
              <Text>title</Text>
            </TableHeader>
            <TableHeader>
              <Text>body</Text>
            </TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map(({ id, title, body }) => (
            <TableRow key={id} onClick={() => push(generatePath('/posts/:postId', { postId: id }))}>
              <TableData>
                <Text>{id}</Text>
              </TableData>
              <TableData>
                <Text>{title}</Text>
              </TableData>
              <TableData>
                <Text>{body}</Text>
              </TableData>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Panel>
  )
}
