import * as Yup from 'yup'

export const AppFormSchema = Yup.object().shape({
  name: Yup.string().required('Required')
})
