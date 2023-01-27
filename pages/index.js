import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]';
import { StoreProvider } from '../context/Store';

import Head from 'next/head';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Main from '../components/Main';
import Model from '../components/Model';
import { getUser } from '../fetch/requests';

export default function Home({ user, contacts, chatrooms, error }) {
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

  const { user } = await getUser('http://localhost:3000/api/user', session.user)
                          .then(data => data);
  
  return {
    props: {
      user: {
        name: user.name,
        email: user.email,
        image: user.image,
        id: user.id,
      },
      contacts: user.contacts,
      chatrooms: user.chats,
    },
  }
}
