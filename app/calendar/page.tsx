"use client"

import TopNav from "@/component/layout/calendar/TopNav";
import MainContent from "@/component/layout/calendar/MainContent";
import CalendarLayoutContainer from "@/component/layout/calendar/CalendarLayoutContainer";
import SideContent from "@/component/layout/calendar/SideContent";

export default function Home() {
    return (
        <CalendarLayoutContainer>
            <TopNav />
            <SideContent />
            <MainContent />
        </CalendarLayoutContainer>
    );
}