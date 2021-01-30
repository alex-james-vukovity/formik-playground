import * as Yup from 'yup'

export const AppFormSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  body: Yup.string().required('Required')
})
