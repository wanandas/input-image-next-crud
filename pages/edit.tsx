import { Form } from 'component/Form'
import { fetchWrapper } from 'helpers'
import { NextPage } from 'next'
import { useRouter } from 'next/dist/client/router'
import { useEffect, useState } from 'react'

export interface IForm {
  id?: number
  fname?: string
  lname?: string
  picture?: any
}

const Edit: NextPage = () => {
  const [form, setForm] = useState<IForm>()
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    ;(async () => {
      const result = await fetchWrapper.get(`api/users/${id}`)
      setForm(result)
    })()
  }, [router])

  return <Form form={form} state="Edit" setForm={setForm} />
}

export default Edit
