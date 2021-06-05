import Link from "next/link";
import styled from "styled-components";
import { NextPage } from "next";

interface Props {}

const Todos: NextPage<Props> = (props) => {
  const id = "aaa";
  return (
    <div className="">
      <h1>Todo</h1>
      <Link href={`/todo/${id}`}>ID</Link>
    </div>
  );
};

export default Todos;
