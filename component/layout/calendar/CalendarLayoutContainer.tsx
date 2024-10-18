'use client'

import styled from "styled-components";

const CalendarLayoutContainer = ({ children }) => {
    return (
        <FlexLayout>
            {children}
        </FlexLayout>
    )
}

const FlexLayout = styled.div`
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 50px;
    height: 100vh;
`

export default CalendarLayoutContainer