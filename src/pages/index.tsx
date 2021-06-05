import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { Layout } from "../components/Layout";
// import Image from "next/image";
//import styles from '../styles/Home.module.css'
import { Auth } from "aws-amplify";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const userName = "tachi";

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      await Auth.signIn(email, password);
      setIsSignIn(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signInForm = (
    <form onSubmit={handleLogin}>
      <input type="text" value={email} onChange={handleChangeEmail} />
      <input type="text" value={password} onChange={handleChangePassword} />
      <button type="submit">ログイン</button>
    </form>
  );

  const menuList = (
    <div className="">
      <Link href="/todo">Todo</Link>
    </div>
  )

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
}
