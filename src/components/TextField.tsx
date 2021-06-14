import { ChangeEventHandler } from "react";
interface TextFieldProps {
  id: string;
  type: string;
  placeholder: string;
  value: string;
  readOnly: boolean
  onChange: ChangeEventHandler<HTMLInputElement>;
}


export const TextField = (props: TextFieldProps) => {
  return (
    <input
      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      readOnly={props.readOnly}
    />
  );
};
