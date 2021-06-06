import { ChangeEventHandler } from "react";
import styled from "styled-components";
import colors from "../const/Colors";

interface TextFieldProps {
  name: string;
  value: string | number;
  placeholder?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const TextFieldInput = styled.input`
  background-color: ${colors.PRIMARY};
  display: block;
  border: none;
  padding: 12px;
  border-radius: 12px;
  width: 100%;
  margin-bottom: 16px;
  :focus {
    outline: none;
  }
`;

export const TextField = (props: TextFieldProps) => {
  const { name, value, placeholder, onChange } = props;
  return (
    <TextFieldInput
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};
