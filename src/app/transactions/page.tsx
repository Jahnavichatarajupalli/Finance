'use client';

import { useState, useEffect } from 'react';
import TransactionList from '@/components/TransactionList';
import { Card } from '@/components/ui/card';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions');
    const data = await response.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <Card className="p-6">
        <TransactionList 
          transactions={transactions} 
          onTransactionUpdate={fetchTransactions}
        />
      </Card>
    </main>
  );
}