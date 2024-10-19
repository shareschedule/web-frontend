"use client"

import TopNav from "@/app/component/layout/calendar/TopNav";
import MainContent from "@/app/component/layout/calendar/MainContent";
import CalendarLayoutContainer from "@/app/component/layout/calendar/CalendarLayoutContainer";
import SideContent from "@/app/component/layout/calendar/SideContent";

export default function Home() {
    return (
        <CalendarLayoutContainer>
            <TopNav />
            <SideContent />
            <MainContent />
        </CalendarLayoutContainer>
    );
}