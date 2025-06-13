import { ReactElement } from "react";
import styled from "styled-components";

export const ProjectScreenLayout = styled.section`
  width: 100%;
  color: #222;
  padding: 2em;
  background-color: #fbfbfb;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 0.8em;
  color: #333;
`;

const ProjectBox = styled.div`
  display: flex;
  gap: 1.5em;
  flex-direction: column;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MainProjectCard = styled.article`
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  height: 360px;
  padding: 1em;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px); 
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .contents_container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    height: 100%;
    gap: 0.8em;
    @media (max-width: 768px) {
      grid-template-columns: none;
    }
  }

  .main-thumbnail {
    min-height: 140px;
    height: 100%;
    background-color: #f0f0f0;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #555;
  }
  
  .project-info-box {
    display: flex;
    flex-direction: column;
    gap: 10px;
    
    .description {
      font-size: 1em;
      color: #666;
    }

    ul {
      list-style: none;
      padding: 0;
      display: flex;
      flex-wrap: wrap;
      gap: 0.5em;

      li {
        background: #e0e0e0;
        padding: 0.3em 0.6em;
        font-size: 0.85em;
        border-radius: 4px;
        color: #333;
      }
    }

    .button-wrapper {
      width: 100%;
      text-align: center;
      
      button {
        width: 100%;
        max-width: 200px;
        align-self: flex-start;
        padding: 0.6em 1.2em;
        font-size: 0.9em;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;

        &:hover {
          background-color: #0056b3;
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    height: auto;
  }
`;

const SubProjectCardBox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 1em;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SubProjectCard = styled.article`
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 100%;
  min-height: 300px;
  padding: 1em;
  background-color: #fdfdfd;
  display: flex;
  flex-direction: column;
  gap: 0.6em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    cursor: pointer;
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  
  .contents_container {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  }

  .main-thumbnail {
    height: 60px;
    background-color: #f7f7f7;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #888;
  }

  .description {
    font-size: 0.9em;
    color: #666;
  }

  button {
    align-self: flex-start;
    padding: 0.4em 0.8em;
    font-size: 0.85em;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export const ProjectScreen = (): ReactElement => {
  return (
    <ProjectScreenLayout>
      <Title>Project.</Title>
      <ProjectBox>
        <MainProjectCard>
          <div className="contents_container">
            <div className="main-thumbnail">유니서베이 섬네일</div>
            <div className={'project-info-box'}>
              <p className="description">유니서베이는 누구나 손쉽게 설문을 만들고 관리, 배포 할 수 있습니다. 설문 진행 상황을 모니터링하고, 수집된 데이터 차트로 시각화하여 분석할 수 있는 B2B 및 B2C 기반 설문 제작 플랫폼입니다.</p>
              <ul>
                <li>Next.js</li>
                <li>Vue.js 2/3</li>
                <li>NestJS</li>
                <li>MongoDB</li>
                <li>Zustand</li>
                <li>Vuex</li>
                <li>Tanstack-Query</li>
                <li>Styled-Component</li>
              </ul>
              <div className={'button-wrapper'}>
                <button>바로가기</button>
              </div>
            </div>
          </div>
        </MainProjectCard>
        <SubProjectCardBox>
          <SubProjectCard>
            <div className="contents_container">
              <div className="main-thumbnail">유니서베이 섬네일</div>
              <div>
                <p className="description">프로젝트 설명</p>
                <button>바로가기</button>
              </div>
            </div>
          </SubProjectCard>
          <SubProjectCard>
            <div className="contents_container">
              <div className="main-thumbnail">유니서베이 섬네일</div>
              <div>
                <p className="description">프로젝트 설명</p>
                <button>바로가기</button>
              </div>
            </div>
          </SubProjectCard>
          <SubProjectCard>
            <div className="contents_container">
              <div className="main-thumbnail">유니서베이 섬네일</div>
              <div>
                <p className="description">프로젝트 설명</p>
                <button>바로가기</button>
              </div>
            </div>
          </SubProjectCard>
        </SubProjectCardBox>
      </ProjectBox>
    </ProjectScreenLayout>
  );
};
