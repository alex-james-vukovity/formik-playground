import { FC, useState } from 'react'
import { Formik } from 'formik'
import { useHistory } from 'react-router-dom'

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
  Nav
} from 'components'
import { AppFormProps } from 'interfaces'
import { AppFormSchema } from 'validations'
import { States } from 'enums'

export const Create: FC = () => {
  const { push } = useHistory()

  const [state, setState] = useState<States | undefined>(undefined)

  const onSubmit = async (values: AppFormProps): Promise<void> => {
    setState(States.LoadingPost)
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts`, {
      method: 'POST',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    if (response.ok) {
      setState(undefined)
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

  return (
    <Panel>
      <Header>
        <Heading variant="h1">Create</Heading>
      </Header>
      <Nav>
        <Button onClick={() => push('/')} type="button">
          <Text>Back</Text>
        </Button>
      </Nav>
      <Formik
        initialValues={{
          title: '',
          body: '',
          id: '2131313'
        }}
        validationSchema={AppFormSchema}
        onSubmit={onSubmit}
      >
        <Form>
          <FormGridContainer>
            <FormGridItem>
              <TextField name="title" label="Title" placeholder="Enter a title" />
            </FormGridItem>
            <FormGridItem>
              <MultiLineTextField name="body" label="Body" placeholder="Enter a body" />
            </FormGridItem>
            <FormGridItem>
              <Button disabled={state === States.LoadingPost} type="submit">
                <Text>{state === States.LoadingPost ? 'Loading...' : 'Send it'}</Text>
              </Button>
            </FormGridItem>
          </FormGridContainer>
        </Form>
      </Formik>
    </Panel>
  )
}
