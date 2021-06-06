import Link from "next/link";
import styled from "styled-components";
import { NextPage } from "next";

import { withSSRContext, API } from "aws-amplify";
import { listTodos } from "../../graphql/queries";
import { createTodo } from "../../graphql/mutations";
import { Todo, CreateTodoInput } from "../../API";
import { GetServerSideProps } from "next";

import { Formik, FormikProps } from "formik";
import React from "react";
// import * as Yup from "yup"; 一旦Formik内でバリデートしてみる

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { API } = withSSRContext(context);
  const response = await API.graphql({ query: listTodos });
  return {
    props: {
      todos: response.data.listTodos.items,
    },
  };
};

const handleSubmitTodo = async (todo: CreateTodoInput): Promise<void> => {
  console.log(todo);
  await API.graphql({
    query: createTodo,
    variables: { input: todo },
  });
};

interface Error {
  name?: string;
  description?: string;
}
const validate = (values: CreateTodoInput) => {
  const error: Error = {};
  if (!values.name) {
    error.name = "Required";
  }
  return error;
};

interface Props {
  todos: Todo[];
}

const Todos: NextPage<Props> = (props) => {
  const { todos } = props;
  const id = "aaa";
  return (
    <div className="">
      <div className="">
        <Formik
          onSubmit={handleSubmitTodo}
          initialValues={{ name: "", description: "" }}
          validate={validate}
        >
          {(props: FormikProps<CreateTodoInput>): React.ReactElement => {
            const { handleSubmit, values, errors, handleChange } = props;
            return (
              <form onSubmit={handleSubmit}>
                <input
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                />
                {/* <input
                  name="description"
                  value={values.description || ""}
                  onChange={handleChange}
                /> */}
                <p>{errors.name}</p>
                <button type="submit">追加</button>
              </form>
            );
          }}
        </Formik>
      </div>
      {todos.map((t) => {
        return (
          <div key={t.id} className="">
            {t.id}
          </div>
        );
      })}
      <Link href={`/todo/${id}`}>ID</Link>
    </div>
  );
};

export default Todos;
