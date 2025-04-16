'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import BudgetChart from '../../components/BudgetChart';
import BudgetForm from '../../components/BudgetForm';
import SpendingInsights from '@/components/SpendingInsights';  // Add this import

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchBudgets = async () => {
    const response = await fetch('/api/budgets');
    const data = await response.json();
    setBudgets(data);
  };

  const fetchTransactions = async () => {
    const response = await fetch('/api/transactions');
    const data = await response.json();
    setTransactions(data);
  };

  useEffect(() => {
    fetchBudgets();
    fetchTransactions();
  }, []);

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8">Budget Management</h1>
      
      <div className="grid gap-6">
        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Set Monthly Budget</h2>
          <BudgetForm onBudgetSet={fetchBudgets} />
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Budget vs Actual</h2>
          <BudgetChart budgets={budgets} transactions={transactions} />
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-semibold mb-4">Spending Insights</h2>
          <SpendingInsights budgets={budgets} transactions={transactions} />
        </Card>
      </div>
    </main>
  );
}