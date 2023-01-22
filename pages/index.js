import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { StoreProvider } from '../context/Store';

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Main from '../components/Main';
import Model from '../components/Model';


export default function Home({ user, contacts, chatrooms }) {
  return (
    <StoreProvider user={user} contacts={contacts} chatrooms={chatrooms}>
      <Head>
        <title>Chat App</title>
      </Head>
      <Header />
      <Sidebar />
      <Main />
      <Model />
    </StoreProvider>
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
      contacts: [],
      chatrooms: [],
    },
  }
}
