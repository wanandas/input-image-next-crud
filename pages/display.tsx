import { fetchWrapper, IUser } from 'helpers'
import { NextPage } from 'next'
import { useMemo } from 'react'
import styled from 'styled-components'

const Display: NextPage = (props) => {
  const users = useMemo(() => {
    return props['users'] as IUser[]
  }, [props])

  return (
    <Contain>
      <h1 style={{ textAlign: 'center' }}>ALL USERS</h1>
      <div style={{ textAlign: 'end', marginBottom: '.5rem' }}>
        <Anchor href="create">create new</Anchor> /{' '}
        <Anchor
          onClick={() => {
            const deleteUsers = confirm(`Are you sure your want to delete 'All user' ?`)
            if (deleteUsers) {
              fetchWrapper.delete('api/users')
            }
          }}
        >
          delete all
        </Anchor>
      </div>
      <div style={{ textAlign: 'center', borderTop: '1px solid white' }}>
        <table width="100%">
          <thead>
            <tr style={{ alignContent: 'center' }}>
              <th>
                <h3>id</h3>
              </th>
              <th>
                <h3>first name</h3>
              </th>
              <th>
                <h3>last name</h3>
              </th>
              <th>
                <h3>picture</h3>
              </th>
              <th>
                <h3>button</h3>
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((value, index) => {
              return (
                <tr key={`${value.lname}${index}`} style={{ alignContent: 'center' }}>
                  <td>
                    <p>{value.id}</p>
                  </td>
                  <td>
                    <p>{value.fname}</p>
                  </td>
                  <td>
                    <p>{value.lname}</p>
                  </td>
                  <td>
                    <Anchor href={`#${value.fname}-${value.id}`}>View Image</Anchor>
                    <LightBox href="#" id={`${value.fname}-${value.id}`}>
                      <span style={{ backgroundImage: `url(${value.picture})` }} />
                    </LightBox>
                  </td>
                  <td>
                    <Anchor href={`/edit?id=${value.id}`}>edit</Anchor> /{' '}
                    <Anchor
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        fetchWrapper.delete(`api/users/${value.id}`)
                      }}
                    >
                      delete
                    </Anchor>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Contain>
  )
}

export async function getStaticProps() {
  const users: IUser[] = await fetchWrapper.get('http://localhost:3000/api/graphql')

  return {
    props: { users }
  }
}

export default Display

const Contain = styled.div`
  text-transform: uppercase;
  box-sizing: border-box;
  background: #333333;
  color: #ffffff;
  min-width: 100%;
  min-height: 100vh;
  padding: 2rem 0;
  @media (min-width: 768px) {
    padding: 2rem 10%;
  }
  @media (min-width: 1024px) {
    padding: 2rem 15%;
  }
`

const LightBox = styled.a`
  display: none;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 3em;
  background: rgba(0, 0, 0, 0.8);

  &&:target {
    display: block;
  }

  && span {
    display: block;
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
`

const Anchor = styled.a`
  cursor: pointer;
  &&:hover {
    border-bottom: 1px solid white;
  }
`
