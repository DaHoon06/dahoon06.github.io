import React, {useMemo} from "react";
import styled from "styled-components";
import Image from "next/image";

type SkillIconType =
  "aws" |
  'docker' |
  'git' |
  'mongodb' |
  'typescript' |
  'vue' |
  'vuex' |
  'zustand' |
  'sass' |
  'redux' |
  'nodejs' |
  'nestjs' |
  'nextjs' |
  'react'
  ;
type IconFormat = 'svg' | 'png' | 'webp';

interface SkillIconsProps {
  type: SkillIconType;
  format?: IconFormat;
}

const SkillIconLayout = styled.div`
  
`;

const SkillIcons = ({ type, format = 'svg'}: SkillIconsProps) => {

  const src = useMemo((): string => {
    const imageFormat = type === 'zustand' ? 'png' : 'svg';
    return `/images/icons/skills/${type}.${imageFormat}`;
  }, [type]);

  return (
    <SkillIconLayout>
      <Image
        src={src}
        alt={`${type}_icon`}
        width={36}
        height={36}
      />
    </SkillIconLayout>
  )
}

export default React.memo(SkillIcons);