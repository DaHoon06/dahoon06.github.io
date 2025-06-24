import useUtilityStore from "shared/store/utilityStore";
import { useRef } from "react";
import styled from "styled-components";
import { ProgressBar } from "@shared/ui/progress/ProgressBar";
import { AboutScreen } from "@widgets/about/AboutScreen";
import { SkillsScreen } from "@widgets/skills/SkillsScreen";
import { ProjectScreen } from "@widgets/project/ProjectScreen";
import { ContactScreen } from "@widgets/contact/ContactScreen";
import { HomeLayout } from "@widgets/layouts";

export const ScreenLayout = styled.div`
    width: 100%;
    position: relative;
    background: transparent;
    border: none;
    padding: 0 0 2em;
`;

export const ScreenContainer = styled.div`
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.4);
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    border-radius: 30px 30px 0 0;
    background: transparent;
`;

function HomeBackup() {
    const { isVisible, setScrollTo } = useUtilityStore();
    const screenRefs = useRef<(HTMLDivElement | null)[]>([]);

    const handleButtonClick = (index: number) => {
        setScrollTo(index); // 클릭된 인덱스 설정
    };

    return (
        <HomeLayout>
            <ProgressBar isVisible={isVisible} />
            <ScreenLayout ref={(el: any) => (screenRefs.current[0] = el)}>
                <ScreenContainer>
                    <AboutScreen />
                    <SkillsScreen />
                    <ProjectScreen />
                    <ContactScreen />
                </ScreenContainer>
            </ScreenLayout>
        </HomeLayout>
    );
}
