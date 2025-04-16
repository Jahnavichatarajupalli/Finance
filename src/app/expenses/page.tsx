'use client';

import { useState, useEffect } from 'react';
import ExpensesChart from '@/components/ExpensesChart';
import { Card } from '@/components/ui/card';
import CategoryPieChart from '@/components/CategoryPieChart';

export default function ExpensesPage() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions');
    let data = await response.json();
    data=data.filter(t => t.type === 'debit')
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">Expenses Overview</h1>
      <Card className="p-6">
        <ExpensesChart transactions={transactions} />
      </Card>
      <h1 className="text-4xl font-bold mb-8 text-center">Expenses by Category</h1>
      <Card className="p-6">
        <CategoryPieChart transactions={transactions} />
      </Card>
    </main>
  );
}