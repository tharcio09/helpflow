'use client';

import { useSession, signOut } from 'next-auth/react';
import { LuLogOut } from 'react-icons/lu';

export default function UserProfile() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <img
          src={session.user.image || '/default-avatar.png'}
          alt={session.user.name}
          className="w-10 h-10 rounded-full border-2 border-gray-600"
        />
        <div>
          <p className="text-sm font-medium text-white">{session.user.name}</p>
          <p className="text-xs text-gray-400">{session.user.email}</p>
        </div>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="w-full flex items-center justify-center gap-2 p-2 rounded-lg text-sm text-red-400 hover:bg-red-900/50 transition-colors"
      >
        <LuLogOut />
        <span>Sair da Conta</span>
      </button>
    </div>
  );
}