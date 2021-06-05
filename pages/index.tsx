import styled from 'styled-components'

export default function Index() {
  return (
    <Contain>
      <Herder>FORM INPUT IMAGE</Herder>
      <Paragraph>
        <Anchor href="create">create</Anchor> / <Anchor href="display">users</Anchor>
      </Paragraph>
    </Contain>
  )
}

const Contain = styled.div`
  text-transform: uppercase;
  box-sizing: border-box;
  background: #333333;
  color: #ffffff;
  min-width: 100%;
  min-height: 100vh;
  padding: 2rem 20%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const Herder = styled.h1`
  align-items: center;
  font-size: 7rem;
`

const Anchor = styled.a`
  &&:hover {
    border-bottom: 2px solid white;
  }
`

const Paragraph = styled.p`
  margin-top: 0;
  font-size: 2rem;
  text-align: start;
  @media (min-width: 1024px) {
    text-align: center;
    font-size: 3rem;
  }
`
