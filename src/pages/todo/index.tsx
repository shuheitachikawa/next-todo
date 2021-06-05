import Link from "next/link";
import styled from "styled-components";
import { NextPage } from "next";

import { withSSRContext } from "aws-amplify";
import { listTodos } from "../../graphql/queries";
import { GetServerSideProps } from "next";


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { API } = withSSRContext(context);
  const response = await API.graphql({ query: listTodos });
  return {
    props: {
      todos: response.data.listTodos.items,
    },
  };
};

interface Props {}

const Todos: NextPage<Props> = (todos) => {
  const id = "aaa";
  return (
    <div className="">
      <h1>{todos}</h1>
      <Link href={`/todo/${id}`}>ID</Link>
    </div>
  );
};

export default Todos;
