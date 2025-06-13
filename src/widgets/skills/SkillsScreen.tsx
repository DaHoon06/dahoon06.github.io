import { ReactElement, useState } from "react";
import styled from "styled-components";
import SkillIcons from "@shared/ui/icons/SkillIcons";

export const SkillsScreenLayout = styled.section`
  width: 100%;
  color: #fbfbfb;
  padding: 1em 2em;
  background-color: #2b2b2b;
`;

const Title = styled.h1`
  font-size: 1.5em;
  margin-bottom: 1em;
`;

const Tabs = styled.div`
  display: flex;
  gap: 2em;
  border-bottom: 2px solid #444;
  margin-bottom: 1em;
`;

const Tab = styled.div<{ $isActive: boolean }>`
  padding: 0.6em 0;
  cursor: pointer;
  font-size: 1.1em;
  color: ${({ $isActive }) => ($isActive ? "#fff" : "#888")};
  border-bottom: ${({ $isActive }) =>
    $isActive ? "3px solid #007bff" : "none"};
  font-weight: ${({ $isActive }) => ($isActive ? "bold" : "normal")};
  transition:
    color 0.2s,
    border-bottom 0.1s;

  &:hover {
    color: #fff;
  }
`;

const SkillList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;

  li {
    background: #444;
    padding: 0.4em 0.8em;
    border-radius: 4px;
    color: #fbfbfb;
  }
`;

const frontend = ["nextjs", "react", "vue", "zustand", "redux", "vuex"];
const backend = ["nestjs", "nodejs", "mongodb"];
const etc = ["typescript", "sass", "aws", "docker", "git"];

export const SkillsScreen = (): ReactElement => {
  const [activeTab, setActiveTab] = useState("Frontend");

  const renderSkills = (): any => {
    switch (activeTab) {
      case "Frontend":
        return frontend;
      case "Backend":
        return backend;
      case "Etc":
        return etc;
      default:
        return [];
    }
  };

  return (
    <SkillsScreenLayout>
      <Title>Skills.</Title>
      <Tabs>
        <Tab
          $isActive={activeTab === "Frontend"}
          onClick={() => setActiveTab("Frontend")}
        >
          Frontend
        </Tab>
        <Tab
          $isActive={activeTab === "Backend"}
          onClick={() => setActiveTab("Backend")}
        >
          Backend
        </Tab>
        <Tab
          $isActive={activeTab === "Etc"}
          onClick={() => setActiveTab("Etc")}
        >
          Etc
        </Tab>
      </Tabs>
      <SkillList>
        {renderSkills().map((skill: any) => (
          <li key={skill}>
            <SkillIcons type={skill} />
          </li>
        ))}
      </SkillList>
    </SkillsScreenLayout>
  );
};
