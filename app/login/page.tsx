import styled from 'styled-components'

export default function Home() {
  const testLogin = () => {}
  return (
    <h1 className="text-sky-400 text-3xl font-bold underline">
      Hello world!
      <LoginButton onClick={testLogin}></LoginButton>
    </h1>
  )
}

const LoginButton = styled.div`
  background-color: red;
`
