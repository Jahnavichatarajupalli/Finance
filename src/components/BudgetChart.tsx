'use client';

import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Budget {
  category: string;
  amount: number;
}

interface Transaction {
  category: string;
  amount: number;
}

export default function BudgetChart({ budgets, transactions }: { budgets: Budget[], transactions: Transaction[] }) {
  const categories = [...new Set(budgets.map(b => b.category))];
  
  const actualSpending = categories.map(category => {
    return transactions
      .filter(t => t.category === category)
      .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);
  });

  const budgetAmounts = categories.map(category => {
    const budget = budgets.find(b => b.category === category);
    return budget ? budget.amount : 0;
  });

  const data = {
    labels: categories,
    datasets: [
      {
        label: 'Budget',
        data: budgetAmounts,
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Actual',
        data: actualSpending,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Budget vs Actual Spending',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar options={options} data={data} />;
}