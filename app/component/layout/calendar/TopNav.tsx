'use client'

import styled from "styled-components";

const TopNav = () => {
    return (
        <TopNavLayout>
            TopNav
        </TopNavLayout>
    )
}

const TopNavLayout = styled.div`
    background-color: red;
    grid-column: 1/3;
    grid-row: 1/2;
`

export default TopNav