'use client'

import styled from 'styled-components'

const AddSchduleForm = () => {
  return (
    <FlexLayoutContainer>
      <h3>스케출 추가하기</h3>
      <GridFormContainer action="" row={3}>
        <ScheduleInfoLabel> 제목 </ScheduleInfoLabel> <ScheduleInfoInput type="text" />
        <ScheduleInfoLabel> 날짜 </ScheduleInfoLabel> <ScheduleInfoInput type="date" />
        <ScheduleInfoLabel> 종일 </ScheduleInfoLabel> <ScheduleInfoInput type="checkbox" />
        <button>제출 </button>
      </GridFormContainer>
    </FlexLayoutContainer>
  )
}

const FlexLayoutContainer = styled.div`
  z-index: 100;
  border: 3px firebrick solid;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

interface FormProps {
  row: number
}
const GridFormContainer = styled.form<FormProps>`
  border: 1px solid aqua;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: repeat(${(props) => props.row}, 1fr);
  flex-direction: column;
  :nth-last-child(1) {
    grid-column: 1 / 3;
  }
`
const ScheduleInfoInput = styled.input`
  border: 1px solid salmon;
`
const ScheduleInfoLabel = styled.label`
  border: 1px solid rebeccapurple;
`
export default AddSchduleForm
