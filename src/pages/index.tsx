import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { NextPage } from "next";
// import Image from "next/image";
//import styles from '../styles/Home.module.css'

// const
import Colors from "../const/colors";

// styled-components
import styled from "styled-components";

// components
import { Layout } from "../components/Layout";
import { TextField } from "../components/TextField";
import { ButtonMain } from "../components/ButtonMain";

// Amplify
import { Auth, withSSRContext } from "aws-amplify";

// Formik
import { Formik, FormikProps } from "formik";

interface LoginInfo {
  email: string;
  password: string;
}

export async function getServerSideProps(context: any) {
  const { Auth } = withSSRContext({ req: context.req });
  const userInfo = await Auth.currentUserInfo();
  return {
    props: {
      userInfo,
    },
  };
}

const Item = styled.div`
  background-color: ${Colors.PRIMARY};
  padding: 16px;
  margin-bottom: 16px;
  cursor: pointer;
`;

const LogoutButton = styled.button`
  display: block;
  background-color: ${Colors.PRIMARY};
  border: none;
  width: 100%;
  border-radius: 20px;
  padding: 8px 0;
  font-weight: bold;
  cursor: pointer;
`;

interface Props {
  userInfo: {
    id: string;
    username: string;
    attributes: {
      email: string;
      email_verified: string;
      sub: string;
    };
  } | null;
}

export const Home: NextPage<Props> = (props) => {
  const { userInfo } = props;
  const [isSignIn, setIsSignIn] = useState(!!userInfo);
  const userName = userInfo ? userInfo.attributes.email : "";

  type LoginFunction = (arg: LoginInfo) => Promise<void>;
  const handleLogin: LoginFunction = async (props) => {
    try {
      await Auth.signIn(props.email, props.password);
      setIsSignIn(true);
    } catch (error) {
      console.log(error.message);
    }
  };
  type LogoutFunction = () => void;
  const handleLogout: LogoutFunction = async () => {
    await Auth.signOut();
    setIsSignIn(false);
  };

  const signInForm = (
    <Formik onSubmit={handleLogin} initialValues={{ email: "", password: "" }}>
      {(props: FormikProps<LoginInfo>) => {
        const { handleSubmit, values, errors, handleChange } = props;
        return (
          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="メールアドレス"
              name="email"
              value={values.email}
              onChange={handleChange}
            />
            <TextField
              placeholder="パスワード"
              name="password"
              value={values.password}
              onChange={handleChange}
            />
            <ButtonMain
              text="ログイン"
              // type="submit"
            />
          </form>
        );
      }}
    </Formik>
  );

  const menuList = (
    <div className="appItem">
      <Link href="/todo">
        <Item className="appItem">Todo</Item>
      </Link>
      <LogoutButton onClick={handleLogout}>ログアウト</LogoutButton>
    </div>
  );

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout userName={userName}>
        <main>
          {!isSignIn && signInForm}
          {isSignIn && menuList}
        </main>
      </Layout>
    </div>
  );
};

export default Home;
