import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { Layout } from "../../components/Layout";

import { Auth } from "aws-amplify";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userName = "tachi";

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUp = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    try {
      await Auth.signUp({
        username: email.trim(),
        password: password.trim(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout userName={userName}>
        <main>
          <form onSubmit={handleSignUp}>
            <input type="text" value={email} onChange={handleChangeEmail} />
            <input
              type="text"
              value={password}
              onChange={handleChangePassword}
            />
            <button type="submit">ログイン</button>
          </form>
        </main>
      </Layout>
    </div>
  );
}
