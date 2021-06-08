import React, { useState } from "react";
import Link from "next/link";
import { NextPage } from "next";

// components
import { Layout } from "../../components/Layout";
import { TextField } from "../../components/TextField";
import { ButtonMain } from "../../components/ButtonMain";

// styled-components
import styled from "styled-components";

// Amplify
import { withSSRContext, API } from "aws-amplify";
import { listTodos } from "../../graphql/queries";
import { createTodo, deleteTodo } from "../../graphql/mutations";
import { Todo, CreateTodoInput, CreateTodoMutation } from "../../API";
import { GetServerSideProps } from "next";

// const
import Colors from "../../const/Colors";

import { Formik, FormikProps } from "formik";
// import * as Yup from "yup"; 一旦Formik内でバリデートしてみる

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const { API } = withSSRContext(context);
//   const response = await API.graphql({ query: listTodos });
//   return {
//     props: {
//       todos: response.data.listTodos.items,
//     },
//   };
// };

const TodoCardContainer = styled.div`
  padding: 8px;
  background-color: ${Colors.BG_GREY};
  border-radius: 4px;
`;
const TodoCard = styled.div`
  background-color: ${Colors.PRIMARY};
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 8px;
  position: relative;
`;
const DeleteButton = styled.button`
  background-color: #fff;
  border: none;
  position: absolute;
  top: 50%;
  right: 4px;
  transform: translateY(-50%);
  border-radius: 50%;
`;

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
  const [todos, setTodos] = useState(props.todos);
  const id = "aaa";

  const handleSubmitTodo = async (
    todo: CreateTodoInput,
    { setSubmitting, setErrors, setStatus, resetForm }: any
  ): Promise<void> => {
    try {
      const { data }: any = await API.graphql({
        query: createTodo,
        variables: { input: todo },
      });
      const newTodo = data.createTodo;
      setTodos([...todos, newTodo]);
      resetForm();
      setStatus({ success: true });
    } catch (e) {
      console.log(e);
      setStatus({ success: false });
      setSubmitting(false);
      // setErrors({ submit: error.message });
    }
  };
  const handleDeleteTodo = async (id: string | undefined): Promise<void> => {
    await API.graphql({
      query: deleteTodo,
      variables: { input: { id } },
    });
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="">
      <Layout userName="aaa">
        <div className="">
          <Formik
            onSubmit={handleSubmitTodo}
            initialValues={{ name: "", description: "" }}
            validate={validate}
          >
            {(props: FormikProps<CreateTodoInput>): React.ReactElement => {
              const { handleSubmit, values, errors, handleChange, status } =
                props;
              return (
                <form onSubmit={handleSubmit}>
                  <TextField
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
                  <ButtonMain text="追加" />
                </form>
              );
            }}
          </Formik>
          <TodoCardContainer>
            {todos.map((t) => {
              return (
                <TodoCard key={t.id}>
                  <div className="">{t.name}</div>
                  <DeleteButton
                    type="button"
                    onClick={() => handleDeleteTodo(t.id)}
                  >
                    X
                  </DeleteButton>
                </TodoCard>
              );
            })}
          </TodoCardContainer>
        </div>
      </Layout>
    </div>
  );
};

export default Todos;
