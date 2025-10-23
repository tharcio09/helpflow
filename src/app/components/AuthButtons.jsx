// src/app/components/AuthButtons.jsx
'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButtons() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <p>Olá, {session.user.name}</p>
        <img src={session.user.image} alt="Avatar" style={{ borderRadius: '50%', width: '50px' }} />
        <button onClick={() => signOut()}>Sair</button>
      </>
    );
  }
  return (
    <>
      <p>Você não está logado.</p>
      <button onClick={() => signIn('github')}>Entrar com GitHub</button>
    </>
  );
}