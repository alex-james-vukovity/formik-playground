import { FC } from 'react'
import { Formik, Form } from 'formik'

import { Heading, Button, TextField, Panel, FormGridContainer, FormGridItem } from './components'
import { AppFormProps } from './interfaces'
import { AppFormSchema } from './validations'

export const App: FC = () => {
  const onSubmit = async (values: AppFormProps): Promise<void> => {
    await console.log(JSON.stringify(values))
  }

  return (
    <Panel>
      <Heading variant="h1">Hey im h1</Heading>
      <Formik
        initialValues={{ firstName: '', lastName: '' }}
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
              </FormGridContainer>
            </Form>
          )
        }}
      </Formik>
    </Panel>
  )
}
