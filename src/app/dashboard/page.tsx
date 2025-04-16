'use client';

import { useState, useEffect } from 'react';
import Dashboard from '@/components/Dashboard';

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions');
    const data = await response.json();
    // data=data.filter(t => t.type === 'debit')
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Finance Dashboard</h1>
      <Dashboard transactions={transactions} />
    </main>
  );
}