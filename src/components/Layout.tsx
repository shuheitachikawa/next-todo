import React from "react";
import type { ReactNode, FC } from "react";
import styled from "styled-components";

const Header = styled.header`
  background-color: #d0f0ff;
  padding: 16px;
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderTitle = styled.h1`
  font-size: 1rem;
  margin: 0;
  margin-right: 24px;
`;

interface Props {
  userName: string;
  children: ReactNode;
}

export const Layout: FC<Props> = (props) => {
  return (
    <div className="">
      <Header>
        <HeaderContainer className="container">
          <HeaderTitle className="h1">アプリ名</HeaderTitle>
          <div className="">{props.userName}</div>
        </HeaderContainer>
      </Header>
      <div className="">{props.children}</div>
    </div>
  );
};
