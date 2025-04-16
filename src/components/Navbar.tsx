'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-slate-800 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          Finance Tracker
        </Link>
        <div className="space-x-6">
        <Link 
            href="/" 
            className={`${pathname === '/' ? 'text-blue-400' : 'hover:text-blue-400'}`}
          >
            Transaction Form
          </Link>
          <Link 
            href="/dashboard" 
            className={`${pathname === '/dashboard' ? 'text-blue-400' : 'hover:text-blue-400'}`}
          >
            Dashboard
          </Link>
          <Link 
            href="/budgets" 
            className={`${pathname === '/budgets' ? 'text-blue-400' : 'hover:text-blue-400'}`}
          >
            Budget Management
          </Link>
          
          <Link 
            href="/transactions" 
            className={`${pathname === '/transactions' ? 'text-blue-400' : 'hover:text-blue-400'}`}
          >
            Transactions
          </Link>
          <Link 
            href="/expenses" 
            className={`${pathname === '/expenses' ? 'text-blue-400' : 'hover:text-blue-400'}`}
          >
            Expenses Chart
          </Link>
        </div>
      </div>
    </nav>
  );
}