'use client';

import { Card } from '@/components/ui/card';
import { Transaction } from '@/types/transaction';

interface DashboardProps {
  transactions: Transaction[];
}

export default function Dashboard({ transactions }: DashboardProps) {
  console.log(transactions)
  // const totalIncome = transactions.filter(t=>t.amount>0 && t.type==='credit').reduce((sum,t)=>sum+t.amount,0);
  // const totalExpenses = transactions
  //   .filter(t => t.amount < 0)
  //   .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalIncome=transactions.filter(t=>t.type === 'credit').reduce((sum,t)=>sum + t.amount,0);
  

  const totalExpenses = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  // const categoryTotals = categories.reduce((acc, category) => {
  //   const total = transactions
  //     .filter(t => t.category === category && t.amount < 0)
  //     .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  //   return { ...acc, [category]: total };
  // }, {} as Record<string, number>);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Total Income</h3>
        <p className="text-2xl text-green-600">${totalIncome}</p>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Total Expenses</h3>
        <p className="text-2xl text-red-600"> ${Math.abs(totalExpenses).toFixed(2)}</p>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-2">Net Balance</h3>
        <p className={`text-2xl ${totalIncome - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          ${(totalIncome - totalExpenses).toFixed(2)}
        </p>
      </Card>

      <Card className="p-6 md:col-span-2 lg:col-span-3">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {recentTransactions.map(transaction => (
            <div key={transaction._id} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{transaction.category}</p>
                {/* <p className="text-sm text-gray-500">{transaction.category}</p> */}
              </div>
              <p className={transaction.amount < 0 ? 'text-red-600' : 'text-green-600'}>
                ${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}