import Link from "next/link";
import styled from "styled-components";
import { NextPage } from "next";

import { withSSRContext } from "aws-amplify";
import { listTodos } from "../../graphql/queries";
import { Todo } from "../../API";
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

interface Props {
  todos: Todo[];
}

const Todos: NextPage<Props> = (props) => {
  const id = "aaa";
  console.log(props.todos);
  return (
    <div className="">
      {props.todos.map((p) => {
        return <div className="">{p}</div>;
      })}
      <Link href={`/todo/${id}`}>ID</Link>
    </div>
  );
};

export default Todos;
