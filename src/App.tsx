import { FC, useState } from 'react'
import { Formik, Form } from 'formik'

import { Heading, Box, Button, TextField } from './components'
import { AppFormProps } from './interfaces'
import { AppFormSchema } from './validations'

export const App: FC = () => {
  const onSubmit = async (values: AppFormProps): Promise<void> => {
    await console.log(values)
  }

  return (
    <Box>
      <Heading variant="h1">Hey im h1</Heading>
      <Formik initialValues={{ name: '' }} validationSchema={AppFormSchema} onSubmit={onSubmit}>
        {({ isSubmitting }) => {
          return (
            <Form>
              <TextField name="name" label="Name" />
              <Button disabled={isSubmitting} type="submit">
                Send it
              </Button>
            </Form>
          )
        }}
      </Formik>
    </Box>
  )
}
