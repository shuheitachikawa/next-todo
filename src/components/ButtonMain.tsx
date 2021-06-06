import React from "react";
import { ChangeEventHandler } from "react";
import styled from "styled-components";
import Colors from "../const/Colors";

interface ButtonProps {
  text: string;
  // type: string;
  onClick?: ChangeEventHandler<HTMLButtonElement>;
}

const Button = styled.button`
  background-color: ${Colors.PRIMARY};
  display: block;
  border: none;
  padding: 12px;
  border-radius: 12px;
  width: 100%;
  margin-bottom: 16px;
  cursor: pointer;
`;

export const ButtonMain = (props: ButtonProps): JSX.Element => {
  const { text } = props;
  return <Button>{text}</Button>;
};
