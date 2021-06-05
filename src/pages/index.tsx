import Head from "next/head";
import Link from "next/link";
import styled from "styled-components";
import { Layout } from "../components/Layout";
// import Image from "next/image";
//import styles from '../styles/Home.module.css'

export default function Home() {
  const id = "111";
  const userName = "tachi";
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout userName={userName}>
        <main>
          <h1>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>
          <Link href={`/todo`}>aaa</Link>
        </main>
      </Layout>
    </div>
  );
}
