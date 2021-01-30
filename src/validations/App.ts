import * as Yup from 'yup'

export const AppFormSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required')
})
