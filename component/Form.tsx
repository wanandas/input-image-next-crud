import { fetchWrapper } from 'helpers'
import { useRouter } from 'next/dist/client/router'
import { IForm } from 'pages/edit'
import { ChangeEvent, SetStateAction, useState } from 'react'
import styled from 'styled-components'

const toBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

const noPicture = 'https://www.freeiconspng.com/uploads/no-image-icon-6.png'

export function Form({
  form,
  state,
  setForm
}: {
  form: IForm
  state: string
  setForm: (value: SetStateAction<IForm>) => void
}) {
  const router = useRouter()
  const { id } = router.query

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target
    const inputName = input.name

    const newValue = Object.assign({}, form)
    if (inputName !== 'picture') {
      newValue[inputName] = input.value
    } else {
      if (e.target.value) {
        newValue[inputName] = input.files[0]
      }
    }
    return setForm(newValue)
  }

  const handleSubmit = async () => {
    if (Object.keys(form).length !== 0 && form.picture) {
      const submitValue = Object.assign({}, form)
      let picture
      if (typeof submitValue.picture !== 'string') {
        picture = await toBase64(submitValue.picture)
      } else {
        picture = submitValue.picture
      }

      if (state === 'create') {
        await fetchWrapper.post('api/users', { ...submitValue, picture })
      } else {
        await fetchWrapper.put(`api/users/${id}`, { ...submitValue, picture })
      }
      router.push('/display')
    } else {
      alert('need input!')
    }
  }

  return (
    <Contain>
      <NaviContain>
        <a href="/">Home</a>&nbsp;/&nbsp;<a href="/display">All user</a>
      </NaviContain>
      <FormContain>
        <h1 style={{ textTransform: 'uppercase' }}>Form {state}</h1>
        <ContainImage>
          <Image
            src={(() => {
              if (form?.picture) {
                if (typeof form.picture !== 'string') {
                  return URL.createObjectURL(form.picture)
                } else {
                  return form.picture
                }
              } else {
                return noPicture
              }
            })()}
            alt="Profile Picture"
          />
          <div>
            <InputImage
              type="file"
              id="picture"
              name="picture"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              multiple
            />
            <label htmlFor="picture">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17">
                <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
              </svg>{' '}
              <span>Choose a file&hellip;</span>
            </label>
          </div>
        </ContainImage>

        <Box>
          <Label htmlFor="fname">First name :</Label>
          <TextInput
            name="fname"
            type="text"
            id="fname"
            value={form?.fname || ''}
            onChange={handleChange}
            placeholder="First name.."
          />
        </Box>
        <Box>
          <Label htmlFor="lname">Last Name :</Label>
          <TextInput
            type="text"
            id="lname"
            name="lname"
            placeholder="Last name.."
            value={form?.lname || ''}
            onChange={handleChange}
          />
        </Box>
        <SubmitButton type="button" onClick={handleSubmit}>
          SUBMIT
        </SubmitButton>
      </FormContain>
    </Contain>
  )
}

const Contain = styled.div`
  background: #333333;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  min-height: 100vh;
  @media (min-width: 768px) {
    place-content: center;
    padding: 1rem 10%;
  }

  @media (min-width: 1024px) {
    padding: 2rem 15%;
  }
`

const ContainImage = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align-last: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid white;
`

const FormContain = styled.form`
  padding: 1rem 1rem;
  font-size: 1rem;
  text-align: center;
  align-content: center;
  @media (min-width: 768px) {
    padding: 0 2rem 2rem;
    border: 1px solid #ffffff;
  }
`
const Box = styled.div`
  display: grid;
  gap: 1rem;
  margin: 1rem 0;
  grid-template-columns: 1fr 3fr;
`

const TextInput = styled.input`
  width: 100%;
  padding: 0.75rem 1.25rem;
  font-size: 1rem;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  box-sizing: border-box;
`
const Label = styled.label`
  text-transform: uppercase;
  font-weight: 700;
  margin: 0.5rem 0;
  white-space: nowrap;
`

const Image = styled.img`
  max-width: 350px;
  width: auto;
  height: auto;
  align-self: center;
`

const SubmitButton = styled.button`
  background-color: white; /* Green */
  border: 1px solid #333333;
  color: #333333;
  font-weight: 700;
  border-radius: 4px;
  padding: 1rem 2rem;
  margin: 1rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  transition-duration: 0.4s;
  cursor: pointer;

  &&:hover {
    background-color: #333333; /* Green */
    color: white;
    border: 1px solid white;
  }
`

const InputImage = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  && + label {
    max-width: 80%;
    font-size: 1.25rem;
    /* 20px */
    font-weight: 700;
    text-overflow: ellipsis;
    border-radius: 0.25rem;
    white-space: nowrap;
    cursor: pointer;
    display: inline-block;
    overflow: hidden;
    background: white;
    color: #333333;
    border: 1px solid white;
    padding: 0.625rem 1.25rem;
    transition-duration: 0.4s;
    /* 10px 20px */

    :hover {
      background-color: #333333;
      color: white;
      border: 1px solid white;
    }
  }
  && + label svg {
    width: 1em;
    height: 1em;
    vertical-align: middle;
    fill: currentColor;
    margin-top: -0.25em;
    margin-right: 0.25em;
  }
`

const NaviContain = styled.div`
  display: flex;
  align-self: flex-end;
  margin: 1rem 0.5rem 0.5rem;
  @media (min-width: 768px) {
    margin-right: 0;
  }
`
