import React, { useState, useEffect, useReducer } from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { TextField } from "../../components/TextField";
import { ButtonMain } from "../../components/ButtonMain";
import styled from "styled-components";
import { withSSRContext, API } from "aws-amplify";
import { listTodos } from "../../graphql/queries";
import { createTodo, deleteTodo } from "../../graphql/mutations";
import { Todo, CreateTodoInput, ListTodosQuery } from "../../API";
import Colors from "../../const/Colors";
import { Formik, FormikProps } from "formik";

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

interface State {
  todos: Todo[];
}
interface ActionType {
  type: "QUERY" | "SUBSCRIPTION";
  todos: Todo[];
}
const reducer = (state: State, action: ActionType) => {
  switch (action.type) {
    case "QUERY":
      return { ...state, todos: action.todos };
    default:
      return state;
  }
};

const initialState = {
  todos: [],
};
const Todos: NextPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffectはclean up関数をreturnするため、asyncにするとPromiseをreturnなのでNG
  useEffect(() => {
    const fetchTodos = async () => {
      const { data }: any = await API.graphql({
        query: listTodos,
      });
      const sortedItems = data.listTodos.items.sort((a: any, b: any) => {
        a.createdAt - b.createdAt;
      });
      dispatch({ type: "QUERY", todos: sortedItems });
    };
    fetchTodos();
    return () => {};
  }, []);

  const handleSubmitTodo = async (
    todo: CreateTodoInput,
    { setSubmitting, setErrors, setStatus, resetForm }: any
  ): Promise<void> => {
    try {
      const { data }: any = await API.graphql({
        query: createTodo,
        variables: { input: todo },
      });
      const newTodo: Todo = data.createTodo;
      dispatch({ type: "QUERY", todos: [newTodo, ...state.todos] });
      resetForm();
      setStatus({ success: true });
    } catch (e) {
      console.log(e);
      setStatus({ success: false });
    }
    setSubmitting(false);
  };
  const handleDeleteTodo = async (
    e: React.FormEvent,
    id: string | undefined
  ): Promise<void> => {
    e.preventDefault();
    await API.graphql({
      query: deleteTodo,
      variables: { input: { id } },
    });
    const newTodos = state.todos.filter((t: Todo) => t.id !== id);
    dispatch({ type: "QUERY", todos: newTodos });
  };

  return (
    <div className="">
      <Layout>
        <div className="">
          <Formik
            onSubmit={handleSubmitTodo}
            initialValues={{ name: "", description: "" }}
            validate={validate}
          >
            {(props: FormikProps<CreateTodoInput>): React.ReactElement => {
              const {
                handleSubmit,
                values,
                errors,
                isSubmitting,
                handleChange,
                status,
              } = props;
              return (
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between mb-5">
                    <TextField
                      id={"name"}
                      type={"text"}
                      placeholder={"TODO"}
                      value={values.name}
                      onChange={handleChange}
                      readOnly={isSubmitting}
                    />
                    <div className="ml-2">
                      <ButtonMain isSubmitting={isSubmitting}>ADD</ButtonMain>
                    </div>
                  </div>
                  <p>{errors.name}</p>
                </form>
              );
            }}
          </Formik>
          <ul>
            {state.todos &&
              state.todos.map((t: Todo) => {
                return (
                  <li
                    key={t.id}
                    className="flex justify-between py-2 px-2 bg-indigo-100 mb-2 items-center rounded-lg shadow-sm"
                  >
                    <div className="">{t.name}</div>
                    <form onSubmit={(e) => handleDeleteTodo(e, t.id)}>
                      <ButtonMain isSubmitting={false}>✗</ButtonMain>
                    </form>
                  </li>
                );
              })}
          </ul>
        </div>
      </Layout>
    </div>
  );
};

export default Todos;
