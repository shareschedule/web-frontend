import styled from 'styled-components'

interface AddScheduleBtnProps {
  onclick?: () => void
}

const AddScheduleBtn = ({ onclick }: AddScheduleBtnProps) => {
  return <Button onClick={onclick}>test</Button>
}

const Button = styled.button``

export default AddScheduleBtn
