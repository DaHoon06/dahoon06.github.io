import { ReactNode } from "react";

interface BlogLayoutProps {
  children: ReactNode;
}

export const BlogLayout = ({ children }: BlogLayoutProps) => {
  return <div>{children}</div>;
};
