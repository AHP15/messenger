import { signOut } from 'next-auth/react';

export default function Main() {
  return (
    <main>
      <button onClick={signOut}>signout</button>
    </main>
  );
}