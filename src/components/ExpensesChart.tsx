'use client';

import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';

interface Transaction {
  amount: number;
  date: string;
}

interface ExpensesChartProps {
  transactions: Transaction[];
}

export default function ExpensesChart({ transactions }: ExpensesChartProps) {
  const monthlyData = useMemo(() => {
    const data: { [key: string]: number } = {};
    
    transactions.forEach((transaction) => {
      const monthYear = format(new Date(transaction.date), 'MMM yyyy');
      data[monthYear] = (data[monthYear] || 0) + transaction.amount;
    });

    return Object.entries(data).map(([month, amount]) => ({
      month,
      amount: Math.abs(amount)
    }));
  }, [transactions]);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}