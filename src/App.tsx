import { FC, useState, useEffect } from 'react'
import { Formik } from 'formik'

import {
  Heading,
  Button,
  TextField,
  Panel,
  FormGridContainer,
  FormGridItem,
  Text,
  MultiLineTextField,
  Form
} from './components'
import { AppFormProps } from './interfaces'
import { AppFormSchema } from './validations'

export const App: FC = () => {
  const [data, setData] = useState<AppFormProps | undefined>(undefined)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')

      if (response.status === 200) {
        const responseBody = await response.json()
        setData(responseBody)
      } else if (response.status >= 400) {
        setNotification('Server side error')
      }
    }

    fetchPosts()
  }, [])

  const onSubmit = async (values: AppFormProps): Promise<void> => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1', {
      method: 'PUT',
      body: JSON.stringify(values),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })

    if (response.status === 200) {
      const responseBody = await response.json()
      setData(responseBody)
      setNotification('Form successfully submitted')
    } else if (response.status >= 400) {
      setNotification('Server side error')
    }
  }

  return (
    <Panel>
      <Heading variant="h1">Hey im h1</Heading>
      <Formik
        enableReinitialize
        initialValues={data || ({} as AppFormProps)}
        validationSchema={AppFormSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <FormGridContainer>
                <FormGridItem>
                  <TextField name="title" label="Title" />
                </FormGridItem>
                <FormGridItem>
                  <MultiLineTextField name="body" label="Body" />
                </FormGridItem>
                <FormGridItem>
                  <Button disabled={isSubmitting} type="submit">
                    <Text>Send it</Text>
                  </Button>
                </FormGridItem>
                {notification && (
                  <FormGridItem>
                    <Text>{notification}</Text>
                  </FormGridItem>
                )}
              </FormGridContainer>
            </Form>
          )
        }}
      </Formik>
    </Panel>
  )
}
