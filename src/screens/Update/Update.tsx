import { FC, useState, useEffect } from 'react'
import { Formik } from 'formik'
import { useParams, useHistory } from 'react-router-dom'

import {
  Heading,
  Button,
  TextField,
  Panel,
  FormGridContainer,
  FormGridItem,
  Text,
  MultiLineTextField,
  Form,
  Header,
  Nav,
  Spinner,
  ButtonGroup
} from 'components'
import { AppFormProps } from 'interfaces'
import { AppFormSchema } from 'validations'
import { States } from 'enums'

export const Update: FC = () => {
  const { postId } = useParams<{ postId: string }>()
  const { push } = useHistory()

  const [data, setData] = useState<AppFormProps | undefined>(undefined)
  const [state, setState] = useState<States | undefined>(States.LoadingGet)

  useEffect(() => {
    const fetchPosts = async (): Promise<void> => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)

      if (response.ok) {
        const responseBody = await response.json()
        setData(responseBody)
        setState(undefined)
      } else {
        setState(States.Error)
      }
    }

    fetchPosts()
  }, [postId])

  const onUpdate = async (values: AppFormProps): Promise<void> => {
    setState(States.LoadingPut)
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    if (response.ok) {
      const responseBody = await response.json()
      setData(responseBody)
      setState(States.Success)
    } else {
      setState(States.Error)
    }
  }

  const onDelete = async (): Promise<void> => {
    setState(States.LoadingGet)
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE'
    })

    if (response.ok) {
      push('/')
    } else {
      setState(States.Error)
    }
  }

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
        <Heading variant="h1">Update</Heading>
      </Header>
      <Nav>
        <ButtonGroup>
          <Button onClick={onDelete} type="button">
            <Text>Delete</Text>
          </Button>
          <Button onClick={() => push('/')} type="button">
            <Text>Back</Text>
          </Button>
        </ButtonGroup>
      </Nav>
      <Formik
        enableReinitialize
        initialValues={data || ({} as AppFormProps)}
        validationSchema={AppFormSchema}
        onSubmit={onUpdate}
      >
        {({ dirty }) => (
          <Form>
            <FormGridContainer>
              <FormGridItem>
                <TextField name="title" label="Title" />
              </FormGridItem>
              <FormGridItem>
                <MultiLineTextField name="body" label="Body" />
              </FormGridItem>
              <FormGridItem>
                <Button disabled={state === States.LoadingPut || !dirty} type="submit">
                  <Text>{state === States.LoadingPut ? 'Loading...' : 'Send it'}</Text>
                </Button>
              </FormGridItem>
              {state === States.Success && (
                <FormGridItem>
                  <Text>Successfully saved</Text>
                </FormGridItem>
              )}
            </FormGridContainer>
          </Form>
        )}
      </Formik>
    </Panel>
  )
}
