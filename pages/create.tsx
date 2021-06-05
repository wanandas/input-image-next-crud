import { Form } from 'component/Form'
import { NextPage } from 'next'
import { useState } from 'react'

export interface IForm {
  id?: number
  fname?: string
  lname?: string
  picture?: any
}

const Create: NextPage = () => {
  const [form, setForm] = useState<IForm>({})
  return <Form form={form} state="create" setForm={setForm} />
}

export default Create
