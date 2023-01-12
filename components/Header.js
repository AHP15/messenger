import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <Link href="/">
        <h1>Chat App</h1>
      </Link>
    </header>
  );
}