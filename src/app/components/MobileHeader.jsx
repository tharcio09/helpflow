'use client';

import { useState } from 'react';
import Link from 'next/link';
import { HiMenu, HiX } from 'react-icons/hi';
import SidebarNav from './SidebarNav';
import UserProfile from './UserProfile';

export default function MobileHeader() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <header className="md:hidden sticky top-0 z-40 bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
        <Link href="/dashboard" className="text-xl font-bold text-white">
          HelpFlow
        </Link>
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="text-gray-300 hover:text-white"
          aria-label="Abrir menu"
        >
          <HiMenu size={24} />
        </button>
      </header>

      {isSidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-40 md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />

          <aside className="fixed top-0 left-0 h-full w-64 bg-gray-800 p-6 flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out md:hidden"
            style={{ transform: isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)' }}
          >
            <div>
              <div className="flex justify-between items-center mb-10">
                <h1 className="text-2xl font-bold">HelpFlow</h1>
                <button 
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Fechar menu"
                >
                  <HiX size={24} />
                </button>
              </div>
              <div onClick={() => setIsSidebarOpen(false)}> 
                 <SidebarNav />
              </div>
            </div>
            <div className="border-t border-gray-700 pt-4">
              <UserProfile />
            </div>
          </aside>
        </>
      )}
    </>
  );
}