import { FC, useState } from 'react'
import { Formik, Form } from 'formik'

import {
  Heading,
  Button,
  TextField,
  Panel,
  FormGridContainer,
  FormGridItem,
  Text
} from './components'
import { AppFormProps } from './interfaces'
import { AppFormSchema } from './validations'

export const App: FC = () => {
  const [data, setData] = useState<AppFormProps | undefined>(undefined)
  const [notification, setNotification] = useState('')

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
        initialValues={data || { firstName: '', lastName: '' }}
        validationSchema={AppFormSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => {
          return (
            <Form>
              <FormGridContainer>
                <FormGridItem>
                  <TextField name="firstName" label="First name" />
                </FormGridItem>
                <FormGridItem>
                  <TextField name="lastName" label="Last name" />
                </FormGridItem>
                <FormGridItem>
                  <Button disabled={isSubmitting} type="submit">
                    Send it
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
