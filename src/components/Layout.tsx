import React from "react";
import type { ReactNode, FC } from "react";
import styled from "styled-components";
import Color from "../const/colors"

const Header = styled.header`
  background-color: ${Color.PRIMARY};
`;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  max-width: 400px;
`;

const Container = styled.div`
  padding: 24px;
  max-width: 400px;
`

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
          <HeaderTitle className="h1">MyApp</HeaderTitle>
          <div className="">{props.userName}</div>
        </HeaderContainer>
      </Header>
      <Container className="">{props.children}</Container>
    </div>
  );
};
