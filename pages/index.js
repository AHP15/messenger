import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';

import Head from 'next/head'
import styles from '../styles/Home.module.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Main from '../components/Main';
import { useState } from 'react';


export default function Home({ user, contacts, chatrooms }) {
  const [state, setState] = useState({
    alert: {
      type: null,
      message: null,
    },

  });

  return (
    <>
      <Head>
        <title>Chat App</title>
      </Head>
      <Header />
       <Main />
      <Sidebar />
    </>
  )
}

export async function getServerSideProps(context) {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: '/api/auth/signin',
        permanent: false,
      },
    }
  }
  const user = session.user;
  return {
    props: {
      user,
    },
  }
}
